import { permanentRedirect } from 'next/navigation';

export default function LegacyZhHomePage() {
  permanentRedirect('/');
}
