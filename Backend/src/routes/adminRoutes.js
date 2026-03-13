import express from "express"
import {
  getAllUsers,
  getUser,
  deleteUser,
  toggleUserStatus,
  deleteAnyEvent,
  getAllReports,
  getReport,
  resolveReport,
  deleteReport,
  getTotalUsers,
  getTotalEvents,
  getTotalReports,
  getMostActiveUsers,
  getMostPopularEvents
} from "../controllers/adminController.js"

import { authMiddleware } from "../middleware/authMiddleware.js"
import { requiredRole } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.use(authMiddleware, requiredRole("admin"));

router.get("/users", getAllUsers)
router.get("/users/:id", getUser)
router.delete("/users/:id", deleteUser)
router.patch("/users/:id/toggle-status", toggleUserStatus)

router.delete("/events/:id", deleteAnyEvent)

router.get("/reports", getAllReports)
router.get("/reports/:id", getReport)
router.patch("/reports/:id/resolve", resolveReport)
router.delete("/reports/:id", deleteReport)

router.get("/stats/users", getTotalUsers)
router.get("/stats/events", getTotalEvents)
router.get("/stats/reports", getTotalReports)
router.get("/stats/active-users", getMostActiveUsers)
router.get("/stats/popular-events", getMostPopularEvents)

export default router