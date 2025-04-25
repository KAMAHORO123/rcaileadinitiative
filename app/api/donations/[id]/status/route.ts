import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status } = await request.json();

    // Validate status
    if (!['pending', 'completed', 'failed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update donation status
    await pool.query(
      'UPDATE donations SET status = ? WHERE id = ?',
      [status, id]
    );

    return NextResponse.json(
      { message: 'Donation status updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating donation status:', error);
    return NextResponse.json(
      { error: 'Failed to update donation status' },
      { status: 500 }
    );
  }
} 