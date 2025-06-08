import React from "react";

const Container = ({ children }) => {
  return (
    <div id="container">
      <div id="layer-container">{children}</div>
    </div>
  );
};

export default Container;
