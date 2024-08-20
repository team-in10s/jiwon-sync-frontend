import { type NextRequest } from 'next/server';

// TODO: 아래 dynamic 값 리서치 필요
export const dynamic = 'force-dynamic'; // defaults to auto

const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('email'); // query is "hello" for /api/search?query=hello

  const res = await fetch(`${apiUrl}/auth/check_email?email=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  // console.log('data? --------', data); // data: { available: false }
  // 성공시, data? -------- { available: false }

  return Response.json(data);
}
