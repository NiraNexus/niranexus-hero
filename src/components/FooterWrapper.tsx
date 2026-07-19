'use client';

import { usePathname } from 'next/navigation';
import NiraNexusFooter from './NiraNexusFooter';

export default function FooterWrapper() {
  const pathname = usePathname();
  const project = pathname?.startsWith('/model-council') ? 'mc' : 'hub';
  return <NiraNexusFooter project={project} />;
}