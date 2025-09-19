// src/middleware/auth.js
import jwt from 'jsonwebtoken';
import  Blacklist from '../models/blacklist.js';

export async function authRequired(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized User! No token provided." });
   

    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: "Token is invalid or expired." });

    const decoded = jwt.verify(token, "key");
     console.log("token ", token);
    console.log("Decoded Token:", decoded.sub);
    if (decoded.sub) {
     req.user = { ...decoded, _id: decoded.sub };
    } else if (decoded.id) {
      req.user = { ...decoded, _id: decoded.id };
    } else {
      return res.status(401).json({ message: "Invalid token payload: missing user ID." });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized User! Invalid token." });
  }
}
