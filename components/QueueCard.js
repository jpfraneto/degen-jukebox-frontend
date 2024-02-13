import React, { useState, useEffect } from "react";
import Image from "next/image";

const QueueCard = ({ recommendation, index, style }) => {
  const handleTipButtonClick = () => {
    const tipAmount = recommendation?.bidAmount + 1 || 1;
    const message = encodeURIComponent(`@degentip !jukebox ${tipAmount}`);
    const warpcastUrl = `https://warpcast.com/~/compose?text=${message}`;
    window.open(warpcastUrl, "_blank");
  };

  return (
    <div
      className="absolute"
      style={{
        ...style,
        animation: `float 5s ease-in-out infinite ${index * 0.5}s`,
      }}
    >
      <div
        onClick={handleTipButtonClick}
        className="h-12 w-12 bg-black rounded-full overflow-hidden relative"
      >
        {recommendation.authorPfp && (
          <Image
            src={recommendation.authorPfp}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
    </div>
  );
};

export default QueueCard;
