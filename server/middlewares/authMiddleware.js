import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user from DB (to check status)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ BLOCK SUSPENDED USERS
    if (user.status === "suspended") {
      return res.status(403).json({
        message: "Your account has been suspended by admin",
      });
    }

    // ✅ Attach full user object
    req.user = {
      _id: user._id,
      role: user.role,
      status: user.status,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
