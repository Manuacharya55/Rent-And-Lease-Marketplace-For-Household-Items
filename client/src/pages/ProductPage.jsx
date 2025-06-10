import React, { useState } from "react";
import Container from "../components/Layout/Container";
import ImageUpload from "../components/UI/ImageUpload";
import Input from "../components/UI/Input";

const ProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Container>
      <div id="product-grid">
        {Object.keys(product).map((curEle) => (
          <Input
            type={"text"}
            event={handleChange}
            value={product[curEle]}
            placeholder={`please enter product ${curEle}`}
            name={curEle}
          />
        ))}
      </div>
      <div id="image-grid">
        {Array(4)
        .fill(0)
        .map((curEle,index) => (
          <ImageUpload setImages={setImages} image={images} index={index}/>
        ))}
      </div>
    </Container>
  );
};

export default ProductPage;
