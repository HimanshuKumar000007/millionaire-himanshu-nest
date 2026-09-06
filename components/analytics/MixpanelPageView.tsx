'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function MixpanelPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.mixpanel && typeof window.mixpanel.track === 'function') {
      window.mixpanel.track('Page View', {
        page: pathname,
        url: window.location.href,
      });
    }
  }, [pathname]);

  return null;
}
