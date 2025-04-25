import { NextResponse } from 'next/server';
import { truncateNewsletterSubscribers } from '@/lib/db-operations';

export async function POST(req: Request) {
  try {
    // Check if the request has the correct authorization
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    // You should implement proper token validation here
    // For now, we'll use a simple check
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const success = await truncateNewsletterSubscribers();
    
    if (success) {
      return NextResponse.json(
        { message: 'Newsletter subscribers table truncated successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to truncate newsletter subscribers table' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in truncate endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 