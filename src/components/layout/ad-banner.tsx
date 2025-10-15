
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AdBanner() {
  const pathname = usePathname();
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // When the component re-renders (e.g., on path change),
    // we need to tell AdSense it can safely place a new ad here.
    if (insRef.current) {
      insRef.current.innerHTML = '';
      insRef.current.removeAttribute('data-ad-status');
    }

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, [pathname]);

  return (
    <div className="container mx-auto my-4 text-center">
      <div style={{ minHeight: '100px' }} className="flex justify-center items-center bg-muted rounded-lg">
        <ins
          // @ts-ignore
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', maxWidth: '970px', height: '90px' }}
          data-ad-client="ca-pub-3042243846300811" // YOUR_ADSENSE_PUBLISHER_ID
          data-ad-slot="YOUR_AD_SLOT_ID" // An ad unit slot, if you have one
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
