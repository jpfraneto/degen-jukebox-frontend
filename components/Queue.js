import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QueueCard from "./QueueCard";

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAllMusic() {
    try {
      console.log("fetching the music: ", process.env.API_KEY_JP);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/future`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY_JP,
          },
        }
      );
      setQueue(response.data.queue);
      setLoading(false);
    } catch (error) {
      console.log("there was an error fetching the queue");
    }
  }
  useEffect(() => {
    fetchAllMusic();
  }, []);

  return (
    <div className="mx-auto h-full w-full ">
      <div className="flex flex-col mb-4 w-full">
        {queue &&
          queue.length > 0 &&
          queue.map((x, i) => {
            return <QueueCard recommendation={x} key={i} index={i} />;
          })}
      </div>
    </div>
  );
};

export default Queue;
