import React from 'react';
import {
  Layers,
  Link,
  Settings,
  Shield,
  Network,
  DollarSign,
  Code,
  Box,
  Coins,
  BrickWall,
  Database,
  Zap,
  Layout
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string[];
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => (
  <Card className={`w-full ${className}`}>
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {description.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export const Layer2Solution: React.FC = () => {
  const features = [
    {
      icon: <Layers className="text-blue-500" />,
      title: "Core Design Principles",
      description: [
        "Increased Scalability: Advanced batch processing and compression techniques",
        "Enhanced Interoperability: Native bridges to Layer 2s and Ethereum",
        "Customizable Frameworks: Modular components for privacy and consensus"
      ]
    },
    {
      icon: <Shield className="text-purple-500" />,
      title: "Zero-Knowledge Proofs",
      description: [
        "Optional ZK-rollups for enhanced privacy",
        "Hybrid rollups supporting Optimistic and ZK layers",
        "Faster withdrawal times for improved UX"
      ]
    },
    {
      icon: <Network className="text-green-500" />,
      title: "Dynamic Sequencer Network",
      description: [
        "Decentralized sequencer network",
        "Staking mechanism for node competition",
        "METIS token rewards for sequencing"
      ]
    },
    {
      icon: <DollarSign className="text-yellow-500" />,
      title: "Fee Optimization",
      description: [
        "Multi-tiered fee structure",
        "Priority for critical transactions",
        "Discounted rates for high-volume DeFi activities"
      ]
    },
    {
      icon: <Code className="text-indigo-500" />,
      title: "Smart Contract SDKs",
      description: [
        "Pre-audited, modular smart contract libraries",
        "Integration with Thirdweb",
        "Support for DAOs and DeFi pools"
      ]
    },
    {
      icon: <Box className="text-red-500" />,
      title: "Custom Execution Layers",
      description: [
        "Custom execution logic for specific applications",
        "Game-specific optimizations",
        "Enterprise solution support"
      ]
    },
    {
      icon: <Coins className="text-amber-500" />,
      title: "Token Economics",
      description: [
        "Native reward distribution",
        "Liquidity management mechanisms",
        "Sustainable token economies"
      ]
    },
    {
      icon: <BrickWall className="text-teal-500" />,
      title: "Cross-Chain Bridges",
      description: [
        "Secure asset transfer between chains",
        "Integration with major L2s",
        "Trustless message-passing protocols"
      ]
    },
    {
      icon: <Database className="text-cyan-500" />,
      title: "Data Availability",
      description: [
        "Partnership with Celestia",
        "Reliable off-chain data storage",
        "Optimized scalability"
      ]
    },
    {
      icon: <Zap className="text-orange-500" />,
      title: "Instant Finality",
      description: [
        "Fast transaction finalization",
        "Quick withdrawals using ZK technology",
        "Improved user experience"
      ]
    },
    {
      icon: <Layout className="text-violet-500" />,
      title: "Low-Latency Access",
      description: [
        "Unified dApp dashboard",
        "Improved usability",
        "Streamlined onboarding process"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
        Layer 2 Scaling Solution: Optimized Modular Rollup for Metis
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Layer2Solution;