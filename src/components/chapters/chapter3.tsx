const Chapter3 = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">How Arbitrum Works</h2>
        <p className="mb-4">
          Arbitrum is designed to improve the scalability and efficiency of the Ethereum blockchain. Here’s a detailed overview of how Arbitrum works:
        </p>
        <h3 className="text-xl font-bold mb-2">Layer-2 Solution</h3>
        <p className="mb-4">
          Arbitrum is a layer-2 scaling solution for Ethereum. It operates on top of the Ethereum blockchain, processing transactions off-chain and then posting transaction data back to the Ethereum mainnet. This approach significantly reduces congestion and fees on the Ethereum network.
        </p>
        <h3 className="text-xl font-bold mb-2">Optimistic Rollups</h3>
        <p className="mb-4">
          Arbitrum uses optimistic rollups, a technology that allows many transactions to be bundled together and submitted to the Ethereum mainnet as a single transaction. The term "optimistic" comes from the assumption that all transactions are valid. Only if someone challenges a transaction, the system will then run a fraud-proof to verify its validity.
        </p>
        <h3 className="text-xl font-bold mb-2">Arbitrum Rollup Chain</h3>
        <p className="mb-4">
          The Arbitrum Rollup Chain is where most of the transaction processing occurs. This chain operates independently but relies on Ethereum for security. When users send transactions, they are processed on the Arbitrum Rollup Chain, and the results are periodically posted to Ethereum.
        </p>
        <h3 className="text-xl font-bold mb-2">Arbitrum Virtual Machine (AVM)</h3>
        <p className="mb-4">
          The Arbitrum Virtual Machine (AVM) is an integral part of the Arbitrum Rollup Chain. It is compatible with the Ethereum Virtual Machine (EVM), allowing developers to deploy and run smart contracts written for Ethereum without modification. The AVM executes these contracts more efficiently, ensuring higher throughput and lower costs.
        </p>
        <h3 className="text-xl font-bold mb-2">ArbOS</h3>
        <p className="mb-4">
          ArbOS is the operating system that runs on the Arbitrum Rollup Chain. It manages the execution of smart contracts, handles state updates, and ensures the overall security and efficiency of the chain. ArbOS also includes features like fee management and cross-chain communication, which enhance the functionality of the Arbitrum network.
        </p>
        <h3 className="text-xl font-bold mb-2">Security Model</h3>
        <p className="mb-4">
          Arbitrum’s security model relies on Ethereum. While transactions are processed off-chain, the results are secured by the Ethereum blockchain. If a dispute arises regarding a transaction, the system can refer back to Ethereum for resolution, ensuring the integrity and security of the network.
        </p>
        <p className="mb-4">
          By understanding these core components, you can appreciate how Arbitrum enhances Ethereum’s scalability, reduces transaction costs, and maintains a high level of security.
        </p>
        <h3 className="text-xl font-bold mb-2">Learn More</h3>
        <p className="mb-4">
          To learn more about how Arbitrum works, visit the following resources:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li><a href="https://developer.offchainlabs.com/docs/inside_arbitrum" className="text-blue-600 underline">Inside Arbitrum</a></li>
          <li><a href="https://arbitrum.io/how-it-works/" className="text-blue-600 underline">How Arbitrum Works - Arbitrum Official Site</a></li>
          <li><a href="https://medium.com/offchainlabs" className="text-blue-600 underline">Arbitrum Medium Blog</a></li>
        </ul>
      </div>
    );
  };
  
  export default Chapter3;  