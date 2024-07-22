import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export function PostTitle({ children }: Props) {
  return (
    <h1 className="mb-12 text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl md:leading-none lg:text-7xl">
      {children}
    </h1>
  );
}
