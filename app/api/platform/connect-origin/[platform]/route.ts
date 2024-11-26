const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: Request, { params }: { params: { platform: string } }) {
  const { platform_id, platform_pw, status } = await request.json();
  const platform = params.platform;

  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await fetch(`${apiUrl}/api/platform/connect-origin/${platform}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify({
      platform_id,
      platform_pw,
      status,
    }),
  });

  const data = await response.json();

  return Response.json(data);
}
