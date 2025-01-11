import jwt from "jsonwebtoken";

// Middleware to authenticate JWT tokens
export const jwtAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Function to generate JWT token
export const genrateJwtToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "2d" });
};
