import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QueueCard from "./QueueCard";

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const randomPosition = () => ({
    left: `${Math.random() * 90}%`, // Use 90% to avoid overflow
    top: `${Math.random() * 90}%`,
  });

  async function fetchAllMusic() {
    try {
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
    <div className="w-full h-full mx-auto  ">
      <div className="relative h-full w-full">
        {queue &&
          queue.length > 0 &&
          queue.map((x, i) => {
            return (
              <QueueCard
                style={randomPosition()}
                recommendation={x}
                key={i}
                index={i}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Queue;
