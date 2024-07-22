'use client';

import { useTheme } from '@/hooks/use-theme';
import Giscus from '@giscus/react';

const Comments = () => {
  const theme = useTheme();

  const getGiscusTheme = (theme: string): string => {
    if (theme === 'dark') {
      return 'dark_dimmed';
    }

    return 'light';
  };

  return (
    <Giscus
      id="comments"
      repo="duchangkim/duchi.click"
      repoId="R_kgDOMUfd0g"
      category="Announcements"
      categoryId="DIC_kwDOMUfd0s4ChEw3"
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={getGiscusTheme(theme)}
      lang="ko"
      loading="lazy"
    />
  );
};

export default Comments;
