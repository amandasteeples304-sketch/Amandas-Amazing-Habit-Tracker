"use client";
import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { motion, AnimatePresence } from "motion/react";

export default function Stopwatch() {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  const [laps, setLaps] = useState([]);

  const formatTime = (time) => time.toString().padStart(2, "0");

  const recordLap = () => {
    const currentTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    setLaps([currentTime, ...laps]);
  };

  const handleReset = () => {
    reset(null, false);
    setLaps([]);
  };

  return (
    <div
      className="flex flex-col items-center p-6 rounded-2xl border shadow-lg max-w-sm mx-auto"
      style={{
        backgroundColor: "var(--habit-bg)",
        borderColor: "var(--habit-border)",
        color: "var(--habit-text)",
      }}
    >
      <h2 className="text-xl font-semibold mb-4 opacity-90">Stopwatch</h2>
      <div className="text-5xl font-mono font-bold mb-2 tracking-widest">
        <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:
        <span>{formatTime(seconds)}</span>
      </div>
      <p className="text-sm mb-6 opacity-75 uppercase tracking-tighter">
        {isRunning ? "Timer is Running" : "Timer is Paused"}
      </p>
      <div className="flex gap-3 justify-center w-full">
        {!isRunning ? (
          <button
            onClick={start}
            className="flex-1 py-2 rounded-lg font-bold transition-colors bg-green-600 hover:bg-green-500 text-white"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="flex-1 py-2 rounded-lg font-bold transition-colors bg-red-600 hover:bg-red-500 text-white"
          >
            {" "}
            Stop
          </button>
        )}
        <button
          onClick={recordLap}
          disabled={!isRunning}
          className="flex-1 rounded-lg font-bold transition-all border border-white/20 hover:bg-(--habit-hover) disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Lap
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg font-bold transition-all border border-white/10 hover:bg-white/10"
        >
          Reset
        </button>
      </div>

      <AnimatePresence>
        {laps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-8 w-full max-h-48 overflow-y-auto pr-2 custom-scrollbar border-t border-white/5"
          >
            <ul className="divide-y divide-white/5">
              {laps.map((lap, index) => (
                <motion.li
                  key={laps.length - index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex justify-between items-center py-3 font-mono text-sm"
                >
                  <span className="opacity-40 text-xs">
                    LAP {laps.length - index}
                  </span>
                  <span className="font-bold">{lap}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
