import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Update subscriber status
    await pool.query(
      'UPDATE newsletter_subscribers SET status = ? WHERE id = ?',
      ['unsubscribed', id]
    );

    return NextResponse.json(
      { message: 'Successfully unsubscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
} 