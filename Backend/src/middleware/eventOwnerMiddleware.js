import Event from "../models/Event.js";

export async function requireEventOwner(req, res, next) {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    if (event.organizerId.toString() !== req.user.id) {
        return res.status(403).json({ error: "Not your event" });
    }

    req.event = event;
    next();
}