import { useEffect, useState } from 'react';

const getMode = (): string => {
  const media = matchMedia(`(prefers-color-scheme: dark)`);
  const mode = document.documentElement.getAttribute('data-mode') || 'system';
  const systemMode = media.matches ? 'dark' : 'light';

  return mode === 'system' ? systemMode : mode;
};

export const useTheme = () => {
  const [mode, setMode] = useState(getMode());

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.some((mutation) => {
        if (mutation.attributeName === 'data-mode') {
          setMode(getMode());

          // 조건에 만족하는 즉시 순회 종료
          return true;
        }

        return false;
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return mode;
};
