import React, { useState, useRef, useEffect } from 'react';

interface Sound {
    id: string;
    name: string;
    url: string;
    type: 'file' | 'youtube';
}

const DEFAULT_SOUNDS: Sound[] = [
    {
        id: 'rain',
        name: '🌧️ Rain',
        url: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2393.mp3',
        type: 'file',
    },
    {
        id: 'forest',
        name: '🌲 Forest',
        url: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-1210.mp3',
        type: 'file',
    },
    {
        id: 'white-noise',
        name: '📻 White Noise',
        url: 'https://assets.mixkit.co/sfx/preview/mixkit-white-noise-1140.mp3',
        type: 'file',
    },
    {
        id: 'ocean',
        name: '🌊 Ocean',
        url: 'https://assets.mixkit.co/sfx/preview/mixkit-sea-waves-loop-1196.mp3',
        type: 'file',
    },
    {
        id: 'cafe',
        name: '☕ Cafe',
        url: 'https://assets.mixkit.co/sfx/preview/mixkit-coffee-shop-ambience-2399.mp3',
        type: 'file',
    },
    {
        id: 'fireplace',
        name: '🔥 Fireplace',
        url: 'https://assets.mixkit.co/sfx/preview/mixkit-fireplace-crackle-1330.mp3',
        type: 'file',
    },
    {
        id: '40hz',
        name: '🧠 40Hz Focus',
        url: 'https://www.szynalski.com/tone-generator/40hz.mp3',
        type: 'file',
    },
    {
        id: '174hz',
        name: '🎵 174Hz Healing',
        url: 'https://www.szynalski.com/tone-generator/174hz.mp3',
        type: 'file',
    },
    {
        id: '528hz',
        name: '✨ 528Hz Transform',
        url: 'https://www.szynalski.com/tone-generator/528hz.mp3',
        type: 'file',
    },
];

export const AudioPlayer: React.FC = () => {
    const [currentSound, setCurrentSound] = useState<Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (currentSound?.type === 'file' && audioRef.current) {
            audioRef.current.src = currentSound.url;
            if (isPlaying) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            }
        }
    }, [currentSound]);

    const togglePlay = () => {
        if (!currentSound) return;

        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play().catch(() => setIsPlaying(false));
        }
        setIsPlaying(!isPlaying);
    };

    const handleSoundSelect = (sound: Sound) => {
        if (currentSound?.id === sound.id) {
            togglePlay();
        } else {
            setCurrentSound(sound);
            setIsPlaying(true);
        }
    };

    const handleYoutubeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic YouTube ID extraction
        const videoId = youtubeUrl.split('v=')[1]?.split('&')[0];
        if (videoId) {
            // For YouTube, we'd ideally use the IFrame API, but for simplicity/demo
            // we might just open it or use a specific embed. 
            // Since the requirement is "import and play", a full YouTube player is complex.
            // We'll stick to file audio for the main feature and maybe just show an embed for YouTube.
            setCurrentSound({
                id: `yt-${videoId}`,
                name: 'YouTube Video',
                url: videoId,
                type: 'youtube',
            });
            setIsPlaying(true);
        }
    };

    return (
        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/10 w-full max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-bold text-white mb-6">Focus Sounds</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {DEFAULT_SOUNDS.map((sound) => (
                    <button
                        key={sound.id}
                        onClick={() => handleSoundSelect(sound)}
                        className={`p-2 rounded-xl text-xs font-medium transition-all text-center ${currentSound?.id === sound.id && isPlaying
                            ? 'bg-white text-black shadow-lg scale-105'
                            : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                    >
                        {sound.name}
                    </button>
                ))}
            </div>

            <div className="mb-6">
                <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">Volume</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
            </div>

            <form onSubmit={handleYoutubeSubmit} className="relative">
                <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="Paste YouTube URL..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all text-sm"
                />
            </form>

            {/* Hidden Audio Element for Files */}
            <audio ref={audioRef} loop />

            {/* YouTube Embed */}
            {currentSound?.type === 'youtube' && isPlaying && (
                <div className="mt-4 rounded-xl overflow-hidden aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${currentSound.url}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};
