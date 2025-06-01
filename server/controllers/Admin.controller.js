import Category from "../models/Category.model";
import User from "../models/User.model";

// get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send({
    success: true,
    message: "All users fetched successfully",
    data: users,
  });
};


// get all categories
export const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.send({
    success: true,
    message: "All categories fetched successfully",
    data: categories,
  });
};


// add categories
export const addCategory = async(req,res)=>{
    const {name} = req.body;

    if(!name){
        throw new Error();
    }

    const existingCategory = await Category.find(name);

    if(existingCategory){
        throw new Error()
    }

    const category = await Category.create(name);

    res.send({
        success : true,
        message : "Category Created Successfully",
        data : category
    })
}


// edit categories
export const editCategory = async(req,res)=>{
    const {name} = req.body;
    const {id} = req.params;

    if(!name){
        throw new Error();
    }

    const existingCategory = await Category.findById(id);

    if(!existingCategory){
        throw new Error()
    }

    existingCategory.name = name;
    const category = await existingCategory.save()

    res.send({
        success : true,
        message : "Category Created Successfully",
        data : category
    })
}


// delete categories
export const deletecategory = async(req,res)=>{
    const {id} = req.params;

    const existingCategory = await Category.findById(id);

    if(!existingCategory){
        throw new Error()
    }

    existingCategory.isActive = !existingCategory.isActive;
    const category = await existingCategory.save()

    res.send({
        success : true,
        message : "Category Deleted Successfully",
        data : category
    })
}