// app/app/components/main-logo-link.tsx

import Link from 'next/link';
import Image from 'next/image';
import mainLogo from '../../main_logo.png';

export default function MainLogoLink() {
  return (
    <Link href="/app/resume" className="flex gap-1.5">
      <div className="flex shrink-0 items-center">
      <Image
                src="/assets/new-landing/jiwon-logo-new.png"
                alt="Logo"
                priority
                width={172}
                height={42}
              />
      </div>
    </Link>
  );
}
