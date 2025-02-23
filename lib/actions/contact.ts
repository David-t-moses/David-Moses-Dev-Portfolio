"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_APP_PASSWORD,
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000, // 10 seconds
  socketTimeout: 10000, // 10 seconds
  debug: true, // Enable debugging
  tls: {
    rejectUnauthorized: false,
    ciphers: "SSLv3",
  },
});

transporter.verify(function (error, success) {
  if (success) {
    console.log("Server is ready to take our messages");
  } else {
    console.log("Error during verification:", error);
  }
});

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = formData;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            background-color: #03186B;
            margin: 0;
            padding: 20px;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #020617; 
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 30px rgba(3, 24, 107, 0.3);
          }
          .header { 
            background: linear-gradient(135deg, #03186B, #020617);
            color: white; 
            padding: 30px;
            text-align: center;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .content { 
            padding: 30px;
            background: white;
          }
          .field { 
            margin-bottom: 25px;
            border-left: 3px solid #03186B;
            padding-left: 15px;
          }
          .label { 
            font-weight: bold;
            color: #03186B;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
          }
          .value {
            color: #000;
            background: #f8f9fa;
            padding: 12px;
            border-radius: 6px;
          }
          .footer {
            background: #020617;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Message Received</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value">${message}</div>
            </div>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Dtm Web Solutions | All rights reserved
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const mailOptions = {
      from: {
        name: "DTM Web Solutions",
        address: process.env.OUTLOOK_EMAIL!,
      },
      to: process.env.OUTLOOK_EMAIL,
      replyTo: {
        name: name,
        address: email,
      },
      subject: `New Contact Form Submission: ${subject}`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email Error:", {
      message: error.message,
      emailConfig: process.env.OUTLOOK_EMAIL ? "Present" : "Missing",
      error,
    });

    return {
      success: false,
      error: "Failed to send email. Please check server logs.",
    };
  }
}
