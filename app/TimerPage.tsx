"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Settings from "./Settings";
import { Lang, t as tr } from "./i18n";

const TomatoScene = dynamic(() => import("./TomatoScene"), { ssr: false });

type Mode = "work" | "break";

export default function TimerPage() {
  const [workSecs, setWorkSecs] = useState(52 * 60);
  const [breakSecs, setBreakSecs] = useState(17 * 60);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundFile, setSoundFile] = useState("/se1.mp3");
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [language, setLanguage] = useState<Lang>("en");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const notifyEnabledRef = useRef(false);

  useEffect(() => { notifyEnabledRef.current = notifyEnabled; }, [notifyEnabled]);

  async function requestNotifyPermission(enabled: boolean) {
    if (!enabled) { setNotifyEnabled(false); return; }
    if (!("Notification" in window)) { alert("This browser does not support notifications."); return; }
    const permission = await Notification.requestPermission();
    setNotifyEnabled(permission === "granted");
  }

  function sendNotification(title: string, body: string) {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  }

  const WORK_SECONDS = workSecs;
  const BREAK_SECONDS = breakSecs;

  const [mode, setMode] = useState<Mode>("work");
  const [seconds, setSeconds] = useState(WORK_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const modeRef = useRef<Mode>("work");
  const autoSwitchRef = useRef(autoSwitch);
  const soundEnabledRef = useRef(soundEnabled);
  const soundFileRef = useRef(soundFile);

  useEffect(() => { autoSwitchRef.current = autoSwitch; }, [autoSwitch]);
  useEffect(() => { soundEnabledRef.current = soundEnabled; }, [soundEnabled]);
  useEffect(() => { soundFileRef.current = soundFile; }, [soundFile]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            if (soundEnabledRef.current) playSound();
            const nextMode = modeRef.current === "work" ? "break" : "work";
            const nextSeconds = nextMode === "work" ? workSecs : breakSecs;
            const tx = tr(language);
            const mins = Math.floor(nextSeconds / 60);
            if (nextMode === "break") {
              sendNotification(tx.notifyBreakTitle, tx.notifyBreakBody.replace("{min}", String(mins)));
            } else {
              sendNotification(tx.notifyFocusTitle, tx.notifyFocusBody);
            }
            setRunning(false); // 一度falseにしてuseEffectを再トリガー
            setTimeout(() => {
              setMode(nextMode);
              setSeconds(nextSeconds);
              if (autoSwitchRef.current) setRunning(true);
            }, 100);
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
    if (!soundEnabledRef.current) return;
    const audio = new Audio(soundFileRef.current);
    audio.volume = 0.7;
    audio.play().catch(() => {});
  }

  function toggleMode() {
    const newMode = mode === "work" ? "break" : "work";
    setRunning(false);
    setMode(newMode);
    setSeconds(newMode === "work" ? WORK_SECONDS : BREAK_SECONDS);
  }

  function reset() {
    setRunning(false);
    setSeconds(mode === "work" ? WORK_SECONDS : BREAK_SECONDS);
  }

  const tx = tr(language);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const total = mode === "work" ? WORK_SECONDS : BREAK_SECONDS;
  const progress = seconds / total;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const isBreak = mode === "break";

  return (
    <div className="relative flex flex-col items-center min-h-screen min-h-dvh overflow-hidden select-none">

      {/* 3D background */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <TomatoScene running={running} isBreak={isBreak} />
      </div>

      {/* settings gear button */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="absolute top-5 right-5 z-20 text-white/60 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

      {/* settings sidebar */}
      <Settings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        workSecs={workSecs}
        breakSecs={breakSecs}
        soundEnabled={soundEnabled}
        notifyEnabled={notifyEnabled}
        autoSwitch={autoSwitch}
        language={language}
        onWorkSecs={(v) => { setWorkSecs(v); if (!running && mode === "work") setSeconds(v); }}
        onBreakSecs={(v) => { setBreakSecs(v); if (!running && mode === "break") setSeconds(v); }}
        soundFile={soundFile}
        onSoundEnabled={setSoundEnabled}
        onSoundFile={setSoundFile}
        onNotifyEnabled={requestNotifyPermission}
        onAutoSwitch={setAutoSwitch}
        onLanguage={(v) => setLanguage(v)}
      />

      {/* title */}
      <div className="relative z-20 pt-6 sm:pt-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest text-white drop-shadow-lg">
          52/17
        </h1>
      </div>

      {/* spacer */}
      <div className="relative z-20 h-[28vh]" />

      {/* timer */}
      <div className="relative z-20 flex flex-col items-center pb-3 sm:pb-4">
        <div className="relative flex items-center justify-center">
          <svg
            className="w-72 h-72 sm:w-80 sm:h-80"
            viewBox="0 0 220 220"
          >
            <circle
              cx="110" cy="110" r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="6"
            />
            <circle
              cx="110" cy="110" r={radius}
              fill="none"
              stroke={isBreak ? "#10b981" : "#ef4444"}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="translate(220 0) scale(-1 1) rotate(-90 110 110)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>

          <div className="absolute flex flex-col items-center gap-1">
            <div className="text-white/70">
              {isBreak ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
                  <line x1="6" y1="2" x2="6" y2="4"/>
                  <line x1="10" y1="2" x2="10" y2="4"/>
                  <line x1="14" y1="2" x2="14" y2="4"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              )}
            </div>
            <span className="text-4xl sm:text-5xl font-mono font-bold text-white drop-shadow">
              {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </span>
            <button
              onClick={toggleMode}
              title={isBreak ? "Switch to Work" : "Switch to Break"}
              className={`transition-colors ${isBreak ? "text-red-400 hover:text-red-300" : "text-emerald-400 hover:text-emerald-300"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8h14M5 8l3-3M5 8l3 3"/>
                <path d="M19 16H5m14 0-3-3m3 3-3 3"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="relative z-20 flex gap-4 sm:gap-5 pb-8 sm:pb-10">
        <button
          onClick={() => setRunning((r) => !r)}
          className={`w-28 sm:w-36 py-3.5 rounded-full font-semibold text-white shadow-lg transition-all active:scale-95 text-base sm:text-lg ${
            running
              ? "bg-stone-500 hover:bg-stone-600"
              : isBreak
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {running
            ? tx.pause
            : seconds === (mode === "work" ? WORK_SECONDS : BREAK_SECONDS)
            ? tx.start
            : tx.resume}
        </button>
        <button
          onClick={reset}
          className="w-24 sm:w-32 py-3.5 rounded-full font-semibold text-white bg-white/20 hover:bg-white/30 transition-all active:scale-95 text-base sm:text-lg"
        >
          {tx.reset}
        </button>
      </div>
    </div>
  );
}
