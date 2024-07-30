import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import highlight.js styles
import 'highlight.js/styles/solarized-light.css';

const Chapter8 = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Write a Stylus Contract</h2>
      <p className="mb-4">
        Stylus is an innovative smart contract language designed for the Arbitrum ecosystem. It offers a simpler syntax and enhanced features for developers. This chapter provides a step-by-step guide on how to write a Stylus contract.
      </p>
      
      <h3 className="text-xl font-bold mb-2">1. Set Up Your Development Environment</h3>
      <p className="mb-4">
        Ensure you have Node.js, npm, and Hardhat installed. You'll also need MetaMask for managing your Ethereum wallet.
      </p>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
npm install -g node
npm install -g npm
npm install --save-dev hardhat
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">2. Create a New Hardhat Project</h3>
      <p className="mb-4">
        Initialize a new Hardhat project and install the required dependencies.
      </p>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
mkdir stylus-project
cd stylus-project
npm init -y
npm install --save-dev hardhat
npx hardhat
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">3. Write Your Stylus Contract</h3>
      <p className="mb-4">
        Create a new file in the `contracts` directory and write your Stylus contract. Here's an example:
      </p>
      <SyntaxHighlighter language="stylus" style={solarizedlight}>
        {`
pragma stylus ^0.8.4;

contract MyStylusContract {
  uint public myNumber;

  function setNumber(uint _number) public {
    myNumber = _number;
  }
}
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">4. Configure Hardhat for Stylus</h3>
      <p className="mb-4">
        Update the Hardhat configuration file to include the Arbitrum network and support for Stylus contracts.
      </p>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
require('@nomiclabs/hardhat-ethers');
require('@arbitrum/stylus-hardhat-plugin');

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
      
      <h3 className="text-xl font-bold mb-2">5. Deploy Your Stylus Contract</h3>
      <p className="mb-4">
        Create a deployment script in the `scripts` directory to deploy your Stylus contract.
      </p>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MyStylusContract = await ethers.getContractFactory("MyStylusContract");
  const myStylusContract = await MyStylusContract.deploy();

  console.log("MyStylusContract deployed to:", myStylusContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">6. Interact with Your Stylus Contract</h3>
      <p className="mb-4">
        Once your contract is deployed, interact with it using a script or a frontend application.
      </p>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
async function interact() {
  const [user] = await ethers.getSigners();
  const MyStylusContract = await ethers.getContractFactory("MyStylusContract");
  const myStylusContract = await MyStylusContract.attach("YOUR_CONTRACT_ADDRESS");

  await myStylusContract.setNumber(42);
  const number = await myStylusContract.myNumber();
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
        For more detailed information on writing Stylus contracts, check out the following resources:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li><a href="https://developer.offchainlabs.com/docs/stylus" className="text-blue-600 underline">Stylus Documentation</a></li>
        <li><a href="https://hardhat.org/getting-started/" className="text-blue-600 underline">Hardhat Documentation</a></li>
        <li><a href="https://metamask.io/" className="text-blue-600 underline">MetaMask - Ethereum Wallet</a></li>
      </ul>
    </div>
  );
};

export default Chapter8;