import React from "react";

function Container({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 bg-base-100 rounded-lg shadow-md border border-white">
      {children}
    </div>
  );
}

export default Container;
