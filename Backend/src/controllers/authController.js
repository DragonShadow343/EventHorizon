import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils.js";
import mongoSanitize from "mongo-sanitize";
import mongoose from "mongoose";

export async function register(req, res) {
  const sanitizedBody = mongoSanitize(req.body);

  const { email, password, name } = sanitizedBody;
  const file = req.file;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Email regex validation
  const emailRegex = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Password regex validation (min 8 chars, 1 uppercase, 1 number, 1 symbol)
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Password must be at least 8 characters and include an uppercase letter, number, and symbol"
    });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email in use" });
    const passwordHash = await bcrypt.hash(password, 10);

    const userData = {
      email,
      passwordHash,
      name,
    };

    if (file) {
      const imageUrl = `http://localhost:4000/uploads/${file.filename}`;
      userData.avatar = imageUrl;
    }

    const user = await User.create(userData);

    res.status(201).json({ message: "Registered", userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) {
  const sanitizedBody = mongoSanitize(req.body);

  try {
    const {email, password} = sanitizedBody;

    // Basic email format validation (optional but recommended)
    const emailRegex = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const user = await User.findOne({email});
    if (!user) return res.status(401).json({error: "Invalid credentials"});

    if (user.isActive == false) return res.status(403).json({error: "User forbidden"})

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({error: "Invalid credentials"});

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // change to true for prod
      sameSite: "lax",
    })

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        role: user.role, 
        name: user.name,
        email: user.email,
      },
      accessToken
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function me(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({error: "Missing token"});

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (!mongoose.Types.ObjectId.isValid(payload.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(payload.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    res.status(401).json({error: "Invalid token"});
  }
}