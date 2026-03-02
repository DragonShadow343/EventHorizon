import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Missing token" });

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        if (!payload) return res.status(401).json({error: "Invalid token"});
        
        req.user = payload;
        next();
    } catch (err) {
        res.status(401).json({error: "Invalid or expired token"});
    }
}