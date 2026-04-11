import express from "express"
import {
  deleteAnyEvent,
  deleteReport,
  deleteUser,
  getAllReports,
  getAllUsers,
  getMostActiveUsers,
  getMostPopularEvents,
  getReport,
  getTotalEvents,
  getTotalReports,
  getTotalUsers,
  getUser,
  resolveReport,
  toggleUserRole,
  toggleUserStatus
} from "../controllers/adminController.js"

import { authMiddleware } from "../middleware/authMiddleware.js"
import { requiredRole } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.use(authMiddleware, requiredRole("admin"));

router.get("/users", getAllUsers)
router.get("/users/:id", getUser)
router.delete("/users/:id", deleteUser)
router.patch("/users/:id/toggle-status", toggleUserStatus)
router.patch("/users/:id/toggle-role", toggleUserRole)

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