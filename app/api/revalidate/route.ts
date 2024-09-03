// app/api/revalidate/route.ts

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { path } = await request.json();

  try {
    // Revalidate the specified path
    console.log('path? ', path);
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    // Check if 'err' is an instance of Error
    if (err instanceof Error) {
      return NextResponse.json({ revalidated: false, error: err.message }, { status: 500 });
    } else {
      // Handle unknown error types gracefully
      return NextResponse.json(
        { revalidated: false, error: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
