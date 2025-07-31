import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, mobileNumber, selectedDate, selectedTime, upiTransactionId } = req.body;

    if (!name || !email || !mobileNumber || !selectedDate || !selectedTime || !upiTransactionId) {
      return res.status(400).json({ error: "Missing required fields: name, email, mobile number, upiTransactionId, or appointment time." });
    }

    // Create a transporter using your email service (like Gmail, SendGrid, etc.)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email to Admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER, // Sender address (your email)
      to: process.env.RECEIVER_EMAIL, // Admin email address
      subject: `New Appointment Confirmation For BCGCM`, // Subject of the email
      text: `New appointment confirmation For BCGCM:
        Name: ${name}
        Email: ${email}
        Mobile: ${mobileNumber}
        Appointment Date: ${selectedDate}
        Appointment Time: ${selectedTime}
              UPI Transaction ID: ${upiTransactionId}
`

    };

    // Email to User
    const userMailOptions = {
      from: process.env.EMAIL_USER, // Sender address (your email)
      to: email, // Recipient's email address (user's email)
      subject: `Appointment Confirmation`, // Subject of the email
      text: `
        Dear ${name},

        Your appointment has been successfully booked for ${selectedDate} at ${selectedTime} & your UPI Transaction ID: ${upiTransactionId}
. 

        Thank you for using our service!

        Regards,
        Team BCGCM India
      `,
    };

    try {
      // Send email to Admin
      await transporter.sendMail(adminMailOptions);

      // Send email to User
      await transporter.sendMail(userMailOptions);

      res.status(200).json({ message: 'Confirmation emails sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      console.log(res)
      res.status(500).json({ error: 'Failed to send confirmation emails' });
    }
  } else {
    // Respond with Method Not Allowed if it's not a POST request
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
