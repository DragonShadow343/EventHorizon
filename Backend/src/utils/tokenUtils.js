export function generateAccessToken(user) {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
    );
    return accessToken;
}

export function generateRefreshToken(user) {
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
    return refreshToken;
}