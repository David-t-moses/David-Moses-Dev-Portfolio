// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  // Set up Nodemailer transporter (using SMTP server or service like Gmail, SendGrid, etc.)
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use another service, e.g., SendGrid, Mailgun, etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });

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

  // Set up email options
  const mailOptions = {
    from: email, // Sender email address
    to: process.env.EMAIL_RECEIVER, // Your email address where you'll receive messages
    subject: `A New Contact Submission from ${name}`,
    html: emailHtml,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
