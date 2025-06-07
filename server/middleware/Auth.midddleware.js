import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";


export const verifyUser = asyncHandler(async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    throw new ApiError(400, "No Token Found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded._id);

  if (!user) {
    throw new ApiError(400, "No User Exists");
  }

  req.user = user;
  next();
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {

  if (req.user.isAdmin !== true) {
    throw new ApiError(400, `You are not ${role} to access this route`);
  }
  next();
});
