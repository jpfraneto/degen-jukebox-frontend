import React from "react";
import Image from "next/image";

const TopNavbar = ({ presentRecommendation }) => {
  console.log("the present recommendation is: ", presentRecommendation);
  const bgStyle = {
    backgroundImage: `url(${presentRecommendation.authorPfp})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div className="w-full flex items-center h-32" style={bgStyle}>
      <div className="w-full px-2 py-1  h-full bg-black bg-opacity-30 flex items-center">
        <div className="w-1/5 relative aspect-square rounded-full overflow-hidden border-white border-2">
          {/* Your image here */}
          <Image src="/images/logo.png" fill />
        </div>
        <div className="w-3/5 flex flex-col items-start justify-start bg-red-200 h-full py-3 px-1">
          <p>{presentRecommendation.name}</p>
        </div>
        <div className="w-1/5 flex flex-col h-full ">
          <div className=" w-full aspect-square rounded-full bg-purple-200"></div>
          <div className=" w-full aspect-square rounded-full bg-red-200"></div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
