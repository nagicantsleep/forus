import { useState, useEffect, useCallback } from 'react';
import { playNotificationSound } from '../utils/sounds';

export type TimerMode = 'focus' | 'break';
export type PresetMode = 'custom' | 'pomodoro';

interface TimerSettings {
    focus: number;
    break: number;
}

const POMODORO_SETTINGS: TimerSettings = {
    focus: 25 * 60, // 25 minutes
    break: 5 * 60,  // 5 minutes
};

const DEFAULT_CUSTOM_SETTINGS: TimerSettings = {
    focus: 30 * 60, // 30 minutes
    break: 10 * 60, // 10 minutes
};

export const useTimer = () => {
    const [presetMode, setPresetMode] = useState<PresetMode>('pomodoro');
    const [mode, setMode] = useState<TimerMode>('focus');
    const [isActive, setIsActive] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Load custom settings from localStorage
    const [customSettings, setCustomSettings] = useState<TimerSettings>(() => {
        const saved = localStorage.getItem('customTimerSettings');
        return saved ? JSON.parse(saved) : DEFAULT_CUSTOM_SETTINGS;
    });

    const currentSettings = presetMode === 'pomodoro' ? POMODORO_SETTINGS : customSettings;
    const [timeLeft, setTimeLeft] = useState(currentSettings.focus);

    // Save custom settings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('customTimerSettings', JSON.stringify(customSettings));
    }, [customSettings]);

    const updateCustomSettings = useCallback((focus: number, breakDuration: number) => {
        setCustomSettings({ focus, break: breakDuration });
        // If in custom mode and not started, update the current time
        if (presetMode === 'custom' && !hasStarted) {
            setTimeLeft(mode === 'focus' ? focus : breakDuration);
        }
    }, [presetMode, hasStarted, mode]);

    const reset = useCallback(() => {
        setIsActive(false);
        setHasStarted(false);
        setTimeLeft(currentSettings[mode]);
    }, [mode, currentSettings]);

    const toggleTimer = useCallback(() => {
        setIsActive((prev) => !prev);
        if (!isActive) {
            setHasStarted(true);
        }
    }, [isActive]);

    const changeMode = useCallback((newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        setHasStarted(false);
        setTimeLeft(currentSettings[newMode]);
    }, [currentSettings]);

    const changePresetMode = useCallback((newPreset: PresetMode) => {
        const newSettings = newPreset === 'pomodoro' ? POMODORO_SETTINGS : customSettings;
        setPresetMode(newPreset);
        setMode('focus');
        setIsActive(false);
        setHasStarted(false);
        setTimeLeft(newSettings.focus);
    }, [customSettings]);

    useEffect(() => {
        let interval: number | undefined;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            // Play bell notification sound
            playNotificationSound();

            // Switch to the opposite mode
            const nextMode: TimerMode = mode === 'focus' ? 'break' : 'focus';
            setMode(nextMode);
            setTimeLeft(currentSettings[nextMode]);
            // Keep timer active to continue automatically
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode, currentSettings]);

    return {
        timeLeft,
        isActive,
        mode,
        presetMode,
        hasStarted,
        customSettings,
        toggleTimer,
        reset,
        changeMode,
        changePresetMode,
        updateCustomSettings,
    };
};
