import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireEventOwner } from '../middleware/eventOwnerMiddleware.js';
import {
    getAllEvents,
    createEvent,
    createReport,
    createReview, 
    getEventById,
    rsvpToEvent,
    cancelRsvp,
    deleteMyEvent,
    editMyEvent,
    submitEventReview,
    getUpcomingEvents,
    getTrendingEvents,
    searchEvents
} from "../controllers/eventController.js";
import {upload} from "../middleware/multer.js"

const router = express.Router();

router.get("/", getAllEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/trending", getTrendingEvents);

router.post("/", authMiddleware, upload.single("image"), createEvent);
router.get("/search", searchEvents)
router.get("/:id", getEventById);
router.delete("/:id", authMiddleware, requireEventOwner, deleteMyEvent);
router.put("/:id", authMiddleware, requireEventOwner, upload.single("image"), editMyEvent);

router.post("/:id/rsvp", authMiddleware, rsvpToEvent);
router.delete("/:id/rsvp", authMiddleware, cancelRsvp);

router.post("/report/:id", authMiddleware, createReport);
router.post("/review/:id", authMiddleware, createReview);

router.post("/:id/reviews", authMiddleware, submitEventReview);

export default router;