import jwt from "jsonwebtoken";

export function refreshMiddleware(req, res, next) {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ error: "Missing token" });

        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        if (!payload) return res.status(401).json({error: "Invalid token"});
        
        req.user = payload;
        next();
    } catch (err) {
        res.status(401).json({error: "Invalid or expired token"});
    }
}