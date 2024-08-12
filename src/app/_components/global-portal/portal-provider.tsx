'use client';

import { Context, ReactNode, createContext, useState } from 'react';

export const PortalContext: Context<HTMLDivElement | undefined> = createContext<
  HTMLDivElement | undefined
>(undefined);

export interface PortalProviderProps {
  children: ReactNode;
}

export const PortalProvider = ({ children }: PortalProviderProps) => {
  const [portalContainerRef, setPortalContainerRef] = useState<HTMLDivElement | undefined>(
    undefined,
  );

  return (
    <PortalContext.Provider value={portalContainerRef}>
      {children}
      <div
        id="portal-container"
        className="z-50"
        ref={(elem) => {
          if (portalContainerRef || elem === null) {
            return;
          }

          setPortalContainerRef(elem);
        }}
      />
    </PortalContext.Provider>
  );
};
