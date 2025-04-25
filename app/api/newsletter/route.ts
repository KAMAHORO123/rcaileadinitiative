import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    console.log('Newsletter API route called');
    
    // Check if database connection is available
    if (!pool) {
      console.error('Database connection not available');
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }

    const { email } = await req.json();
    console.log('Received newsletter subscription request:', { email });

    // Validate email
    if (!email || !email.includes('@')) {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    try {
      const [existingSubscribers] = await pool.query(
        'SELECT * FROM newsletter_subscribers WHERE email = ?',
        [email]
      );

      if (existingSubscribers.length > 0) {
        console.log('Email already subscribed:', email);
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Database error checking existing subscribers:', error);
      return NextResponse.json(
        { error: 'Failed to check existing subscriptions' },
        { status: 500 }
      );
    }

    // Insert new subscriber
    try {
      await pool.query(
        'INSERT INTO newsletter_subscribers (email) VALUES (?)',
        [email]
      );
      console.log('New subscriber added to database:', email);
    } catch (error) {
      console.error('Database error inserting new subscriber:', error);
      return NextResponse.json(
        { error: 'Failed to add subscriber' },
        { status: 500 }
      );
    }

    // Check email credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send confirmation email to subscriber
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

      // Send confirmation to subscriber
      const subscriberMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to RCA Ilead Initiative Newsletter!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4A5568;">Welcome to RCA ILEAD Newsletter!</h2>
            <p style="color: #2D3748; line-height: 1.6;">
              Thank you for subscribing to our newsletter. You'll now receive updates about our initiatives, events, and impact in Rwanda.
            </p>
            <p style="color: #2D3748; line-height: 1.6;">
              Stay tuned for our next newsletter!
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
              <p style="color: #718096; font-size: 14px;">
                If you wish to unsubscribe, you can do so at any time by clicking the unsubscribe link in our emails.
              </p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(subscriberMailOptions);
      console.log('Confirmation email sent to subscriber');

      // Send notification to admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: 'kamahorolinda@gmail.com', // Your email address
        subject: 'New Newsletter Subscription',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4A5568;">New Newsletter Subscription</h2>
            <p style="color: #2D3748; line-height: 1.6;">
              A new person has subscribed to your newsletter:
            </p>
            <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #2D3748; margin: 0;">
                <strong>Email:</strong> ${email}
              </p>
              <p style="color: #2D3748; margin: 10px 0 0 0;">
                <strong>Date:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(adminMailOptions);
      console.log('Notification email sent to admin');

    } catch (error) {
      console.error('Error sending emails:', error);
      // Don't return error here, as the subscription was successful
      // Just log the error for monitoring
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 