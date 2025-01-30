import React from 'react';
import styles from '../Innercss/ShowCourseModal.module.css';

interface CourseStats {
  enrolled: number;
  completed: number;
  inProgress: number;
  totalPoints: number;
  earnedRewards: number;
}

interface ShowCoursesComponentProps {
  address?: string;
  show: boolean;
  onClose: () => void;
  courseStats?: CourseStats;
}

const ShowCoursesComponent: React.FC<ShowCoursesComponentProps> = ({
  address,
  show,
  onClose,
  courseStats = {
    enrolled: 0,
    completed: 0,
    inProgress: 0,
    totalPoints: 0,
    earnedRewards: 0
  }
}) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${styles.courseModalContent}`}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Course Progress</h2>
        <div className={styles.courseStatsContainer}>
          <div className={styles.courseStatItem}>
            <div className={styles.statLabel}>Enrolled Courses</div>
            <div className={styles.statValue}>{courseStats.enrolled}</div>
          </div>
          <div className={styles.courseStatItem}>
            <div className={styles.statLabel}>Completed</div>
            <div className={styles.statValue}>{courseStats.completed}</div>
          </div>
          <div className={styles.courseStatItem}>
            <div className={styles.statLabel}>In Progress</div>
            <div className={styles.statValue}>{courseStats.inProgress}</div>
          </div>
          <div className={styles.courseStatItem}>
            <div className={styles.statLabel}>Points Earned</div>
            <div className={styles.statValue}>{courseStats.totalPoints}</div>
          </div>
          <div className={styles.courseStatItem}>
            <div className={styles.statLabel}>Rewards Earned</div>
            <div className={styles.statValue}>${courseStats.earnedRewards.toFixed(2)}</div>
          </div>
        </div>
        {!address ? (
          <p className={styles.noDataMessage}>Please connect your wallet to view course progress.</p>
        ) : courseStats.enrolled === 0 ? (
          <p className={styles.noDataMessage}>No courses enrolled yet. Start learning today!</p>
        ) : null}
      </div>
    </div>
  );
};

export default ShowCoursesComponent;