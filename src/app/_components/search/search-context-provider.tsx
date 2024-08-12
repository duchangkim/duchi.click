'use client';

import { Context, ReactNode, createContext, useState } from 'react';

export interface SearchContextProviderProps {
  children: ReactNode;
}

export interface SearchContextValue {
  shows: boolean;
  setShows: (shows: boolean) => void;
}

export const SearchContext: Context<SearchContextValue | undefined> = createContext<
  SearchContextValue | undefined
>({
  shows: false,
  setShows: () => {},
});

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [shows, setShows] = useState(false);

  return <SearchContext.Provider value={{ shows, setShows }}>{children}</SearchContext.Provider>;
};
