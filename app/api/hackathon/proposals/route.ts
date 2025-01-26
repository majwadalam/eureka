import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDb';
import Hackathon from '@/models/Hackathon';
import { unstable_noStore } from 'next/cache';

export async function GET() {
  unstable_noStore();
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