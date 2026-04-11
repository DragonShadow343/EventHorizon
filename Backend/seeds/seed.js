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
        name: "TA - Admin",
        email: "admin@test.com",
        passwordHash: await hashedPassword("Admin@123"),
        role: "admin",
        avatar: "TAdmin.jpeg"
      },
      {
        name: "Krish Admin",
        email: "krishkhullar.20@gmail.com",
        passwordHash: await hashedPassword("Krish@123"),
        role: "admin",
        avatar: "KrishA.jpeg",
      },
      {
        name: "TA - User",
        email: "User@test.com",
        passwordHash: await hashedPassword("User@123"),
        role: "user",
        avatar: "TAUser.jpeg"
      },
      {
        name: "Kiran",
        email: "Kiran@gmail.com",
        passwordHash: await hashedPassword("Kiran@123"),
        role: "user",
        avatar: "Kiran.jpeg",
      },
      {
        name: "Krish User",
        email: "krishkhullar007@gmail.com",
        passwordHash: await hashedPassword("Krish@123"),
        role: "user",
        avatar: "Krish.jpeg"
      },
      {
        name: "Sejal",
        email: "sk@gmail.com",
        passwordHash: await hashedPassword("Sejal@123"),
        role: "admin",
        avatar: "Sejal.jpeg",
      },
    ]);

    const [admin, krishAdmin, user, kiran, krishUser, sejal] = users;

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
        photos: ['mern.jpg'],
        videos: [],
        rsvp: [kiran._id, sejal._id],
        reviews: [
          {
            userId: kiran._id,
            userName: kiran.name,
            rating: 5,
            comment: "Great event!",
          },
          {
            userId: sejal._id,
            userName: sejal.name,
            rating: 4,
            comment: "Loved it!",
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
        organizerId: kiran._id,
        photos: ['hackathon.jpg'],
        rsvp: [krishUser._id, user._id],
        reviews: [
          {
            userId: user._id,
            userName: user.name,
            rating: 4,
            comment: "Fun and intense!",
          },
        ],
      },
      {
        title: "React Workshop",
        description: "Hands-on React fundamentals",
        date: new Date(Date.now() + 2 * 86400000),
        time: "2:00 PM",
        location: "UBCO Library",
        capacity: 40,
        organizerId: admin._id,
        photos: ['react.jpg'],
        videos: [],
        rsvp: [user._id],
        reviews: [],
      },
      {
        title: "AI Meetup",
        description: "Discuss latest in AI",
        date: new Date(Date.now() + 4 * 86400000),
        time: "5:00 PM",
        location: "Downtown Kelowna",
        capacity: 80,
        organizerId: krishAdmin._id,
        photos: ['ai.jpg'],
        videos: [],
        rsvp: [kiran._id],
        reviews: [],
      },
      {
        title: "Startup Pitch Night",
        description: "Pitch your ideas",
        date: new Date(Date.now() + 5 * 86400000),
        time: "7:00 PM",
        location: "Innovation Centre",
        capacity: 120,
        organizerId: admin._id,
        photos: ['pitch.jpg'],
        videos: [],
        rsvp: [sejal._id],
        reviews: [],
      },
      {
        title: "UI/UX Design Talk",
        description: "Improve your design skills",
        date: new Date(Date.now() + 6 * 86400000),
        time: "3:00 PM",
        location: "UBCO Arts Building",
        capacity: 60,
        organizerId: krishAdmin._id,
        photos: ['design.jpg'],
        videos: [],
        rsvp: [krishUser._id],
        reviews: [],
      },
      {
        title: "Cloud Computing 101",
        description: "Intro to AWS and cloud",
        date: new Date(Date.now() + 7 * 86400000),
        time: "1:00 PM",
        location: "Kelowna Tech Hub",
        capacity: 70,
        organizerId: krishUser._id,
        photos: ['cloud.jpg'],
        videos: [],
        rsvp: [user._id],
        reviews: [],
      },
      {
        title: "Cybersecurity Basics",
        description: "Learn to protect systems",
        date: new Date(Date.now() + 8 * 86400000),
        time: "11:00 AM",
        location: "UBCO Engineering",
        capacity: 50,
        organizerId: sejal._id,
        photos: ['cybersecurity.jpg'],
        videos: [],
        rsvp: [kiran._id],
        reviews: [],
      },
      {
        title: "Game Dev Jam",
        description: "Build a game in 24 hours",
        date: new Date(Date.now() + 9 * 86400000),
        time: "9:00 AM",
        location: "Kelowna Innovation Centre",
        capacity: 90,
        organizerId: admin._id,
        photos: ['gamejam.jpg'],
        videos: [],
        rsvp: [krishUser._id],
        reviews: [],
      },
      {
        title: "Data Science Bootcamp",
        description: "Learn data analysis",
        date: new Date(Date.now() + 10 * 86400000),
        time: "4:00 PM",
        location: "UBCO Science Building",
        capacity: 75,
        organizerId: krishAdmin._id,
        photos: ['data.jpg'],
        videos: [],
        rsvp: [user._id],
        reviews: [],
      },
      {
        title: "Networking Night",
        description: "Meet industry professionals",
        date: new Date(Date.now() + 11 * 86400000),
        time: "6:00 PM",
        location: "Downtown Kelowna",
        capacity: 100,
        organizerId: admin._id,
        photos: ['networking.jpg'],
        videos: [],
        rsvp: [sejal._id],
        reviews: [],
      },
      {
        title: "Open Source Sprint",
        description: "Become the best in open source code",
        date: new Date(Date.now() + 12 * 86400000),
        time: "12:00 PM",
        location: "UBCO Computer Lab",
        capacity: 45,
        organizerId: krishAdmin._id,
        photos: ['opensource.jpg'],
        videos: [],
        rsvp: [kiran._id],
        reviews: [],
      },
    ]);

    const [mernEvent, hackathonEvent] = events;

    console.log("Events seeded");

    // -----------------------
    // 3. CREATE COMMENTS (THREADED)
    // -----------------------
    const parentComment = await Comment.create({
      eventId: mernEvent._id,
      userId: krishAdmin._id,
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
      userId: user._id,
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
        reportedBy: user._id,
        reason: "Spam content",
        description: "Looks suspicious",
        status: "open",
      },
      {
        eventId: hackathonEvent._id,
        reportedBy: kiran._id,
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