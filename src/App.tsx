import { useEffect, useState } from 'react';
import { GameScreen } from './components/GameScreen';
import { Settings as SettingsScreen } from './components/Settings';
import { StartScreen } from './components/StartScreen';
import { useGame } from './hooks/useGame';
import type { Screen, Settings } from './types';
import { getAutoWordLimit, isPlayAbleWord, normalizeSecretWord } from './utils/word';
import { loadSettings, saveSettings } from './utils/storage';

const getViewport = (): 'phone' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') {
    return 'tablet';
  }

  if (window.innerWidth < 768) {
    return 'phone';
  }

  if (window.innerWidth < 1280) {
    return 'tablet';
  }

  return 'desktop';
};

const playSound = (isCorrect: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = isCorrect ? 660 : 220;
  gainNode.gain.value = 0.05;

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.1);
};

function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [screen, setScreen] = useState<Screen>('start');
  const [secretWord, setSecretWord] = useState('');
  const [hint, setHint] = useState('');
  const [error, setError] = useState('');
  const [viewport, setViewport] = useState<'phone' | 'tablet' | 'desktop'>(getViewport);
  const { game, startGame, makeGuess, resetGame } = useGame(settings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    const handleResize = () => setViewport(getViewport());
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effectiveWordLimit = settings.wordLimitMode === 'auto' ? getAutoWordLimit(viewport) : settings.wordLimit;

  const handleStart = () => {
    const normalizedWord = normalizeSecretWord(secretWord);

    if (!normalizedWord.trim()) {
      setError('Please enter a secret word.');
      return;
    }

    if (!isPlayAbleWord(normalizedWord)) {
      setError('Enter at least one letter for the secret word.');
      return;
    }

    if (normalizedWord.length > effectiveWordLimit) {
      setError(`The secret word must be ${effectiveWordLimit} characters or fewer.`);
      return;
    }

    setError('');
    startGame(normalizedWord, hint.trim());
    setScreen('game');
  };

  const handleGuess = (letter: string) => {
    if (!game || game.status !== 'playing') {
      return;
    }

    if (settings.soundEffects) {
      playSound(game.secretWord.includes(letter));
    }

    makeGuess(letter);
  };

  const handleNewGame = () => {
    resetGame();
    setSecretWord('');
    setHint('');
    setError('');
    setScreen('start');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.17),_transparent_45%)] text-slate-900">
      {screen === 'start' ? (
        <StartScreen
          secretWord={secretWord}
          hint={hint}
          onSecretWordChange={setSecretWord}
          onHintChange={setHint}
          onStart={handleStart}
          onOpenSettings={() => setScreen('settings')}
          maxWordLength={effectiveWordLimit}
          error={error}
          settings={settings}
        />
      ) : screen === 'settings' ? (
        <SettingsScreen
          settings={settings}
          onChange={setSettings}
          onBack={() => setScreen('start')}
          autoWordLimit={effectiveWordLimit}
        />
      ) : game ? (
        <GameScreen
          game={game}
          settings={settings}
          onGuess={handleGuess}
          onNewGame={handleNewGame}
          onOpenSettings={() => setScreen('settings')}
        />
      ) : (
        <StartScreen
          secretWord={secretWord}
          hint={hint}
          onSecretWordChange={setSecretWord}
          onHintChange={setHint}
          onStart={handleStart}
          onOpenSettings={() => setScreen('settings')}
          maxWordLength={effectiveWordLimit}
          error={error}
          settings={settings}
        />
      )}
    </div>
  );
}

export default App;
