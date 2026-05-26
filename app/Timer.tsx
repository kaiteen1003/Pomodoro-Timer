"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const TomatoScene = dynamic(() => import("./TomatoScene"), { ssr: false });

type Mode = "work" | "break";

const WORK_SECONDS = 52 * 60;
const BREAK_SECONDS = 17 * 60;

export default function Timer() {
  const [mode, setMode] = useState<Mode>("work");
  const [seconds, setSeconds] = useState(WORK_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            playSound();
            clearInterval(intervalRef.current!);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  function playSound() {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1);
  }

  function switchMode(newMode: Mode) {
    setRunning(false);
    setMode(newMode);
    setSeconds(newMode === "work" ? WORK_SECONDS : BREAK_SECONDS);
  }

  function reset() {
    setRunning(false);
    setSeconds(mode === "work" ? WORK_SECONDS : BREAK_SECONDS);
  }

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const total = mode === "work" ? WORK_SECONDS : BREAK_SECONDS;
  const progress = (total - seconds) / total;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const isBreak = mode === "break";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden select-none">

      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <TomatoScene isBreak={isBreak} />
      </div>

      {/* dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* content */}
      <div className="relative z-20 flex flex-col items-center gap-6">

        <h1 className="text-5xl font-bold tracking-widest text-white drop-shadow-lg">
          52/17
        </h1>

        <p className="text-base text-white/70 tracking-widest">
          {isBreak ? "BREAK TIME" : "FOCUS TIME"}
        </p>

        {/* mode switch */}
        <div className="flex gap-2">
          <button
            onClick={() => switchMode("work")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
              mode === "work"
                ? "bg-red-500 text-white shadow"
                : "bg-white/20 text-white/70 hover:bg-white/30"
            }`}
          >
            作業 52分
          </button>
          <button
            onClick={() => switchMode("break")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
              isBreak
                ? "bg-emerald-500 text-white shadow"
                : "bg-white/20 text-white/70 hover:bg-white/30"
            }`}
          >
            休憩 17分
          </button>
        </div>

        {/* circular timer */}
        <div className="relative flex items-center justify-center">
          <svg width="140" height="140">
            <circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="5"
            />
            <circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke={isBreak ? "#10b981" : "#ef4444"}
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <span className="absolute text-3xl font-mono font-bold text-white drop-shadow">
            {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>

        {/* controls */}
        <div className="flex gap-4">
          <button
            onClick={() => setRunning((r) => !r)}
            className={`w-28 py-3 rounded-full font-semibold text-white shadow-lg transition-all active:scale-95 ${
              isBreak
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {running ? "一時停止" : seconds === (mode === "work" ? WORK_SECONDS : BREAK_SECONDS) ? "スタート" : "再開"}
          </button>
          <button
            onClick={reset}
            className="w-24 py-3 rounded-full font-semibold text-white bg-white/20 hover:bg-white/30 transition-all active:scale-95"
          >
            リセット
          </button>
        </div>
      </div>
    </div>
  );
}
