import User from "../models/User.js";
import Event from "../models/Event.js";
import bcrypt from 'bcrypt';
import mongoSanitize from "mongo-sanitize";
import mongoose from "mongoose";

export async function updateUserData(req, res) {
  const sanitizedBody = mongoSanitize(req.body);
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  // Handle text fields
  user.name = sanitizedBody.username ?? user.name;
  user.email = sanitizedBody.email ?? user.email;

  // Handle image upload (Multer)
  if (req.file) {
    const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;
    user.avatar = imageUrl;
  }

  await user.save();

  res.json({
    username: user.name,
    email: user.email,
    avatar: user.avatar,
  });
}

export async function updateUserPassword(req, res) {
  const sanitizedBody = mongoSanitize(req.body);
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { oldPassword, newPassword } = sanitizedBody;

  const match = await bcrypt.compare(oldPassword, user.hashedPassword);
  if (!match) return res.status(400).json({ error: "Old password incorrect" });

  user.hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password updated" });
}

export async function updateUserSettings(req, res) {
  const sanitizedBody = mongoSanitize(req.body);
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.settings = { ...user.settings, ...sanitizedBody };
  await user.save();

  res.json(user.settings);
}

export async function getUserByID(req, res) {
  const sanitizedParams = mongoSanitize(req.params);

  const { id } = sanitizedParams;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
}

export async function getMyEvents(req, res) {
  const events = await Event.find({ organizerId: req.user.id });
  res.json(events);
}

export async function getMyRsvps(req, res) {
  const events = await Event.find({ rsvp: req.user.id });
  res.json(events);
}

export async function getMyPastEvents(req, res) {
  const now = new Date();
  const events = await Event.find({ organizerId: req.user.id, date: { $lt: now } });
  res.json(events);
}

export async function getMyPastRsvps(req, res) {
  const now = new Date();
  const events = await Event.find({ rsvp: req.user.id, date: { $lt: now } });
  res.json(events);
}

export async function getMyReviews(req, res) {
  const reviews = [];
  const events = await Event.find({ 'reviews.userId': req.user.id });

  events.forEach(event => {
    const userReviews = event.reviews.filter(r => r.userId.toString() === req.user.id);
    userReviews.forEach(r => {
      reviews.push({
        eventId: event._id,
        title: event.title,
        review: r
      });
    });
  });

  res.json(reviews);
}