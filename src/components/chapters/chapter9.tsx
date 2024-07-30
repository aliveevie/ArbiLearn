const Chapter9 = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">FAQ</h2>
        <p className="mb-4">
          Below are some frequently asked questions about Arbitrum and related topics.
        </p>
  
        <h3 className="text-xl font-bold mb-2">1. What is Arbitrum?</h3>
        <p className="mb-4">
          Arbitrum is a layer 2 scaling solution for Ethereum that aims to reduce transaction fees and increase throughput while maintaining the security of the Ethereum mainnet. It uses rollups to batch transactions and offload computation from the main Ethereum chain.
        </p>
  
        <h3 className="text-xl font-bold mb-2">2. How do I set up a wallet for Arbitrum?</h3>
        <p className="mb-4">
          You can set up a wallet for Arbitrum using MetaMask. Simply add the Arbitrum network to your MetaMask configuration by following these steps:
        </p>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Open MetaMask and go to the network dropdown.</li>
          <li>Select "Custom RPC".</li>
          <li>Enter the following details:
            <ul className="list-disc ml-6 space-y-1">
              <li>Network Name: Arbitrum One</li>
              <li>New RPC URL: <a href="https://arb1.arbitrum.io/rpc" className="text-blue-600 underline">https://arb1.arbitrum.io/rpc</a></li>
              <li>Chain ID: 42161</li>
              <li>Currency Symbol: ETH</li>
              <li>Block Explorer URL: <a href="https://arbiscan.io" className="text-blue-600 underline">https://arbiscan.io</a></li>
            </ul>
          </li>
          <li>Save and switch to the Arbitrum network.</li>
        </ol>
  
        <h3 className="text-xl font-bold mb-2">3. How can I bridge assets to Arbitrum?</h3>
        <p className="mb-4">
          To bridge assets to Arbitrum, you can use the official Arbitrum Bridge. Follow these steps:
        </p>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Visit the <a href="https://bridge.arbitrum.io" className="text-blue-600 underline">Arbitrum Bridge</a>.</li>
          <li>Connect your Ethereum wallet (e.g., MetaMask).</li>
          <li>Select the asset you want to bridge and enter the amount.</li>
          <li>Confirm the transaction and wait for it to be processed.</li>
        </ol>
  
        <h3 className="text-xl font-bold mb-2">4. What tools do I need to develop on Arbitrum?</h3>
        <p className="mb-4">
          To develop on Arbitrum, you will need:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Node.js and npm</li>
          <li>Hardhat (for Ethereum development)</li>
          <li>MetaMask (for managing your Ethereum wallet)</li>
          <li>Arbitrum-specific plugins and configurations for your development environment</li>
        </ul>
  
        <h3 className="text-xl font-bold mb-2">5. Where can I find more resources about Arbitrum?</h3>
        <p className="mb-4">
          Here are some useful resources to learn more about Arbitrum:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li><a href="https://developer.offchainlabs.com/docs/quickstart" className="text-blue-600 underline">Arbitrum Quickstart Guide</a></li>
          <li><a href="https://developer.offchainlabs.com/docs" className="text-blue-600 underline">Arbitrum Developer Documentation</a></li>
          <li><a href="https://discord.gg/arbitrum" className="text-blue-600 underline">Arbitrum Discord Community</a></li>
        </ul>
      </div>
    );
  };
  
  export default Chapter9;
  