import { Book, FileText, Layers } from 'lucide-react'
import '../../../styles/courses.css'

const Courses = () => {
  const web3Resources = [
    { name: 'Ethereum.org', url: 'https://ethereum.org/en/learn/' },
    { name: 'CryptoZombies', url: 'https://cryptozombies.io/' },
    { name: 'Buildspace', url: 'https://buildspace.so/' },
    { name: 'Web3 University', url: 'https://www.web3.university/' },
    { name: 'Consensys Academy', url: 'https://consensys.net/academy/' },
    { name: 'Chainshot', url: 'https://www.chainshot.com/' },
    { name: 'Questbook', url: 'https://questbook.app/' },
    { name: 'Blockchain at Berkeley', url: 'https://blockchain.berkeley.edu/courses/' },
    { name: 'DApp University', url: 'https://www.dappuniversity.com/' },
    { name: 'Moralis Academy', url: 'https://academy.moralis.io/' },
  ]

  const metisDocs = [
    { name: 'Metis Documentation', url: 'https://docs.metis.io/' },
    { name: 'Metis Developer Documentation', url: 'https://docs.metis.io/dev/' },
    { name: 'Metis GitHub', url: 'https://github.com/MetisProtocol' },
    { name: 'Metis Academy', url: 'https://metisdao.notion.site/Metis-Academy-7bf3f1f5a6d94e2c9e6d46e8e7d397d3' },
  ]

  const arbitrumDocs = [
    { name: 'Arbitrum Documentation', url: 'https://developer.arbitrum.io/docs/overview' },
    { name: 'Arbitrum Developer Documentation', url: 'https://developer.arbitrum.io/' },
    { name: 'Arbitrum GitHub', url: 'https://github.com/OffchainLabs/arbitrum' },
  ]

  const metisCourses = [
    { name: 'Metis Learn2Earn', url: 'https://metisdao.notion.site/Metis-Learn2Earn-Program-7b1e8d8818e34b83b7862c9aad2f6c7c' },
    { name: 'Metis Ecosystem Development Program', url: 'https://www.metis.io/ecosystem-development-program' },
    { name: 'Metis Ranger Program', url: 'https://metisdao.notion.site/Metis-Ranger-Program-7e8c3ab360f1429d9f1b46a5c6e8f9e9' },
  ]

  return (
    <div className="courses-container">
      <section className="section">
        <h2 className="section-title">Web3 Learning Resources</h2>
        <ul className="resource-list">
          {web3Resources.map((resource, index) => (
            <li key={index} className="resource-item">
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                <Book className="icon" size={18} />
                {resource.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">Build on Metis</h2>
        <div className="subsection">
          <h3 className="subsection-title">Documentation</h3>
          <ul className="resource-list">
            {metisDocs.map((doc, index) => (
              <li key={index} className="resource-item">
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                  <FileText className="icon" size={18} />
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="subsection">
          <h3 className="subsection-title">Courses</h3>
          <ul className="resource-list">
            {metisCourses.map((course, index) => (
              <li key={index} className="resource-item">
                <a href={course.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                  <Layers className="icon" size={18} />
                  {course.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Build on Arbitrum</h2>
        <ul className="resource-list">
          {arbitrumDocs.map((doc, index) => (
            <li key={index} className="resource-item">
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                <FileText className="icon" size={18} />
                {doc.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Courses

