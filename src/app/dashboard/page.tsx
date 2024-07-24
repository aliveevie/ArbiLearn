"use client";

import { useState } from 'react';
import styles from '../../styles/Dashboar.module.css';

export default function Page() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const chapters = [
    {
      title: "Chapter 1: Introduction",
      subtopics: [
        { title: "Introduce Yourself", content: "Content about introducing yourself..." },
        { title: "About Arbitrum", content: "Content about Arbitrum..." }
      ]
    },
    {
      title: "Chapter 2: Getting Started",
      subtopics: [
        { title: "Setup Environment", content: "Content on setting up your environment..." },
        { title: "First Steps", content: "Content on your first steps with Arbitrum..." }
      ]
    },
    {
      title: "Chapter 3: Smart Contracts",
      subtopics: [
        { title: "Introduction to Smart Contracts", content: "Content on smart contracts..." },
        { title: "Writing Your First Contract", content: "Content on writing your first contract..." }
      ]
    },
    // Add more chapters and subtopics here
  ];

  const handleChapterClick = (index:any) => {
    setSelectedChapter(index);
    setSelectedSubtopic(null);
  };

  const handleSubtopicClick = (index:any) => {
    setSelectedSubtopic(index);
  };

  const renderSubtopics = () => {
    if (selectedChapter === null) return null;
    return (
      <ul className={styles.subtopicsList}>
        {chapters[selectedChapter].subtopics.map((subtopic, index) => (
          <li key={index} onClick={() => handleSubtopicClick(index)} className={styles.subtopicItem}>
            {subtopic.title}
          </li>
        ))}
      </ul>
    );
  };

  const renderContent = () => {
    if (selectedSubtopic === null || selectedChapter === null) return <p>Select a subtopic to view its content.</p>;
    return <p>{chapters[selectedChapter]?.subtopics[selectedSubtopic].content}</p>;
  };
  

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>Learn Arbitrum</h2>
        <ul className={styles.chaptersList}>
          {chapters.map((chapter, index) => (
            <li key={index} onClick={() => handleChapterClick(index)} className={styles.chapterItem}>
              {chapter.title}
            </li>
          ))}
        </ul>
        {renderSubtopics()}
      </aside>
      <main className={styles.content}>
        <h1>Welcome to the Dashboard!</h1>
        {renderContent()}
      </main>
    </div>
  );
}
