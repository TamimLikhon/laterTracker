// app/api/cron/route.ts
import {NextResponse } from 'next/server'
		
export async function GET(
  req
) {
  // If token is valid, proceed with the API logic
  const authToken = req.headers.get('authorization')?.replace('Bearer ', '');
    
  if (authToken !== process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized access. Invalid token.' },
      { status: 401 }
    );
  }
		
  return new NextResponse.json(
    { message: 'Secure API accessed successfully' }),
    { status: 200 }
  
}
