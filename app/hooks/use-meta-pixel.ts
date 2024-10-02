import { useEffect } from 'react';

export default function useMetaPixel() {
  useEffect(() => {
    if (typeof window.fbq !== 'function') return;

    if (!window.fbq.instance) {
      window.fbq('init', '1620393688508165');
    }
  }, []);

  const handleMetaPixelEvent = () => {
    if (typeof window.fbq !== 'function') return;
    window.fbq('track', 'CompleteRegistration');
    console.log('done tracking');
  };
  return { handleMetaPixelEvent };
}
