import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { message: "hello world" },
    {
      headers: {
        'Access-Control-Allow-Origin': '*', // Allows your React app to connect
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}