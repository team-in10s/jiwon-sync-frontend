// app/app/components/main-logo-link.tsx

import Link from 'next/link';
import Image from 'next/image';
import mainLogo from '../../main_logo.png';

export default function MainLogoLink() {
  return (
    <Link href="/app/resume" className="flex gap-1.5">
      <div className="h-8 w-32">
        <Image src={mainLogo} alt="지원전에 Sync" unoptimized={true} />
      </div>
      <span className="text-gradient text-xl font-bold">Sync</span>
    </Link>
  );
}
