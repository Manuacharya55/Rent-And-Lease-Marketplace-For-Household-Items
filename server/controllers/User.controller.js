import User from "../models/User.model.js";
import Product from "../models/Product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, phoneNumber, email, password } = req.body;

  if (!fullName || !phoneNumber || !email || !password) {
    throw new ApiError(400, "All Fields are required");
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new ApiError(400, "User Already Exists");
  }

  const user = await User.create({
    fullName,
    phoneNumber,
    email,
    password,
  });

  res.json(new ApiSuccess(200,true,"User Registered Successfully",user));
})

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All Fields are required");
  }

  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const isMatch = await existingUser.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const token = existingUser.generateToken();

  res.json(new ApiSuccess(201,true,"Logged In Successfully",{user : existingUser,token}));
});

// Get profile
export const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingUser = await User.findById(id).populate([
    {
      path: "products",
      match: { isActive: true },
      select: "-isRented -isActive -rentedDates",
    },
    {
      path: "address",
    },
  ]);

  if (!existingUser) {
    throw new ApiError(400, "No Such User");
  }

  res.json(new ApiSuccess(200,true,"Profile Fetched Successfully",existingUser))
});
