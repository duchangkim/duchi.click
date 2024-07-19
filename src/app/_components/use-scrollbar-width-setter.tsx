'use client';

import { useLayoutEffect } from 'react';

const ScrollbarWidthSetter = () => {
  useLayoutEffect(() => {
    const scrollBox = document.createElement('div');
    scrollBox.style.overflowY = 'scroll';
    scrollBox.style.width = '20px';
    scrollBox.style.height = '20px';
    scrollBox.style.margin = '-20px';
    scrollBox.style.position = 'absolute';
    scrollBox.style.visibility = 'hidden';
    scrollBox.style.border = 'none';
    document.body.appendChild(scrollBox);

    const scrollbarWidth = scrollBox.offsetWidth - scrollBox.clientWidth;
    const isScrollableDocument = window.innerHeight < document.body.scrollHeight;

    if (!isScrollableDocument) {
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    } else {
      document.documentElement.style.setProperty('--scrollbar-width', `0`);
    }

    return () => {
      document.body.removeChild(scrollBox);
    };
  }, []);

  return null;
};

export default ScrollbarWidthSetter;
