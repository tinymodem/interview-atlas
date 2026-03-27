'use client';

import { useEffect } from 'react';
import { getLegacyZhRedirectPath } from '@/lib/legacy-zh';

export default function LegacyZhRedirect({ target }: { target: string }) {
  useEffect(() => {
    const nextPath = getLegacyZhRedirectPath(window.location.pathname, target);
    window.location.replace(nextPath);
  }, [target]);

  return null;
}
