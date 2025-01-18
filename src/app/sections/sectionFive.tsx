'use client'

import React from 'react';
import { MessageCircle, MessageSquare, Twitter } from 'lucide-react';
import '../../styles/SectionFive.css';
import Link from 'next/link';

const SocialMediaLink: React.FC<{ icon: React.ReactNode; name: string; url: string }> = ({ icon, name, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="social-media-link">
    {icon}
    <span>{name}</span>
  </a>
);

const SectionFive: React.FC = () => {
  return (
    <section className="section-five">
      <div className="container">
        <h2 className="section-title">Join Our Social Media Channels</h2>
        <p className="section-subtitle">Connect with the ArbiLearn community and stay updated!</p>
        
        <div className="social-media-grid">
          <SocialMediaLink 
            icon={<MessageCircle size={32} />} 
            name="Telegram" 
            url="https://t.me/+Ygy97nUwmpRjNTk0" 
          />
          <SocialMediaLink 
            icon={<MessageSquare size={32} />} 
            name="Discord" 
            url="https://discord.gg/4ZZKRYVE" 
          />
          <SocialMediaLink 
            icon={<Twitter size={32} />} 
            name="Twitter" 
            url="https://x.com/ArbiLearn" 
          />
        </div>

        <div className="community-cta">
          <h3>Be Part of Our Growing Community</h3>
          <p>Join discussions, get updates, and connect with like-minded individuals in the ArbiLearn ecosystem.</p>
          <Link href="/pages/app" className="join-button">Join Now</Link>
        </div>
      </div>
    </section>
  );
};

export default SectionFive;

