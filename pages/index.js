import Image from "next/image";
import LivePlayer from "../components/LivePlayer";
import Link from "next/link";
import DegenFeed from "../components/DegenFeed";
import QueueCard from "../components/QueueCard";
import { useState } from "react";

export default function Home() {
  return (
    <main
      className={`flex overflow-y-scroll fixed top-0 h-screen px-4 pt-8 w-full flex-col items-center `}
    ></main>
  );
}
