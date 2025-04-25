import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import nodemailer from 'nodemailer';
import { donationEmailTemplate, adminNotificationTemplate } from '@/lib/email-templates';

// Get all donations (admin only)
export async function GET() {
  try {
    const [donations] = await pool.query(
      'SELECT * FROM donations ORDER BY created_at DESC'
    );

    return NextResponse.json(donations);
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

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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
      'INSERT INTO donations (donor_name, email, amount, payment_method, status) VALUES (?, ?, ?, ?, ?)',
      [donor_name, email, amount, payment_method, 'pending']
    );

    // Get the inserted ID
    const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id');
    const insertedId = (rows as any)[0].id;

    // Send email notifications
    let emailSent = false;
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
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
        from: `"iLead Initiative" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank You for Your Donation to iLead Initiative',
        html: donationEmailTemplate(donor_name, amount, payment_method),
      });

      // Send notification to admin
      await transporter.sendMail({
        from: `"iLead Initiative" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || 'kamahorolinda@gmail.com',
        subject: 'New Donation Received',
        html: adminNotificationTemplate(donor_name, email, amount, payment_method),
      });

      emailSent = true;
      console.log('Emails sent successfully');
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      if (emailError instanceof Error) {
        console.error('Email error details:', emailError.message);
      }
    }

    return NextResponse.json(
      { 
        message: 'Donation recorded successfully', 
        id: insertedId,
        nextSteps: `Please send your donation to MTN Mobile Money number +250796060684.`,
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
