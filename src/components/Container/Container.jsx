import React from "react";

const Container = ({ children }) => {
  return (
    <div class="artboard artboard-horizontal phone-6 mx-auto px-1">
      {children}
    </div>
  );
};

export default Container;
