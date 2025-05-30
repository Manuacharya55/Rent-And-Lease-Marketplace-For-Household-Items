import { Schema, model } from "mongoose";

const RentLeaseSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  borrower: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

const RentLease = model("RentLease",RentLeaseSchema);
export default RentLease;
