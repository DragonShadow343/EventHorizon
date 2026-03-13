import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String
    },

    location: {
      type: String
    },

    capacity: {
      type: Number
    },

    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    photos: [String],

    videos: [String],

    rsvp: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    reviews: [reviewSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);