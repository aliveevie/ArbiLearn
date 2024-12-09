import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MetisBlockchainFundamentals() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Metis Blockchain Fundamentals</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Introduction to Metis Blockchain</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>What is Metis?</strong> A Layer 2 blockchain solution built on Ethereum, designed to solve scalability, security, and decentralization challenges using Optimistic Rollup technology.</p>
            <p className="mt-2"><strong>Core Vision:</strong> Empower developers, businesses, and communities to build decentralized applications with high scalability, low costs, and fast transactions.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ecosystem and Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Ecosystem Development Fund (EDF):</strong> A $4.6 million METIS fund for grants supporting new project deployments, dApps, and liquidity initiatives.</li>
              <li><strong>Use Cases:</strong> Includes DeFi, NFTs, blockchain gaming, cross-chain technology, decentralized identity, and more.</li>
              <li><strong>Collaboration Governance:</strong> Fosters blockchain-powered collaboration through tools that simplify decentralized organization creation and management.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Builder Incentives and Community Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Builder Mining Rewards:</strong> Provides up to 4,000 METIS monthly to dApps that contribute to network activity.</li>
              <li><strong>Sequencer Mining:</strong> Participants can earn rewards by contributing to the block production process.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="features" className="mt-12">
        <TabsList className="flex w-full flex-wrap gap-2">
          <TabsTrigger value="features" className="flex-1 min-w-[150px]">Key Features</TabsTrigger>
          <TabsTrigger value="developer" className="flex-1 min-w-[150px]">Developer Resources</TabsTrigger>
          <TabsTrigger value="roadmap" className="flex-1 min-w-[150px]">Future Roadmap</TabsTrigger>
          <TabsTrigger value="learn-more" className="flex-1 min-w-[150px]">Learn More</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Key Features of Metis</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Optimistic Rollup Technology:</strong> Enables transactions to be processed off-chain while maintaining Ethereum's security and decentralization.</li>
                <li><strong>Low Fees and High Speed:</strong> Designed for faster transaction finality and reduced gas costs compared to Ethereum's mainnet.</li>
                <li><strong>Decentralized Sequencer:</strong> The upcoming Metis Decentralized Sequencer will introduce enhanced security, community governance, and incentives like sequencer mining.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="developer">
          <Card>
            <CardHeader>
              <CardTitle>Developer Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Comprehensive developer documentation, whitepapers, and SDKs for building and deploying dApps.</li>
                <li>Metis's tools and partnerships, like bridges and liquidity solutions, facilitate seamless integration with Ethereum.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="roadmap">
          <Card>
            <CardHeader>
              <CardTitle>Future Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Scalability Enhancements:</strong> Further decentralization of sequencers and additional features for mainstream adoption.</li>
                <li><strong>Governance Evolution:</strong> Transition towards community-driven decision-making in fund allocation and ecosystem development.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="learn-more">
          <Card>
            <CardHeader>
              <CardTitle>Learn More</CardTitle>
            </CardHeader>
            <CardContent>
              <p>To dive deeper into these aspects, visit the official Metis website and explore their blog section for more details and updates on their initiatives.</p>
              <a href="https://www.metis.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 inline-block">
                Visit Metis Website
              </a>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

