export const dynamic = 'force-dynamic'; // defaults to auto

// TODO: api 호출 주소 env로 개발 모드, 프로덕션 모드일때 나눌 수 있도록 해야함.

const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: Request) {
  const { email } = await request.json();
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify({
      email,
      skip_container: 'False',
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
