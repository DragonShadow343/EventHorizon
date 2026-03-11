import { mockEvents } from "../mock/mockEvents";

export async function getAllEvents(req, res) {
    return res.json(mockEvents)
}

export async function getEventById(req, res) {
    const {id} = req.params;
    const event = mockEvents.find(e => e.eventId === id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
}

export async function getEventsByOrganizer(req, res) {
    const {id} = req.params;
    const event = mockEvents.filter(e => e.organizerId === id);

    res.json(event);
}

export function deleteMyEvent(req, res) {
    const { id } = req.params;

    const index = mockEvents.findIndex(e => e.eventId === id);

    if (index === -1) {
        return res.status(404).json({ error: "Event not found" });
    }

    if (mockEvents[index].organizerId !== req.user.id) {
        return res.status(403).json({ error: "Not authorized" });
    }

    const deleted = mockEvents.splice(index, 1);

    res.json({ message: "Event deleted", event: deleted[0] });
}

export async function editMyEvent(req, res) {
    const { id } = req.params;

    const event = mockEvents.find(e => e.eventId === id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    if (event.organizerId !== req.user.id) {
        return res.status(403).json({ error: "Not authorized to edit this event" });
    }

    Object.assign(event, req.body);

    res.json(event);
}

export function createEvent(req, res) {
    const newEvent = { 
        eventId: "e" + Date.now().toString(),
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        capacity: req.body.capacity,
        organizerId: req.user.id,
        rsvp: [],
        reviews: [],
    };
    mockEvents.push(newEvent);
    res.status(201).json(newEvent);
}

export function rsvpToEvent(req, res) {

    const { id } = req.params;

    const event = mockEvents.find(e => e.eventId === id);

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

    res.json({ message: "RSVP successful", event });
}

export function cancelRsvp(req, res) {
    const { id } = req.params;

    const event = mockEvents.find(e => e.eventId === id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    event.rsvp = event.rsvp.filter(userId => userId !== req.user.id);

    res.json({ message: "RSVP cancelled", event });
}

export function submitEventReview(req, res) {
    // TODO: Can't review until event has begun or user has attended

    const { id } = req.params;

    const event = mockEvents.find(e => e.eventId === id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    const alreadyReviewed = event.reviews.find(r => r.userId === req.user.id);
    if (alreadyReviewed) {
        return res.status(400).json({ error: "User has already submitted a review" });
    }

    // Example Body we want to use
    // {
    // "rating": 5,
    // "comment": "Amazing event"
    // }

    const review = {
        userId: req.user.id,
        rating: req.body.rating,
        comment: req.body.comment,
        date: new Date()
    };

    event.reviews.push(review);

    res.json({ message: "Review submitted", review });
}

export function getUpcomingEvents(req, res) {
    const now = new Date();

    const upcoming = mockEvents
        .filter(e => new Date(e.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(upcoming);
}

export function searchEvents(req, res) {
    const { q } = req.query;

    if (!q) {
        return res.json(mockEvents);
    }

    const results = mockEvents.filter(event =>
        event.title.toLowerCase().includes(q.toLowerCase()) ||
        event.description.toLowerCase().includes(q.toLowerCase())
    );

    res.json(results);
}

export function getTrendingEvents(req, res) {
    const trending = [...mockEvents]
        .sort((a, b) => b.rsvp.length - a.rsvp.length)
        .slice(0, 5);

    res.json(trending);
}

export async function createReport(req, res) {
    const eventId = req.params.id;
    const userId = req.user.id;
    const { reason, description } = req.body;

    const event = mockEvents.find(e => e.id === eventId);

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

    reports.push(newReport);

    res.status(201).json(newReport);
}

export async function createReview(req, res) {
    const eventId = req.params.id;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    const event = mockEvents.find(e => e.id === eventId);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    // Check if user RSVP'd (optional but good practice)
    const hasRSVPd = event.rsvpUsers.includes(userId);

    if (!hasRSVPd) {
        return res.status(403).json({ error: "You must attend the event to review it" });
    }

    const newReview = {
        id: Date.now().toString(),
        userId,
        rating,
        comment,
        createdAt: new Date()
    };

    event.reviews.push(newReview);

    res.status(201).json(newReview);
}