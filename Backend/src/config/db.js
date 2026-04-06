import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error(
      "Missing MONGO_URI. Create Backend/.env with MONGO_URI=... (or export it in your shell)."
    );
  }

  try {
    const conn = await mongoose.connect(uri, {
      // Fail fast instead of hanging forever when Mongo is down/unreachable.
      serverSelectionTimeoutMS: 8000,
    });
    console.log("Database connected: " + conn.connection.host);
    return conn;
  } catch (err) {
    console.error("Database connection error:", err?.message ?? err);
    throw err;
  }
}