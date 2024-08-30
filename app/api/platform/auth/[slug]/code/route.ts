import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
// const apiUrl = 'https://secondly-good-walleye.ngrok-free.app/api';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rqId = params.slug;

  // TODO: 서버 접근 주소 env로 관리
  const res = await fetch(`${apiUrl}/platform/auth/${rqId}/code`, {
    method: 'GET',
    headers: {
      Authorization: authHeader,
    },
  });

  const data = await res.json();

  return Response.json(data);
}
