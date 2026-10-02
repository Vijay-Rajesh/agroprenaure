'use client';

import { createContext, useContext } from 'react';
import type { PublicSiteSnapshot } from '@/lib/site-cms';

const SiteDataContext = createContext<PublicSiteSnapshot | null>(null);

export function SiteDataProvider({ children, initialSite }: { children: React.ReactNode; initialSite: PublicSiteSnapshot | null }) {
  return <SiteDataContext.Provider value={initialSite}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  return useContext(SiteDataContext);
}