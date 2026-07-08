import { getLetterDisplay } from '../utils/word';

interface WordDisplayProps {
  secretWord: string;
  guessedLetters: string[];
}

export const WordDisplay = ({ secretWord, guessedLetters }: WordDisplayProps) => {
  const fontSize = Math.max(28, Math.min(72, 72 - Math.max(0, secretWord.length - 8) * 2));

  return (
    <div className="min-w-0 w-full overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm">
      <div className="flex min-w-full items-center justify-start" style={{ fontSize: `${fontSize}px` }}>
        {secretWord.split('').map((char, index) => {
          const display = getLetterDisplay(char, guessedLetters);
          const isSpace = char === ' ';
          const isHyphen = char === '-';

          return (
            <span
              key={`${char}-${index}`}
              className={`mx-1 inline-flex min-h-12 min-w-[2rem] items-center justify-center font-black uppercase leading-none ${
                isSpace ? 'w-5' : isHyphen ? 'w-6' : 'w-10 sm:w-12'
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
