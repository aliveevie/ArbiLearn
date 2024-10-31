// Web3Section.tsx
"use client";

import { FC, useEffect } from "react";
import styles from '../styles/home.module.css';
import { Section } from "./section1";
import { Section2 } from "./section2";
import { Section3 } from "./section3";
import Connecting from "./connection";
import { useAccount } from "wagmi";
import { Connection } from "wagmi";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/hero";
import MetisPopup from "@/components/metis-popup";
import MintNFTComponent from "@/components/mint-nft-component";

const Web3Section: FC = () => {

  const { isConnected, isDisconnected } = useAccount();

  const router = useRouter();

    if (isConnected) {
      router.push('/dashboard');
    }
  
  return (
      <>
        <Hero />
        <MetisPopup />
      </>
  );
};



const HomePage: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Web3Section />
    </div>
  );
};

export default HomePage;
