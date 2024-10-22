// app/layout.tsx

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Script from 'next/script';

import './globals.css';

import localFont from 'next/font/local';

const localFonts = localFont({
  src: [
    { path: '../public/fonts/NanumSquareNeoTTF-aLt.woff2', weight: '300', style: 'light' },
    { path: '../public/fonts/NanumSquareNeoTTF-bRg.woff2', weight: '400', style: 'regular' },
    { path: '../public/fonts/NanumSquareNeoTTF-cBd.woff2', weight: '500', style: 'bold' },
    { path: '../public/fonts/NanumSquareNeoTTF-dEb.woff2', weight: '600', style: 'extrabold' },
    { path: '../public/fonts/NanumSquareNeoTTF-eHv.woff2', weight: '700', style: 'heavy' },
  ],
  variable: '--font-myFont',
});

export const metadata: Metadata = {
  title: '지원전에 - 커리어에 경쟁력을 더하다',
  description: '지원전에 - 커리어에 경쟁력을 더하다',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={localFonts.variable}>
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
  );
}
