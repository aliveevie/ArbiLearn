"use client";

import { useState } from 'react';

export default function Page() {
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);

  const chapters = [
    { title: "Chapter 1: Introduction", content: "Introduction to Arbitrum..." },
    { title: "Chapter 2: Getting Started", content: "How to set up your environment..." },
    { title: "Chapter 3: Smart Contracts", content: "Understanding smart contracts on Arbitrum..." },
    { title: "Chapter 4: Arbitrum Rollup", content: "Detailed look at Arbitrum Rollup..." },
    { title: "Chapter 5: Tools and Resources", content: "Essential tools and resources for Arbitrum..." },
    { title: "Chapter 6: Developing on Arbitrum", content: "Step-by-step guide to developing on Arbitrum..." },
    { title: "Chapter 7: Deploying Contracts", content: "How to deploy smart contracts on Arbitrum..." },
    { title: "Chapter 8: Interacting with Contracts", content: "Interacting with deployed contracts..." },
    { title: "Chapter 9: Advanced Topics", content: "Advanced topics in Arbitrum development..." },
    { title: "Chapter 10: Conclusion", content: "Wrapping up and next steps..." },
  ];

  const handleChapterClick = (index: number) => {
    // Logic for chapter click, e.g., updating progress and points
    setPoints(points + 10);
    setProgress((index + 1) * 10);
  };

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '20%', padding: '10px', background: '#f4f4f4' }}>
        <h2>Learn Arbitrum</h2>
        <ul>
          {chapters.map((chapter, index) => (
            <li key={index} onClick={() => handleChapterClick(index)} style={{ cursor: 'pointer' }}>
              {chapter.title}
            </li>
          ))}
        </ul>
      </aside>
      <main style={{ width: '80%', padding: '20px' }}>
        <div>
          <h1>Welcome to the Dashboard!</h1>
          <div>
            <h2>Introduction</h2>
            <p>This is an introductory guide to learning Arbitrum...</p>
          </div>
          <div>
            <h2>Points Earned: {points}</h2>
            <div style={{ width: '100%', background: '#e0e0e0', height: '30px', borderRadius: '5px', margin: '10px 0' }}>
              <div style={{ width: `${progress}%`, background: '#76c7c0', height: '100%', borderRadius: '5px' }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
