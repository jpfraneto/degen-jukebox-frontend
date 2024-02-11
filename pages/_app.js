import "../styles/globals.css";
import Head from "next/head";
import localFont from "next/font/local";

const proto = localFont({
  src: [
    {
      path: "../public/fonts/proto/ProtoMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/proto/ProtoMono-SemiBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }) {
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

      <div className="w-96 mx-auto mainContainer h-screen">
        <Component {...pageProps} />
      </div>
    </>
  );
}
