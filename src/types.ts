export type Screen = 'start' | 'game' | 'settings';

export interface Settings {
  wordLimitMode: 'auto' | 'custom';
  wordLimit: number;
  maxMistakes: number;
  soundEffects: boolean;
}

export interface GameState {
  secretWord: string;
  hint: string;
  guessedLetters: string[];
  mistakes: number;
  status: 'playing' | 'won' | 'lost';
  startingStage: number;
}
