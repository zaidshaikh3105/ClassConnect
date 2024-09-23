import React from "react";

function LandingPage() {
  return (
    <div className="w-full py-8 mt-4 text-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white">No Notes Available</h1>
        <p className="mt-2 text-lg">
          It looks like there are no notes to display.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
