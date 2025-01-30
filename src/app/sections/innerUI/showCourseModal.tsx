import React from 'react';
import '../../../styles/ShowCourseModal.css';

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
    <div className="modal-overlay">
      <div className="modal-content course-modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Course Progress</h2>
        <div className="course-stats-container">
          <div className="course-stat-item">
            <div className="stat-label">Enrolled Courses</div>
            <div className="stat-value">{courseStats.enrolled}</div>
          </div>
          <div className="course-stat-item">
            <div className="stat-label">Completed</div>
            <div className="stat-value">{courseStats.completed}</div>
          </div>
          <div className="course-stat-item">
            <div className="stat-label">In Progress</div>
            <div className="stat-value">{courseStats.inProgress}</div>
          </div>
          <div className="course-stat-item">
            <div className="stat-label">Points Earned</div>
            <div className="stat-value">{courseStats.totalPoints}</div>
          </div>
          <div className="course-stat-item">
            <div className="stat-label">Rewards Earned</div>
            <div className="stat-value">${courseStats.earnedRewards.toFixed(2)}</div>
          </div>
        </div>
        {!address ? (
          <p className="no-data-message">Please connect your wallet to view course progress.</p>
        ) : courseStats.enrolled === 0 ? (
          <p className="no-data-message">No courses enrolled yet. Start learning today!</p>
        ) : null}
      </div>
    </div>
  );
};

export default ShowCoursesComponent;