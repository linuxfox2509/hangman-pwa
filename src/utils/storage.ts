import type { Settings } from '../types';

const STORAGE_KEY = 'hangman-settings';

export const defaultSettings: Settings = {
  wordLimitMode: 'auto',
  wordLimit: 80,
  maxMistakes: 6,
  soundEffects: true
};

export const loadSettings = (): Settings => {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultSettings;
    }

    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      ...defaultSettings,
      ...parsed
    };
  } catch {
    return defaultSettings;
  }
};

export const saveSettings = (settings: Settings): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
