import Address from "../models/Address.model.js";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// Fetch user address
export const fetchAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const existingUser = await User.findById(_id);
  const existingAddress = await Address.findOne({ user: _id });

  if (!existingAddress || !existingUser) {
    throw new ApiError(400, "No Data Found");
  }

  res.json(
    new ApiSuccess(200, true, "Address Fetched Successfully", existingAddress)
  );
});

// Add Address Controller
export const addAddress = asyncHandler(async (req, res) => {
  const { city, state, zipCode, country, coordinates, address, district } =
    req.body;
  const user = req.user._id;

  if (
    !address ||
    !city ||
    !state ||
    !district ||
    !zipCode ||
    !country ||
    !coordinates ||
    coordinates.length !== 2
  ) {
    throw new ApiError(
      400,
      "All fields including coordinates [longitude, latitude] are required"
    );
  }

  const location = {
    type: "Point",
    coordinates: coordinates, // [longitude, latitude]
  };

  const existingUserAddress = await Address.findOne({ user });
  if (existingUserAddress) {
    throw new ApiError(400, "User already has an address");
  }

  const userAddress = await Address.create({
    user,
    address,
    city,
    district,
    state,
    zipCode,
    country,
    location,
  });

  res
    .status(201)
    .json(new ApiSuccess(201, true, "Address added successfully", userAddress));
});

// Update Address Controller
export const updateAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { city, state,district, zipCode, country, coordinates, address } = req.body;

  if (
    !address ||
    !city ||
    !state ||
    !district ||
    !zipCode ||
    !country ||
    !coordinates ||
    coordinates.length !== 2
  ) {
    throw new ApiError(
      400,
      "All fields including coordinates [longitude, latitude] are required"
    );
  }

  const updatedData = {
    city,
    district,
    state,
    zipCode,
    country,
    location: {
      type: "Point",
      coordinates: coordinates, // [longitude, latitude]
    },
  };

  const userAddress = await Address.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!userAddress) {
    throw new ApiError(404, "Address not found");
  }

  res
    .status(200)
    .json(new ApiSuccess(200, true, "Address updated successfully", userAddress));
});
