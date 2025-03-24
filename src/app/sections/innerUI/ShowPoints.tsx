"use client";

import React, { useEffect, useState } from 'react';
import '../../../styles/PointsModal.css';
import { getUserPoints } from '@/server-comps/savePoints';

interface PointItem {
  value: number;
  label: string;
  earned: boolean;
}

interface UserPoints {
  courseCompletion: number;
  nftMint: number;
  tokenPurchase: number;
  referral: number;
  communityActivity: number;
  profileCompletion: number;
  signupBonus: number;
}

interface ShowPointsComponentProps {
  address: string | undefined;
  onClose: () => void;
  show: boolean;
}

const ShowPointsComponent: React.FC<ShowPointsComponentProps> = ({ 
  address,
  onClose,
  show
}) => {
  const [points, setPoints] = useState<UserPoints | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!address || !show) return;

      try {
        setLoading(true);
        setError(null);
        console.log('🔍 Fetching points for address:', address);
        
        const response = await getUserPoints(address);
        console.log('📊 Points response:', response);

        if (response.success && response.data) {
          setPoints(response.data);
        } else {
          setError(response.message || 'Failed to fetch points');
        }
      } catch (err) {
        console.error('❌ Error fetching points:', err);
        setError('Failed to load points');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPoints();
  }, [address, show]);

  const pointsData: PointItem[] = [
    { 
      value: points?.signupBonus ?? 0, 
      label: 'Signup Bonus', 
      earned: (points?.signupBonus ?? 0) > 0
    },
    { 
      value: points?.courseCompletion ?? 0, 
      label: 'Course Completion', 
      earned: (points?.courseCompletion ?? 0) > 0
    },
    { 
      value: points?.nftMint ?? 0, 
      label: 'NFT Mint', 
      earned: (points?.nftMint ?? 0) > 0
    },
    { 
      value: points?.tokenPurchase ?? 0, 
      label: 'Token Purchase', 
      earned: (points?.tokenPurchase ?? 0) > 0
    },
    { 
      value: points?.referral ?? 0, 
      label: 'Referral', 
      earned: (points?.referral ?? 0) > 0
    },
    { 
      value: points?.communityActivity ?? 0, 
      label: 'Community Activity', 
      earned: (points?.communityActivity ?? 0) > 0
    },
    { 
      value: points?.profileCompletion ?? 0, 
      label: 'Profile Completion', 
      earned: (points?.profileCompletion ?? 0) > 0
    }
  ];

  if (!show || !address) return null;

  const totalPoints = pointsData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="points-overlay">
      <div className="points-modal">
        <button className="points-close-btn" onClick={onClose}>×</button>
        <h3 className="points-title">Points Overview</h3>
        
        {loading ? (
          <div className="points-loading">Loading points...</div>
        ) : error ? (
          <div className="points-error">{error}</div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ShowPointsComponent;