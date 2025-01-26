import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDb';
import Hackathon from '@/models/Hackathon';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const result = await Hackathon.findByIdAndDelete(params.id);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete proposal' },
      { status: 500 }
    );
  }
} 