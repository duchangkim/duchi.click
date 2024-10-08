'use client';

import { useSearchContext } from '@/app/_components/search/use-search-context';
import highlightStyles from '@/app/_components/text-highlight.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface SearchResultData {
  url: string;
  content: string;
  word_count: number;
  filters: {};
  meta: {
    title: string;
  };
  anchors: string[];
  weighted_locations: {
    weight: number;
    balanced_score: number;
    location: number;
  }[];
  locations: number[];
  raw_content: string;
  raw_url: string;
  excerpt: string;
  sub_results: {
    title: string;
    url: string;
    weighted_locations: {
      weight: number;
      balanced_score: number;
      location: number;
    }[];
    locations: number[];
    excerpt: string;
  }[];
}
export interface SearchResultProps {
  id: string;
  score: number;
  words: number[];
  data: () => Promise<SearchResultData>;
}

export const PAGEFIND_SEARCH_RESULT_BASE_URL = '/_next/static/chunks/app/.next/server/app' as const;

export const SearchResult = ({ ...result }: SearchResultProps) => {
  const [, setShowsSearch] = useSearchContext();
  const [data, setData] = useState<SearchResultData>();

  const convertURL = (url: string) => {
    const [, resultPathWithExtension] = url.split(PAGEFIND_SEARCH_RESULT_BASE_URL);
    const [resultPath] = resultPathWithExtension.split('.');

    return resultPath;
  };

  const handleResultClick = () => {
    setShowsSearch(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await result.data();
      setData(data);
    };

    fetchData()
      .then(() => {})
      .catch(() => {});
  }, [result]);

  if (!data) return null;

  return (
    <Link href={convertURL(data.url)} onClick={handleResultClick}>
      <h3 className="mb-2 text-lg font-semibold dark:text-white">{data.meta.title}</h3>
      <p
        className={classNames(highlightStyles.highlightWrapper, 'after:pl-1 after:content-["..."]')}
        dangerouslySetInnerHTML={{ __html: data.excerpt }}
      />
    </Link>
  );
};
