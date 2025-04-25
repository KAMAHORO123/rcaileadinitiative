import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

// Function to read SVG file
function getSvgLogo(): string {
  try {
    const fullPath = path.join(process.cwd(), 'public', 'logo.svg');
    const svgContent = fs.readFileSync(fullPath, 'utf8');
    // Remove XML declaration and any comments for better email client compatibility
    return svgContent
      .replace(/<\?xml[^>]*\?>/g, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
  } catch (error) {
    console.error('Error reading SVG logo:', error);
    return ''; // Return empty string if logo can't be read
  }
}

// Function to create email HTML
function createEmailHtml(logo: string, content: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>iLead Initiative</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            ${logo}
          </div>
          ${content}
          <div style="margin-top: 30px; text-align: center;">
            ${logo}
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log('Received subscription request for:', email);

    // Validate email
    if (!email || typeof email !== 'string') {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email validation failed:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    try {
      const [existingSubscribers] = await pool.query(
        'SELECT * FROM newsletter_subscribers WHERE email = ?',
        [email]
      );

      if (Array.isArray(existingSubscribers) && existingSubscribers.length > 0) {
        console.log('Email already subscribed:', email);
        return NextResponse.json(
          { message: 'You are already subscribed to our newsletter!' },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error('Database error checking for existing subscribers:', error);
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
      console.log('Successfully added subscriber to database:', email);

      // Get SVG logo
      const svgLogo = getSvgLogo();

      // Create email transporter
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
      try {
        await transporter.verify();
        console.log('Email transporter verified successfully');
      } catch (error) {
        console.error('Email transporter verification failed:', error);
        throw new Error('Email configuration is invalid');
      }

      // Email to subscriber
      const subscriberContent = `
        <h2 style="color: #4A5568; text-align: center;">Welcome to iLead Initiative!</h2>
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
      `;

      // Email to admin
      const adminContent = `
        <h2 style="color: #4A5568; text-align: center;">New Newsletter Subscription</h2>
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
      `;

      const subscriberMailOptions = {
        from: `"iLead Initiative" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to iLead Initiative Newsletter!',
        html: createEmailHtml(svgLogo, subscriberContent),
      };

      const adminMailOptions = {
        from: `"iLead Initiative" <${process.env.EMAIL_USER}>`,
        to: 'kamahorolinda@gmail.com',
        subject: 'New Newsletter Subscription',
        html: createEmailHtml(svgLogo, adminContent),
      };

      // Send both emails
      try {
        // Send subscriber email
        await transporter.sendMail(subscriberMailOptions);
        console.log('Successfully sent confirmation email to subscriber:', email);

        // Send admin email
        await transporter.sendMail(adminMailOptions);
        console.log('Successfully sent notification email to admin');

        return NextResponse.json(
          { message: 'Successfully subscribed to newsletter!' },
          { status: 200 }
        );
      } catch (error) {
        console.error('Error sending emails:', error);
        // Still return success as the subscription was added to database
        return NextResponse.json(
          { message: 'Subscribed to newsletter, but there was an error sending confirmation emails.' },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error('Error in newsletter subscription:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 