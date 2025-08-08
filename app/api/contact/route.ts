import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { addMessage } from '@/lib/storage';

// Only import MongoDB if we're in production and have the URI
let clientPromise: any = null;
if (process.env.MONGODB_URI && process.env.NODE_ENV === 'production') {
  try {
    clientPromise = require('@/lib/mongodb').default;
  } catch (error) {
    console.warn('MongoDB not available during build');
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, organization, services, message } = formData;

    // Save to MongoDB if available, otherwise use fallback storage
    if (clientPromise && process.env.MONGODB_URI) {
      try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const collection = db.collection("contact_messages");

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
      } catch (dbError) {
        console.error('MongoDB error:', dbError);
        // Use fallback storage
        addMessage({
          name,
          email,
          organization: organization || '',
          services: services || '',
          message,
          ip: request.headers.get('x-forwarded-for') || 'unknown'
        });
      }
    } else {
      // Use fallback storage when MongoDB is not configured
      addMessage({
        name,
        email,
        organization: organization || '',
        services: services || '',
        message,
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      });
    }

    // Send email notification
    if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
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
    }

    return NextResponse.json({ 
      message: 'Message processed successfully',
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
