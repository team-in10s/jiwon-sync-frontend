export const dynamic = 'force-dynamic'; // defaults to auto

const API_BASE_URL = process.env.API_BASE_URL; // ~i

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const formData = await request.formData();

  // TODO: 서버 접근 주소 env로 관리
  const res = await fetch(`${API_BASE_URL}/resume/main`, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
    },
    body: formData,
  });

  const data = await res.json();

  return Response.json(data);
}
