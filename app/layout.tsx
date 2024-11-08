// app/layout.tsx

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Script from 'next/script';
import { HighlightInit } from '@highlight-run/next/client';

import './globals.css';

export const metadata: Metadata = {
  title: '지원전에 - 효율적인 채용 플랫폼 통합 관리 | 스카우트 제안',
  description:
    '여러 채용 사이트 이력서를 자동으로 동기화하여 시간을 절약하고, 한 곳에서 효율적으로 커리어를 관리합니다. 이어지는 스카우트 제안 관리로 더 많은 커리어 기회를 만나세요.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HighlightInit
        projectId={process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID}
        serviceName="jiwon-sync-frontend"
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: [],
        }}
        excludedHostnames={['localhost']} // skip localhost tracking
        debug
      />
      <html lang="en">
        <head>
          {/* Clarity Script */}
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "n4lt84or2b");
          `}
          </Script>

          {/* Meta Pixel Script */}
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1620393688508165');
            fbq('track', 'PageView');
          `}
          </Script>

          {/* Google Tag (gtag.js) */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-KSD286PKSS"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KSD286PKSS');
          `}
          </Script>
        </head>
        <body>
          {children}
          {/* NoScript part of Meta Pixel */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=1620393688508165&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
        </body>
      </html>
    </>
  );
}
