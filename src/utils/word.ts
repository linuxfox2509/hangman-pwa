export const normalizeSecretWord = (value: string): string => value.trim().toUpperCase();

export const isPlayAbleWord = (value: string): boolean => {
  const lettersOnly = value.replace(/[^A-Z]/g, '');
  return lettersOnly.length > 0;
};

export const getAutoWordLimit = (viewport: 'phone' | 'tablet' | 'desktop'): number => {
  if (viewport === 'phone') return 40;
  if (viewport === 'tablet') return 80;
  return 100;
};

export const getLetterDisplay = (char: string, guessedLetters: string[]): string => {
  if (/[A-Z]/.test(char)) {
    return guessedLetters.includes(char) ? char : '_';
  }

  if (char === ' ') {
    return ' ';
  }

  return char;
};
