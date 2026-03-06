// server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/auth", (await import("./src/routes/authRoutes.js")).default);
app.use("/users", (await import("./src/routes/userRoutes.js")).default);
app.use("/events", (await import("./src/routes/eventRoutes.js")).default);
app.use("/admin", (await import("./src/routes/adminRoutes.js")).default);

app.listen(4000, () => console.log("Server running on port 4000"));