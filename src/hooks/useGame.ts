import { useState } from 'react';
import type { GameState, Settings } from '../types';

export const useGame = (settings: Settings) => {
  const [game, setGame] = useState<GameState | null>(null);

  const startGame = (secretWord: string, hint: string) => {
    const startingStage = 11 - settings.maxMistakes;

    setGame({
      secretWord,
      hint,
      guessedLetters: [],
      mistakes: 0,
      status: 'playing',
      startingStage
    });
  };

  const makeGuess = (letter: string) => {
    if (!game || game.status !== 'playing') {
      return;
    }

    if (game.guessedLetters.includes(letter)) {
      return;
    }

    const guessedLetters = [...game.guessedLetters, letter];
    const isCorrect = game.secretWord.includes(letter);

    if (isCorrect) {
      const hasWon = game.secretWord.split('').every((char) => {
        if (/[A-Z]/.test(char)) {
          return guessedLetters.includes(char);
        }
        return true;
      });

      setGame({
        ...game,
        guessedLetters,
        status: hasWon ? 'won' : 'playing'
      });
      return;
    }

    const mistakes = game.mistakes + 1;
    const status = mistakes >= settings.maxMistakes ? 'lost' : 'playing';

    setGame({
      ...game,
      guessedLetters,
      mistakes,
      status
    });
  };

  const resetGame = () => setGame(null);

  return {
    game,
    startGame,
    makeGuess,
    resetGame
  } as const;
};
