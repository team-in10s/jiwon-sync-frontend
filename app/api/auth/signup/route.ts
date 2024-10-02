export const dynamic = 'force-dynamic'; // defaults to auto

const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: Request) {
  // TODO: request 타입에 signupUserData 넣을 수 있나 확인
  const { name, email, password, yearsOfExp, jobTitle, customJobTitle, telNo, gender, birthDate } =
    await request.json();

  const res = await fetch(`${apiUrl}/auth/register`, {
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
      other_job: customJobTitle,
      call_no: telNo,
      gender,
      birthdate: birthDate,
      skip_container: 'True',
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
