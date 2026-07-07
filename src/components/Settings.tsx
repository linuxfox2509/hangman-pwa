import type { Settings as SettingsType } from '../types';

interface SettingsProps {
  settings: SettingsType;
  onChange: (next: SettingsType) => void;
  onBack: () => void;
  autoWordLimit: number;
}

export const Settings = ({ settings, onChange, onBack, autoWordLimit }: SettingsProps) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Preferences</p>
            <h2 className="text-3xl font-black text-slate-900">Settings</h2>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back
          </button>
        </div>

        <div className="mt-8 space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Word length limit</h3>
                <p className="text-sm text-slate-500">Automatic mode follows the current device.</p>
              </div>
              <button
                type="button"
                onClick={() => onChange({ ...settings, wordLimitMode: settings.wordLimitMode === 'auto' ? 'custom' : 'auto' })}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${settings.wordLimitMode === 'auto' ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'}`}
              >
                {settings.wordLimitMode === 'auto' ? 'Automatic' : 'Custom'}
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4">
              <p className="text-sm text-slate-600">
                Current limit: <span className="font-semibold text-slate-900">{settings.wordLimitMode === 'auto' ? autoWordLimit : settings.wordLimit}</span> characters
              </p>
              {settings.wordLimitMode === 'custom' ? (
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={settings.wordLimit}
                  onChange={(event) => onChange({ ...settings, wordLimit: Number(event.target.value) })}
                  className="mt-4 w-full accent-sky-600"
                />
              ) : null}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Mistake limit</h3>
                <p className="text-sm text-slate-500">Choose how many wrong guesses are allowed.</p>
              </div>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">{settings.maxMistakes} mistakes</span>
            </div>
            <input
              type="range"
              min="1"
              max="11"
              value={settings.maxMistakes}
              onChange={(event) => onChange({ ...settings, maxMistakes: Number(event.target.value) })}
              className="mt-4 w-full accent-sky-600"
            />
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Sound effects</h3>
                <p className="text-sm text-slate-500">Toggle audio feedback during play.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={(event) => onChange({ ...settings, soundEffects: event.target.checked })}
                className="h-5 w-5 accent-sky-600"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
