import React, { useState } from "react";
import ReactPlayer from "react-player";

const CheckIfVideoWorksPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [works, setWorks] = useState(false);
  const [reactPlayerTest, setReactPlayerTest] = useState(false);
  return (
    <div className="flex flex-col">
      <div>
        <p className="px-3 pt-6">
          this tool will help you check if your video will be played on the gen
          radio
        </p>
        <div className="w-full pt-2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="youtube-id"
          >
            youtube url
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-purple-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="youtube-id"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>

        <button
          onClick={() => {
            if (!videoUrl) return;
            function youtube_parser(url) {
              var regExp =
                /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
              var match = url.match(regExp);
              return match && match[7].length == 11 ? match[7] : false;
            }
            const youtubeID = youtube_parser(videoUrl);
            if (youtubeID.length != 11) return alert("invalid url!");
            checkVideoUrl(videoUrl);
            async function checkVideoUrl(url) {
              setReactPlayerTest(true);
              try {
              } catch (error) {
                console.log("there was an error on the checkVideoUrl function");
                console.log(error);
              }
            }
          }}
          className="ml-3 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          test url
        </button>
      </div>
      {reactPlayerTest && (
        <div className="player-wrapper mx-4 mt-8 aspect-video">
          <ReactPlayer
            url={videoUrl}
            playing={true}
            controls={true}
            className="react-player"
            width="100%"
          />
        </div>
      )}
    </div>
  );
};

export default CheckIfVideoWorksPage;
