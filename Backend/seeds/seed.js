import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../src/models/User.js";
import Event from "../src/models/Event.js";
import Comment from "../src/models/Comment.js";
import Report from "../src/models/Report.js";

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting seed...");

    // Optional: prevent duplicate seeding
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log("📦 Database already seeded. Skipping...");
      return;
    }

    // -----------------------
    // 1. CREATE USERS
    // -----------------------
    const hashedPassword = async (pwd) =>
      await bcrypt.hash(pwd, 10);

    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@test.com",
        passwordHash: await hashedPassword("admin123"),
        role: "admin",
        phone: "111-111-1111",
      },
      {
        name: "Alice Johnson",
        email: "alice@test.com",
        passwordHash: await hashedPassword("password123"),
        role: "user",
      },
      {
        name: "Bob Smith",
        email: "bob@test.com",
        passwordHash: await hashedPassword("password123"),
        role: "user",
      },
      {
        name: "Sejal",
        email: "sk@gmail.com",
        passwordHash: await hashedPassword("Sejal@123"),
        role: "admin",
      },
    ]);

    const [admin, alice, bob, charlie] = users;

    console.log("Users seeded");

    // -----------------------
    // 2. CREATE EVENTS
    // -----------------------
    const events = await Event.insertMany([
      {
        title: "MERN Bootcamp",
        description: "Learn full stack development",
        date: new Date(Date.now() + 86400000),
        time: "10:00 AM",
        location: "UBCO Campus",
        capacity: 50,
        organizerId: admin._id,
        photos: ['1775258930158-image.jpg'],
        videos: [],
        rsvp: [alice._id, bob._id],
        reviews: [
          {
            userId: alice._id,
            userName: alice.name,
            rating: 5,
            comment: "Great event!",
          },
        ],
      },
      {
        title: "Hackathon Night",
        description: "Build something awesome",
        date: new Date(Date.now() + 3 * 86400000),
        time: "6:00 PM",
        location: "Kelowna Innovation Centre",
        capacity: 100,
        organizerId: alice._id,
        photos: ['1775505744247-image.png'],
        rsvp: [bob._id, charlie._id],
        reviews: [
          {
            userId: bob._id,
            userName: bob.name,
            rating: 4,
            comment: "Fun and intense!",
          },
        ],
      },
    ]);

    const [mernEvent, hackathonEvent] = events;

    console.log("Events seeded");

    // -----------------------
    // 3. CREATE COMMENTS (THREADED)
    // -----------------------
    const parentComment = await Comment.create({
      eventId: mernEvent._id,
      userId: bob._id,
      text: "Is this beginner friendly?",
      parentId: null,
    });

    await Comment.create({
      eventId: mernEvent._id,
      userId: admin._id,
      text: "Yes, absolutely!",
      parentId: parentComment._id,
    });

    await Comment.create({
      eventId: hackathonEvent._id,
      userId: charlie._id,
      text: "Do we get teams assigned?",
      parentId: null,
    });

    console.log("Comments seeded");

    // -----------------------
    // 4. CREATE REPORTS
    // -----------------------
    await Report.insertMany([
      {
        eventId: mernEvent._id,
        reportedBy: bob._id,
        reason: "Spam content",
        description: "Looks suspicious",
        status: "open",
      },
      {
        eventId: hackathonEvent._id,
        reportedBy: charlie._id,
        reason: "Inappropriate description",
        description: "Needs review",
        status: "resolved",
      },
    ]);

    console.log("Reports seeded");

    console.log("Seed complete!");
  } catch (err) {
    console.error("Seed error:", err);
  }
};

export default seedDatabase;