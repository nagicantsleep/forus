import React from 'react';
import type { TimerMode, PresetMode } from '../../hooks/useTimer';

interface TimerDisplayProps {
    timeLeft: number;
    mode: TimerMode;
    presetMode: PresetMode;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, mode, presetMode }) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formatTime = (time: number) => time.toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="text-9xl font-bold tracking-tighter text-white drop-shadow-lg font-mono">
                {formatTime(minutes)}:{formatTime(seconds)}
            </div>
            <div className="mt-4 text-xl font-medium text-white/80 uppercase tracking-widest">
                {mode === 'focus' ? 'Focus Time' : 'Break Time'}
            </div>
            <div className="mt-2 text-sm font-medium text-white/50 uppercase tracking-wider">
                {presetMode === 'custom' ? 'Custom Mode' : 'Pomodoro Standard'}
            </div>
        </div>
    );
};
