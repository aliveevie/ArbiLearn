import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import highlight.js styles
import 'highlight.js/styles/solarized-light.css';

const Chapter5 = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">How to Build a dApp on Arbitrum</h2>
      <p className="mb-4">
        Building a decentralized application (dApp) on Arbitrum involves setting up your development environment, writing and deploying smart contracts, and creating a frontend to interact with the contracts. Here's a step-by-step guide on how to build a dApp on Arbitrum.
      </p>
      
      <h3 className="text-xl font-bold mb-2">1. Set Up Your Development Environment</h3>
      <p className="mb-4">
        Before you start, make sure you have the necessary tools installed: Node.js, npm, Hardhat, and MetaMask. Create a new project directory and initialize it with npm:
      </p>
      <SyntaxHighlighter language="bash" style={solarizedlight}>
        {`
npx mkdirp my-arbitrum-dapp
cd my-arbitrum-dapp
npm init -y
npm install --save-dev hardhat
npx hardhat
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">2. Write Your Smart Contracts</h3>
      <p className="mb-4">
        Create a new Solidity smart contract in the `contracts` directory. Here's an example contract:
      </p>
      <SyntaxHighlighter language="solidity" style={solarizedlight}>
        {`
pragma solidity ^0.8.4;

contract MyDappContract {
  string public message;

  constructor(string memory initialMessage) {
    message = initialMessage;
  }

  function setMessage(string memory newMessage) public {
    message = newMessage;
  }
}
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">3. Configure Hardhat for Arbitrum</h3>
      <p className="mb-4">
        Create a Hardhat configuration file (`hardhat.config.js`) and add the Arbitrum network details:
      </p>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.4",
  networks: {
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">4. Deploy Your Smart Contracts</h3>
      <p className="mb-4">
        Create a deployment script in the `scripts` directory:
      </p>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MyDappContract = await ethers.getContractFactory("MyDappContract");
  const myDappContract = await MyDappContract.deploy("Hello, Arbitrum!");
  console.log("MyDappContract deployed to:", myDappContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">5. Create Your Frontend</h3>
      <p className="mb-4">
        Use a frontend framework like React to create your frontend. Install the necessary dependencies:
      </p>
      <SyntaxHighlighter language="bash" style={solarizedlight}>
        {`
npx create-react-app my-arbitrum-frontend
cd my-arbitrum-frontend
npm install ethers
        `}
      </SyntaxHighlighter>
      <p className="mb-4">
        In your React application, create a component to interact with your smart contract:
      </p>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
const ABI = [
  "function message() view returns (string)",
  "function setMessage(string newMessage)"
];

const MyDapp = () => {
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const currentMessage = await contract.message();
        setMessage(currentMessage);
      }
    };

    fetchMessage();
  }, []);

  const updateMessage = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.setMessage(newMessage);
      await tx.wait();
      setMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>Current Message: {message}</h1>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={updateMessage}>Update Message</button>
    </div>
  );
};

export default MyDapp;
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">Learn More</h3>
      <p className="mb-4">
        To learn more about building dApps on Arbitrum, check out the following resources:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li><a href="https://developer.offchainlabs.com/docs/quickstart" className="text-blue-600 underline">Arbitrum Quickstart Guide</a></li>
        <li><a href="https://hardhat.org/getting-started/" className="text-blue-600 underline">Hardhat Documentation</a></li>
        <li><a href="https://reactjs.org/docs/getting-started.html" className="text-blue-600 underline">React Documentation</a></li>
        <li><a href="https://docs.ethers.io/v5/" className="text-blue-600 underline">Ethers.js Documentation</a></li>
      </ul>
    </div>
  );
};

export default Chapter5;
