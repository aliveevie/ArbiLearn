import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import highlight.js styles
import 'highlight.js/styles/solarized-light.css';

const Chapter6 = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Run an Arbitrum Node</h2>
      <p className="mb-4">
        Running an Arbitrum node involves setting up the necessary software and configurations to participate in the Arbitrum network. Here’s a step-by-step guide on how to run an Arbitrum node.
      </p>
      
      <h3 className="text-xl font-bold mb-2">1. Install Dependencies</h3>
      <p className="mb-4">
        First, ensure you have Docker and Docker Compose installed on your machine. You can download them from the official Docker website.
      </p>
      <SyntaxHighlighter language="bash" style={solarizedlight}>
        {`
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">2. Clone the Arbitrum Repository</h3>
      <p className="mb-4">
        Clone the official Arbitrum repository from GitHub to get the necessary files for running a node.
      </p>
      <SyntaxHighlighter language="bash" style={solarizedlight}>
        {`
git clone https://github.com/OffchainLabs/arbitrum.git
cd arbitrum
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">3. Build the Docker Image</h3>
      <p className="mb-4">
        Use Docker Compose to build the Docker image for the Arbitrum node.
      </p>
      <SyntaxHighlighter language="bash" style={solarizedlight}>
        {`
docker-compose build
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">4. Configure the Node</h3>
      <p className="mb-4">
        Before running the node, you need to configure it. Modify the `docker-compose.yml` file to set up your node configurations such as network type and node keys.
      </p>
      <SyntaxHighlighter language="yaml" style={solarizedlight}>
        {`
version: '3.4'

services:
  arbitrum:
    build: .
    command: bash -c "arbnode --config /config/arbnode.yml"
    volumes:
      - ./config:/config
    ports:
      - "8547:8547"
      - "8548:8548"
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">5. Run the Node</h3>
      <p className="mb-4">
        Start the Arbitrum node using Docker Compose.
      </p>
      <SyntaxHighlighter language="bash" style={solarizedlight}>
        {`
docker-compose up
        `}
      </SyntaxHighlighter>
      <p className="mb-4">
        This command will start the Arbitrum node and connect it to the network.
      </p>
      
      <h3 className="text-xl font-bold mb-2">6. Monitor the Node</h3>
      <p className="mb-4">
        You can monitor the logs of your node to ensure it is running correctly. Use the following command to view the logs:
      </p>
      <SyntaxHighlighter language="bash" style={solarizedlight}>
        {`
docker-compose logs -f
        `}
      </SyntaxHighlighter>
      
      <h3 className="text-xl font-bold mb-2">Learn More</h3>
      <p className="mb-4">
        For more detailed information on running an Arbitrum node, check out the following resources:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li><a href="https://developer.offchainlabs.com/docs/running_nodes" className="text-blue-600 underline">Arbitrum Node Running Guide</a></li>
        <li><a href="https://docs.docker.com/get-started/" className="text-blue-600 underline">Docker Documentation</a></li>
        <li><a href="https://docs.docker.com/compose/" className="text-blue-600 underline">Docker Compose Documentation</a></li>
      </ul>
    </div>
  );
};

export default Chapter6;
