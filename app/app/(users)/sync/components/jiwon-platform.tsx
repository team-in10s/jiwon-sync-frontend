import Link from 'next/link';

export default function JiwonPlatform() {
  return (
    <div className="">
      <p className="mb-4">
        <span className="shiny-text">지원전에</span> 에서 이력서를 관리하면 모든 채용 플랫폼에
        자동으로 동기화됩니다.
      </p>
      {/* .btn-gradient {
    background: linear-gradient(135deg, var(--primary-color), #00ccff);
    color: var(--secondary-color);
  } */}
      {/* <Link
        href="/app/resume"
        className="mt-4 rounded-full bg-gradient-to-r from-primary to-[#00ccff] px-4 py-2 text-sm text-black"
      >
        이력서 관리하러 가기
      </Link> */}
      <Link
        href="/app/resume"
        className="mt-4 rounded-full border border-primary px-4 py-2 text-sm"
      >
        이력서 관리하러 가기
      </Link>
    </div>
  );
}
