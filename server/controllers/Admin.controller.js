import Category from "../models/Category.model.js";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find()
    .select("-password -__v -createdAt -updatedAt -wishlist -products")
    .populate("address");
  res.send(new ApiSuccess(200, true, "All users fetched successfully", users));
};

// get all categories
export const getAllCategories = asyncHandler(async (req, res) => {
  const {isAdmin} = req.user;
  let query = {};
  if(!isAdmin){
    query = {isActive: true};
  }
  const categories = await Category.find(query);
  res.send(
    new ApiSuccess(200, true, "All categories fetched successfully", categories)
  );
});

// add categories
export const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Category name is required");
  }

  const existingCategory = await Category.findOne({name});

  if (existingCategory) {
    throw new ApiError(400, "Category already exists");
  }

  const category = await Category.create({name});

  res.send(
    new ApiSuccess(201, true, "Category Created Successfully", category)
  );
});

// edit categories
export const editCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    throw new ApiError(400, "Category name is required");
  }

  const existingCategory = await Category.findById(id);

  if (!existingCategory) {
    throw new ApiError(400, "Category does not exist");
  }

  existingCategory.name = name;
  const category = await existingCategory.save();

  res.send(
    new ApiSuccess(200, true, "Category Updated Successfully", category)
  );
});

// delete categories
export const deletecategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingCategory = await Category.findById(id);

  if (!existingCategory) {
    throw new ApiError(400, "Category does not exist");
  }

  existingCategory.isActive = !existingCategory.isActive;
  const category = await existingCategory.save();

  res.send(
    new ApiSuccess(200, true, "Category Deleted Successfully", category)
  );
});
