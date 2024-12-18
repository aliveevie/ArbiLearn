import React from 'react';
import { ArrowLeft, BookOpen, CoinsIcon as Coin } from 'lucide-react';
import { MobilePopupProps } from '../../../types/MobilePopupTypes';
import '../../styles/MobilePopup.css';

const MobilePopup: React.FC<MobilePopupProps> = ({
  isOpen,
  onClose,
  header,
  finishReading,
  mintNFT,
  content
}) => {
  // if (!isOpen) return null;

  return (
    <div className="mobile-popup-overlay">
      <div className="mobile-popup-container">
        <div className="mobile-popup-content">
          <div className="mobile-popup-header">
            <button className="mobile-popup-back" onClick={onClose}>
              <ArrowLeft size={24} />
            </button>
            <h2>{header}</h2>
          </div>
          <div className="mobile-popup-actions">
            <button className="mobile-popup-action" onClick={finishReading}>
              <BookOpen size={20} />
              Finish Reading
            </button>
            <button className="mobile-popup-action" onClick={mintNFT}>
              <Coin size={20} />
              Mint NFT
            </button>
          </div>
          <div className="mobile-popup-iframe-container">
            {content.type === 'page' ? (
              <iframe src={content.url} title="Content" className="mobile-popup-iframe" />
            ) : (
              <a href={content.url} target="_blank" rel="noopener noreferrer" className="mobile-popup-link">
                Open Link
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePopup;