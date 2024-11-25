//(GET: 메일 갯수 조회)

import { TotalEmailErrorResponse, TotalEmailsResponse } from '@/app/app/(users)/recruitment/types';

const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await fetch(`${apiUrl}/scout/proposals/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
  });

  if (!response.ok) {
    const errorData: TotalEmailErrorResponse = await response.json();
    console.error(errorData.detail);
    throw new Error('Failed to fetch total emails!');
  }

  const data: TotalEmailsResponse = await response.json();
  return Response.json(data);
}
