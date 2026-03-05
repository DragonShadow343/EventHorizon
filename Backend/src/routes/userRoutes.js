import express from "express";
import { 
    getMyEvents, 
    getMyPastEvents, 
    getMyPastRsvps, 
    getMyReviews, 
    getMyRsvps, 
    getUserByID, 
    updateUserData, 
    updateUserPassword, 
    updateUserSettings } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/events", authMiddleware, getMyEvents);
router.get("/events/past", authMiddleware, getMyPastEvents);

router.get("/rsvps", authMiddleware, getMyRsvps);
router.get("/rsvps/past", authMiddleware, getMyPastRsvps);

router.get("/reviews", authMiddleware, getMyReviews);

router.put("/me", authMiddleware, updateUserData)
router.put("/me/settings", authMiddleware, updateUserSettings);
router.put("/me/changepassword", authMiddleware, updateUserPassword);

router.get("/:id", getUserByID)

export default router;