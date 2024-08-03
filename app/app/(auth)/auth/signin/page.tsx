import Link from 'next/link';
import SigninForm from './components/signin-form';

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>로그인</div>
      <SigninForm />
      <div>
        아직 회원이 아니신가요? <Link href="/app/auth/signup">회원가입</Link>
      </div>
    </main>
  );
}
