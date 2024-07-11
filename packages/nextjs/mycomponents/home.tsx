import React from 'react';

export const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Welcome to ArbiLearn</h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-4">Learn Arbitrum, Earn Arbitrum, complete onchain actions,</p>
        <p className="text-lg sm:text-xl md:text-2xl mb-4">get jobs, get bounties, get general knowledge about Web3 and Ethereum</p>
      </div>
    </div>
  );
};

export default Welcome;