import "../styles/globals.css";
import Head from "next/head";
import localFont from "next/font/local";
import "@farcaster/auth-kit/styles.css";

import { AuthKitProvider, SignInButton, useProfile } from "@farcaster/auth-kit";

const config = {
  // For a production app, replace this with an Optimism Mainnet
  // RPC URL from a provider like Alchemy or Infura.
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  domain: "degen-jukebox.xyz",
  siweUri: "https://example.com/login",
};

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
    <AuthKitProvider config={config} className={`${proto.className}`}>
      <Head>
        <title>degen jukebox</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Monoton&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎩</text></svg>"
        />
      </Head>
      <div
        className="text-white"
        style={{
          position: "fixed",
          top: "12px",
          right: "12px",
          color: "white",
        }}
      >
        <SignInButton />
      </div>
      <Component {...pageProps} />
    </AuthKitProvider>
  );
}
