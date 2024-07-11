"use client";

// import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
import HomePage from "~~/mycomponents/home";


const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <HomePage />
    </>
  );
};

export default Home;
