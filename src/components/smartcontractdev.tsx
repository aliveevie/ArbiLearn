import React from 'react';

const SmartContractDevelopment = () => {
  const sections = [
    {
      title: "Overview of Metis Blockchain for Smart Contracts",
      content: "Metis is an Ethereum Layer 2 platform optimized for decentralized applications (dApps), providing low gas fees, scalability, and robust security. It supports Solidity for developing smart contracts and is compatible with Ethereum tools like Remix and Truffle. The blockchain is particularly suitable for DAOs, DeFi, and Web3 marketplaces, thanks to its focus on efficiency and ease of integration with EVM standards.",
    },
    {
      title: "Thirdweb for Modular Smart Contract Development",
      content: "Thirdweb is a developer-friendly toolkit for building, deploying, and managing customizable smart contracts. It simplifies the development process by providing pre-audited modules, a dashboard for seamless management, and SDKs for interaction.",
      features: [
        "Pre-built Contracts: Deploy ERC20, ERC721, or Marketplace contracts",
        "Modular Design: Add custom functionalities by integrating Thirdweb modules",
        "Multi-chain Deployment: Deploy to over 2,000 EVM-compatible networks, including Metis",
        "Code Wizard: Create secure smart contracts using an intuitive UI wizard",
      ],
    },
    {
      title: "Development Workflow",
      steps: [
        {
          subtitle: "Set up Thirdweb SDK",
          details: [
            "Install the SDK using npm install @thirdweb-dev/sdk",
            "Configure your project by connecting to the Metis RPC",
          ],
        },
        {
          subtitle: "Create a Smart Contract",
          details: [
            "Start with a base ERC20 or ERC721 contract",
            "Customize it using Solidity, integrating callbacks or custom functionality like mint pricing",
          ],
        },
        {
          subtitle: "Deploy the Contract",
          details: [
            "Use the Thirdweb CLI with npx thirdweb deploy",
            "Select the target contract, configure arguments (e.g., token name, symbol), and deploy to Metis",
          ],
        },
        {
          subtitle: "Integrate dApps",
          details: [
            "Connect your dApp to the contract using Thirdweb SDK functions like getContract and sendTransaction",
            "Build a frontend for user interactions (e.g., minting tokens or accessing marketplaces)",
          ],
        },
      ],
    },
    {
      title: "Advantages of Combining Metis and Thirdweb",
      benefits: [
        "Cost Efficiency: Deploying on Metis ensures low transaction costs",
        "Scalability: Optimized for large-scale dApp operations",
        "Ease of Use: Thirdweb's abstraction simplifies development for new and experienced developers",
        "Community Support: Active ecosystems around both Metis and Thirdweb ensure access to resources and forums for troubleshooting",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Smart Contract Development
      </h1>
      
      <div className="space-y-12">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {section.title}
            </h2>
            
            {section.content && (
              <p className="text-gray-600 mb-4 leading-relaxed">
                {section.content}
              </p>
            )}
            
            {section.features && (
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                {section.features.map((feature, idx) => (
                  <li key={idx} className="leading-relaxed">{feature}</li>
                ))}
              </ul>
            )}
            
            {section.steps && (
              <div className="space-y-6">
                {section.steps.map((step, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {step.subtitle}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {step.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="leading-relaxed">{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            
            {section.benefits && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.benefits.map((benefit, idx) => (
                  <li key={idx} className="bg-blue-50 p-4 rounded-md text-gray-700">
                    {benefit}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartContractDevelopment;