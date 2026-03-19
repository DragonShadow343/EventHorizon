import express from "express";
import { submitReport, searchEvents } from "../controllers/labController.js";

const router = express.Router();

router.post("/reports", submitReport);
router.get("/search", searchEvents);

export default router;