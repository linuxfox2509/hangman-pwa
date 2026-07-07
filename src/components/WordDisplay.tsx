import { getLetterDisplay } from '../utils/word';

interface WordDisplayProps {
  secretWord: string;
  guessedLetters: string[];
}

export const WordDisplay = ({ secretWord, guessedLetters }: WordDisplayProps) => {
  const fontSize = Math.max(28, Math.min(72, 72 - Math.max(0, secretWord.length - 8) * 2));

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm">
      <div className="flex min-w-full items-center justify-center" style={{ fontSize: `${fontSize}px` }}>
        {secretWord.split('').map((char, index) => {
          const display = getLetterDisplay(char, guessedLetters);
          const isSpace = char === ' ';
          const isHyphen = char === '-';

          return (
            <span
              key={`${char}-${index}`}
              className={`mx-0.5 inline-flex min-h-12 items-center justify-center font-black uppercase leading-none ${
                isSpace ? 'w-4' : isHyphen ? 'w-5' : 'w-8 sm:w-10'
              }`}
            >
              {display === ' ' ? <span className="h-full w-4 border-b-2 border-slate-400" /> : display}
            </span>
          );
        })}
      </div>
    </div>
  );
};
