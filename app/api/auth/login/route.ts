export const dynamic = 'force-dynamic'; // defaults to auto

// TODO: api 호출 주소 env로 개발 모드, 프로덕션 모드일때 나눌 수 있도록 해야함.

export async function POST(request: Request) {
  const { email } = await request.json();
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const res = await fetch('http://localhost:8000/api/auth/login', {
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
  console.log('data? --------', data);

  return Response.json(data);
}
