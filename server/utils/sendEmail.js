

import nodemailer from "nodemailer";

let transporter; // cached instance

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
};

export const sendEmail = async ({ to, subject, html }) => {
  const mailer = getTransporter();

  await mailer.sendMail({
    from: `"Todo App" <no-reply@todoapp.com>`,
    to,
    subject,
    html,
  });

  // ✅ Minimal, professional log
  console.log("📧 Invite email sent (Mailtrap)");
};
