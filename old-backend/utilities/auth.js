import jwt from "jsonwebtoken";
import "dotenv/config";

export default function validateAuth(req, res, next) {
  if (req.cookies._auth) {
    let cookie = undefined;
    try {
      cookie = jwt.verify(req.cookies._auth, process.env.JWT_SIGNING);
    } catch {
      return res.json({
        message: "authentication",
        response: "You do not have valid authentication!",
      });
    }

    if (cookie.username && cookie.id && cookie.displayname) {
      return next();
    } else {
      return res.json({
        message: "authentication",
        response: "You do not have valid authentication!",
      });
    }
  } else {
    return res.json({
      message: "authentication",
      response: "You do not have valid authentication!",
    });
  }
}
