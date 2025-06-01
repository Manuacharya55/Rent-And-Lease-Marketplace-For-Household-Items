import Product from "../models/Product.model";
import User from "../models/User.model";

// get all products
export const getAllProducts = async (req, res) => {
  const page = 1 || Number(req.query.page);
  const category = "" || req.query.category;
  const price = "" || Number(req.query.price);

  const query = {
    category,
    price,
  };

  const products = await Product.find(query)
    .limit(10)
    .skip(page - 1 * 10);

  res.send({
    success: true,
    message: "All Products Fetched Successfully",
    data: products,
  });
};

// get user specific products
export const getUserSpecificProducts = async (req, res) => {
  const { _id } = req.user;

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new Error();
  }

  const products = await Product.find({ user: _id });

  res.send({
    success: true,
    message: "Product Fetched Successfully",
    data: products,
  });
};

// add products
// check whether the category exists once after completing admin side
export const addProduct = async (req, res) => {
  const { name, category, price, images, description } = req.body;
  const { _id } = req.user;

  if (!name || !category || !price || !description) {
    throw new Error();
  }

  if (images.length !== 4) {
    throw new Error();
  }

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new Error();
  }

  const product = await Product.create({
    user: _id,
    name,
    description,
    category,
    price,
    images,
  });

  res.send({
    success: true,
    message: "€product added successfully",
    data: product,
  });
};

// get single product
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  const existingProduct = await Product.findById(id);

  if (!existingProduct) {
    throw new Error();
  }

  res.send({
    success: true,
    message: "Product Fteched Successfully",
    data: existingProduct,
  });
};

// edit product
export const editProduct = async (req, res) => {
  const { name, category, price, images, description } = req.body;
  const { _id } = req.user;
  const { id } = req.params;

  if (!name || !category || !price || !description) {
    throw new Error();
  }

  if (images.length !== 4) {
    throw new Error();
  }

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new Error();
  }

  const existingProduct = await Product.findById(id);

  if (!existingProduct || existingProduct.user !== _id) {
    throw new Error();
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

  res.send({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

// delete product
export const deleteProduct = async(req,res) =>{
  const {id} = req.params;
  const {_id} = req.user;

  const existingUser = await User.findById(_id);
  const existingProduct = await Product.findById(id);

  if(!existingUser || !existingProduct || existingProduct.user !== id ){
    throw new Error();
  }

  existingProduct.isActive = !existingProduct.isActive;
  const result = await existingProduct.save();

  res.send({
    success : true,
    message : "Product Deleted Successfully",
    data : result
  })
}