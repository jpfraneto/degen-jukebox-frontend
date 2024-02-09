import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Link from "next/link";

const Live = () => {
  const [currentVideo, setCurrentVideo] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const playerRef = useRef(null); // Using useRef to hold the player reference

  const fetchCurrentRecommendation = async () => {
    try {
      console.log("fetching the curent recomendation");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/present-recommendation`
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch the current recommendation");
      }
      console.log("the response is: ", response.data);
      const data = response.data;
      setCurrentVideo(`https://www.youtube.com/watch?v=${data.youtubeID}`);
      setElapsedTime(data.elapsedSeconds);
    } catch (error) {
      console.error("Error fetching current recommendation:", error);
    }
  };

  useEffect(() => {
    fetchCurrentRecommendation();
  }, []);

  const handleEnded = () => {
    console.log("onEnded");
    fetchCurrentRecommendation();
  };

  // Ensure the player seeks to the correct elapsed time when it starts
  const handleStart = () => {
    console.log("the handlestart is: ", playerRef);
    if (playerRef.current) {
      console.log("the elapsed time is: ", elapsedTime);
      playerRef.current.seekTo(elapsedTime);
    }
  };

  if (!currentVideo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <p>degen radio</p>
      <div className="flex space-x-2">
        <Link href="/">home</Link>
        <Link href="/queue/add">add new</Link>
      </div>
      <ReactPlayer
        ref={playerRef}
        url={currentVideo}
        playing={true}
        controls={true}
        onStart={handleStart}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default Live;
