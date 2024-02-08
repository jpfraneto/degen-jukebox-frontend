import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const Jukebox = () => {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getAllJukebox() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/api/music`
        );
        console.log("the response is :", response.data);
        setMusic(response.data.jukeboxMusic);
        setLoading(false);
      } catch (error) {
        console.log("there was an error fetching the music");
        setError("there was an error fetching the music");
      }
    }
    getAllJukebox();
  }, []);
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="">
      {music &&
        music.map((x, i) => {
          return (
            <div key={i} className="flex h-48">
              <div className="h-full relative aspect-square">
                <Image src={x.cover} fill />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Jukebox;
