"use client";

import * as Switch from "@radix-ui/react-switch";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import { LANGUAGES, Lang, t as tr, translations } from "./i18n";

type Tx = typeof translations["en"];

type Props = {
  open: boolean;
  onClose: () => void;
  workSecs: number;
  breakSecs: number;
  soundEnabled: boolean;
  notifyEnabled: boolean;
  autoSwitch: boolean;
  language: Lang;
  onWorkSecs: (v: number) => void;
  onBreakSecs: (v: number) => void;
  onSoundEnabled: (v: boolean) => void;
  onNotifyEnabled: (v: boolean) => void;
  onAutoSwitch: (v: boolean) => void;
  onLanguage: (v: Lang) => void;
};

function NotificationHelp({ tx }: { tx: Tx }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg bg-white/5 text-xs text-white/50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 w-full px-3 py-2 hover:text-white/70 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {tx.notifyHelp}
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="px-3 pb-3 flex flex-col gap-3 text-white/50">
          <p>{tx.notifyHelpBody}</p>

          <div className="flex flex-col gap-1.5">
            <p className="text-white/40 uppercase tracking-wide text-[10px]">macOS</p>
            <a href="x-apple.systempreferences:com.apple.preference.notifications" className="underline hover:text-white/80">System Settings → Notifications → [Browser]</a>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-white/40 uppercase tracking-wide text-[10px]">Windows</p>
            <span>Settings → System → Notifications → [Browser]</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-white/40 uppercase tracking-wide text-[10px]">Browser</p>
            <a href="https://support.google.com/chrome/answer/3220216" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">Chrome — {tx.officialGuide} ↗</a>
            <a href="https://support.mozilla.org/en-US/kb/push-notifications-firefox" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">Firefox — {tx.officialGuide} ↗</a>
            <a href="https://support.apple.com/guide/safari/notifications-sfr0fb8e47d0/mac" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">Safari — {tx.officialGuide} ↗</a>
          </div>
        </div>
      )}
    </div>
  );
}

function fmtSecs(s: number) {
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return r === 0 ? `${m}m` : `${m}m ${r}s`;
}

export default function Settings({
  open, onClose,
  workSecs, breakSecs,
  soundEnabled, notifyEnabled, autoSwitch, language,
  onWorkSecs, onBreakSecs,
  onSoundEnabled, onNotifyEnabled, onAutoSwitch, onLanguage,
}: Props) {
  const tx = tr(language);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30" onClick={onClose} />
      )}

      <div className={`fixed top-0 right-0 h-full w-72 z-40 bg-stone-900/95 backdrop-blur-md shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <h2 className="text-white font-bold text-lg tracking-wide">{tx.settings}</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">

          {/* Focus time */}
          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-sm">{tx.focusMin}</label>
            <div className="flex items-center gap-3">
              <input type="range" min={10} max={5400} step={10} value={workSecs}
                onChange={(e) => onWorkSecs(Number(e.target.value))}
                className="flex-1 accent-red-500" />
              <span className="text-white font-mono w-12 text-right text-xs">{fmtSecs(workSecs)}</span>
            </div>
          </div>

          {/* Break time */}
          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-sm">{tx.breakMin}</label>
            <div className="flex items-center gap-3">
              <input type="range" min={10} max={3600} step={10} value={breakSecs}
                onChange={(e) => onBreakSecs(Number(e.target.value))}
                className="flex-1 accent-emerald-500" />
              <span className="text-white font-mono w-12 text-right text-xs">{fmtSecs(breakSecs)}</span>
            </div>
          </div>

          {/* Presets */}
          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-sm">{tx.presets}</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "52 / 17", work: 52 * 60, brk: 17 * 60 },
                { label: "Pomodoro", work: 25 * 60, brk: 5 * 60 },
                { label: "90 / 20", work: 90 * 60, brk: 20 * 60 },
                { label: "45 / 15", work: 45 * 60, brk: 15 * 60 },
              ].map((p) => {
                const active = workSecs === p.work && breakSecs === p.brk;
                return (
                  <button
                    key={p.label}
                    onClick={() => { onWorkSecs(p.work); onBreakSecs(p.brk); }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      active
                        ? "bg-red-500 text-white"
                        : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notifications */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">{tx.notifications}</span>
              <Switch.Root checked={notifyEnabled} onCheckedChange={onNotifyEnabled}
                className="w-11 h-6 rounded-full transition-colors data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-white/20 relative outline-none cursor-pointer">
                <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow transition-transform translate-x-1 data-[state=checked]:translate-x-6" />
              </Switch.Root>
            </div>
            <NotificationHelp tx={tx} />
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">{tx.sound}</span>
            <Switch.Root checked={soundEnabled} onCheckedChange={onSoundEnabled}
              className="w-11 h-6 rounded-full transition-colors data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-white/20 relative outline-none cursor-pointer">
              <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow transition-transform translate-x-1 data-[state=checked]:translate-x-6" />
            </Switch.Root>
          </div>

          {/* Auto switch */}
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">{tx.autoSwitch}</span>
            <Switch.Root checked={autoSwitch} onCheckedChange={onAutoSwitch}
              className="w-11 h-6 rounded-full transition-colors data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-white/20 relative outline-none cursor-pointer">
              <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow transition-transform translate-x-1 data-[state=checked]:translate-x-6" />
            </Switch.Root>
          </div>

          {/* Language */}
          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-sm">{tx.language}</label>
            <Select.Root value={language} onValueChange={(v) => onLanguage(v as Lang)}>
              <Select.Trigger className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/10 text-white text-sm outline-none hover:bg-white/20 transition-colors">
                <Select.Value />
                <Select.Icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  position="popper"
                  sideOffset={4}
                  className="z-50 w-64 bg-stone-800 rounded-lg shadow-xl overflow-hidden"
                >
                  <Select.ScrollUpButton className="flex items-center justify-center py-1 text-white/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
                  </Select.ScrollUpButton>

                  <Select.Viewport className="max-h-60 overflow-y-auto p-1">
                    {LANGUAGES.map((lang) => (
                      <Select.Item
                        key={lang.code}
                        value={lang.code}
                        className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-white/70 data-[highlighted]:bg-white/10 data-[highlighted]:text-white data-[state=checked]:text-white outline-none cursor-pointer transition-colors"
                      >
                        <Select.ItemText>{lang.native}</Select.ItemText>
                        <Select.ItemIndicator>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>

                  <Select.ScrollDownButton className="flex items-center justify-center py-1 text-white/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
      </div>
    </>
  );
}
