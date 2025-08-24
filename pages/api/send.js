import nodemailer from 'nodemailer';
import { saveBooking, isTimeSlotAvailable } from '../../src/lib/utils/availability';

export default async function handler(req, res) {
  // Add a GET endpoint for testing email configuration
  if (req.method === 'GET') {
    const hasEmailUser = !!process.env.EMAIL_USER;
    const hasEmailPass = !!process.env.EMAIL_PASS;
    
    return res.status(200).json({
      message: 'Email Configuration Status',
      configured: hasEmailUser && hasEmailPass,
      hasEmailUser,
      hasEmailPass,
      emailUser: process.env.EMAIL_USER || 'NOT_SET',
      instructions: hasEmailUser && hasEmailPass 
        ? 'Email service is configured and ready to use'
        : 'Please create a .env.local file with EMAIL_USER and EMAIL_PASS variables'
    });
  }
  
  if (req.method === 'POST') {
    const { name, email, mobileNumber, selectedDate, selectedTime, upiTransactionId, type, adminEmail } = req.body;

    // Debug logging
    // console.log('API received data:', { name, email, mobileNumber, selectedDate, selectedTime, upiTransactionId, type, adminEmail });

    // Basic validation for all requests
    if (!name || !email || !selectedDate || !selectedTime) {
      return res.status(400).json({ error: "Missing required fields: name, email, or appointment time." });
    }

    // For confirmation emails, also check mobile and UPI ID
    if ((type === 'user_confirmation' || type === 'admin_notification') && (!mobileNumber || !upiTransactionId)) {
      return res.status(400).json({ error: "Missing required fields: mobile number or UPI transaction ID for confirmation." });
    }

    // Check if required environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      // console.error('Missing email configuration:', { 
      //   hasEmailUser: !!process.env.EMAIL_USER, 
      //   hasEmailPass: !!process.env.EMAIL_PASS,
      //   emailUser: process.env.EMAIL_USER || 'NOT_SET',
      //   emailPass: process.env.EMAIL_PASS ? 'SET' : 'NOT_SET'
      // });
      return res.status(500).json({ 
        error: "Email service not configured. Missing EMAIL_USER or EMAIL_PASS environment variables.",
        details: "Please create a .env.local file with EMAIL_USER and EMAIL_PASS variables"
      });
    }

    // Create a transporter using Gmail with enhanced security settings
    let transporter;
    
    try {
      // Try multiple Gmail authentication methods
      const authMethods = [
        // Method 1: Enhanced App Password with SSL
        {
          service: 'Gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          secure: true,
          port: 465,
          tls: { rejectUnauthorized: false }
        },
        // Method 2: App Password with TLS
        {
          service: 'Gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          secure: false,
          port: 587,
          tls: { rejectUnauthorized: false }
        },
        // Method 3: Basic Gmail service
        {
          service: 'Gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          }
        }
      ];

      let lastError;
      for (let i = 0; i < authMethods.length; i++) {
        try {
          // console.log(`Trying Gmail authentication method ${i + 1}...`);
          transporter = nodemailer.createTransport(authMethods[i]);
          
          // Test the connection
          await transporter.verify();
          // console.log(`✅ Gmail authentication method ${i + 1} successful`);
          break;
        } catch (error) {
          lastError = error;
          // console.log(`❌ Gmail authentication method ${i + 1} failed:`, error.message);
          if (i === authMethods.length - 1) {
            throw new Error(`All Gmail authentication methods failed. Last error: ${lastError.message}`);
          }
        }
      }
    } catch (error) {
      // console.error('Error creating email transporter:', error);
      throw new Error(`Failed to configure email service: ${error.message}`);
    }

    // Email to Admin (bcgcmindia@gmail.com)
    const adminMailOptions = {
      from: process.env.EMAIL_USER, // Sender address (your email)
      to: adminEmail || "bcgcmindia@gmail.com", // Admin email address
      subject: `New Appointment Booking - BCGCM India`, // Subject of the email
      text: `New appointment booking confirmed for BCGCM India:

Name: ${name}
Email: ${email}
Mobile: ${mobileNumber}
Appointment Date: ${selectedDate}
Appointment Time: ${selectedTime}
UPI Transaction ID: ${upiTransactionId}

This is an automated notification from the BCGCM India booking system.

Regards,
BCGCM India Team
      `,
    };

    // Email to User (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_USER, // Sender address (your email)
      to: email, // Recipient's email address (user's email)
      subject: `Appointment Confirmed - BCGCM India`, // Subject of the email
      text: `Dear ${name},

Your appointment has been successfully confirmed!

Appointment Details:
Date: ${selectedDate}
Time: ${selectedTime}
UPI Transaction ID: ${upiTransactionId}

We look forward to meeting you and discussing your capital requirements.

If you need to reschedule or have any questions, please contact us at bcgcmindia@gmail.com

Thank you for choosing BCGCM India!

Best regards,
Team BCGCM India
      `,
    };

    try {
      let emailsSent = 0;
      let errors = [];

      // Send email based on type
      if (type === 'user_confirmation') {
        try {
          // Send user confirmation email
          await transporter.sendMail(userMailOptions);
          emailsSent++;
          // console.log('User confirmation email sent successfully to:', email);
          
          // Also send a copy to admin (bcgcmindia@gmail.com)
          const userCopyMailOptions = {
            ...userMailOptions,
            to: "bcgcmindia@gmail.com",
            subject: `[COPY] ${userMailOptions.subject}`,
            text: `[COPY SENT TO ADMIN]\n\n${userMailOptions.text}`
          };
          
          await transporter.sendMail(userCopyMailOptions);
          emailsSent++;
          // console.log('User confirmation email copy sent successfully to admin');
        } catch (error) {
          // console.error('Error sending user confirmation email:', error);
          errors.push(`User email: ${error.message}`);
        }
      } else if (type === 'admin_notification') {
        try {
          await transporter.sendMail(adminMailOptions);
          emailsSent++;
          // console.log('Admin notification email sent successfully to:', adminEmail || 'bcgcmindia@gmail.com');
        } catch (error) {
          // console.error('Error sending admin notification email:', error);
          errors.push(`Admin email: ${error.message}`);
        }
      } else {
        // Fallback: send both emails if no type specified
        try {
          await transporter.sendMail(adminMailOptions);
          emailsSent++;
        } catch (error) {
          // console.error('Error sending admin email:', error);
          errors.push(`Admin email: ${error.message}`);
        }

        try {
          await transporter.sendMail(userMailOptions);
          emailsSent++;
        } catch (error) {
          // console.error('Error sending user email:', error);
          errors.push(`User email: ${error.message}`);
        }
      }

      // Save booking to database after successful email sending
      if (emailsSent > 0 && type === 'user_confirmation') {
        try {
          // Check if time slot is still available before saving
          const isAvailable = await isTimeSlotAvailable(selectedDate, selectedTime);
          if (!isAvailable) {
            // console.log('Time slot no longer available, cannot save booking');
            errors.push('Time slot no longer available for database save');
          } else {
            // Save the booking to database
            const saveResult = await saveBooking({
              name,
              email,
              mobileNumber,
              selectedDate,
              selectedTime,
              upiTransactionId
            });
            
            if (saveResult.success) {
              // console.log('Booking saved to database successfully:', saveResult.bookingId);
            } else {
              // console.error('Failed to save booking to database:', saveResult.error);
              errors.push(`Database save: ${saveResult.error}`);
            }
          }
        } catch (dbError) {
          // console.error('Database error:', dbError);
          errors.push(`Database: ${dbError.message}`);
        }
      }

      if (emailsSent > 0) {
        res.status(200).json({ 
          message: `${emailsSent} email(s) sent successfully`,
          emailsSent,
          errors: errors.length > 0 ? errors : undefined
        });
      } else {
        res.status(500).json({ 
          error: 'Failed to send any emails',
          details: errors
        });
      }
    } catch (error) {
      // console.error('Critical error in email sending:', error);
      res.status(500).json({ error: 'Failed to send confirmation emails', details: error.message });
    }
  } else {
    // Respond with Method Not Allowed if it's not a POST request
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
