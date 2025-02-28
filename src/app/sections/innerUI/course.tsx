'use client'

import { useState } from 'react'
import { Book, FileText, Layers } from 'lucide-react'
import { VerificationForm } from './VerificationForm'
import { Button } from "@/components/ui/button"
import '../../../styles/courses.css'
import LearnethonProfile from '../leanerthon/Dashboard'

interface Resource {
  name: string;
  url: string;
}

interface CoursesProps { 
  address: string | undefined;
}

const Courses: React.FC<CoursesProps> = ({ address }) => {
  const [showForm, setShowForm] = useState(false)
  const [showExam, setShowExam] = useState(false)
  const web3Resources: Resource[] = [
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

  const metisDocs: Resource[] = [
    { name: 'Metis Documentation', url: 'https://docs.metis.io/' },
    { name: 'Metis Developer Documentation', url: 'https://docs.metis.io/dev/' },
    { name: 'Metis GitHub', url: 'https://github.com/MetisProtocol' },
    { name: 'Metis Academy', url: 'https://metisdao.notion.site/Metis-Academy-7bf3f1f5a6d94e2c9e6d46e8e7d397d3' },
  ]

  const arbitrumDocs: Resource[] = [
    { name: 'Arbitrum Documentation', url: 'https://developer.arbitrum.io/docs/overview' },
    { name: 'Arbitrum Developer Documentation', url: 'https://developer.arbitrum.io/' },
    { name: 'Arbitrum GitHub', url: 'https://github.com/OffchainLabs/arbitrum' },
  ]

  const metisCourses: Resource[] = [
    { name: 'Metis Learn2Earn', url: 'https://metisdao.notion.site/Metis-Learn2Earn-Program-7b1e8d8818e34b83b7862c9aad2f6c7c' },
    { name: 'Metis Ecosystem Development Program', url: 'https://www.metis.io/ecosystem-development-program' },
    { name: 'Metis Ranger Program', url: 'https://metisdao.notion.site/Metis-Ranger-Program-7e8c3ab360f1429d9f1b46a5c6e8f9e9' },
  ]

  const allResources = [...web3Resources, ...metisDocs, ...arbitrumDocs, ...metisCourses]

  const handleResourceClick = (resource: Resource) => {
    window.open(resource.url, '_blank')
  }

  const renderResourceList = (resources: Resource[], icon: React.ReactNode) => (
    <ul className="learn-portal__list">
      {resources.map((resource, index) => (
        <li key={index} className="learn-portal__item">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="learn-portal__link"
            onClick={(e) => {
              e.preventDefault()
              handleResourceClick(resource)
            }}
          >
            {icon}
            <span className="learn-portal__text">{resource.name}</span>
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`learn-portal ${showForm ? 'inactive' : ''}`}>
      <div className="learn-portal__content">
        <div className="learn-portal__block">
          <h2 className="learn-portal__heading">Web3 Learning Resources</h2>
          {renderResourceList(web3Resources, <Book className="learn-portal__icon" size={18} />)}
        </div>

        <div className="learn-portal__block">
          <h2 className="learn-portal__heading">Build on Metis</h2>
          <div className="learn-portal__group">
            <h3 className="learn-portal__subheading">Documentation</h3>
            {renderResourceList(metisDocs, <FileText className="learn-portal__icon" size={18} />)}
          </div>
          <div className="learn-portal__group">
            <h3 className="learn-portal__subheading">Courses</h3>
            {renderResourceList(metisCourses, <Layers className="learn-portal__icon" size={18} />)}
          </div>
        </div>

        <div className="learn-portal__block">
          <h2 className="learn-portal__heading">Build on Arbitrum</h2>
          {renderResourceList(arbitrumDocs, <FileText className="learn-portal__icon" size={18} />)}
        </div>
      </div>

      <Button onClick={() => setShowExam(true)} className="fixed bottom-4 left-4">
        LearnerThon Competition
      </Button>

      <Button onClick={() => setShowForm(true)} className="fixed bottom-4 right-4">
        Verify Completion
      </Button>

      {showForm && (
        <div className="learn-portal__overlay">
          <div className="learn-portal__modal">
            <VerificationForm 
              resources={allResources}
              onClose={() => setShowForm(false)}
              address={address}
            />
          </div>
        </div>
      )}
       {showExam && (
        <div className="learn-portal__overlay">
          <div className="learn-portal__modal">
            <LearnethonProfile 
            wallet={address}
            onClose={() => setShowExam(false)}
            />
          </div>
          </div>
          )}
    </div>
  )
}

export default Courses

