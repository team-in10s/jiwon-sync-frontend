import { type NextRequest } from 'next/server';

// TODO: 아래 dynamic 값 리서치 필요
export const dynamic = 'force-dynamic'; // defaults to auto

const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('telNo') || ''; // query is "hello" for /api/search?query=hello

  // TODO: 서버 접근 주소 env로 관리
  const res = await fetch(`${apiUrl}/auth/check_phone?phone=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return Response.json(data);
}
