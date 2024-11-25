// (GET: 메일 목록 조회)

import { NextRequest } from 'next/server';
import { Email, ErrorResponse } from '@/app/app/(users)/recruitment/types';

const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '0';
  const size = searchParams.get('size') || '20';
  const unreadOnly = searchParams.get('unread_only') || 'false';

  const authHeader = req.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await fetch(
    `${apiUrl}/scout/proposals?page=${page}&size=${size}&unread_only=${unreadOnly}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    }
  );

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    console.error(errorData);

    throw new Error('Failed to fetch emails');
  }

  const data: Email[] = await response.json();
  return Response.json(data);
}
