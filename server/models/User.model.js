import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  wishlist: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    ref: "Product",
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET
  );
};

UserSchema.methods.comparePassword = async function(password){
   const isMatch = await bcrypt.compare(password,this.password)
   return isMatch
}

const User = model("User", UserSchema);
export default User;
