import { type NextRequest } from 'next/server';

// TODO: 아래 dynamic 값 리서치 필요
export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('telNo') || ''; // query is "hello" for /api/search?query=hello

  // TODO: 서버 접근 주소 env로 관리
  const res = await fetch(
    `http://localhost:8000/api/auth/check_phone?phone=${encodeURIComponent(query)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();

  return Response.json(data);
}
