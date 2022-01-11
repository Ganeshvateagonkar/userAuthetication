import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const currentUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "net ninja", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null; //it is available i views
        next();
      } else {
        const user = await User.findById(decodedToken.id);

        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export default currentUser;
