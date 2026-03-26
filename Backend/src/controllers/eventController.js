import Event from "../models/Event.js";

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

    await Event.findByIdAndDelete(id);

    res.json({ message: "Event deleted", event });
}

export async function editMyEvent(req, res) {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    if (event.organizerId.toString() !== req.user.id) {
        return res.status(403).json({ error: "Not authorized to edit this event" });
    }

    Object.assign(event, req.body);
    await event.save();

    res.json(event);
}

export async function createEvent(req, res) {
    const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        capacity: req.body.capacity,
        organizerId: req.user.id,
        rsvp: [],
        reviews: [],
    });

    await newEvent.save();
    res.status(201).json(newEvent);
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
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    const alreadyReviewed = event.reviews.find(r => r.userId.toString() === req.user.id);
    if (alreadyReviewed) {
        return res.status(400).json({ error: "User has already submitted a review" });
    }

    const review = {
        userId: req.user.id,
        rating: req.body.rating,
        comment: req.body.comment,
        date: new Date()
    };

    event.reviews.push(review);
    await event.save();

    res.json({ message: "Review submitted", review });
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

export async function createReview(req, res) {
    const eventId = req.params.id;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    const hasRSVPd = event.rsvp.some(id => id.toString() === userId);

    if (!hasRSVPd) {
        return res.status(403).json({ error: "You must attend the event to review it" });
    }

    const newReview = {
        userId,
        rating,
        comment,
        createdAt: new Date()
    };

    event.reviews.push(newReview);
    await event.save();

    res.status(201).json(newReview);
}