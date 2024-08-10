const baseUrl = process.env.API_BASE_URL;

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const slug = params.slug; // platform

  const b = await request.json();
  const requestBody = b.requestId ? { request_id: b.requestId } : {};

  const res = await fetch(`${baseUrl}/platform/connect/${slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();
  console.log('platform/connect/,,,,data? --------', data);
  // TODO 응답값 타입 잡기

  return Response.json(data);
}
