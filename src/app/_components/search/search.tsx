/* eslint-disable require-atomic-updates */
'use client';

declare global {
  interface Window {
    pagefind: any;
  }
}

import { GlobalPortal } from '@/app/_components/global-portal';
import { SearchResult } from '@/app/_components/search/search-result';
import { useSearchContext } from '@/app/_components/search/use-search-context';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export const Search = () => {
  const [showsSearch, setShowsSearch] = useSearchContext();
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const firstAutoFocusRef = useRef<boolean>(true);

  useKeyboardShortcut({
    triggerKey: '/',
    behavior: () => {
      if (showsSearch) {
        return;
      }

      setShowsSearch(true);
    },
  });

  useKeyboardShortcut({
    triggerKey: 'Escape',
    behavior: () => {
      if (!showsSearch) {
        return;
      }

      setShowsSearch(false);
    },
  });

  const handleSearchKeywordChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setKeyword(keyword);

    if (keyword) {
      const searchResult = await window.pagefind.debouncedSearch(keyword);

      if (searchResult === null) {
        setResults([]);

        return;
      }

      setResults(searchResult.results);
    } else {
      setResults([]);
    }
  };

  const handleBackdropClick = () => {
    setShowsSearch(false);
  };

  useEffect(() => {
    async function loadPagefind() {
      if (typeof window.pagefind === 'undefined') {
        try {
          window.pagefind = await import(
            // @ts-expect-error pagefind.js generated after build
            /* webpackIgnore: true */ './pagefind/pagefind.js'
          );
        } catch (e) {
          window.pagefind = { search: () => ({ results: [] }) };
        }
      }
    }

    loadPagefind()
      .then(async () => {
        await window.pagefind.options({
          excerptLength: 15,
          bundlePath: '/',
        });

        window.pagefind.init();

        firstAutoFocusRef.current = false;
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!showsSearch) {
      setKeyword('');
      setResults([]);
      return;
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [showsSearch]);

  return (
    <GlobalPortal.Consumer>
      <div
        className={classNames({
          hidden: !showsSearch,
        })}
        aria-hidden={!showsSearch}
      >
        <div
          className="fixed left-0 top-0 z-auto h-full w-full bg-zinc-900 bg-opacity-80"
          onClick={handleBackdropClick}
        ></div>
        <div className="pointer-events-none fixed left-0 top-0 z-auto flex h-full w-full justify-center">
          <div
            role="dialog"
            className="pointer-events-auto mb-[100px] mt-[100px] flex h-fit max-h-[80%] min-w-[80%] max-w-[80%] flex-col overflow-y-auto rounded-md border border-zinc-600 bg-white shadow-md dark:border-zinc-700 dark:bg-neutral-900 lg:min-w-[60%] lg:max-w-[60%]"
          >
            <div className="sticky top-0 bg-white p-5 dark:bg-neutral-900">
              <input
                ref={inputRef}
                className="w-full rounded-md border border-zinc-200 bg-transparent px-2 py-1.5 text-lg outline-none focus:border-green-500 dark:border-zinc-700"
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={handleSearchKeywordChange}
              />
            </div>
            {results && results.length > 0 && (
              <ul className="flex flex-col gap-4 px-5 pb-5">
                {results.map((result: any) => (
                  <li
                    className="min-h-[100px] w-full rounded-md border border-zinc-200 px-2 py-1.5 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-neutral-800"
                    key={result.id}
                  >
                    <SearchResult {...result} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
};
