import { useEffect } from 'react';

export interface KeyboardShortcutOptions {
  triggerKey: string;
  behavior: () => void;
}

export const useKeyboardShortcut = ({ triggerKey, behavior }: KeyboardShortcutOptions) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;

      if (key === triggerKey) {
        behavior();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [triggerKey, behavior]);
};
