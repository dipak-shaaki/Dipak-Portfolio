import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
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
        return NextResponse.json({
            message: 'Failed to fetch messages',
            error: error.message
        }, { status: 500 });
    }
}

export async function POST() {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
