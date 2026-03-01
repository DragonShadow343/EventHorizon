import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils";

export async function register(req, res) {
    const {email, password} = req.body;

    try {
        const exists = await User.findOne({email});
        if (exists) return res.status(400).json({error: "Email in use"});

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({email, passwordHash});

        res.status(201).json({message:"Registered", userId: user._id});
    } catch (err) {
        res.status(500).json({error: "Server error"});
    }
}

export async function login(req, res) {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).json({error: "Invalid credentials"});

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({error: "Invalid credentials"});

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // change to true for prod
        sameSite: "lax",
    })

    res.json({accessToken})
}

export async function me(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({error: "Missing token"});

    try {
        const payload = jwt.verify(token, process.JWT_ACCESS_TOKEN);
        const user = await User.findById(payload.id).select("-passwordHash");
        res.json(user);
    } catch (err) {
        res.status(401).json({error: "Invalid token"});
    }
}