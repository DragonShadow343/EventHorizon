import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    reason: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    status: {
      type: String,
      enum: ["open", "resolved", "dismissed"],
      default: "open"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);