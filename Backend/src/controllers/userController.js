import { mockUsers } from "../mock/mockUsers.js";
import { mockEvents } from "../mock/mockEvents.js";
import bcrypt from 'bcrypt'

export async function updateUserData(req, res) {
  const user = mockUsers.find(u => u.userId === req.user.id);

  if (!user) return res.status(404).json({ error: "User not found" });

  user.email = req.body.email ?? user.email;
  user.phone = req.body.phone ?? user.phone;

  res.json(user);
}

export async function updateUserPassword(req, res) {
  const user = mockUsers.find(u => u.userId === req.user.id);

  if (!user) return res.status(404).json({ error: "User not found" });

  const { oldPassword, newPassword } = req.body;

  if (user.hashedPassword !== oldPassword) {
    return res.status(400).json({ error: "Old password incorrect" });
  }

  user.hashedPassword = await bcrypt.hash(newPassword, 10);

  res.json({ message: "Password updated" });
}

export async function updateUserSettings(req, res) {
  const user = mockUsers.find(u => u.userId === req.user.id);

  if (!user) return res.status(404).json({ error: "User not found" });

  user.settings = {
    ...user.settings,
    ...req.body
  };

  res.json(user.settings);
}

export async function getUserByID(req, res) {
  const { id } = req.params;

  const user = mockUsers.find(u => u.userId === id);

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
}

export async function getMyEvents(req, res) {
  const events = mockEvents.filter(e => e.organizerId === req.user.id);

  res.json(events);
}

export async function getMyRsvps(req, res) {
  const events = mockEvents.filter(e => e.rsvp.includes(req.user.id));

  res.json(events);
}

export async function getMyPastEvents(req, res) {
  const now = new Date();

  const events = mockEvents.filter(e =>
    e.organizerId === req.user.id && new Date(e.date) < now
  );

  res.json(events);
}

export async function getMyPastRsvps(req, res) {
  const now = new Date();

  const events = mockEvents.filter(e =>
    e.rsvp.includes(req.user.id) && new Date(e.date) < now
  );

  res.json(events);
}

export async function getMyReviews(req, res) {
  const reviews = [];

  mockEvents.forEach(event => {
    const userReviews = event.reviews.filter(r => r.userId === req.user.id);

    userReviews.forEach(r => {
      reviews.push({
        eventId: event.eventId,
        title: event.title,
        review: r
      });
    });
  });

  res.json(reviews);
}