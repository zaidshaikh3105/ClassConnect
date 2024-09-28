import React from "react";

function Container({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-base-100 rounded-lg shadow-lg border border-gray-300">
      {children}
    </div>
  );
}

export default Container;
