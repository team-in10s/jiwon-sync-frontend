// TODO: 아래 dynamic 값 리서치 필요
export const dynamic = 'force-dynamic'; // defaults to auto

const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // TODO: 서버 접근 주소 env로 관리
  const res = await fetch(`${apiUrl}/resume/main/status`, {
    method: 'GET',
    headers: {
      //   'Content-Type': 'application/json', false?
      Authorization: authHeader,
    },
  });
  const data = await res.json();
  console.log('data? --------', data);
  // TODO 응답값 타입 잡기
  /**
   성공 시 응답값
   data? -------- {
        processing: false
    }

   */

  return Response.json(data);
}
