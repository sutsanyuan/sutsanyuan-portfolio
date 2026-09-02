"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PomodoroPage() {
    const MODES = {
        focus: { name: "Focus", time: 25 * 60 },
        break: { name: "Break", time: 5 * 60 },
        rest: { name: "Rest", time: 15 * 60 },
    };

    const [mode, setMode] = useState("focus");
    const [timeLeft, setTimeLeft] = useState(MODES.focus.time);
    const [isRunning, setIsRunning] = useState(false);

    // 新增：記錄總共完成了幾個專注循環（用來決定何時進入長休息）
    const [focusCount, setFocusCount] = useState(0);

    // 滑鼠懸停動畫狀態
    const [isHovered, setIsHovered] = useState(false);
    const [hoverFrame, setHoverFrame] = useState(0);
    const modeKeys = ["focus", "break", "rest"];

    const tomatoImages = {
        focus: "/images/tomato-red.svg",
        break: "/images/tomato-yellow.svg",
        rest: "/images/tomato-green.svg",
    };

    // 倒數計時與自動切換邏輯
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);

            // 時間到時的自動流轉邏輯
            if (mode === "focus") {
                const nextCount = focusCount + 1;
                setFocusCount(nextCount);

                if (nextCount % 4 === 0) {
                    // 每滿 4 個專注循環，進入 15 分鐘長休息 (Rest)
                    alert("太棒了！妳已經完成了 4 個專注循環，享受 15 分鐘的長休息吧！");
                    changeMode("rest");
                } else {
                    // 一般情況進入 5 分鐘短休息 (Break)
                    alert("專注時間結束！休息 5 分鐘吧。");
                    changeMode("break");
                }
            } else {
                // 休息結束，自動回到專注 (Focus)
                alert("休息時間結束，準備好進入下一個專注了嗎？");
                changeMode("focus");
            }
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, mode, focusCount]);

    // 滑鼠懸停動畫
    useEffect(() => {
        let animTimer;
        if (isHovered) {
            animTimer = setInterval(() => {
                setHoverFrame((prev) => (prev + 1) % modeKeys.length);
            }, 300);
        } else {
            setHoverFrame(0);
        }
        return () => clearInterval(animTimer);
    }, [isHovered]);

    const currentImageKey = isHovered ? modeKeys[hoverFrame] : mode;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const changeMode = (newMode) => {
        setIsRunning(false);
        setMode(newMode);
        setTimeLeft(MODES[newMode].time);
    };

    // 手動按 NEXT 時的標準番茄鐘循環順序 (Focus -> Break -> Focus -> Break -> Rest)
    const handleNextMode = () => {
        if (mode === "focus") {
            // 根據目前的完成次數決定下一個是短休息還是長休息
            if ((focusCount + 1) % 4 === 0) {
                changeMode("rest");
            } else {
                changeMode("break");
            }
        } else {
            // 從 Break 或 Rest 點 NEXT 則回到 Focus
            changeMode("focus");
        }
    };

    const currentIndex = modeKeys.indexOf(mode);
    const leftModeKey = modeKeys[(currentIndex - 1 + modeKeys.length) % modeKeys.length];
    const rightModeKey = modeKeys[(currentIndex + 1) % modeKeys.length];

    return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] justify-center items-center px-6 max-w-xl mx-auto py-12">
            <div className="w-full text-left mb-6">
                <Link
                    href="/projects"
                    className="text-sm font-pixel text-blue-600 dark:text-blue-400 hover:underline">
                    &larr; Back to Projects
                </Link>
            </div>

            <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm text-center flex flex-col items-center">
                <h1 className="font-pixel text-3xl text-gray-900 dark:text-white mb-2 tracking-wider">
                    POMODORO
                </h1>

                <div className="flex items-center justify-center gap-6 mb-4">
                    <button
                        onClick={() => changeMode(leftModeKey)}
                        className="flex items-center gap-1 font-pixel text-xs text-gray-400 hover:text-red-500 transition group">
                        <span className="group-hover:-translate-x-0.5 transition-transform">
                            &lsaquo;
                        </span>
                        <span className="[writing-mode:vertical-lr] tracking-widest">
                            {MODES[leftModeKey].name}
                        </span>
                    </button>

                    <div
                        className="relative cursor-pointer transition-transform duration-150 hover:scale-105"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleNextMode}
                        title="點擊切換下一個階段">
                        <img
                            src={tomatoImages[currentImageKey]}
                            alt="Tomato Sprite"
                            className="w-32 h-32 object-contain [image-rendering:pixelated]"
                        />
                    </div>

                    <button
                        onClick={() => changeMode(rightModeKey)}
                        className="flex items-center gap-1 font-pixel text-xs text-gray-400 hover:text-red-500 transition group">
                        <span className="[writing-mode:vertical-lr] tracking-widest">
                            {MODES[rightModeKey].name}
                        </span>
                        <span className="group-hover:translate-x-0.5 transition-transform">
                            &rsaquo;
                        </span>
                    </button>
                </div>

                <h2 className="font-pixel text-xl text-red-500 mb-6 uppercase tracking-wide">
                    {MODES[mode].name}
                </h2>

                <div className="w-full py-6 bg-rose-50/50 dark:bg-gray-950 rounded-xl border border-rose-100 dark:border-gray-800 mb-8">
                    <span className="font-pixel text-5xl sm:text-6xl text-red-600 dark:text-red-400 tracking-wider">
                        {formatTime(timeLeft)}
                    </span>
                </div>
                {/* 顯示目前累積完成的專注次數 */}
                <p className="font-pixel text-xs text-gray-400 mb-6">
                    Completed Focus: {focusCount} / 4
                </p>
                <div className="flex justify-center gap-3 w-full">
                    <button
                        onClick={() => changeMode("focus")}
                        className="flex-1 py-3 font-pixel text-xs bg-rose-100 dark:bg-gray-800 text-rose-800 dark:text-rose-200 rounded-lg hover:bg-rose-200 dark:hover:bg-gray-700 transition">
                        RESET
                    </button>
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className="flex-1 py-3 font-pixel text-xs bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition shadow-sm">
                        {isRunning ? "PAUSE" : "START"}
                    </button>
                    <button
                        onClick={handleNextMode}
                        className="flex-1 py-3 font-pixel text-xs bg-rose-100 dark:bg-gray-800 text-rose-800 dark:text-rose-200 rounded-lg hover:bg-rose-200 dark:hover:bg-gray-700 transition">
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    );
}
