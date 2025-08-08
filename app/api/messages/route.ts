import { NextResponse } from 'next/server';
import { getMessages } from '@/lib/storage';

// Only import MongoDB if we're in production and have the URI
let clientPromise: any = null;
if (process.env.MONGODB_URI && process.env.NODE_ENV === 'production') {
  try {
    clientPromise = require('@/lib/mongodb').default;
  } catch (error) {
    console.warn('MongoDB not available during build');
  }
}

export async function GET() {
  try {
    if (!clientPromise || !process.env.MONGODB_URI) {
      // Use fallback storage when MongoDB is not configured
      const messages = getMessages();
      return NextResponse.json({ 
        message: 'Using fallback storage',
        messages,
        count: messages.length 
      });
    }

    const client = await clientPromise;
    const db = client.db("portfolio");
    const collection = db.collection("contact_messages");

    // Get all messages, sorted by timestamp (newest first)
    const messages = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(50) // Limit to last 50 messages
      .toArray();

    return NextResponse.json({ 
      messages,
      count: messages.length 
    });
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    // Fallback to local storage if MongoDB fails
    const messages = getMessages();
    return NextResponse.json({ 
      message: 'Using fallback storage due to database error',
      messages,
      count: messages.length 
    });
  }
}

export async function POST() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
