import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDb';
import Hackathon from '@/models/Hackathon';

export async function GET() {
  try {
    await connectDB();
    const proposals = await Hackathon.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(proposals);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch proposals' },
      { status: 500 }
    );
  }
} 