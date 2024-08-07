import { SearchContext } from '@/app/_components/search/search-context-provider';
import { useContext } from 'react';

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchContextProvider');
  }

  return [context.shows, context.setShows] as const;
};
