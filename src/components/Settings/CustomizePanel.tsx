import React, { useState } from 'react';

interface CustomizePanelProps {
    onClose: () => void;
    customSettings: { focus: number; break: number };
    onUpdateCustomSettings: (focus: number, breakDuration: number) => void;
}

export const CustomizePanel: React.FC<CustomizePanelProps> = ({
    onClose,
    customSettings,
    onUpdateCustomSettings
}) => {
    const [bgColor1, setBgColor1] = useState('#4c1d95'); // indigo-900
    const [bgColor2, setBgColor2] = useState('#831843'); // pink-900
    const [accentColor, setAccentColor] = useState('#ec4899'); // pink-500
    const [focusDuration, setFocusDuration] = useState(Math.floor(customSettings.focus / 60));
    const [breakDuration, setBreakDuration] = useState(Math.floor(customSettings.break / 60));

    const handleApply = () => {
        onUpdateCustomSettings(focusDuration * 60, breakDuration * 60);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">🎨 Customize Your Space</h2>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white text-2xl transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Timer Durations */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">⏱️ Custom Timer Durations</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-white/70 mb-2">Focus Duration (minutes)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="120"
                                    value={focusDuration}
                                    onChange={(e) => setFocusDuration(parseInt(e.target.value) || 1)}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-lg font-semibold"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/70 mb-2">Break Duration (minutes)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    value={breakDuration}
                                    onChange={(e) => setBreakDuration(parseInt(e.target.value) || 1)}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-lg font-semibold"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-white/50 mt-2">
                            💡 These durations apply to Custom mode only. Pomodoro uses the standard 25/5 minute format.
                        </p>
                    </div>

                    {/* Background Colors */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">🌈 Background Gradient</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-white/70 mb-2">Start Color</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="color"
                                        value={bgColor1}
                                        onChange={(e) => setBgColor1(e.target.value)}
                                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white/20"
                                    />
                                    <input
                                        type="text"
                                        value={bgColor1}
                                        onChange={(e) => setBgColor1(e.target.value)}
                                        className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-white/70 mb-2">End Color</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="color"
                                        value={bgColor2}
                                        onChange={(e) => setBgColor2(e.target.value)}
                                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white/20"
                                    />
                                    <input
                                        type="text"
                                        value={bgColor2}
                                        onChange={(e) => setBgColor2(e.target.value)}
                                        className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">✨ Accent Color</h3>
                        <div className="flex gap-2 items-center max-w-xs">
                            <input
                                type="color"
                                value={accentColor}
                                onChange={(e) => setAccentColor(e.target.value)}
                                className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white/20"
                            />
                            <input
                                type="text"
                                value={accentColor}
                                onChange={(e) => setAccentColor(e.target.value)}
                                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleApply}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all shadow-lg"
                        >
                            Apply Changes
                        </button>
                        <button
                            onClick={() => {
                                setFocusDuration(30);
                                setBreakDuration(10);
                                setBgColor1('#4c1d95');
                                setBgColor2('#831843');
                                setAccentColor('#ec4899');
                            }}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-xl font-medium transition-all"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
