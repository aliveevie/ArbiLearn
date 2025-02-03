import React, { useState } from 'react';
import { Star } from 'lucide-react';
import styles from '../Innercss/feedback.module.css';

const FeedbackForm = ({wallet} : { wallet: string | undefined }) => {
  const [formData, setFormData] = useState({
    name: '',
    twitter: '',
    generalFeedback: '',
    satisfaction: 'satisfied',
    rating: 0,
    testimony: '',
    smartAccountExperience: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement submission logic to your backend
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className={styles.feedbackContainer}>
      <h2 className={styles.title}>Help Us Improve ArbiLearn</h2>
      
      {submitted ? (
        <div className={styles.successMessage}>
          <h3>Thank you for your feedback!</h3>
          <p>Your input helps us make ArbiLearn better for everyone.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Your name"
            />
          </div>

          {/* Twitter Handle */}
          <div className={styles.formGroup}>
            <label htmlFor="twitter" className={styles.label}>
              Twitter Handle
            </label>
            <input
              type="text"
              id="twitter"
              name="twitter"
              className={styles.input}
              value={formData.twitter}
              onChange={handleInputChange}
              placeholder="@username"
            />
          </div>

          {/* General Feedback */}
          <div className={styles.formGroup}>
            <label htmlFor="generalFeedback" className={styles.label}>
              How can we improve ArbiLearn?
            </label>
            <textarea
              id="generalFeedback"
              name="generalFeedback"
              rows={4}
              className={styles.textarea}
              placeholder="Share your suggestions..."
              value={formData.generalFeedback}
              onChange={handleInputChange}
            />
          </div>

          {/* Satisfaction Level */}
          <div className={styles.formGroup}>
            <label htmlFor="satisfaction" className={styles.label}>
              Overall Satisfaction
            </label>
            <select
              id="satisfaction"
              name="satisfaction"
              className={styles.select}
              value={formData.satisfaction}
              onChange={handleInputChange}
            >
              <option value="very_satisfied">Very Satisfied</option>
              <option value="satisfied">Satisfied</option>
              <option value="neutral">Neutral</option>
              <option value="dissatisfied">Dissatisfied</option>
              <option value="very_dissatisfied">Very Dissatisfied</option>
            </select>
          </div>

          {/* Star Rating */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Rate your experience
            </label>
            <div className={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`${styles.star} ${
                    star <= formData.rating ? styles.starActive : styles.starInactive
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>

          {/* Smart Account Experience */}
          <div className={styles.formGroup}>
            <label htmlFor="smartAccountExperience" className={styles.label}>
              Your Experience with Smart Accounts & Account Abstraction
            </label>
            <textarea
              id="smartAccountExperience"
              name="smartAccountExperience"
              rows={4}
              className={styles.textarea}
              placeholder="Share your experience with our smart account features..."
              value={formData.smartAccountExperience}
              onChange={handleInputChange}
            />
          </div>

          {/* Testimony */}
          <div className={styles.formGroup}>
            <label htmlFor="testimony" className={styles.label}>
              Would you like to share a testimony?
            </label>
            <textarea
              id="testimony"
              name="testimony"
              rows={3}
              className={styles.textarea}
              placeholder="Share your success story or experience..."
              value={formData.testimony}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;