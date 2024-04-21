import React, { useState, useEffect, useRef } from 'react';

interface AudioPlayerProps {
    src: string;
    type?: string;
    autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, type, autoPlay = false }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
            if (autoPlay) {
                audio.play();
            }
        };

        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, [src, type, autoPlay]);

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    };

    const formattedTime = (time: number) => {
        return `${Math.floor(time / 60)}:${('0' + Math.floor(time % 60)).slice(-2)}`;
    };

    // URLs for the play and pause images
    const playImageUrl = '/icons/audiocontrol_play.png'; // Change this to the path of your play image
    const pauseImageUrl = '/icons/audiocontrol_pause.png'; // Change this to the path of your pause image

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={togglePlayPause} style={{ border: 'none', background: 'transparent' }}>
                <img src={isPlaying ? pauseImageUrl : playImageUrl} alt={isPlaying ? 'Pause' : 'Play'} style={{ width: '32px', height: '32px' }} />
            </button>
            <span>{formattedTime(currentTime)} / {formattedTime(duration)}</span>
            <input
                type="range"
                value={currentTime}
                step="1"
                min="0"
                max={duration}
                onChange={(e) => {
                    if (audioRef.current) {
                        audioRef.current.currentTime = parseFloat(e.target.value);
                    }
                }}
                style={{ flexGrow: 1 }}
            />
            <audio ref={audioRef} style={{ display: 'none' }}>
                <source src={src} type={type || 'audio/mpeg'} />
            </audio>
        </div>
    );
}

export default AudioPlayer;
