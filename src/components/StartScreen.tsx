import { useState } from 'react';
import type { Settings } from '../types';

interface StartScreenProps {
  secretWord: string;
  hint: string;
  onSecretWordChange: (value: string) => void;
  onHintChange: (value: string) => void;
  onStart: () => void;
  onOpenSettings: () => void;
  maxWordLength: number;
  error: string;
  settings: Settings;
}

const filterWordInput = (value: string): string => value.toUpperCase().replace(/[^A-Z\s\-.,!?'"()]/g, '');

export const StartScreen = ({
  secretWord,
  hint,
  onSecretWordChange,
  onHintChange,
  onStart,
  onOpenSettings,
  maxWordLength,
  error,
  settings
}: StartScreenProps) => {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-2xl backdrop-blur sm:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Local multiplayer</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Hangman</h1>
          </div>
          <button
            type="button"
            onClick={onOpenSettings}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Settings
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Secret word
              <div className="relative mt-2">
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={secretWord}
                  onChange={(event) => onSecretWordChange(filterWordInput(event.target.value))}
                  maxLength={maxWordLength}
                  placeholder="Enter a secret word"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 pr-28 text-xl font-semibold tracking-[0.2em] text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
                >
                  {showSecret ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
            <p className="text-sm text-slate-500">{secretWord.length} / {maxWordLength} characters</p>

            <label className="block text-sm font-semibold text-slate-700">
              Optional hint
              <input
                type="text"
                value={hint}
                onChange={(event) => onHintChange(event.target.value)}
                maxLength={80}
                placeholder="Helpful clue"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-lg text-slate-900 outline-none ring-0 focus:border-sky-500"
              />
            </label>

            {error ? <p className="rounded-2xl bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p> : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onStart}
                className="flex-1 rounded-2xl bg-sky-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-sky-700"
              >
                Start game
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">How it works</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>• One person enters the secret word and hint.</li>
              <li>• The other person guesses letters on the large on-screen keyboard.</li>
              <li>• The word stays visible and scales to fit the screen.</li>
              <li>• Current settings: {settings.wordLimitMode === 'auto' ? 'automatic word limit' : 'custom word limit'} with {settings.maxMistakes} mistakes allowed.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
