export const dynamic = 'force-dynamic'; // defaults to auto

export async function POST(request: Request) {
  // TODO: request 타입에 signupUserData 넣을 수 있나 확인
  const { name, email, password, yearsOfExp, jobTitle, telNo } = await request.json();

  // TODO: 서버 접근 주소 env로 관리
  const res = await fetch('http://localhost:8000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      years_experience: yearsOfExp,
      job_title: jobTitle,
      call_no: telNo,
      skip_container: 'True',
    }),
  });

  const data = await res.json();
  console.log('data? --------', data);

  return Response.json(data);
}
