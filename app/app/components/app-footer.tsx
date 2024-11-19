import Link from 'next/link';
// import MobileDeleteAccountLink from './mobile-delete-account-link';

export default function AppFooter() {
  return (
    <footer className="bg-gray-02 py-9 text-center sm:py-24">
      <div className="container mx-auto px-4">
        <p className="text-gray-300">© 2024 지원전에 Sync. All rights reserved.</p>
        <div className="mt-4 flex flex-col justify-center sm:flex-row sm:space-x-4">
          <a
            href="https://www.in10s.co/jiwon-sync/terms"
            target="_blank"
            className="mb-2 text-gray-300 hover:text-white sm:mb-0"
            rel="noreferrer"
          >
            이용약관
          </a>
          <a
            href="https://www.in10s.co/jiwon-sync/privacypolicy"
            target="_blank"
            className="mb-2 text-gray-300 hover:text-white sm:mb-0"
            rel="noreferrer"
          >
            개인정보처리방침
          </a>
          <a
            href="http://pf.kakao.com/_xjxkJbG/chat"
            target="_blank"
            className="mb-2 text-gray-300 hover:text-white sm:mb-0"
            rel="noreferrer"
          >
            고객센터(카카오톡)
          </a>
          <Link href="/app/delete-account" className="text-gray-300 hover:text-white">
            회원 탈퇴
          </Link>
          {/* <MobileDeleteAccountLink /> */}
        </div>
      </div>
    </footer>
  );
}
