import Address from "../models/Address.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// Add Address Controller
export const addAddress = asyncHandler(async (req, res) => {
  const { city, state, zipCode, country, coordinates } = req.body;
  const user = req.user._id;

  if (
    !city ||
    !state ||
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

  const address = await Address.create({
    user,
    city,
    state,
    zipCode,
    country,
    location,
  });

  res
    .status(201)
    .json(new ApiSuccess(201, true, "Address added successfully", address));
});

// Update Address Controller
export const updateAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { city, state, zipCode, country, coordinates } = req.body;

  if (
    !city ||
    !state ||
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
    state,
    zipCode,
    country,
    location: {
      type: "Point",
      coordinates: coordinates, // [longitude, latitude]
    },
  };

  const address = await Address.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  res
    .status(200)
    .json(new ApiSuccess(200, true, "Address updated successfully", address));
});
