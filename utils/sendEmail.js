// const nodemailer = require("nodemailer");

// const sendEmail = async ({ to, subject, text, html }) => {
//   try {
//     // Create transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
//       port: process.env.EMAIL_PORT, // 587
//       secure: false, // true for 465
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Send email
//     const info = await transporter.sendMail({
//       from: `"Vendora" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.log("Email sent: %s", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// module.exports = sendEmail;





// const nodemailer = require("nodemailer");

// const sendEmail = async ({ to, subject, text, html }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     const info = await transporter.sendMail({
//       from: `"Ecommerce" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html
//     });

//     console.log("Email sent: %s", info.messageId);
//   } catch(err) {
//     console.error("Error sending email:", err);
//   }
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER, // "apikey"
        pass: process.env.EMAIL_PASS, // SendGrid API key
      },
    });

    const info = await transporter.sendMail({
      from: `"Ecommerce" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]+>/g, ""), // fallback text if not provided
      replyTo: process.env.EMAIL_FROM,          // ensures replies go to same email
    });

    console.log("Email sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;
