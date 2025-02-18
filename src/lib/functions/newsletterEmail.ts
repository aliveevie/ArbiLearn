import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string): Promise<{ success: boolean; message: string }> {
    try {
      await resend.emails.send({
        from: 'ArbiLearn <info@arbilearn.club>',
        to: email,
        subject: 'Welcome to ArbiLearn – Your Journey to Web3 Mastery Begins!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://www.arbilearn.club/logo.png" alt="ArbiLearn Logo" style="max-width: 200px; height: auto;">
            </div>
            
            <p>Dear Subscriber,</p>
            
            <p>Welcome to <strong>ArbiLearn</strong>! We're thrilled to have you onboard as part of our growing community of learners, developers, and blockchain enthusiasts. By subscribing to our newsletter, you've taken a big step toward mastering Web3, blockchain development, and decentralized applications.</p>
            
            <p><strong>Here's what you can expect from us:</strong></p>
            
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin-bottom: 15px;">🚀 <strong>Exclusive Web3 Insights</strong> – Stay ahead with the latest trends, news, and expert opinions in the blockchain space.</li>
              
              <li style="margin-bottom: 15px;">💡 <strong>In-Depth Tutorials & Guides</strong> – Get step-by-step instructions on building and deploying smart contracts, DeFi apps, and more.</li>
              
              <li style="margin-bottom: 15px;">📅 <strong>Upcoming Events & Webinars</strong> – Be the first to know about our workshops, hackathons, and live sessions with industry experts.</li>
              
              <li style="margin-bottom: 15px;">🎁 <strong>Community-Exclusive Perks</strong> – Gain access to special resources, early-bird opportunities, and networking sessions with Web3 leaders.</li>
            </ul>
            
            <p>We're excited to embark on this journey with you. Keep an eye on your inbox for valuable content, and don't hesitate to reach out if you have any questions or suggestions.</p>
            
            <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
              <a href="https://www.arbilearn.club/pages/app" 
                 style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                 🚀 Get Started Here
              </a>
            </div>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
              <p>© ${new Date().getFullYear()} ArbiLearn. All rights reserved.</p>
              <p>You're receiving this email because you subscribed to our newsletter.</p>
            </div>
          </div>
        `
      });
      console.log("Email sent!")
      return {
        success: true,
        message: "Welcome email sent successfully!"
      };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return {
        success: false,
        message: "Failed to send welcome email. Please try again later."
      };
    }
  }