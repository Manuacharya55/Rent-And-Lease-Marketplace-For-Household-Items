import { Schema,model } from "mongoose";

const CategoryModel = new Schema({
    name:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

const Category = model("Category",CategoryModel);
export default Category