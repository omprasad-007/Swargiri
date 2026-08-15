import { getFirebaseAuth } from "../config/firebase.js";

export async function requireAuth(req, res, next) {
  const authRequired = process.env.AUTH_REQUIRED !== "false";
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    if (!authRequired) {
      req.user = null;
      return next();
    }
    return res.status(401).json({ message: "Missing authorization token" });
  }

  const auth = getFirebaseAuth();
  if (!auth) {
    if (!authRequired) {
      req.user = null;
      return next();
    }
    return res.status(503).json({ message: "Firebase admin not configured" });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireRole(roles = []) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) {
      return res.status(403).json({ message: "User role missing" });
    }
    if (!roles.includes(role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    return next();
  };
}
