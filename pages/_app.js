import "../styles/globals.css";
import Head from "next/head";
import localFont from "next/font/local";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import UserFeed from "../components/UserFeed";
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
          name="description"
          content="Transform writing into a meditation practice like no other."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/og.png`}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="application-name" content="the gen radio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="the gen radio" />
        <meta name="description" content="human after all" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#21152C" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/images/touch/og.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/touch/og.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/touch/og.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/images/touch/og.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/touch/og.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="images/touch/og.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://thegenradio.com" />
        <meta name="twitter:title" content="the degen radio" />
        <meta name="twitter:description" content="Tell us who you are" />
        <meta
          name="twitter:image"
          content="https://thegenradio.com/images/touch/og.png"
        />
        <meta name="twitter:creator" content="@kithkui" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="the gen radio" />
        <meta property="og:description" content="human after all" />
        <meta property="og:site_name" content="the gen radio" />
        <meta property="og:url" content="https://www.thegenradio.com" />
        <meta
          property="og:image"
          content="https://thegenradio.com/images/touch/og.png"
        />
        <script src="/main.js" defer></script>
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
            <UserFeed />
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
