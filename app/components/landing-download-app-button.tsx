'use client';

import AppleStoreButton from '../app/components/apple-store-button';
import GooglePlayButton from '../app/components/google-play-button';

export default function LandingDownloadAppButton({ center = false }: { center?: boolean }) {
  const handleDownloadClick = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isMobile = /iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/.test(userAgent);
    const isTablet = /ipad|tablet|kindle|playbook/.test(userAgent);

    if (isIOS) {
      // Redirect to Apple App Store
      window.location.href = 'https://apps.apple.com';
    } else if (isAndroid) {
      // Redirect to Google Play Store
      window.location.href = 'https://play.google.com/store';
    } else if (isMobile || isTablet) {
      // If it's a mobile or tablet but not specifically identified as iOS or Android
      console.log('Mobile or Tablet device detected');
    } else {
      // Log "pc" to the console for desktop users
      console.log('pc');
    }
  };

  return (
    <div>
      <div className={`hidden space-x-6 sm:flex ${center ? 'sm:justify-center' : ''}`}>
        <AppleStoreButton />
        <GooglePlayButton />
      </div>

      <div className="text-center sm:hidden">
        <button
          onClick={handleDownloadClick}
          className="rounded-md bg-purple-02 px-3 py-2 text-sm font-medium text-white"
        >
          다운로드
        </button>
      </div>
    </div>
  );
}
