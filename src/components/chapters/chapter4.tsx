import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Chapter4 = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Run an Orbit</h2>
      <p className="mb-4">
        Running an orbit on Arbitrum involves deploying and interacting with smart contracts on the Arbitrum network. Here’s a step-by-step guide on how to run an orbit, which refers to the process of deploying and managing smart contracts using Arbitrum’s infrastructure.
      </p>
      <h3 className="text-xl font-bold mb-2">1. Install Required Tools</h3>
      <p className="mb-4">
        Before you can run an orbit, make sure you have the necessary tools installed. You will need Node.js, npm, Hardhat (for Ethereum development), and MetaMask (for managing your Ethereum wallet).
      </p>
      <h3 className="text-xl font-bold mb-2">2. Set Up Your Project</h3>
      <p className="mb-4">
        Create a new project directory and initialize it with npm. Install Hardhat and other dependencies:
      </p>
      <SyntaxHighlighter language="bash" style={solarizedlight}>
        {`
npx mkdirp my-arbitrum-project
cd my-arbitrum-project
npm init -y
npm install --save-dev hardhat
npx hardhat
        `}
      </SyntaxHighlighter>
      <h3 className="text-xl font-bold mb-2">3. Configure Hardhat for Arbitrum</h3>
      <p className="mb-4">
        Configure Hardhat to work with Arbitrum. Create a Hardhat configuration file (`hardhat.config.js`) and add the Arbitrum network details:
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
      <h3 className="text-xl font-bold mb-2">4. Write and Deploy Smart Contracts</h3>
      <p className="mb-4">
        Write your smart contracts in Solidity and deploy them using Hardhat. Create a new file in the `contracts` directory and then create a deployment script in the `scripts` directory.
      </p>
      <SyntaxHighlighter language="solidity" style={solarizedlight}>
        {`
pragma solidity ^0.8.4;

contract MyContract {
  uint public myNumber;

  function setNumber(uint _number) public {
    myNumber = _number;
  }
}
        `}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();
  console.log("MyContract deployed to:", myContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
        `}
      </SyntaxHighlighter>
      <h3 className="text-xl font-bold mb-2">5. Interact with Your Contract</h3>
      <p className="mb-4">
        Once your contract is deployed, you can interact with it using a script or a frontend application. Here’s an example of how to interact with your contract from a script:
      </p>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
async function interact() {
  const [user] = await ethers.getSigners();
  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.attach("YOUR_CONTRACT_ADDRESS");

  await myContract.setNumber(42);
  const number = await myContract.myNumber();
  console.log("Stored number:", number.toString());
}

interact().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
        `}
      </SyntaxHighlighter>
      <h3 className="text-xl font-bold mb-2">Learn More</h3>
      <p className="mb-4">
        To learn more about deploying and managing smart contracts on Arbitrum, check out the following resources:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li><a href="https://developer.offchainlabs.com/docs/quickstart" className="text-blue-600 underline">Arbitrum Quickstart Guide</a></li>
        <li><a href="https://hardhat.org/getting-started/" className="text-blue-600 underline">Hardhat Documentation</a></li>
        <li><a href="https://metamask.io/" className="text-blue-600 underline">MetaMask - Ethereum Wallet</a></li>
      </ul>
    </div>
  );
};

export default Chapter4;
