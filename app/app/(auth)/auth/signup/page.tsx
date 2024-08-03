import Link from 'next/link';
import SignupForm from './components/signup-form';

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>회원가입</div>
      <SignupForm />

      <div>
        이미 계정이 있으신가요? <Link href="/app/auth/signin">로그인</Link>
      </div>
    </main>
  );
}
