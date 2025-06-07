import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const category = req.query.category;
  const price = Number(req.query.price);

  const query = { isActive: true };
  if (category) query.category = category;
  if (price) query.price = price;

  const products = await Product.find(query)
    .limit(10)
    .skip((page - 1) * 10);

  res.send(
    new ApiSuccess(200, true, "Products Fetched Successfully", products)
  );
});

// get user specific products
export const getUserSpecificProducts = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new ApiError(400, "User Not Found");
  }

  const products = await Product.find({ user: _id });

  res.send(
    new ApiSuccess(200, true, "Single Product Fetched Successfully", products)
  );
});

// add products
export const addProduct = asyncHandler(async (req, res) => {
  const { name, category, price, images, description } = req.body;
  const { _id } = req.user;

  if (!name || !category || !price || !description) {
    throw new ApiError(400, "All Fields are required");
  }

  if (images.length !== 4) {
    throw new ApiError(400, "Please provide 4 images");
  }

  const existingUser = await User.findById(_id);
  const existingCategory = await Category.findById(category);

  if (!existingUser) {
    throw new ApiError(400, "User Not Found");
  }
  if (!existingCategory || !existingCategory.isActive) {
    throw new ApiError(400, "Category Not Found");
  }

  const product = await Product.create({
    user: _id,
    name,
    description,
    category,
    price,
    images,
  });

  res.send(new ApiSuccess(201, true, "Product Added Successfully", product));
});

// get single product
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingProduct = await Product.findById(id);

  if (!existingProduct) {
    throw new ApiError(400, "Product Not Found");
  }

  res.send(
    new ApiSuccess(
      200,
      true,
      "Single Product Fetched Successfully",
      existingProduct
    )
  );
});

// edit product
export const editProduct = asyncHandler(async (req, res) => {
  const { name, category, price, images, description } = req.body;
  const { _id } = req.user;
  const { id } = req.params;

  if (!name || !category || !price || !description) {
    throw new ApiError(400, "All Fields are required");
  }

  if (images.length !== 4) {
    throw new ApiError(400, "Please provide 4 images");
  }

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new ApiError(400, "User Not Found");
  }

  const existingProduct = await Product.findById(id);

  if (
    !existingProduct ||
    toString(existingProduct.user) !== toString(_id) ||
    !existingProduct.isActive
  ) {
    throw new ApiError(400, "Product Not Found or Unauthorized Access");
  }

  const product = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        user: _id,
        name,
        description,
        category,
        price,
        images,
      },
    },
    { new: true }
  );

  res.send(new ApiSuccess(200, true, "Product Updated Successfully", product));
});

// delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const existingUser = await User.findById(_id);
  const existingProduct = await Product.findById(id);

  if (
    !existingUser ||
    !existingProduct ||
    toString(existingProduct.user) !== toString(_id)
  ) {
    throw new ApiError(400, "Product Not Found or Unauthorized Access");
  }

  existingProduct.isActive = !existingProduct.isActive;
  const result = await existingProduct.save();

  res.send(new ApiSuccess(200, true, "Product Deleted Successfully", result));
});
