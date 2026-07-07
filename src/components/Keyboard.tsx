import type { GameState } from '../types';

interface KeyboardProps {
  game: GameState;
  onGuess: (letter: string) => void;
}

const rows = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
  ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
];

export const Keyboard = ({ game, onGuess }: KeyboardProps) => {
  return (
    <div className="space-y-3 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid gap-2 ${row.length === 8 ? 'grid-cols-8' : 'grid-cols-9'}`}
        >
          {row.map((letter) => {
            const isGuessed = game.guessedLetters.includes(letter);
            const isCorrect = isGuessed && game.secretWord.includes(letter);
            const isWrong = isGuessed && !isCorrect;
            const isDisabled = isGuessed || game.status !== 'playing';

            return (
              <button
                key={letter}
                type="button"
                disabled={isDisabled}
                onClick={() => onGuess(letter)}
                className={`h-14 w-full rounded-2xl text-base font-semibold transition ${
                  isCorrect
                    ? 'bg-emerald-500 text-white shadow-md'
                    : isWrong
                      ? 'bg-rose-500 text-white line-through'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                } ${isDisabled ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
