import { Schema,model } from "mongoose";

const ProductSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    images:[{
        type:String,
        required:true
    }],
    isRented:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:false
    },
    rentedDates:[{
        type:Date
    }]
})

const Product = model("Product",ProductSchema);
export default Product;