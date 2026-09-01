"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PomodoroPage() {
    const MODES = {
        focus: { name: "Focus", time: 25 * 60 },
        break: { name: "Break", time: 5 * 60 },
        rest: { name: "Rest", time: 15 * 60 },
    };

    const modeKeys = ["focus", "break", "rest"];

    const [mode, setMode] = useState("focus");
    const [timeLeft, setTimeLeft] = useState(MODES.focus.time);
    const [isRunning, setIsRunning] = useState(false);

    // 滑鼠懸停動畫狀態
    const [isHovered, setIsHovered] = useState(false);
    const [hoverFrame, setHoverFrame] = useState(0);

    // 番茄圖片對應路徑 (請確認 public/images/ 資料夾內有這三張圖)
    const tomatoImages = {
        focus: "/images/tomato-red.svg",
        break: "/images/tomato-yellow.svg",
        rest: "/images/tomato-green.svg",
    };

    // 倒數計時核心邏輯
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            alert("時間到！狀態已結束。");
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    // 滑鼠游標滑過番茄時的循環動畫
    useEffect(() => {
        let animTimer;
        if (isHovered) {
            animTimer = setInterval(() => {
                setHoverFrame((prev) => (prev + 1) % modeKeys.length);
            }, 100);
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

    // 切換到下一個模式（用於點擊番茄或箭頭）
    const handleNextMode = () => {
        const currentIndex = modeKeys.indexOf(mode);
        const nextIndex = (currentIndex + 1) % modeKeys.length;
        changeMode(modeKeys[nextIndex]);
    };

    // 取得左側/右側按鈕應該顯示的模式名稱（對應設計稿的左右環繞）
    const currentIndex = modeKeys.indexOf(mode);
    const leftModeKey = modeKeys[(currentIndex - 1 + modeKeys.length) % modeKeys.length];
    const rightModeKey = modeKeys[(currentIndex + 1) % modeKeys.length];

    return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] justify-center items-center px-6 max-w-xl mx-auto py-12">
            {/* 返回專案列表 */}
            <div className="w-full text-left mb-6">
                <Link
                    href="/projects"
                    className="text-sm font-pixel text-blue-600 dark:text-blue-400 hover:underline">
                    &larr; Back to Projects
                </Link>
            </div>

            {/* 主面板容器 */}
            <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm text-center flex flex-col items-center">
                {/* 標題 */}
                <h1 className="font-pixel text-3xl text-gray-900 dark:text-white mb-6 tracking-wider">
                    POMODORO
                </h1>

                {/* 核心互動區：左右兩側夾著模式切換與番茄圖 */}
                <div className="flex items-center justify-center gap-6 mb-4">
                    {/* 左側模式按鈕 (帶小箭頭) */}
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

                    {/* 中間番茄圖片 (Hover 播動畫，點擊切換下一個) */}
                    <div
                        className="relative cursor-pointer transition-transform duration-150 hover:scale-105"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleNextMode}
                        title="點擊切換模式">
                        <img
                            src={tomatoImages[currentImageKey]}
                            alt="Tomato Sprite"
                            className="w-32 h-32 object-contain [image-rendering:pixelated]"
                        />
                    </div>

                    {/* 右側模式按鈕 (帶小箭頭) */}
                    {/* 右側模式按鈕 (帶小箭頭) */}
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

                {/* 當前模式名稱 */}
                <h2 className="font-pixel text-xl text-red-500 mb-6 uppercase tracking-wide">
                    {MODES[mode].name}
                </h2>

                {/* 像素風倒數計時顯示 */}
                <div className="w-full py-6 bg-rose-50/50 dark:bg-gray-950 rounded-xl border border-rose-100 dark:border-gray-800 mb-8">
                    <span className="font-pixel text-5xl sm:text-6xl text-red-600 dark:text-red-400 tracking-wider">
                        {formatTime(timeLeft)}
                    </span>
                </div>

                {/* 遊戲風格控制按鈕 (STOP / PAUSE-START / NEXT) */}
                <div className="flex justify-center gap-3 w-full">
                    <button
                        onClick={() => changeMode("focus")}
                        className="flex-1 py-3 font-pixel text-xs bg-rose-100 dark:bg-gray-800 text-rose-800 dark:text-rose-200 rounded-lg hover:bg-rose-200 dark:hover:bg-gray-700 transition">
                        STOP
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
