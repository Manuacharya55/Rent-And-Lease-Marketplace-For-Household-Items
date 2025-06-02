import Product from "../models/Product.model";
import RentLease from "../models/Rent-Lease.model";
import User from "../models/User.model";
import { ApiError } from "../utils/ApiError";
import { ApiSuccess } from "../utils/ApiSuccess";
import { asyncHandler } from "../utils/AsyncHandler";

// place-order
export const placeOrder = asyncHandler(async (req, res) => {})
// get leased product
export const getLeasedProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new ApiError(400, "User Not Found");
  }

  const leasedProduct = await Product.find({ owner: _id, isRented: true });

  res.send(new ApiSuccess(200, true, "Leased Products Fetched Successfully", leasedProduct));
})

// update leased product
export const updateLeasedProduct = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {id} = req.params;

    const existingUser = await User.findById(_id);
    const exisitngLease = await RentLease.findById(_id);

    if(!exisitngLease || !existingUser || exisitngLease.owner !== _id ){
        throw new ApiError(400, "Lease Not Found or User Not Found");
    }

    exisitngLease.isReturned = !exisitngLease.isReturned;
    const result = await exisitngLease.save();

    res.send(new ApiSuccess(200, true, "Lease Updated Successfully", result));
})

// get order history
export const getOrderHistory = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new ApiError(400, "User Not Found");
  }

  const product = await Product.find({ borrower: _id });

  res.send(new ApiSuccess(200, true, "Order History Fetched Successfully", product));
})