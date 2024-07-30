const Chapter10 = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Glossary</h2>
        <p className="mb-4">
          This glossary provides definitions of common terms and concepts related to Arbitrum and blockchain technology.
        </p>
  
        <h3 className="text-xl font-bold mb-2">Arbitrum</h3>
        <p className="mb-4">
          A layer 2 scaling solution for Ethereum that aims to improve transaction throughput and reduce fees while maintaining security through the use of optimistic rollups.
        </p>
  
        <h3 className="text-xl font-bold mb-2">Blockchain</h3>
        <p className="mb-4">
          A decentralized ledger technology that records transactions across multiple computers in a way that ensures security and transparency.
        </p>
  
        <h3 className="text-xl font-bold mb-2">dApp (Decentralized Application)</h3>
        <p className="mb-4">
          An application that runs on a decentralized network, utilizing blockchain technology to ensure security, transparency, and trustlessness.
        </p>
  
        <h3 className="text-xl font-bold mb-2">EVM (Ethereum Virtual Machine)</h3>
        <p className="mb-4">
          The runtime environment for smart contracts on the Ethereum blockchain. It is responsible for executing contract bytecode and maintaining the state of the Ethereum network.
        </p>
  
        <h3 className="text-xl font-bold mb-2">Hardhat</h3>
        <p className="mb-4">
          A development environment and framework for compiling, deploying, testing, and debugging Ethereum software. It is widely used for building smart contracts and dApps.
        </p>
  
        <h3 className="text-xl font-bold mb-2">Layer 2</h3>
        <p className="mb-4">
          A secondary framework or protocol built on top of an existing blockchain (Layer 1) to improve its scalability and efficiency. Examples include Arbitrum and Optimism.
        </p>
  
        <h3 className="text-xl font-bold mb-2">MetaMask</h3>
        <p className="mb-4">
          A popular cryptocurrency wallet and gateway to blockchain applications, allowing users to interact with the Ethereum network and other compatible blockchains directly from their browser.
        </p>
  
        <h3 className="text-xl font-bold mb-2">Optimistic Rollup</h3>
        <p className="mb-4">
          A type of layer 2 scaling solution that assumes transactions are valid by default and only requires verification through fraud proofs if a dispute arises. This helps to increase throughput and reduce costs.
        </p>
  
        <h3 className="text-xl font-bold mb-2">Smart Contract</h3>
        <p className="mb-4">
          A self-executing contract with the terms of the agreement directly written into code. Smart contracts run on blockchain networks like Ethereum and Arbitrum, enabling trustless and automated transactions.
        </p>
  
        <h3 className="text-xl font-bold mb-2">Solidity</h3>
        <p className="mb-4">
          A programming language used for writing smart contracts on the Ethereum blockchain and compatible networks like Arbitrum. It is designed to be statically typed and contract-oriented.
        </p>
  
        <h3 className="text-xl font-bold mb-2">Transaction</h3>
        <p className="mb-4">
          An operation initiated by an external account or contract that changes the state of the blockchain. Transactions can involve transferring tokens, executing smart contracts, or other operations.
        </p>
  
        <h3 className="text-xl font-bold mb-2">Wallet</h3>
        <p className="mb-4">
          A software application or hardware device that stores and manages private keys, allowing users to interact with blockchain networks and manage their cryptocurrency holdings.
        </p>
      </div>
    );
  };
  
  export default Chapter10;  