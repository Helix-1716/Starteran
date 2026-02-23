import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface VoiceMessageProps {
    audioUrl: string;
    isMine: boolean;
}

export default function VoiceMessage({ audioUrl, isMine }: VoiceMessageProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(isNaN(p) ? 0 : p);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
    };

    return (
        <div className={`flex items-center gap-2 min-w-[200px] max-w-[250px] mr-5 ${isMine ? 'text-white' : 'text-gray-800'}`}>
            <button onClick={togglePlay} className="w-9 h-9 flex items-center justify-center shrink-0">
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
            </button>

            <div className="flex-1 h-1.5 bg-black/10 rounded-full relative overflow-hidden">
                <div
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-100 ${isMine ? 'bg-white' : 'bg-blue-500'}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
            <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} preload="metadata" />
        </div>
    );
}
