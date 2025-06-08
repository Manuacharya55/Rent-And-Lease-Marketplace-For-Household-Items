import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // declaring states for products
  const [product, setProduct] = useState([]);

  // setting my products to state
  const setMyProducts = (products) => {
    setProduct(products);
  };

  // updating my products
  const updateMyProducts = (id, data) => {
    setProduct((prev) =>
      prev.map((curEle) => (curEle._id === id ? data : curEle))
    );
  };

  return (
    <ProductContext.Provider
      value={{ setMyProducts, updateMyProducts, product }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("Cannot Access Data Outside Context");
  }

  return context;
};
