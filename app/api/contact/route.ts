import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, organization, services, message } = formData;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("portfolio");
    const collection = db.collection("contact_messages");

    // Save message to MongoDB
    const messageDoc = {
      name,
      email,
      organization: organization || '',
      services: services || '',
      message,
      timestamp: new Date(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    };

    await collection.insertOne(messageDoc);

    // Configure email transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'shanki.dipak@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
        ${services ? `<p><strong>Services Needed:</strong> ${services}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from your portfolio contact form at ${new Date().toLocaleString()}</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      message: 'Message saved and email sent successfully',
      success: true 
    });
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ 
      message: 'Failed to process message', 
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
