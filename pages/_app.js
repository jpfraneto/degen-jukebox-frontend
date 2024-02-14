import "../styles/globals.css";
import Head from "next/head";
import localFont from "next/font/local";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import DegenFeed from "../components/DegenFeed";
import ReactPlayer from "react-player/youtube";
import TopNavbar from "../components/TopNavbar";
import { Comic_Neue } from "next/font/google";
import { FiPlay, FiPause } from "react-icons/fi"; // Import play and pause icons
import Image from "next/image";

const comic = Comic_Neue({ subsets: ["latin"], weight: ["300", "400", "700"] });

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState("");
  const [loaded, setLoaded] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [liveRecommendation, setLiveRecommendation] = useState({});
  const playerRef = useRef(null); // Using useRef to hold the player reference

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const fetchCurrentRecommendation = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/present-recommendation`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY_JP,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch the current recommendation");
      }
      const data = response.data;
      setLiveRecommendation(response.data.presentRecommendation);
      setCurrentVideo(`https://www.youtube.com/watch?v=${data.youtubeID}`);
      setElapsedTime(data.elapsedSeconds);
      setLoading(false);
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

  const bgStyle = {
    backgroundImage: `url(${liveRecommendation.authorPfp})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <Head>
        <title>the gen radio 🎩</title>
        <meta property="og:title" content="the gen radio 🎩" />
        <meta property="og:description" content="human after all" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/og.png`}
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          href="https://fonts.googleapis.com/css2?family=Monoton&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={`${comic.className} w-96 mx-auto mainContainer h-screen`}>
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            <div className="w-full flex items-center h-32" style={bgStyle}>
              <div className="w-full px-2 py-1  h-full bg-black bg-opacity-30 flex items-center">
                <div className="w-1/5">
                  <div className="w-full relative aspect-square rounded-full overflow-hidden border-white border-2">
                    <Image src="/images/logo.png" fill />
                  </div>
                  <div className="w-full flex justify-center mt-2">
                    <button
                      onClick={togglePlayPause}
                      className=" playPauseButton"
                    >
                      {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                    </button>
                  </div>
                </div>

                <div className="w-3/5 flex flex-col items-start justify-start h-full py-3 px-1">
                  <p>{liveRecommendation.name}</p>
                  <a
                    className="hover:text-yellow-400"
                    target="_blank"
                    href={`https://warpcast.com/${liveRecommendation.authorUsername}`}
                  >
                    @{liveRecommendation.authorUsername}
                  </a>

                  <div className="player-wrapper">
                    <ReactPlayer
                      ref={playerRef}
                      width={0}
                      height={0}
                      url={currentVideo}
                      playing={isPlaying}
                      controls={true}
                      onStart={handleStart}
                      loaded={loaded}
                      onEnded={handleEnded}
                      className="react-player"
                    />
                  </div>

                  <td className="w-full bg-red-200">
                    <progress className="h-full" max={1} value={loaded} />
                  </td>
                </div>
              </div>
            </div>
            <DegenFeed />
            <p>
              those are the last 100 casts that have been sent to /degen. were
              you one of those? did you add value to the community? or were you
              just extracting it?
            </p>
            <p>anyway, here&apos;s a free mint to celebrate life:</p>
          </>
        )}
      </div>
    </>
  );
}
