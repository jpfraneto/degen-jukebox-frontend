import React from "react";
import Image from "next/image";

const QueueCard = ({ recommendation }) => {
  const handleTipButtonClick = () => {
    const tipAmount = recommendation.bidAmount + 1;
    const message = encodeURIComponent(`@degentip !jukebox ${tipAmount}`);
    const warpcastUrl = `https://warpcast.com/~/compose?text=${message}`;
    window.open(warpcastUrl, "_blank");
  };

  return (
    <div
      onClick={() => {
        if (recommendation.bidAmount) {
          handleTipButtonClick();
        }
      }}
      className={` ${
        recommendation.bidAmount
          ? "my-2 w-full h-16 cursor-pointer hover:bg-opacity-40 rounded-xl bg-black bg-opacity-20 p-2 flex justify-between border border-red-400 "
          : "mb-3"
      } `}
    >
      <div className="ml-2 h-12 w-12 bg-black rounded-full overflow-hidden relative">
        <Image src={recommendation.authorPfp} fill />
      </div>
      {recommendation.bidAmount && (
        <div className="text-right  mx-2 flex h-full items-center">
          <p className="text-purple-200 text-3xl">
            {recommendation.bidAmount} $degen
          </p>
        </div>
      )}
    </div>
  );
};

export default QueueCard;
