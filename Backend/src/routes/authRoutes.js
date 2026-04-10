import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/me", me)

export default router;