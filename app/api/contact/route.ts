import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  const { name, email, subject, message }: ContactFormData =
    await request.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Configure the Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // or any other email service provider
    auth: {
      user: process.env.EMAIL, // your email address
      pass: process.env.EMAIL_PASSWORD, // your email password or app password
    },
  });

  // Compose the email
  const mailOptions = {
    from: email,
    to: process.env.EMAIL, // Your email address where you want to receive the form submissions
    subject: `New message from ${name}: ${subject}`,
    text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error sending email", details: error },
      { status: 500 }
    );
  }
}
