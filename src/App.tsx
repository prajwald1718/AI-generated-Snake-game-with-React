import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Activity, Cpu, AlertTriangle } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden static-noise scanlines">
      {/* GLITCH OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-glitch-magenta/30 animate-tear" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-glitch-cyan/30 animate-tear" style={{ animationDelay: '1s' }} />
      </div>

      <header className="mb-12 text-center relative z-10 animate-tear">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Terminal className="text-glitch-magenta" size={32} />
          <h1 className="text-6xl font-black tracking-tighter uppercase glitch-text-raw italic" data-text="SYSTEM_VOID">
            SYSTEM_VOID
          </h1>
          <Activity className="text-glitch-cyan" size={32} />
        </div>
        <div className="flex items-center justify-center gap-2 text-glitch-magenta pixel-font">
          <AlertTriangle size={12} />
          <span>CRITICAL_ERROR: REALITY_LEAK_DETECTED</span>
        </div>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* LEFT_DATA_STREAM */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-8">
          <div className="brutalist-border bg-black p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-glitch-cyan pb-2">
              <Cpu className="text-glitch-cyan" size={18} />
              <h2 className="pixel-font text-glitch-cyan">CORE_PROCESSES</h2>
            </div>
            <div className="space-y-4 font-mono text-xs text-glitch-cyan/70">
              <div className="flex justify-between">
                <span>MEM_ALLOC</span>
                <span className="text-glitch-magenta">[0x7FF8]</span>
              </div>
              <div className="flex justify-between">
                <span>CPU_LOAD</span>
                <span className="text-glitch-magenta">98.4%</span>
              </div>
              <div className="flex justify-between">
                <span>VOID_SYNC</span>
                <span className="text-glitch-magenta">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="brutalist-border bg-black p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-glitch-magenta pb-2">
              <Activity className="text-glitch-magenta" size={18} />
              <h2 className="pixel-font text-glitch-magenta">INPUT_VECTORS</h2>
            </div>
            <div className="space-y-4 pixel-font text-[8px]">
              <div className="p-2 border border-glitch-magenta/30 hover:bg-glitch-magenta hover:text-black transition-colors cursor-crosshair">
                VECTOR_ALPHA: 0.882
              </div>
              <div className="p-2 border border-glitch-magenta/30 hover:bg-glitch-magenta hover:text-black transition-colors cursor-crosshair">
                VECTOR_BETA: -1.029
              </div>
              <div className="p-2 border border-glitch-magenta/30 hover:bg-glitch-magenta hover:text-black transition-colors cursor-crosshair">
                VECTOR_GAMMA: 0.004
              </div>
            </div>
          </div>
        </div>

        {/* CENTER_VOID_INTERFACE */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-glitch-magenta/20 animate-pulse pointer-events-none" />
            <SnakeGame />
          </div>
        </div>

        {/* RIGHT_AUDIO_DECODER */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-end gap-8">
          <MusicPlayer />
          
          <div className="brutalist-border bg-black p-4 w-full max-w-[400px]">
            <p className="pixel-font text-[7px] text-glitch-cyan/50 leading-relaxed uppercase">
              TRANSMISSION_LOG: DATA_CORRUPTION_IN_PROGRESS. 
              FEED_THE_VOID. 
              GROW_THE_ERROR. 
              DO_NOT_REBOOT.
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-16 text-glitch-magenta/40 pixel-font text-[8px] flex gap-8">
        <span>[TERMINAL_ID: 0x00A1]</span>
        <span className="animate-pulse">STABILITY: CRITICAL</span>
        <span>&copy; VOID_CORP_2026</span>
      </footer>
    </div>
  );
}
