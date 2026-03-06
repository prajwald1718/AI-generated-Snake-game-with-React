import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, RotateCcw, Play } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 80;

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setIsGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check collision with food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => {
          const newScore = s + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isPaused, isGameOver, generateFood, highScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
        case 'r':
        case 'R':
          resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, INITIAL_SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, isPaused, isGameOver]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex justify-between w-full max-w-[400px] px-4 border-b-2 border-glitch-cyan pb-4">
        <div className="flex flex-col items-start">
          <span className="pixel-font text-glitch-magenta mb-1">SCORE_VAL</span>
          <span className="text-4xl font-black text-glitch-cyan font-mono-retro glitch-text-raw" data-text={score}>{score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="pixel-font text-glitch-magenta mb-1">MAX_RECORD</span>
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-glitch-yellow" />
            <span className="text-4xl font-black text-glitch-yellow font-mono-retro glitch-text-raw" data-text={highScore}>{highScore}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="w-[400px] h-[400px] bg-black brutalist-border overflow-hidden relative">
          {/* GRID_OVERLAY */}
          <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 pointer-events-none opacity-20">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-glitch-cyan/30" />
            ))}
          </div>

          {/* SNAKE_ENTITIES */}
          {snake.map((segment, i) => {
            const isHead = i === 0;
            return (
              <div
                key={i}
                className={`absolute w-5 h-5 transition-all duration-75 ${
                  isHead ? 'bg-glitch-cyan z-10 animate-tear' : 'bg-glitch-cyan/40 border border-glitch-cyan/20'
                }`}
                style={{
                  left: `${segment.x * 20}px`,
                  top: `${segment.y * 20}px`,
                  boxShadow: isHead ? '0 0 10px var(--color-glitch-cyan)' : 'none',
                }}
              />
            );
          })}

          {/* VOID_CORE (FOOD) */}
          <div
            className="absolute w-5 h-5 bg-glitch-magenta animate-glitch"
            style={{
              left: `${food.x * 20}px`,
              top: `${food.y * 20}px`,
              boxShadow: '0 0 15px var(--color-glitch-magenta)',
            }}
          />

          {/* SYSTEM_INTERRUPT_OVERLAYS */}
          {(isPaused || isGameOver) && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20">
              {isGameOver ? (
                <>
                  <h2 className="text-4xl font-black text-glitch-magenta mb-4 glitch-text-raw uppercase italic" data-text="FATAL_ERROR">FATAL_ERROR</h2>
                  <p className="pixel-font text-glitch-cyan mb-8">CORE_DUMP: {score}_UNITS_LOST</p>
                  <button
                    onClick={resetGame}
                    className="brutalist-button pixel-font"
                  >
                    REBOOT_SYSTEM
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-8 h-8 bg-glitch-cyan animate-tear" />
                    <div className="w-8 h-8 bg-glitch-magenta animate-glitch" />
                    <div className="w-8 h-8 bg-glitch-cyan animate-tear" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <h2 className="text-5xl font-black text-glitch-cyan mb-12 glitch-text-raw uppercase tracking-tighter" data-text="VOID_PAUSE">VOID_PAUSE</h2>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="brutalist-button pixel-font"
                  >
                    RESUME_EXECUTION
                  </button>
                  <p className="mt-12 text-glitch-magenta/50 pixel-font animate-pulse">PRESS_SPACE_TO_TOGGLE</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-8 pixel-font text-[8px] text-glitch-cyan/40">
        <div className="flex items-center gap-2">
          <span className="text-glitch-magenta">[WASD]</span>
          <span>NAVIGATE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-glitch-magenta">[SPACE]</span>
          <span>INTERRUPT</span>
        </div>
      </div>
    </div>
  );
}
