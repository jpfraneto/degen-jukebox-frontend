import axios from "axios";
import React, { useState, useEffect } from "react";
import IndividualCast from "./IndividualCast";

const DegenFeed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchDegenFeed() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/farcaster/degen-channel-feed`
        );
        setFeed(response.data.feed);
        console.log("the feed is: ", response.data.feed);
        setLoading(false);
      } catch (error) {
        console.log("there was an error fetching the feed");
      }
    }
    fetchDegenFeed();
  }, []);
  if (loading) return <p>loading...</p>;
  return (
    <div className="w-full flex flex-col">
      {feed &&
        feed.map((cast, index) => {
          return <IndividualCast cast={cast} key={index} />;
        })}
    </div>
  );
};

export default DegenFeed;
