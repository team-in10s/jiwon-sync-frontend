import Link from 'next/link';

export default function JiwonPlatform() {
  return (
    <div>
      <p className="mb-4">
        ✨지원전에✨ 에서 이력서를 관리하면 모든 채용 플랫폼에 자동으로 동기화됩니다.
      </p>
      <Link href="/app/resume" className="mt-4 rounded-full bg-lime-300 px-4 py-2 text-sm">
        이력서 관리하러 가기
      </Link>
    </div>
  );
}
