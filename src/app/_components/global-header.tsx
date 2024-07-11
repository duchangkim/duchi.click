'use client';

import Container from '@/app/_components/container';
import { ThemeSwitcher } from '@/app/_components/theme-switcher';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLProps, forwardRef } from 'react';

interface StyledAnchorProps extends HTMLProps<HTMLAnchorElement> {
  isCurrentPath?: boolean;
}

const StyledAnchor: React.ElementType = forwardRef<HTMLAnchorElement, StyledAnchorProps>(
  ({ isCurrentPath, className, ...props }, forwardedRef) => {
    return (
      <a
        ref={forwardedRef}
        className={cn(
          'relative',
          'before:absolute before:bottom-0 before:hidden before:h-1 before:w-full before:translate-y-0.5 before:bg-slate-800 before:opacity-60 before:content-[""] hover:before:block dark:before:bg-slate-50 dark:before:opacity-70',
          {
            'font-bold': isCurrentPath,
          },
          className,
        )}
        {...props}
      />
    );
  },
);
StyledAnchor.displayName = 'StyledAnchor';

const GlobalHeader = () => {
  const pathname = usePathname();

  const isCurrentPath = (path: string) => path === pathname;

  return (
    <header className="fixed left-0 right-0 top-0 border-b border-b-zinc-200 bg-white dark:border-b-zinc-700 dark:bg-zinc-900">
      <Container>
        <nav className="flex items-center justify-between gap-4 py-4" aria-label="Main Navigation">
          <div>
            <Link className="text-3xl font-extrabold" href="/">
              Duchi
              <span className="text-5xl/5 font-extrabold text-green-500">.</span>
            </Link>
          </div>
          <div className="flex gap-4 lg:gap-8">
            <ul className="flex gap-4">
              <li>
                <Link href="/blog" passHref legacyBehavior>
                  <StyledAnchor isCurrentPath={isCurrentPath('/blog')}>Blog</StyledAnchor>
                </Link>
              </li>
              <li>
                <Link href="/showcase" passHref legacyBehavior>
                  <StyledAnchor isCurrentPath={isCurrentPath('/showcase')}>Showcase</StyledAnchor>
                </Link>
              </li>
              <li>
                <Link href="https://about.duchi.click" passHref legacyBehavior>
                  <StyledAnchor className="external-link" target="_blank" rel="noopener noreferrer">
                    About
                  </StyledAnchor>
                </Link>
              </li>
            </ul>
            <ThemeSwitcher />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default GlobalHeader;
