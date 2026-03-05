import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireEventOwner } from '../middleware/eventOwnerMiddleware';
import {
    getAllEvents,
    createEvent,
    getEventById,
    rsvpToEvent,
    cancelRsvp,
    deleteMyEvent,
    editMyEvent,
    submitEventReview,
    getUpcomingEvents,
    getTrendingEvents,
    searchEvents
} from "../controllers/eventController";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/trending", getTrendingEvents);

router.post("/", authMiddleware, createEvent);
router.get("/:id", getEventById);
router.delete("/:id", authMiddleware, requireEventOwner, deleteMyEvent);
router.put("/:id", authMiddleware, requireEventOwner, editMyEvent);
router.get("/search?", searchEvents)

router.post("/:id/rsvp", authMiddleware, rsvpToEvent);
router.delete("/:id/rsvp", authMiddleware, cancelRsvp);

router.post("/:id/reviews", authMiddleware, submitEventReview);