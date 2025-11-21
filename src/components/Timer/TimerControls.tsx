import React from 'react';
import type { TimerMode, PresetMode } from '../../hooks/useTimer';

interface TimerControlsProps {
    isActive: boolean;
    mode: TimerMode;
    presetMode: PresetMode;
    hasStarted: boolean;
    onToggle: () => void;
    onReset: () => void;
    onModeChange: (mode: TimerMode) => void;
    onPresetModeChange: (preset: PresetMode) => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
    isActive,
    mode,
    presetMode,
    hasStarted,
    onToggle,
    onReset,
    onModeChange,
    onPresetModeChange,
}) => {
    return (
        <div className="flex flex-col items-center gap-6">
            {/* Preset Mode Selector */}
            <div className="flex gap-3 bg-white/5 p-1 rounded-full backdrop-blur-sm border border-white/10">
                {(['custom', 'pomodoro'] as PresetMode[]).map((preset) => (
                    <button
                        key={preset}
                        onClick={() => onPresetModeChange(preset)}
                        disabled={hasStarted}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${presetMode === preset
                                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                            } ${hasStarted ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={hasStarted ? 'Stop or reset timer to change preset mode' : ''}
                    >
                        {preset === 'custom' ? '⚙️ Custom' : '🍅 Pomodoro'}
                    </button>
                ))}
            </div>

            {/* Timer Mode Selector */}
            <div className="flex gap-4 bg-white/10 p-1 rounded-full backdrop-blur-sm">
                {(['focus', 'break'] as TimerMode[]).map((m) => (
                    <button
                        key={m}
                        onClick={() => onModeChange(m)}
                        disabled={hasStarted}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${mode === m
                                ? 'bg-white text-black shadow-lg'
                                : 'text-white hover:bg-white/20'
                            } ${hasStarted ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={hasStarted ? 'Stop or reset timer to change mode' : ''}
                    >
                        {m === 'focus' ? '🎯 Focus' : '☕ Break'}
                    </button>
                ))}
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={onToggle}
                    className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg active:scale-95"
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={onReset}
                    className="px-8 py-3 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm active:scale-95"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};
