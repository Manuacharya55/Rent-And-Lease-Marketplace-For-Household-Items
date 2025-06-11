import React, { useEffect, useState } from "react";
import Container from "../components/Layout/Container";
import ImageUpload from "../components/UI/ImageUpload";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useUser } from "../context/UserContext";
import { getRequest } from "../api/get";
import toast from "react-hot-toast";
import { postRequest } from "../api/post";
import { patchRequest } from "../api/patch";

const ProductPage = () => {
  const URL = "http://localhost:5000/api/v1/admin/categories/";
  const PRODUCT_URL = "http://localhost:5000/api/v1/product/";

  const { token } = useUser();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [category, setCategory] = useState("");

  const [images, setImages] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(true);

  const fetchCategories = async () => {
    if (!token) return;

    const response = await getRequest(URL, token);
    if (response.success) {
      setCategoryList(response.data);
    } else {
      toast.error("Problem Occured");
    }
  };


  const fetchProduct = async()=>{
    if(!token || !isEditing) return

    const response = await getRequest(PRODUCT_URL+"6848e8525dfffae4cbd0e191",token);
    const {category,name,description,price,images} = response.data;
    setProduct({name,description,price})
    setCategory(category)
    setImages(images)
  }

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchProduct();
      setIsLoading(false)
    }
  }, [token]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ ...product, images, category });
    const data = { ...product, images, category };
    let response;

    if (!token) return;

    if (isEditing) {
      response = patchRequest(PRODUCT_URL,"6848e8525dfffae4cbd0e191",data,token)
    } else {
      response = postRequest(PRODUCT_URL, data, token);
    }

    toast.promise(response, {
      loading: "Data is being uploaded",
      success: (response) => {
        console.log(response);
        toast.success(response.message);
      },
      error: (err) => toast.error(err.message)
    });
  };

  return isLoading ? (
    "Loading"
  ) : (
    <Container>
      <h1>Add Product</h1>
      <div id="product-grid">
        {Object.keys(product).map((curEle, index) => (
          <Input
            type={"text"}
            event={handleChange}
            value={product[curEle]}
            placeholder={`please enter product ${curEle}`}
            name={curEle}
            key={index}
          />
        ))}

        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">---please select a category ---</option>
          {categoryList.map((curEle) => (
            <option value={curEle._id}>{curEle.name}</option>
          ))}
        </select>
      </div>
      <div id="image-grid">
        {Array(4)
          .fill(0)
          .map((curEle, index) => (
            <ImageUpload
              setImages={setImages}
              image={images}
              index={index}
              key={index}
            />
          ))}
      </div>

      <div id="btn-holder">
        <Button name={isEditing ? "Update Product" : "Add Product"} event={handleSubmit} />
      </div>
    </Container>
  );
};

export default ProductPage;
