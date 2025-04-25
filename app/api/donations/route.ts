import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import nodemailer from 'nodemailer';
import { donationEmailTemplate, adminNotificationTemplate } from '@/lib/email-templates';

// Get all donations (admin only)
export async function GET(req: Request) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM donations ORDER BY created_at DESC'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

// Create a new donation
export async function POST(req: Request) {
  try {
    const { donor_name, email, amount, payment_method } = await req.json();

    // Validate input
    if (!donor_name || !email || !amount || !payment_method) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Insert donation into database
    const [result] = await pool.query(
      'INSERT INTO donations (donor_name, email, amount, payment_method) VALUES (?, ?, ?, ?)',
      [donor_name, email, amount, payment_method]
    );

    // Send email notifications
    let emailSent = false;
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Verify transporter configuration
      await transporter.verify();
      console.log('Email transporter verified successfully');

      // Send confirmation to donor
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Your Donation to RCA ILEAD Initiative',
        html: donationEmailTemplate(donor_name, amount, payment_method),
      });

      // Send notification to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || 'ileadinitiativeteam@gmail.com',
        subject: 'New Donation Received',
        html: adminNotificationTemplate(donor_name, email, amount, payment_method),
      });

      emailSent = true;
      console.log('Emails sent successfully');
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // Log the specific error for debugging
      if (emailError instanceof Error) {
        console.error('Email error details:', emailError.message);
      }
    }

    return NextResponse.json(
      { 
        message: 'Donation recorded successfully', 
        id: result.insertId,
        nextSteps: emailSent 
          ? 'Please check your email for payment instructions' 
          : 'Please contact us at contact@rcailead.org for payment instructions',
        emailSent
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json(
      { error: 'Failed to record donation' },
      { status: 500 }
    );
  }
} 