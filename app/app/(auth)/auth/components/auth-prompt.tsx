import Link from 'next/link';

export default function AuthPrompt({ isSignUpPage }: { isSignUpPage: boolean }) {
  return (
    <p className="mt-4 text-center text-white">
      {isSignUpPage ? (
        <>
          <span>이미 계정이 있으신가요? </span>
          <Link className="hover:text-gradient" href="/app/auth/signin">
            로그인
          </Link>
        </>
      ) : (
        <>
          <span>계정이 없으신가요? </span>
          <Link className="hover:text-gradient" href="/app/auth/signup">
            회원가입
          </Link>
        </>
      )}
    </p>
  );
}
