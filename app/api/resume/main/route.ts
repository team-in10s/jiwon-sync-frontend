// TODO: 아래 dynamic 값 리서치 필요
export const dynamic = 'force-dynamic'; // defaults to auto

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization header missing' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // TODO: request 타입에 signupUserData 넣을 수 있나 확인
  const formData = await request.formData();

  // TODO: 서버 접근 주소 env로 관리
  const res = await fetch('http://localhost:8000/api/resume/main', {
    method: 'POST',
    headers: {
      Authorization: authHeader,
    },
    body: formData,
  });

  const data = await res.json();
  console.log('data? --------', data); // 성공 시, data 가 이렇게 { success: true, message: 'Main resume saved successfully' } 생김

  return Response.json(data);
}
