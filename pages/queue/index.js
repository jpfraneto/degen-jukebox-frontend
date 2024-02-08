import axios from "axios";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const music = [
  {
    title: "Lateralus",
    artist: "Tool",
    year: "2001",
    recommender: "@wake",
    degen: 888,
    pfp: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_168/https%3A%2F%2Fi.imgur.com%2F61BbtpE.png",
    cover:
      "https://i.discogs.com/6TL2Yqaqf1XRy11HUVdtnZ_hVhxtoGo9tzpuaBBk9SM/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTczMjU0/MjYtMTY2MzQzOTQ4/NC02MjE5LmpwZWc.jpeg",
  },

  {
    title: "Ommadawn",
    artist: "Mike Oldfield",
    recommender: "@jpfraneto",
    pfp: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_jpg,w_168/https%3A%2F%2Fi.imgur.com%2Ffeu95Jm.jpg",
    year: "1975",
    degen: 444,
    cover:
      "https://i.discogs.com/7EZGVh9d3iPr6tT-oHbTe3PH4Psyk7RUAUtoc-UB7qY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ1NTc5/OC0xNDk3OTc0MjA1/LTMzMTguanBlZw.jpeg",
  },
  {
    title: "Medicine Work",
    artist: "Byron Metcalf & Rob Thomas",
    recommender: "@accsemble",
    pfp: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_jpg,w_168/https%3A%2F%2Fi.imgur.com%2FU9g76Lc.jpg",
    degen: 333,
    year: "2013",
    cover:
      "https://i.discogs.com/YkPsf69kKFk91jyB7f6QslIJGhhG41Rr3uhgfr0uL08/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ2NzEz/NzYtMTM3MTc0NTgz/OC03NDcyLmpwZWc.jpeg",
  },
];

const QueuePage = () => {
  async function fetchAllMusic() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/music`
      );
      console.log("the response is :", response.data);
    } catch (error) {}
  }
  return (
    <div className="w-96 mx-auto h-full">
      {music.map((x, i) => {
        return <QueueCard piece={x} key={i} index={i} />;
      })}
      <p className="bg-purple-200 text-black p-4 border-white border-2 rounded-xl hover:bg-purple-500 cursor-pointer">
        + add to queue
      </p>
      <Link href="/">back</Link>
    </div>
  );
};

export default QueuePage;

const QueueCard = ({ piece, index }) => {
  console.log("the piece is: ", piece, index);
  return (
    <div className="my-2 w-96 h-36 flex">
      <p className="text-white text-4xl h-full flex justify-center items-center mx-2">
        {index + 1}
      </p>
      <div className="h-full aspect-square relative">
        <Image src={piece.cover} fill />
      </div>
      <div className="mx-2">
        <p>
          {piece.title} · {piece.artist}
        </p>
        <p className="text-purple-400 text-xl">{piece.degen} $degen</p>
      </div>
    </div>
  );
};
