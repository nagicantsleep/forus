import React, { useState } from 'react';
import { TimerDisplay } from './components/Timer/TimerDisplay';
import { TimerControls } from './components/Timer/TimerControls';
import { TaskList } from './components/Tasks/TaskList';
import { AudioPlayer } from './components/Audio/AudioPlayer';
import { Background } from './components/Layout/Background';
import { CustomizePanel } from './components/Settings/CustomizePanel';
import { useTimer } from './hooks/useTimer';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppContent: React.FC = () => {
  const { timeLeft, isActive, mode, presetMode, hasStarted, customSettings, toggleTimer, reset, changeMode, changePresetMode, updateCustomSettings } = useTimer();
  const { theme, setTheme } = useTheme();
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-pink-500/30">
      <Background />

      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="text-2xl font-bold tracking-tighter">forus.</div>
        <div className="flex gap-3">
          {theme === 'customize' && (
            <button
              onClick={() => setShowCustomizePanel(true)}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all text-sm font-medium"
            >
              ⚙️ Settings
            </button>
          )}
          <button
            onClick={() => setTheme(theme === 'minimal' ? 'customize' : 'minimal')}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all text-sm font-medium"
          >
            {theme === 'minimal' ? '🎨 Customize' : '🌑 Minimal'}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* Left Column: Timer */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xl">
          <div className="relative group">
            {theme === 'customize' && (
              <div className={`absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 ${isActive ? 'animate-pulse' : ''}`}></div>
            )}
            <TimerDisplay timeLeft={timeLeft} mode={mode} presetMode={presetMode} />
          </div>

          <div className="mt-8">
            <TimerControls
              isActive={isActive}
              mode={mode}
              presetMode={presetMode}
              hasStarted={hasStarted}
              onToggle={toggleTimer}
              onReset={reset}
              onModeChange={changeMode}
              onPresetModeChange={changePresetMode}
            />
          </div>
        </div>

        {/* Right Column: Tools */}
        <div className="flex-1 w-full max-w-md flex flex-col gap-8">
          <TaskList />
          {theme === 'customize' && <AudioPlayer />}
        </div>
      </main>

      {/* Customize Panel */}
      {showCustomizePanel && (
        <CustomizePanel
          onClose={() => setShowCustomizePanel(false)}
          customSettings={customSettings}
          onUpdateCustomSettings={updateCustomSettings}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
