'use client';

import { PortalContext } from '@/app/_components/global-portal/portal-provider';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalConsumerProps {
  children: ReactNode;
}

export const PortalConsumer = ({ children }: PortalConsumerProps) => {
  return (
    <PortalContext.Consumer>
      {(portalContainerRef) => {
        if (!portalContainerRef) {
          return null;
        }

        return createPortal(children, portalContainerRef);
      }}
    </PortalContext.Consumer>
  );
};
