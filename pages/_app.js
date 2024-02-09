import "../styles/globals.css";
import Head from "next/head";
import "@farcaster/auth-kit/styles.css";
import { AuthKitProvider, SignInButton, useProfile } from "@farcaster/auth-kit";

const config = {
  // For a production app, replace this with an Optimism Mainnet
  // RPC URL from a provider like Alchemy or Infura.
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  domain: "example.com",
  siweUri: "https://example.com/login",
};

export default function App({ Component, pageProps }) {
  return (
    <AuthKitProvider config={config}>
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
