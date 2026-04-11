import mongoSanitize from "mongo-sanitize";
import mongoose from "mongoose";
import Event from "../models/Event.js";
import Report from "../models/Report.js";
import User from "../models/User.js";


export async function getAllUsers(req, res) {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      $or: [
        //Allow partial matching, case-insensitive
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ]
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
}


export async function getUser(req, res) {
  try {
    const sanitizedParams = mongoSanitize(req.params);

    const { id } = sanitizedParams

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" })
    }

    const user = await User.findById(id).select("-password")
    
    const events = await Event.find({ organizerId: id }).select("title _id")

    res.status(200).json({ user, events })
    return

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error })
  }
}


export async function deleteUser(req, res) {
  try {
    const sanitizedParams = mongoSanitize(req.params);

    const { id } = sanitizedParams

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" })
    }

    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error })
  }
}


export async function toggleUserStatus(req, res) {
  try {
    const sanitizedParams = mongoSanitize(req.params);

    const { id } = sanitizedParams

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" })
    }

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.isActive = !user.isActive

    await user.save()

    res.status(200).json({
      message: "User status updated",
      isActive: user.isActive
    })

  } catch (error) {
    res.status(500).json({ message: "Failed to toggle user status", error })
  }
}


export async function deleteAnyEvent(req, res) {
  try {
    const sanitizedParams = mongoSanitize(req.params);

    const { id } = sanitizedParams

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" })
    }

    const event = await Event.findByIdAndDelete(id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    res.status(200).json({ message: "Event deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error })
  }
}


export async function getAllReports(req, res) {
  try {
    const reports = await Report.find()
      .populate("reportedBy")
      .populate("eventId")

    res.status(200).json(reports)

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports", error })
  }
}


export async function getReport(req, res) {
  try {
    const sanitizedParams = mongoSanitize(req.params);

    const { id } = sanitizedParams

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" })
    }

    const report = await Report.findById(id)
      .populate("reportedBy")
      .populate("eventId")

    if (!report) {
      return res.status(404).json({ message: "Report not found" })
    }

    res.status(200).json(report)

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch report", error })
  }
}


export async function resolveReport(req, res) {
  try {
    const sanitizedParams = mongoSanitize(req.params);

    const { id } = sanitizedParams

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" })
    }

    const report = await Report.findById(id)

    if (!report) {
      return res.status(404).json({ message: "Report not found" })
    }

    report.status = "resolved"

    await report.save()

    res.status(200).json({ message: "Report resolved successfully" })

  } catch (error) {
    res.status(500).json({ message: "Failed to resolve report", error })
  }
}


export async function deleteReport(req, res) {
  try {
    const sanitizedParams = mongoSanitize(req.params);

    const { id } = sanitizedParams

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" })
    }

    const report = await Report.findByIdAndDelete(id)

    if (!report) {
      return res.status(404).json({ message: "Report not found" })
    }

    res.status(200).json({ message: "Report deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: "Failed to delete report", error })
  }
}


export async function getTotalUsers(req, res) {
  try {
    const total = await User.countDocuments()

    res.status(200).json({ totalUsers: total })

  } catch (error) {
    res.status(500).json({ message: "Failed to count users", error })
  }
}


export async function getTotalEvents(req, res) {
  try {
    const total = await Event.countDocuments()

    res.status(200).json({ totalEvents: total })

  } catch (error) {
    res.status(500).json({ message: "Failed to count events", error })
  }
}


export async function getTotalReports(req, res) {
  try {
    const total = await Report.countDocuments()

    res.status(200).json({ totalReports: total })

  } catch (error) {
    res.status(500).json({ message: "Failed to count reports", error })
  }
}


export async function getMostActiveUsers(req, res) {
  try {
    const users = await User.find().select("name email");
    const events = await Event.find().select("organizerId");

    const counts = {};
    events.forEach(e => {
      const id = e.organizerId?.toString();
      if (!id) return;
      counts[id] = (counts[id] || 0) + 1;
    });

    const active = users
      .map(u => ({
        ...u.toObject(),
        eventsCreated: counts[u._id.toString()] || 0
      }))
      .sort((a, b) => b.eventsCreated - a.eventsCreated)
      .slice(0, 4);

    res.status(200).json(active);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch active users", error });
  }
}


export async function getMostPopularEvents(req, res) {
  try {
    const events = await Event.find();

    const popular = events
      .map(e => ({
        ...e.toObject(),
        attendeeCount: e.rsvp?.length || 0
      }))
      .sort((a, b) => b.attendeeCount - a.attendeeCount)
      .slice(0, 4);

    res.status(200).json(popular);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular events", error });
  }
}

export async function toggleUserRole(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = user.role === "admin" ? "user" : "admin";

    await user.save();

    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Failed to update role", error });
  }
}