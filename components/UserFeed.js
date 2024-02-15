import axios from "axios";
import React, { useState, useEffect } from "react";
import IndividualCast from "./IndividualCast";
import { useRouter } from "next/router";

const DegenFeed = () => {
  const router = useRouter();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchDegenFeed() {
      try {
        console.log("router.params", router);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/farcaster/feed-by-fid/${
            router?.query?.fid || 0
          }`
        );
        setFeed(response.data.feed);
        console.log("the feed is: ", response.data.feed);
        setLoading(false);
      } catch (error) {
        console.log("there was an error fetching the feed", error);
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
