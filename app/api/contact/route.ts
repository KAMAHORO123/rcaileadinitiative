import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    console.log('Received contact form submission:', { name, email, subject });

    // Validate input
    if (!name || !email || !subject || !message) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured. Please check your .env.local file');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('Creating email transporter...');
    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Email transporter verified successfully');
    } catch (error) {
      console.error('Failed to verify email transporter:', error);
      return NextResponse.json(
        { error: 'Failed to configure email service' },
        { status: 500 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kamahorolinda@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    console.log('Sending email...');
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 