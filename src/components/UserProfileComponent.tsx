import React from 'react';
import { Trophy, Target, Zap, Award, Image, Coins, Layout, User } from 'lucide-react';
import { User as UserType } from '../types';
import styles from '../styles/UserProfileComponent.module.css';

interface UserProfileComponentProps {
  user: UserType;
  onIconClick: (icon: string) => void;
}

const UserProfileComponent: React.FC<UserProfileComponentProps> = ({ user, onIconClick }) => (
  <div className={styles.profileContainer}>
    <h2 className={styles.profileTitle}>Your MetisLearn Profile</h2>
    <div className={styles.statsGrid}>
      {[
        { icon: Trophy, label: 'Rank', value: user.rank, key: 'rank', iconClass: styles.iconRank },
        { icon: Target, label: 'Points', value: user.points, key: 'points', iconClass: styles.iconPoints },
        { icon: Zap, label: 'Streak', value: `${user.streak} days`, key: 'streak', iconClass: styles.iconStreak },
        { icon: Award, label: 'Badges', value: user.badges, key: 'badges', iconClass: styles.iconBadges },
        { icon: Image, label: 'NFTs', value: user.nfts, key: 'nfts', iconClass: styles.iconNFTs },
        { icon: Coins, label: 'Tokens', value: user.tokens, key: 'tokens', iconClass: styles.iconTokens },
        { icon: Layout, label: 'Tasks', value: user.tasksCompleted, key: 'tasks', iconClass: styles.iconTasks },
        { icon: User, label: 'Level', value: user.level, key: 'level', iconClass: styles.iconLevel },
      ].map(({ icon: Icon, label, value, key, iconClass }) => (
        <div 
          key={key}
          className={styles.statCard}
          onClick={() => onIconClick(key)}
        >
          <Icon size={24} className={`${styles.icon} ${iconClass}`} />
          <span className={styles.statLabel}>{label}</span>
          <span className={styles.statValue}>{value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default UserProfileComponent;

