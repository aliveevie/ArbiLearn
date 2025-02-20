import React, { useState } from 'react';
import { Book, Brain, Rocket, TestTube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import styles from '../Innercss/LearnethonProfile.module.css';

interface LearnethonProfileProps {
  wallet: string | undefined;
}

const LearnethonProfile: React.FC<LearnethonProfileProps> = ({ wallet }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const learningResources = [
    {
      category: "ArbiLearn Fundamentals",
      icon: <Book className="h-6 w-6" />,
      resources: [
        { title: "Introduction to ArbiLearn", url: "https://docs.arbitrum.io/intro" },
        { title: "ArbiLearn Architecture", url: "https://docs.arbitrum.io/architecture" },
        { title: "Getting Started with ArbiLearn", url: "https://docs.arbitrum.io/getting-started" },
      ]
    },
    {
      category: "Metis Ecosystem",
      icon: <Brain className="h-6 w-6" />,
      resources: [
        { title: "Metis Documentation", url: "https://docs.metis.io" },
        { title: "Metis Layer 2 Solutions", url: "https://docs.metis.io/dev" },
        { title: "Building on Metis", url: "https://docs.metis.io/building" },
      ]
    },
    {
      category: "Web3 Fundamentals",
      icon: <Rocket className="h-6 w-6" />,
      resources: [
        { title: "Web3 Basics", url: "https://ethereum.org/en/web3/" },
        { title: "Smart Contracts 101", url: "https://ethereum.org/en/smart-contracts/" },
        { title: "DeFi Fundamentals", url: "https://ethereum.org/en/defi/" },
      ]
    }
  ];

  const handleStartExam = () => {
    alert("Exams will be starting soon! Stay tuned for updates.");
  };

  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Learnethon Profile</h1>
        <p className={styles.subtitle}>Your Web3 Learning Journey</p>
      </header>

      <div className={styles.learningResources}>
        <h2 className={styles.sectionTitle}>Learning Resources</h2>
        <div className={styles.resourceGrid}>
          {learningResources.map((section, index) => (
            <div key={index} className={styles.resourceCard}>
              <div className={styles.resourceHeader}>
                {section.icon}
                <h3>{section.category}</h3>
              </div>
              <ul className={styles.resourceList}>
                {section.resources.map((resource, idx) => (
                  <li key={idx}>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.resourceLink}
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.examSection}>
        <div className={styles.examCard}>
          <div className={styles.examHeader}>
            <TestTube className="h-6 w-6" />
            <h3>Knowledge Assessment</h3>
          </div>
          <p className={styles.examDescription}>
            Test your understanding of ArbiLearn, Metis, and Web3 concepts through our comprehensive examination.
          </p>
          <Button 
            onClick={handleStartExam}
            className={styles.examButton}
          >
            Start Exam
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearnethonProfile;