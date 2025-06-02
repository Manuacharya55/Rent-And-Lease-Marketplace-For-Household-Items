import jwt from "jsonwebtoken";
import User from "../models/User.model";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";


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
  const role = "admin";

  if (req.user.role !== role) {
    throw new ApiError(400, `You are not ${role} to access this route`);
  }
  next();
});
