import { useSearchContext } from '@/app/_components/search/use-search-context';
import classNames from 'classnames';

export const SearchButton = () => {
  const [showsSearch, setShowsSearch] = useSearchContext();

  return (
    <button
      type="button"
      className={classNames(
        'flex items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-100 active:bg-neutral-200',
        {
          'bg-neutral-200': showsSearch,
        },
      )}
      onClick={() => setShowsSearch(true)}
    >
      <span>Search</span>
      <span className="rounded-sm border bg-white px-1 text-xs text-neutral-500">/</span>
    </button>
  );
};
