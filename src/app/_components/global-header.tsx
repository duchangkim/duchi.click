'use client';

import Container from '@/app/_components/container';
import { GlobalPortal } from '@/app/_components/global-portal';
import { ThemeSwitcher } from '@/app/_components/theme-switcher';
import { MY_LINK } from '@/lib/constants';
import classNames from 'classnames';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes, HTMLProps, forwardRef, useEffect, useState } from 'react';

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

const Stick = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={classNames('h-0.5 w-full rounded-sm bg-zinc-900 dark:bg-zinc-200', className)}
      {...props}
    ></span>
  );
};
Stick.displayName = 'Stick';

const HamburgerMenu = () => {
  return (
    <div className="flex h-[14px] w-[16px] flex-col items-center justify-between">
      <Stick />
      <Stick />
      <Stick />
      <span className="sr-only">Menu</span>
    </div>
  );
};
HamburgerMenu.displayName = 'HamburgerMenu';

const CloseMenu = () => {
  return (
    <div className="flex h-[14px] w-[16px] flex-col items-center justify-between">
      <Stick className="" style={{ transform: 'translateY(6px) rotate(45deg)' }} />
      <Stick className="" style={{ transform: 'translateY(-6px) rotate(-45deg)' }} />
      <span className="sr-only">Close Menu</span>
    </div>
  );
};

const GlobalHeader = () => {
  const [showsMenu, setShowsMenu] = useState(false);
  const pathname = usePathname();

  const isCurrentPath = (path: string) => {
    const [, firstPathName] = pathname.split('/');

    if (firstPathName === 'posts') {
      return path === '/blog';
    }

    return pathname === path;
  };

  const handleMenuClick = () => {
    setShowsMenu((prev) => !prev);
  };

  const hideMenu = () => {
    setShowsMenu(false);
  };

  useEffect(() => {
    hideMenu();
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-b-zinc-200 bg-white pr-[var(--scrollbar-width)] dark:border-b-zinc-700 dark:bg-zinc-900">
      <Container className="px-0 pl-5 xs:px-5">
        <nav className="flex items-center justify-between gap-4 py-4" aria-label="Main Navigation">
          <div className="">
            <Link className="text-3xl font-extrabold" href="/">
              <span>D</span>
              <span className="hidden xs:inline">uchi</span>
              <span className="text-5xl/5 font-extrabold text-green-500">.</span>
            </Link>
          </div>
          <div className="flex items-center gap-3 xs:gap-4 lg:gap-8">
            <ul className="hidden gap-4 xs:flex">
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
                <Link href={MY_LINK.RESUME} passHref legacyBehavior>
                  <StyledAnchor className="external-link" target="_blank" rel="noopener noreferrer">
                    About
                  </StyledAnchor>
                </Link>
              </li>
            </ul>

            <ThemeSwitcher />

            <button
              className="flex h-[26px] w-[26px] items-center justify-center xs:hidden"
              onClick={handleMenuClick}
            >
              <HamburgerMenu />
            </button>
            {showsMenu && (
              <GlobalPortal.Consumer>
                <div>
                  <div
                    className="fixed left-0 top-0 z-auto h-full w-full bg-zinc-900 bg-opacity-80"
                    onClick={hideMenu}
                  ></div>
                  <div className="fixed bottom-0 right-0 top-0 min-w-[100px] border-l border-zinc-600 bg-white shadow-md dark:border-zinc-700 dark:bg-neutral-900">
                    <div className="flex h-[69px] items-center border-b border-b-zinc-200 pr-[var(--scrollbar-width)] dark:border-b-zinc-700">
                      <div className="ml-auto mr-3 flex">
                        <ThemeSwitcher />
                      </div>
                      <button
                        className="mr-5 flex h-[26px] w-[26px] items-center justify-center"
                        onClick={hideMenu}
                      >
                        <CloseMenu />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-4 px-6 py-8">
                      <li>
                        <Link href="/blog" passHref legacyBehavior>
                          <StyledAnchor isCurrentPath={isCurrentPath('/blog')}>Blog</StyledAnchor>
                        </Link>
                      </li>
                      <li>
                        <Link href="/showcase" passHref legacyBehavior>
                          <StyledAnchor isCurrentPath={isCurrentPath('/showcase')}>
                            Showcase
                          </StyledAnchor>
                        </Link>
                      </li>
                      <li>
                        <Link href={MY_LINK.RESUME} passHref legacyBehavior>
                          <StyledAnchor
                            className="external-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            About
                          </StyledAnchor>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </GlobalPortal.Consumer>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default GlobalHeader;
