import { PortalConsumerProps } from '@/app/_components/global-portal/portal-consumer';
import {
  PortalProvider,
  PortalProviderProps,
} from '@/app/_components/global-portal/portal-provider';
import { ComponentType, JSX, LazyExoticComponent, lazy } from 'react';

// Next.js dynamic 대신 React의 lazy를 사용
const PortalConsumer: LazyExoticComponent<({ children }: PortalConsumerProps) => JSX.Element> =
  lazy(() =>
    import('@/app/_components/global-portal/portal-consumer').then((mod) => ({
      default: mod.PortalConsumer,
    })),
  );

export const GlobalPortal: {
  Provider: ComponentType<PortalProviderProps>;
  Consumer: ComponentType<PortalConsumerProps>;
} = {
  Provider: PortalProvider,
  Consumer: PortalConsumer,
};
