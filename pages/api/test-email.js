export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Check environment variables
      const emailConfig = {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS,
        emailUser: process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 3)}***` : 'Not set',
        emailPassLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
      };

      // Test nodemailer connection
      let nodemailerTest = { success: false, error: null };
      
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          const nodemailer = require('nodemailer');
          
          const transporter = nodemailer.createTransporter({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          // Verify connection configuration
          await transporter.verify();
          nodemailerTest = { success: true, error: null };
        } catch (error) {
          nodemailerTest = { success: false, error: error.message };
        }
      }

      res.status(200).json({
        message: 'Email configuration test',
        emailConfig,
        nodemailerTest,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to test email configuration',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
