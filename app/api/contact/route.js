import { NextResponse } from 'next/server';

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { firstname, lastname, email, phone, service, message } = body;
      
      console.log('Form submission:', { firstname, lastname, email, phone, service, message });

      return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error processing form submission:', error);
      return NextResponse.json({ message: 'Error submitting form' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}