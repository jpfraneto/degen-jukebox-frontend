import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProfile } from "@farcaster/auth-kit";

const QueuePage = () => {
  const profile = useProfile();
  const {
    isAuthenticated,
    profile: { fid, displayName, custody },
  } = profile;
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchAllMusic() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/queue`
      );
      console.log("the response is :", response.data);
      setQueue(response.data.queue);
      setLoading(false);
    } catch (error) {
      console.log("there was an error fetching the queue");
    }
  }
  useEffect(() => {
    fetchAllMusic();
  }, []);
  if (loading) return <p>loading...</p>;
  return (
    <div className=" mx-auto h-full">
      <div className="flex flex-col mb-4">
        {queue.map((x, i) => {
          console.log("IN HERE", x);
          return <QueueCard piece={x} key={i} index={i} />;
        })}
      </div>

      <div className="w-48 bg-purple-200 text-black p-4 border-white border-2 rounded-xl hover:bg-purple-500 cursor-pointer">
        {isAuthenticated ? (
          <Link href="/queue/add" className="">
            + add to queue
          </Link>
        ) : (
          <p>login to add music</p>
        )}
      </div>

      <Link href="/">back</Link>
    </div>
  );
};

export default QueuePage;

const QueueCard = ({ piece, index }) => {
  console.log("the piece is: ", piece, index);
  return (
    <div className="my-2 w-full h-36 flex">
      <p className="text-white text-4xl h-full flex justify-center items-center mx-2">
        {index + 1}
      </p>
      <div className="h-full aspect-video relative">
        <Image src={piece.placeholderImageUrl} fill />
      </div>
      <div className="mx-2">
        <p>{piece.name}</p>
        <p className="text-purple-400 text-xl">{piece.bidAmount} $degen</p>
        <p>queued by {piece.author.fid}</p>
        <a href={piece.url} target="_blank" className="hover:text-purple-500">
          {piece.url}
        </a>
      </div>
    </div>
  );
};
