export function requiredRole(role) {
    return function(res, req, next) {
        if (req.user.role !== role) {
            return res.status(403).json({error: "Forbidden"});
        }
        next();
    }
}
