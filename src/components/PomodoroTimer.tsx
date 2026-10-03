import React, { useState, useEffect, useRef } from 'react';
import { soundscapeEngine } from '../utils/audioSynthesizer';
import { Subject } from '../types/study';
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX, Sparkles, CheckCircle, Clock } from 'lucide-react';

interface PomodoroTimerProps {
  subjects: Subject[];
  onSessionComplete: (durationMinutes: number, subjectId: string, taskTitle: string) => void;
}

type TimerMode = 'pomodoro' | 'deep-work' | 'ultradian' | 'custom';

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ subjects, onSessionComplete }) => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [taskName, setTaskName] = useState<string>('Focused concept review & problem drill');
  const [soundscape, setSoundscape] = useState<'rain' | 'binaural' | 'whitenoise' | 'lofi' | 'off'>('binaural');
  const [volume, setVolume] = useState<number>(0.5);

  // Time durations in seconds
  const durations: Record<TimerMode, { work: number; break: number }> = {
    pomodoro: { work: 25 * 60, break: 5 * 60 },
    'deep-work': { work: 50 * 60, break: 10 * 60 },
    ultradian: { work: 90 * 60, break: 20 * 60 },
    custom: { work: 30 * 60, break: 5 * 60 },
  };

  const [totalSeconds, setTotalSeconds] = useState<number>(durations.pomodoro.work);
  const [secondsLeft, setSecondsLeft] = useState<number>(durations.pomodoro.work);
  const [showCompleteNotification, setShowCompleteNotification] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  // Sync mode changes
  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setIsBreak(false);
    setMode(newMode);
    const secs = durations[newMode].work;
    setTotalSeconds(secs);
    setSecondsLeft(secs);
    soundscapeEngine.stop();
  };

  // Soundscape effect
  useEffect(() => {
    if (isRunning && soundscape !== 'off') {
      soundscapeEngine.setVolume(volume);
      soundscapeEngine.playSoundscape(soundscape);
    } else {
      soundscapeEngine.stop();
    }
    return () => {
      soundscapeEngine.stop();
    };
  }, [isRunning, soundscape]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundscapeEngine.setVolume(val);
  };

  // Timer interval tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isBreak, mode]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    soundscapeEngine.stop();
    soundscapeEngine.playTimerBell();

    if (!isBreak) {
      // Completed a study session
      const completedMinutes = Math.round(totalSeconds / 60);
      onSessionComplete(completedMinutes, selectedSubjectId, taskName);
      setShowCompleteNotification(true);
      // Switch to break
      setIsBreak(true);
      const breakSecs = durations[mode].break;
      setTotalSeconds(breakSecs);
      setSecondsLeft(breakSecs);
    } else {
      // Completed break
      setIsBreak(false);
      const workSecs = durations[mode].work;
      setTotalSeconds(workSecs);
      setSecondsLeft(workSecs);
    }
  };

  const togglePlay = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    soundscapeEngine.stop();
    const secs = isBreak ? durations[mode].break : durations[mode].work;
    setTotalSeconds(secs);
    setSecondsLeft(secs);
  };

  const skipInterval = () => {
    setIsRunning(false);
    soundscapeEngine.stop();
    if (!isBreak) {
      setIsBreak(true);
      const breakSecs = durations[mode].break;
      setTotalSeconds(breakSecs);
      setSecondsLeft(breakSecs);
    } else {
      setIsBreak(false);
      const workSecs = durations[mode].work;
      setTotalSeconds(workSecs);
      setSecondsLeft(workSecs);
    }
  };

  // Format mm:ss
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // SVG circular stroke calculation
  const progressRatio = totalSeconds > 0 ? (totalSeconds - secondsLeft) / totalSeconds : 0;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Session Complete Notification */}
      {showCompleteNotification && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-900 transition-all">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold">Focus block completed & logged!</p>
              <p className="text-xs text-emerald-700">Minutes added to your daily progress. Enjoy your cognitive rest break.</p>
            </div>
          </div>
          <button
            onClick={() => setShowCompleteNotification(false)}
            className="text-xs font-semibold px-3 py-1 bg-white border border-emerald-300 text-emerald-800 rounded hover:bg-emerald-100 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Timer Stage */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10 shadow-sm text-center">
        {/* Mode Selector Segmented Tabs */}
        <div className="inline-flex p-1 bg-stone-100 rounded-lg max-w-full overflow-x-auto mb-8">
          <button
            onClick={() => switchMode('pomodoro')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              mode === 'pomodoro' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Classic (25 / 5m)
          </button>
          <button
            onClick={() => switchMode('deep-work')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              mode === 'deep-work' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Deep Work (50 / 10m)
          </button>
          <button
            onClick={() => switchMode('ultradian')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              mode === 'ultradian' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Ultradian (90 / 20m)
          </button>
        </div>

        {/* Circular Progress Display */}
        <div className="relative w-72 h-72 mx-auto flex items-center justify-center mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
            {/* Background track */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-stone-100"
            />
            {/* Animated progress circle */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-500 ${
                isBreak ? 'text-teal-500' : 'text-amber-500'
              }`}
            />
          </svg>

          {/* Time Counter in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-600 mb-1">
              {isBreak ? 'Rest & Restore Break' : 'Active Study Sprint'}
            </span>
            <span className="text-5xl sm:text-6xl font-bold font-mono tabular-nums text-stone-900 tracking-tight">
              {formattedTime}
            </span>
            <span className="text-xs text-stone-600 mt-2 font-medium">
              {isRunning ? 'Synthesizing focus wave' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={resetTimer}
            title="Reset interval"
            className="p-3 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer border border-stone-200"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className={`px-8 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2.5 shadow-sm transition-all cursor-pointer ${
              isRunning
                ? 'bg-stone-800 text-white hover:bg-stone-700'
                : 'bg-amber-400 text-stone-900 hover:bg-amber-300'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause Session</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Begin Sprint</span>
              </>
            )}
          </button>

          <button
            onClick={skipInterval}
            title={isBreak ? 'Skip break to study' : 'Skip to break'}
            className="p-3 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer border border-stone-200"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Study Context Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left p-4 rounded-lg bg-stone-50 border border-stone-200 mb-8">
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">Subject / Discipline</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full text-sm bg-white border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">Current Focus Task</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g. Chapter 4 problem set, Feynman breakdown"
              className="w-full text-sm bg-white border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Ambient Soundscape Synthesizer Deck */}
        <div className="border-t border-stone-100 pt-6 text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-stone-800">
                Cognitive Soundscape (Web Audio Synthesizer)
              </span>
            </div>

            {/* Volume control */}
            {soundscape !== 'off' && (
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-stone-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-amber-500 h-1.5 bg-stone-200 rounded cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'binaural', label: '40Hz Gamma Focus Wave' },
              { id: 'rain', label: 'Rain on Library Skylight' },
              { id: 'whitenoise', label: 'Filtered Brown Noise' },
              { id: 'lofi', label: 'Warm Lo-Fi Ambient Hum' },
              { id: 'off', label: 'Muted Silence' },
            ].map((snd) => (
              <button
                key={snd.id}
                onClick={() => setSoundscape(snd.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer ${
                  soundscape === snd.id
                    ? 'bg-stone-900 text-amber-300 border-stone-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
