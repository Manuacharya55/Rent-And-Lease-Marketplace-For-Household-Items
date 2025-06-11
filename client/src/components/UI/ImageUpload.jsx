import React, { useState } from "react";
import { handleUpload } from "../../utils/appwrite";
import toast from "react-hot-toast";

const ImageUpload = ({ image, setImages, index }) => {

  const handleChange = (e) => {
    const file = e.target?.files[0];
    const result = handleUpload(file);

     toast.promise(result, {
      loading: "Image is Uploading",
      success: (response) => {
        setImages(prev=> [...prev,response]);
      },
      error: (err) => err.message,
    });
    
  };

  const uniqueId = `image-uploader-${index}`;

  return (
    <div id="image-upload">
      {image[index] && <img src={image[index]} alt={`uploaded-${index}`} />}
      <label htmlFor={uniqueId}>Upload your image</label>
      <input
        type="file"
        name="image"
        id={uniqueId}
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
};

export default ImageUpload;
