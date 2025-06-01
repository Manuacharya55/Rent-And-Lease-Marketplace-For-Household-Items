import Product from "../models/Product.model";
import RentLease from "../models/Rent-Lease.model";
import User from "../models/User.model";

// place-order
export const placeOrder = async (req, res) => {};

// get leased product
export const getLeasedProduct = async (req, res) => {
  const { _id } = req.user;

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new Error();
  }

  const leasedProduct = await Product.find({ owner: _id, isRented: true });

  res.send({
    success: true,
    message: "Product Fetched Successfully",
    data: leasedProduct,
  });
};

// update leased product
export const updateLeasedProduct = async(req,res)=>{
    const {_id} = req.user;
    const {id} = req.params;

    const existingUser = await User.findById(_id);
    const exisitngLease = await RentLease.findById(_id);

    if(!exisitngLease || !existingUser || exisitngLease.owner !== _id ){
        throw new Error();
    }

    exisitngLease.isReturned = !exisitngLease.isReturned;
    const result = await exisitngLease.save();

    res.send({
        success : true,
        message : "Updated Successfully",
        data : result
    })
}

// get order history
export const getOrderHistory = async (req, res) => {
  const { _id } = req.user;

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new Error();
  }

  const product = await Product.find({ borrower: _id });

  res.send({
    success: true,
    message: "Order History Fetched Successfully",
    data: product,
  });
};