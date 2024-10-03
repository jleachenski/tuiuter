import { verifyToken } from "../services/jwt-service.js";
import User from "../models/user-model.js";

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = verifyToken(token);

    if (user) {
      req.user = await User.findById(user._id).exec();
      console.log(req.user)
      next();
    } else {
      throw new Error();
    }

  } catch (error) {
    res.sendStatus(401);
  }
};
