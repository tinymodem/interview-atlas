'use client';

import { useEffect } from 'react';

export default function LegacyQuestionRedirect({ target }: { target: string }) {
  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return null;
}
