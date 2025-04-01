'use client';

import styles from './switch.module.css';

import { type JSX, MemoExoticComponent, memo, useEffect, useState } from 'react';

declare global {
  // eslint-disable-next-line no-var
  var updateDOM: () => void;
}

type ColorSchemePreference = 'system' | 'dark' | 'light';

const STORAGE_KEY = 'duchi-blog-theme' as const;
const modes: ColorSchemePreference[] = ['system', 'dark', 'light'];

/** function to be injected in script tag for avoiding FOUC (Flash of Unstyled Content) */
export const NoFOUCScript = (storageKey: string) => {
  /* can not use outside constants or function as this script will be injected in a different context */
  const [SYSTEM, DARK, LIGHT] = ['system', 'dark', 'light'];

  /** Modify transition globally to avoid patched transitions */
  const modifyTransition = () => {
    const css = document.createElement('style');
    css.textContent = '*,*:after,*:before{transition:none !important;}';
    document.head.appendChild(css);

    return () => {
      /* Force restyle */
      getComputedStyle(document.body);
      /* Wait for next tick before removing */
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  const media = window.matchMedia(`(prefers-color-scheme: ${DARK})`);

  /** function to add remove dark class */
  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    const systemMode = media.matches ? DARK : LIGHT;
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    const classList = document.documentElement.classList;
    if (resolvedMode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    document.documentElement.setAttribute('data-mode', mode);
    restoreTransitions();
  };
  window.updateDOM();
  media.addEventListener('change', window.updateDOM);
};

let updateDOM: () => void;

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<ColorSchemePreference>('system');

  // 클라이언트 사이드에서만 localStorage에 접근하도록 수정
  useEffect(() => {
    setMounted(true);
    setMode((localStorage.getItem(STORAGE_KEY) ?? 'system') as ColorSchemePreference);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // store global functions to local variables to avoid any interference
    updateDOM = window.updateDOM;
    /** Sync the tabs */
    window.addEventListener('storage', (e): void => {
      if (e.key === STORAGE_KEY) {
        setMode(e.newValue as ColorSchemePreference);
      }
    });
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(STORAGE_KEY, mode);
    updateDOM?.();
  }, [mode, mounted]);

  /** toggle mode */
  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };

  // 서버사이드 렌더링 중에는 빈 버튼 반환
  if (!mounted) {
    return <button className={styles.switch} />;
  }

  return <button suppressHydrationWarning className={styles.switch} onClick={handleModeSwitch} />;
};

const Script: MemoExoticComponent<() => JSX.Element> = memo(function Script() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`,
      }}
    />
  );
});

/**
 * This component wich applies classes and transitions.
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};
