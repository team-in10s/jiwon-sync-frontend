'use client';

import Image from 'next/image';

export default function GooglePlayButton() {
  const handleButtonClick = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/.test(userAgent);
    const isTablet = /ipad|tablet|kindle|playbook/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    if (isIOS) {
      // Redirect to Apple App Store
      window.location.href = 'https://apps.apple.com';
    } else if (isMobile || isTablet) {
      // Redirect to Google Play Store
      window.location.href = 'https://play.google.com/store';
    } else {
      // Log "pc" to the console
      console.log('pc');
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className="flex items-center rounded-lg bg-dimmed-70 px-4 py-2 font-medium text-white transition duration-300 hover:bg-gray-800"
    >
      <Image
        src="/assets/new-landing/googleplay.png"
        alt="Google Play"
        width={20}
        height={20}
        className="mr-2"
      />
      Google Play
    </button>
  );
}
