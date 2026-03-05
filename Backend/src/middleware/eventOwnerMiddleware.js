import { mockEvents } from "../mock/mockEvents";

export function requireEventOwner(req, res, next) {
    const event = mockEvents.find(e => e.eventId === req.params.id);

    if (!event) return res.status(404).json({error: "Eventnot found"});

    if (event.organizerId !== req.user.id){
        return res.status(403).json({error: "Not your event"});
    }

    req.event = event;
    next();
}