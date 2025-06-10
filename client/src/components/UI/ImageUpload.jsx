import React, { useState } from "react";
import { handleUpload } from "../../utils/appwrite";
import toast from "react-hot-toast";

const ImageUpload = ({image,setImages,index}) => {

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

  return (
    <div id="image-upload">
      {image && <img src={image[index]} alt="" />}
      <label htmlFor="image-uploader">Upload your image</label>

      <input
        type="file"
        name="image"
        id="image-uploader"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
};

export default ImageUpload;
