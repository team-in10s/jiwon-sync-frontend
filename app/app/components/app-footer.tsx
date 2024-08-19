export default function AppFooter() {
  return (
    <footer className="bg-gray-800 py-10 text-center">
      <div className="container mx-auto px-4">
        <p className="text-gray-300">© 2024 지원전에 Sync. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a
            href="https://www.in10s.co/jiwon-sync/terms"
            target="_blank"
            className="text-gray-300 hover:text-white"
            rel="noreferrer"
          >
            이용약관
          </a>
          <a
            href="https://www.in10s.co/jiwon-sync/privacypolicy"
            target="_blank"
            className="text-gray-300 hover:text-white"
            rel="noreferrer"
          >
            개인정보처리방침
          </a>
          <a
            href="http://pf.kakao.com/_xjxkJbG/chat"
            target="_blank"
            className="text-gray-300 hover:text-white"
            rel="noreferrer"
          >
            고객센터(카카오톡)
          </a>
        </div>
      </div>
    </footer>
  );
}
