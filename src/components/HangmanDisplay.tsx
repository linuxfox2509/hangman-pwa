import stage0 from '../assets/hangman/stage0.png';
import stage1 from '../assets/hangman/stage1.png';
import stage2 from '../assets/hangman/stage2.png';
import stage3 from '../assets/hangman/stage3.png';
import stage4 from '../assets/hangman/stage4.png';
import stage5 from '../assets/hangman/stage5.png';
import stage6 from '../assets/hangman/stage6.png';
import stage7 from '../assets/hangman/stage7.png';
import stage8 from '../assets/hangman/stage8.png';
import stage9 from '../assets/hangman/stage9.png';
import stage10 from '../assets/hangman/stage10.png';
import stage11 from '../assets/hangman/stage11.png';

const stages = [stage0, stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11];

interface HangmanDisplayProps {
  stage: number;
}

export const HangmanDisplay = ({ stage }: HangmanDisplayProps) => {
  const safeStage = Math.max(0, Math.min(11, stage));

  return (
    <div className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm">
      <img src={stages[safeStage]} alt={`Hangman stage ${safeStage}`} className="h-64 w-auto object-contain sm:h-80" />
    </div>
  );
};
