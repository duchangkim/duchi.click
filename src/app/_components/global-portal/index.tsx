import { PortalConsumerProps } from '@/app/_components/global-portal/portal-consumer';
import {
  PortalProvider,
  PortalProviderProps,
} from '@/app/_components/global-portal/portal-provider';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const PortalConsumer: ComponentType<PortalConsumerProps> = dynamic(
  async () => (await import('@/app/_components/global-portal/portal-consumer')).PortalConsumer,
  {
    ssr: false,
  },
);

export const GlobalPortal: {
  Provider: ComponentType<PortalProviderProps>;
  Consumer: ComponentType<PortalConsumerProps>;
} = {
  Provider: PortalProvider,
  Consumer: PortalConsumer,
};
