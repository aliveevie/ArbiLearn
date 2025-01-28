import React from 'react';
import '../../../styles/PointsModal.css';

interface PointItem {
  value: number;
  label: string;
  earned: boolean;
}

interface ShowPointsComponentProps {
  address: string | undefined;
  onClose: () => void;
  show: boolean;
  points?: {
    courseCompletion?: number;
    nftMint?: number;
    tokenPurchase?: number;
    referral?: number;
    communityActivity?: number;
  };
}

const ShowPointsComponent: React.FC<ShowPointsComponentProps> = ({ 
  address,
  onClose,
  show,
  points = {} // Default empty object if no points provided
}) => {
  const pointsData: PointItem[] = [
    { 
      value: points.courseCompletion ?? 0, 
      label: 'Course Completion', 
      earned: points.courseCompletion ? points.courseCompletion > 0 : false 
    },
    { 
      value: points.nftMint ?? 0, 
      label: 'NFT Mint', 
      earned: points.nftMint ? points.nftMint > 0 : false 
    },
    { 
      value: points.tokenPurchase ?? 0, 
      label: 'Token Purchase', 
      earned: points.tokenPurchase ? points.tokenPurchase > 0 : false 
    },
    { 
      value: points.referral ?? 0, 
      label: 'Referral', 
      earned: points.referral ? points.referral > 0 : false 
    },
    { 
      value: points.communityActivity ?? 0, 
      label: 'Community Activity', 
      earned: points.communityActivity ? points.communityActivity > 0 : false 
    }
  ];

  if (!show || !address) return null;

  const totalPoints = pointsData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="points-overlay">
      <div className="points-modal">
        <button className="points-close-btn" onClick={onClose}>×</button>
        <h3 className="points-title">Points Overview</h3>
        
        <div className="points-summary">
          <div className="total-points">
            <span className="total-points-label">Total Points:</span>
            <span className="total-points-value">{totalPoints}</span>
          </div>
          
        </div>

        <div className="points-list">
          <div className="points-category-title">Points Breakdown</div>
          {pointsData.map((item) => (
            <div key={item.label} className="points-item">
              <div className="points-item-label">{item.label}</div>
              <div className={`points-item-value ${item.earned ? 'earned' : ''}`}>
                {item.value}
                <span className="points-suffix">pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowPointsComponent;