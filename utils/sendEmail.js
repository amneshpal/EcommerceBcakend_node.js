const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
      port: process.env.EMAIL_PORT, // 587
      secure: false, // true for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"Vendora" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
