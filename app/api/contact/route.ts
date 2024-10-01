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

  // Set up email options
  const mailOptions = {
    from: email, // Sender email address
    to: process.env.EMAIL_RECEIVER, // Your email address where you'll receive messages
    subject: `A New Contact Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `,
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
