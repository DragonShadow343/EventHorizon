import bcrypt from 'bcrypt';
import Event from "../models/Event.js";
import User from "../models/User.js";

export async function updateUserData(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.email = req.body.email ?? user.email;
  user.phone = req.body.phone ?? user.phone;

  await user.save();
  res.json(user);
}

export async function updateUserPassword(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { oldPassword, newPassword } = req.body;

  const match = await bcrypt.compare(oldPassword, user.hashedPassword);
  if (!match) return res.status(400).json({ error: "Old password incorrect" });

  user.hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password updated" });
}

export async function updateUserSettings(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.settings = { ...user.settings, ...req.body };
  await user.save();

  res.json(user.settings);
}

export async function getUserByID(req, res) {
  const { id } = req.params;
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

export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("name email");

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
