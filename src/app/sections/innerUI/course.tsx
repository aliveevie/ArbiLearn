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
    <div className="learn-portal">
      <div className="learn-portal__block">
        <h2 className="learn-portal__heading">Web3 Learning Resources</h2>
        <ul className="learn-portal__list">
          {web3Resources.map((resource, index) => (
            <li key={index} className="learn-portal__item">
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="learn-portal__link">
                <Book className="learn-portal__icon" size={18} />
                <span className="learn-portal__text">{resource.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="learn-portal__block">
        <h2 className="learn-portal__heading">Build on Metis</h2>
        <div className="learn-portal__group">
          <h3 className="learn-portal__subheading">Documentation</h3>
          <ul className="learn-portal__list">
            {metisDocs.map((doc, index) => (
              <li key={index} className="learn-portal__item">
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="learn-portal__link">
                  <FileText className="learn-portal__icon" size={18} />
                  <span className="learn-portal__text">{doc.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="learn-portal__group">
          <h3 className="learn-portal__subheading">Courses</h3>
          <ul className="learn-portal__list">
            {metisCourses.map((course, index) => (
              <li key={index} className="learn-portal__item">
                <a href={course.url} target="_blank" rel="noopener noreferrer" className="learn-portal__link">
                  <Layers className="learn-portal__icon" size={18} />
                  <span className="learn-portal__text">{course.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="learn-portal__block">
        <h2 className="learn-portal__heading">Build on Arbitrum</h2>
        <ul className="learn-portal__list">
          {arbitrumDocs.map((doc, index) => (
            <li key={index} className="learn-portal__item">
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="learn-portal__link">
                <FileText className="learn-portal__icon" size={18} />
                <span className="learn-portal__text">{doc.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Courses

