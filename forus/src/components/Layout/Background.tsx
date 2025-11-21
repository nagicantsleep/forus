import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const Background: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 -z-10 transition-all duration-1000">
            {theme === 'minimal' ? (
                <>
                    {/* Minimal Mode: Calming background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)'
                        }}
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/60" />
                </>
            ) : (
                <>
                    {/* Customize Mode: Animated gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient-xy" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30" />
                </>
            )}
        </div>
    );
};
