// THIS ROUTE WILL ONLY BE USED ON DEV MODE TO TEST THE ADDINGS OF RECOMMENDATIONS.

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AddRecommendation() {
  const [url, setUrl] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState("");

  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("the url is. ", url);
    setMessage("Submitting recommendation...");
    const youtubeID = youtube_parser(url);
    if (youtubeID.length != 11) return alert("invalid url!");
    try {
      console.log("in here", process.env.NEXT_PUBLIC_API_KEY_JP);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/recommendation`,
        {
          url,
          bidAmount: bidAmount || 0,
          authorFid: 16098,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY_JP,
          },
        }
      );

      setMessage(response.data.message);
      setUrl(""); // Reset URL input
      setBidAmount(""); // Reset Bid Amount input
    } catch (error) {
      setMessage("Failed to submit recommendation.");
      console.error("Error submitting recommendation:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-purple-700 text-xs font-bold mb-2"
              htmlFor="youtube-id"
            >
              youtube url
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-purple-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="youtube-id"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-purple-700 text-xs font-bold mb-2"
              htmlFor="bid-amount"
            >
              bid amount (optional)
            </label>
            <input
              id="bid-amount"
              type="number"
              className="appearance-none block w-full bg-gray-200 text-purple-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Enter your $degen bid amount (eg: 333)"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit Recommendation
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
