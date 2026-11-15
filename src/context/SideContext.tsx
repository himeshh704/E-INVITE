import React, { createContext, useContext, useState, useEffect } from 'react';

export type WeddingSide = 'bride' | 'groom';

interface SideContextType {
  side: WeddingSide;
  setSide: (side: WeddingSide) => void;
  isGroomSide: boolean;
  isBrideSide: boolean;
  groomLink: string;
  brideLink: string;
}

const SideContext = createContext<SideContextType | undefined>(undefined);

function detectInitialSide(): WeddingSide {
  if (typeof window === 'undefined') return 'bride';

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const querySide = searchParams.get('side')?.toLowerCase();
    if (querySide === 'groom') return 'groom';
    if (querySide === 'bride') return 'bride';

    const pathname = window.location.pathname.toLowerCase();
    if (pathname.includes('/groom')) return 'groom';
    if (pathname.includes('/bride')) return 'bride';

    const hash = window.location.hash.toLowerCase();
    if (hash.includes('groom')) return 'groom';
    if (hash.includes('bride')) return 'bride';
  } catch (e) {
    // Fallback if URL parsing fails
  }

  return 'bride';
}

export const SideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [side, setSideState] = useState<WeddingSide>(detectInitialSide);

  const setSide = (newSide: WeddingSide) => {
    setSideState(newSide);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('side', newSide);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setSideState(detectInitialSide());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://deep-ashi-celebrations-teal.vercel.app';
  const groomLink = `${origin}/?side=groom`;
  const brideLink = `${origin}/?side=bride`;

  return (
    <SideContext.Provider
      value={{
        side,
        setSide,
        isGroomSide: side === 'groom',
        isBrideSide: side === 'bride',
        groomLink,
        brideLink,
      }}
    >
      {children}
    </SideContext.Provider>
  );
};

export const useWeddingSide = (): SideContextType => {
  const context = useContext(SideContext);
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      side: 'bride',
      setSide: () => {},
      isGroomSide: false,
      isBrideSide: true,
      groomLink: 'https://deep-ashi-celebrations-teal.vercel.app/?side=groom',
      brideLink: 'https://deep-ashi-celebrations-teal.vercel.app/?side=bride',
    };
  }
  return context;
};
