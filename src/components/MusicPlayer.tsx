import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Activity } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "VOID_HORIZON",
    artist: "SYNTH_AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/glitch1/400/400"
  },
  {
    id: 2,
    title: "CYBER_PULSE_ERR",
    artist: "DIGITAL_VOID",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/glitch2/400/400"
  },
  {
    id: 3,
    title: "NULL_GRID",
    artist: "VECTOR_NULL",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/glitch3/400/400"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-[400px] bg-black brutalist-border p-6 relative overflow-hidden">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipForward}
      />
      
      <div className="flex flex-col gap-6 relative z-10">
        <div className="relative group brutalist-border overflow-hidden">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className={`w-full h-48 object-cover grayscale contrast-150 ${isPlaying ? 'animate-glitch' : ''}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-glitch-magenta/20 mix-blend-overlay" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-black text-glitch-cyan truncate glitch-text-raw uppercase" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="pixel-font text-glitch-magenta text-[10px] mt-1">{currentTrack.artist}</p>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-4">
              <button onClick={skipBackward} className="text-glitch-cyan hover:text-glitch-magenta transition-colors">
                <SkipBack size={24} fill="currentColor" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 bg-glitch-cyan text-black flex items-center justify-center hover:bg-glitch-magenta hover:text-white transition-colors brutalist-border"
                style={{ boxShadow: '4px 4px 0 var(--color-glitch-magenta)' }}
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
              </button>
              <button onClick={skipForward} className="text-glitch-cyan hover:text-glitch-magenta transition-colors">
                <SkipForward size={24} fill="currentColor" />
              </button>
            </div>
            
            <div className="flex gap-1 items-end h-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-1 bg-glitch-magenta ${isPlaying ? 'animate-bounce' : 'h-1'}`}
                  style={{ animationDelay: `${i * 0.1}s`, height: isPlaying ? `${Math.random() * 100}%` : '2px' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 relative h-4 bg-zinc-900 border border-glitch-cyan/30">
        <div
          className="h-full bg-glitch-magenta transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="pixel-font text-[6px] text-white mix-blend-difference">DECODING_STREAM... {Math.floor(progress)}%</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center pixel-font text-[8px] text-glitch-cyan/40">
        <div className="flex items-center gap-2">
          <Activity size={10} className="text-glitch-magenta animate-pulse" />
          <span>SIGNAL_ACTIVE</span>
        </div>
        <span>SECTOR_{currentTrackIndex + 1}_OF_{TRACKS.length}</span>
      </div>
    </div>
  );
}
