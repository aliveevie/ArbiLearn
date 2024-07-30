import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import highlight.js styles
import 'highlight.js/styles/solarized-light.css';

const Chapter7 = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Arbitrum Bridge</h2>
      <p className="mb-4">
        The Arbitrum Bridge allows you to transfer assets between the Ethereum mainnet and the Arbitrum network. This chapter provides a step-by-step guide on how to use the Arbitrum Bridge.
      </p>
      
      <h3 className="text-xl font-bold mb-2">1. Set Up MetaMask</h3>
      <p className="mb-4">
        Ensure you have MetaMask installed and set up. Add the Arbitrum network to your MetaMask wallet.
      </p>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {`
const arbitrumNetwork = {
  chainId: '0xA4B1', // Hexadecimal for 42161
  chainName: 'Arbitrum One',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://arb1.arbitrum.io/rpc'],
  blockExplorerUrls: ['https://arbiscan.io'],
};

await window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [arbitrumNetwork],
});
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">2. Access the Arbitrum Bridge</h3>
      <p className="mb-4">
        Visit the official <a href="https://bridge.arbitrum.io/" className="text-blue-600 underline">Arbitrum Bridge</a> website to start transferring assets.
      </p>
      
      <h3 className="text-xl font-bold mb-2">3. Connect Your Wallet</h3>
      <p className="mb-4">
        Connect your MetaMask wallet to the Arbitrum Bridge. Ensure you are connected to the Ethereum mainnet in MetaMask.
      </p>
      <p className="mb-4">
        On the Arbitrum Bridge website, click on "Connect Wallet" and follow the prompts to connect your MetaMask wallet.
      </p>
      
      <h3 className="text-xl font-bold mb-2">4. Transfer Assets to Arbitrum</h3>
      <p className="mb-4">
        Select the asset you want to transfer from Ethereum to Arbitrum. Enter the amount you wish to transfer and initiate the transfer.
      </p>
      <p className="mb-4">
        Confirm the transaction in MetaMask. Once the transaction is confirmed, your assets will be transferred to the Arbitrum network.
      </p>
      
      <h3 className="text-xl font-bold mb-2">5. Transfer Assets Back to Ethereum</h3>
      <p className="mb-4">
        To transfer assets back to Ethereum, switch to the Arbitrum network in MetaMask and follow similar steps to initiate the transfer back to the Ethereum mainnet.
      </p>
      <p className="mb-4">
        Confirm the transaction in MetaMask and wait for the assets to appear on the Ethereum mainnet.
      </p>
      
      <h3 className="text-xl font-bold mb-2">Learn More</h3>
      <p className="mb-4">
        For more detailed information on using the Arbitrum Bridge, check out the following resources:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li><a href="https://developer.offchainlabs.com/docs/bridging_assets" className="text-blue-600 underline">Arbitrum Bridging Assets Guide</a></li>
        <li><a href="https://metamask.io/" className="text-blue-600 underline">MetaMask - Ethereum Wallet</a></li>
        <li><a href="https://arbitrum.io/" className="text-blue-600 underline">Arbitrum Official Website</a></li>
      </ul>
    </div>
  );
};

export default Chapter7;
