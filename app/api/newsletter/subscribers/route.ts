import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [subscribers] = await pool.query(
      'SELECT id, email, status, created_at FROM newsletter_subscribers ORDER BY created_at DESC'
    );

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
} 