import { HangmanDisplay } from './HangmanDisplay';
import { Keyboard } from './Keyboard';
import { WordDisplay } from './WordDisplay';
import type { GameState, Settings } from '../types';

interface GameScreenProps {
  game: GameState;
  settings: Settings;
  onGuess: (letter: string) => void;
  onNewGame: () => void;
  onOpenSettings: () => void;
}

export const GameScreen = ({ game, settings, onGuess, onNewGame, onOpenSettings }: GameScreenProps) => {
  const stage = Math.min(11, Math.max(0, game.startingStage + game.mistakes));
  const remaining = settings.maxMistakes - game.mistakes;
  const prompt = game.status === 'won' ? 'You Win!' : game.status === 'lost' ? 'Game Over' : 'Keep going';

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Hangman</p>
          <h2 className="text-2xl font-black text-slate-900">{prompt}</h2>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onOpenSettings} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
            Settings
          </button>
          <button type="button" onClick={onNewGame} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-700">
            New Game
          </button>
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6">
          <div className="rounded-2xl bg-slate-50 p-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Hint</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{game.hint || 'No hint provided.'}</p>
          </div>

          <HangmanDisplay stage={stage} />

          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Word</p>
            <div className="mt-2">
              <WordDisplay secretWord={game.secretWord} guessedLetters={game.guessedLetters} />
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Mistakes</p>
              <p className="mt-1 text-3xl font-black text-slate-900">{game.mistakes} / {settings.maxMistakes}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Remaining</p>
              <p className="mt-1 text-3xl font-black text-slate-900">{remaining}</p>
            </div>
          </div>

          <Keyboard game={game} onGuess={onGuess} />

          {(game.status === 'won' || game.status === 'lost') && (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
              <h3 className="text-2xl font-black text-slate-900">{game.status === 'won' ? 'You Win!' : 'Game Over'}</h3>
              <p className="mt-2 text-sm text-slate-600">The word was: <span className="font-semibold uppercase text-slate-900">{game.secretWord}</span></p>
              <button type="button" onClick={onNewGame} className="mt-4 rounded-full bg-sky-600 px-5 py-3 font-semibold text-white shadow transition hover:bg-sky-700">
                New Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
