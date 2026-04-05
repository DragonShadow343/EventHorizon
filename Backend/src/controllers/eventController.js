import Event from "../models/Event.js";
import fs from "fs";
import path from "path";

export async function getAllEvents(req, res) {
    const events = await Event.find();
    return res.json(events);
}

export async function getEventById(req, res) {
    const {id} = req.params;
    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
}

export async function getEventsByOrganizer(req, res) {
    const {id} = req.params;
    const event = await Event.find({ organizerId: id });

    res.json(event);
}

export async function deleteMyEvent(req, res) {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    if (event.organizerId.toString() !== req.user.id) {
        return res.status(403).json({ error: "Not authorized" });
    }

    // Delete associated uploaded images
    if (event.photos && event.photos.length > 0) {
        event.photos.forEach((filename) => {
            const filePath = path.join("uploads", filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }

    await Event.findByIdAndDelete(id);

    res.json({ message: "Event deleted", event });
}

export async function editMyEvent(req, res) {
     try {
        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (event.organizerId.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to edit this event" });
        }

        const { title, description, date, time, location, capacity } = req.body;

        if (title) event.title = title;
        if (description) event.description = description;
        if (date) event.date = date;
        if (time) event.time = time;
        if (location) event.location = location;
        if (capacity !== undefined) event.capacity = capacity;

        // If a new image is uploaded, replace the old one
        if (req.file) {
            // delete old images
            if (event.photos && event.photos.length > 0) {
                event.photos.forEach((filename) => {
                    const filePath = path.join("uploads", filename);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                });
            }

            event.photos = [req.file.filename];
        }
        await event.save();

        res.status(200).json(event);
    } catch (err) {
        console.error("Updating event failed:", err);
        res.status(500).json({ message: "Failed to update event" });
    }
}

export async function createEvent(req, res) {
  try {
    // req.body now has the text fields
    const { title, description, date, time, location, capacity } = req.body || {};

    if (!title || !description || !date || !time || !location || !capacity) {
      return res.status(400).json({ message: 'Missing required event fields' });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      capacity,
      organizerId: req.user.id,
      photos: req.file ? [req.file.filename] : [],
      rsvp: [],
      reviews: [],
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Create event failed:", err);
    res.status(500).json({ message: "Failed to create event" });
  }
}

export async function rsvpToEvent(req, res) {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    if (event.capacity && event.rsvp.length >= event.capacity) {
        return res.status(400).json({ error: "Event capacity reached" });
    }

    if (event.rsvp.includes(req.user.id)) {
        return res.status(400).json({ error: "Already RSVP'd" });
    }

    event.rsvp.push(req.user.id);
    await event.save();

    res.json({ message: "RSVP successful", event });
}

export async function cancelRsvp(req, res) {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    event.rsvp = event.rsvp.filter(userId => userId.toString() !== req.user.id);
    await event.save();

    res.json({ message: "RSVP cancelled", event });
}

export async function submitEventReview(req, res) {
    const { eventId } = req.params;
    const { userId } = req.user.id;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    const alreadyReviewed = event.reviews.find(r => r.userId.toString() === userId);
    if (alreadyReviewed) {
        return res.status(400).json({ error: "User has already submitted a review" });
    }

    const hasRSVPd = event.rsvp.some(id => id.toString() === userId);

    if (!hasRSVPd) {
        return res.status(403).json({ error: "You must attend the event to review it" });
    }

    const review = {
        userId: userId,
        rating: req.body.rating,
        comment: req.body.comment,
        date: new Date()
    };

    event.reviews.push(review);
    await event.save();

    res.status(201).json({ message: "Review submitted", review });
}

export async function getUpcomingEvents(req, res) {
    const now = new Date();

    const upcoming = await Event.find({ date: { $gt: now } }).sort({ date: 1 });

    res.json(upcoming);
}

export async function searchEvents(req, res) {
    const { q } = req.query;

    if (!q) {
        const events = await Event.find();
        return res.json(events);
    }

    const results = await Event.find({
        $or: [
            { title: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } }
        ]
    });

    res.json(results);
}

export async function getTrendingEvents(req, res) {
    const trending = await Event.aggregate([
        { $addFields: { rsvpCount: { $size: "$rsvp" } } },
        { $sort: { rsvpCount: -1 } },
        { $limit: 5 }
    ]);

    res.json(trending);
}

export async function createReport(req, res) {
    const eventId = req.params.id;
    const userId = req.user.id;
    const { reason, description } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    const newReport = {
        id: Date.now().toString(),
        eventId,
        reportedBy: userId,
        reason,
        description,
        status: "open",
        createdAt: new Date()
    };

    // NOTE: You should ideally store reports in DB, but keeping your structure
    if (!event.reports) event.reports = [];
    event.reports.push(newReport);

    await event.save();

    res.status(201).json(newReport);
}