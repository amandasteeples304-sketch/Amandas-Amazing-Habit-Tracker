"use client";
import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import { motion, AnimatePresence } from "motion/react";

export default function Timer() {
  const [secondsInput, setSecondsInput] = useState(0);
  const [isSetting, setIsSetting] = useState(true);

  const time = new Date();
  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp: time,
      autoStart: false,
      onExpire: () => alert("Time is up!"),
    });

  const handleStart = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + secondsInput);
    restart(time);
    setIsSetting(false);
  };

  const formatTime = (time) => time.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl border shadow-lg max-w-sm mx-auto bg-(--habit-bg) border(--habit-border) text-(--habit-text)">
      <h2 className="text-xl font-semibold mb-4 opacity-90">Timer</h2>
      <AnimatePresence mode="wait">
        {isSetting ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center"
          >
            <input
              type="number"
              placeholder="Seconds"
              className="bg-white/5 border border-white/10 rounded p-2 mb-4 text-center text-2xl w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSecondsInput(parseInt(e.target.value) || 0)}
            />
            <button
              onClick={handleStart}
              className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-500"
            >
              Set & Start
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="display"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center w-full"
          >
            <div className="text-5xl font-mono font-bold mb-4 tracking-widest tabular-nums">
              <span>{formatTime(hours)}</span>:
              <span>{formatTime(minutes)}</span>:
              <span>{formatTime(seconds)}</span>
            </div>
            <div className="flex gap-2 w-full">
              <button
                onClick={isRunning ? pause : resume}
                className="flex-1 py-2 bg-green-600 rounded-lg font-bold"
              >
                {isRunning ? "Pause" : "Resume"}
              </button>
              <button
                onClick={() => setIsSetting(true)}
                className="flex-1 py-2 border border-white/10 rounded-lg"
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
