const Chapter1 = () => {
    return (
      <div>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-md mb-4">
              <h1 className="text-2xl font-bold">What is Arbitrum</h1>
            </div>
        <p className="mb-4">
          Arbitrum is a layer-2 optimistic rollup blockchain that helps to scale the main Ethereum chain while remaining
          trustlessly secure. While it is based on Ethereum's Virtual Machine (EVM), Arbitrum offers a unique design that
          makes it much more scalable and user-friendly than the Ethereum network.
        </p>
        <p className="mb-4">
          In addition, Arbitrum smart contracts are EVM-compatible meaning they work with existing Ethereum tooling,
          wallets, and dapps. Arbitrum was created as one of the Ethereum scaling solutions available to create low-cost
          smart contracts and to address long transaction times.
        </p>
        <p>
          The Arbitrum Virtual Machine, which runs on ArbOS, helps act as a record-keeper, traffic cop, and enforcer for
          the execution of smart contracts on the Arbitrum chain.
        </p>
      </div>
    );
  };
  
  export default Chapter1;
  