import React from "react";
import { FaRegCommentAlt, FaRegHeart, FaPencilAlt } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";
import Image from "next/image";

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

const IndividualCast = ({ cast }) => {
  console.log("this cast is: ", cast);
  return (
    <div className="active:none w-full my-1 md:mx-auto flex flex-col relative">
      <div className="w-full mx-auto h-fit flex flex-col pt-2 flex-grow bg-purple-500 text-black px-2 ">
        <p className="text-xs italic flex-none h-4 flex items-center">
          {new Date(cast.timestamp).toLocaleDateString("en-US", options)} {"  "}{" "}
          <a
            target="_blank"
            href={`https://warpcast.com/${cast.author.username}`}
            className="ml-auto hover:text-yellow-500 pr-4"
          >
            @{cast.author.username}
          </a>
          <a
            target="_blank"
            href={`https://warpcast.com/${cast.author.username}`}
            className="w-12 h-12 relative hover:border-yellow-500 rounded-full overflow-hidden border-2 border-white "
          >
            <Image src={cast.author.pfp_url} fill />
          </a>
        </p>
        <div className="border-black grow border-2 rounded px-2 py-1 overflow-y-scroll bg-purple-300 my-2">
          {cast.text ? (
            cast.text.includes("\n") ? (
              cast.text.split("\n").map((x, i) => (
                <p className="mb-4" key={i}>
                  {x}
                </p>
              ))
            ) : (
              <p className="my-2">{cast.text}</p>
            )
          ) : null}
        </div>

        <div className="ml-2 flex pb-2 space-x-4 relative justify-between items-center">
          <div className="flex space-x-4 h-full">
            <div
              className={`flex space-x-1 items-center ${
                true && "text-gray-200"
              }  cursor-pointer`}
            >
              <FaRegCommentAlt />
              <span>{cast.replies.count}</span>
            </div>
            <div
              className={`flex space-x-1 items-center ${
                true && "text-green-200"
              }  cursor-pointer`}
            >
              <BsArrowRepeat size={19} />
              <span>{cast.reactions.recasts.length}</span>
            </div>
            <div
              className={`flex space-x-1 items-center ${
                true && "text-red-200"
              }  cursor-pointer`}
            >
              <FaRegHeart />
              <span>{cast.reactions.likes.length}</span>
            </div>
          </div>

          <a
            target="_blank"
            href={`https://warpcast.com/${
              cast.author.username
            }/${cast.hash.substring(0, 10)}`}
            className="ml-auto hover:text-red-200"
          >
            open in warpcast
          </a>
        </div>
      </div>
    </div>
  );
};

export default IndividualCast;
