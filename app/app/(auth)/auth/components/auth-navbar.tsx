import Link from 'next/link';
import Image from 'next/image';

export default function AuthNavbar() {
  return (
    <nav
      className={`fixed inset-x-0 top-0 z-20 border-b border-gray-300 bg-white backdrop-blur-sm transition-colors duration-300 sm:border-none`}
    >
      <div className="mx-auto max-w-5xl px-8">
        <div className="flex h-16 justify-between">
          <div className="flex shrink-0 items-center">
            <Link href="/">
              <Image
                src="/assets/new-landing/jiwon-logo-new.png"
                alt="Logo"
                priority
                width={146}
                height={36}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4"></div>
        </div>
      </div>
    </nav>
  );
}
