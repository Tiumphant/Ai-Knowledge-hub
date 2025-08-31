import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return next(new ApiError(401, "Authentication token missing"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

export const requireRole =
  (...allowed) =>
  (req, res, next) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (!allowed.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden"));
    }
    next();
  };

export const isOwnerOrAdmin = (ownerId, user) =>
  user?.role === "admin" || String(ownerId) === String(user?.id);
