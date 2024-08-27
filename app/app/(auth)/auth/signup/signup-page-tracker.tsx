// app/app/(auth)/auth/signup/signup-page-tracker.tsx

'use client';

import { useEffect } from 'react';

export default function SignupPageTracker() {
  useEffect(() => {
    // Check if fbq is available
    if (typeof window.fbq !== 'function') return;

    // Track the ViewContent event
    window.fbq('track', 'ViewContent');
  }, []);

  // This component doesn't render anything
  return null;
}
