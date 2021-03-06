import Head from "next/head";
import Image from "next/image";
import HomePage from "../src/components/HomePage";
import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div>
      <Head>
        <title>NFT Factory</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <HomePage />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/SweetmanTech/nft-factory"
          target="_blank"
          rel="noopener noreferrer"
        >
          View open source code
        </a>
      </footer>
    </div>
  );
}
