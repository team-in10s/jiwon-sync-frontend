'use client';

import Image from 'next/image';

export default function AppleStoreButton() {
  const handleButtonClick = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    if (isAndroid) {
      // Redirect to Google Play Store
      window.location.href = 'https://play.google.com/store';
    } else if (isIOS) {
      // Redirect to Apple App Store
      window.location.href = 'https://apps.apple.com';
    } else {
      // Log "pc" to the console for desktop users
      console.log('pc');
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className="flex items-center gap-2 rounded-lg bg-dimmed-70 px-4 py-2 font-medium text-white transition duration-300 hover:bg-gray-800"
    >
      <Image src="/assets/new-landing/applekorea.png" alt="App Store" width={20} height={20} />
      App Store
    </button>
  );
}
