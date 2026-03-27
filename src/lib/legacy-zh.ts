export function getLegacyZhRedirectPath(pathname: string, target: string): string {
  const normalizedTarget = target || '/';
  const zhSegment = '/zh';

  if (!pathname) {
    return normalizedTarget;
  }

  if (pathname === zhSegment || pathname === `${zhSegment}/`) {
    return '/';
  }

  const zhMarker = `${zhSegment}/`;
  const zhIndex = pathname.indexOf(zhMarker);
  if (zhIndex === -1) {
    return normalizedTarget;
  }

  const basePath = pathname.slice(0, zhIndex);
  const suffix = pathname.slice(zhIndex + zhSegment.length) || '/';
  return `${basePath}${suffix}` || '/';
}
