import { NextResponse } from 'next/server';
// You'll need to install nodemailer: pnpm add nodemailer @types/nodemailer
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, organization, services, message } = formData;

    // Configure your email transport
    // You should use environment variables for sensitive information like passwords
    const transporter = nodemailer.createTransport({
      // Replace with your SMTP details
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'), // Default SMTP port
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER, // Your email address
      to: 'shanki.dipak@gmail.com', // Recipient email address
      subject: `Message from ${name} via Portfolio Contact Form`,
      text: 
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        (organization ? `Organization: ${organization}\n` : '') +
        (services ? `Looking for Services: ${services}\n\n` : '\n') +
        `Message:\n${message}`,
      // If you prefer HTML emails, you can use the 'html' field instead of 'text'
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    // In a real application, you might want to log the error and return a more user-friendly message
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}

// Add a GET handler if needed, although not strictly necessary for a contact form
export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
