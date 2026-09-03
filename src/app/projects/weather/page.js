"use client";

import { useState } from "react";
import Link from "next/link";

export default function WeatherPage() {
    const [weatherType, setWeatherType] = useState("sunny");

    // 天氣主題設定檔：包含背景色、文字色、內外層裝飾、紋理與預設數值
    const weatherThemes = {
        sunny: {
            bg: "bg-[#28A9FF]",
            text: "text-black",
            cardBg: "bg-[#4CB8FF]/60",
            title: "SUNNY",
            temp: "39°",
            desc: "Sunny",
            pattern: "", // 乾淨背景
            innerDecorations: (
                <div className="absolute top-4 left-4 text-xs opacity-40 pointer-events-none">
                    ✨
                </div>
            ),
            outerDecorations: (
                <>
                    {/* 左上角外凸的太陽 */}
                    <div className="absolute -top-8 -left-8 text-6xl pointer-events-none animate-pulse">
                        ☀️
                    </div>
                    {/* 右側外凸的雲朵 */}
                    <div className="absolute top-16 -right-8 text-5xl pointer-events-none">☁️</div>
                </>
            ),
        },
        cloudy: {
            bg: "bg-[#BFF9FF]",
            text: "text-slate-900",
            cardBg: "bg-[#BFE9F4]/60",
            title: "WEATHER",
            temp: "30°",
            desc: "Partly Cloud",
            pattern: "",
            innerDecorations: (
                <img
                    src="/images/weather/deco_cloudy_outer_l.png"
                    alt="cloud"
                    className="absolute -top-[-40%] -left-16 w-[112.35] h-[60.02px] image-rendering-pixelated pointer-events-none animate-sway"
                />
            ),
            outerDecorations: (
                <>
                    <div className="absolute top-8 -right-8 text-5xl pointer-events-none z-50">
                        ☁️
                    </div>
                    <div className="absolute -bottom-6 -left-6 text-5xl pointer-events-none">
                        ☁️
                    </div>
                </>
            ),
        },
        rainy: {
            bg: "bg-[#6A92A6]",
            text: "text-white",
            cardBg: "bg-[#82A8BC]/60",
            title: "WEATHER",
            temp: "20°",
            desc: "Rainy / Shower",
            // 滿版重複雨滴背景紋理
            pattern:
                "bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]",
            innerDecorations: (
                <div className="absolute top-20 left-6 text-[10px] tracking-widest text-white/50 font-pixel pointer-events-none">
                    /// ///
                </div>
            ),
            outerDecorations: (
                <div className="absolute top-6 -right-8 text-5xl pointer-events-none">🌧️</div>
            ),
        },
        night: {
            bg: "bg-[#1144AA]",
            text: "text-white",
            cardBg: "bg-[#1A55CC]/60",
            title: "WEATHER",
            temp: "18°",
            desc: "Clear Night",
            // 滿版星點背景紋理
            pattern:
                "bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]",
            innerDecorations: (
                <div className="absolute top-12 left-8 text-xs text-yellow-200 pointer-events-none">
                    ✦
                </div>
            ),
            outerDecorations: (
                <>
                    <div className="absolute top-6 -right-8 text-5xl pointer-events-none">🌙</div>
                    <div className="absolute bottom-24 right-12 text-xs text-yellow-200 pointer-events-none">
                        ✨
                    </div>
                </>
            ),
        },
    };

    const currentTheme = weatherThemes[weatherType];

    return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] justify-center items-center px-6 max-w-xl mx-auto py-12">
            {/* 返回按鈕 */}
            <div className="w-full text-left mb-6 max-w-[320px]">
                <Link
                    href="/projects"
                    className="text-sm font-pixel text-blue-600 dark:text-blue-400 hover:underline">
                    &larr; Back to Projects
                </Link>
            </div>

            {/* 測試切換不同天氣樣式的按鈕列 */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {Object.keys(weatherThemes).map((type) => (
                    <button
                        key={type}
                        onClick={() => setWeatherType(type)}
                        className={`px-3 py-1 text-xs font-pixel border border-black transition ${
                            weatherType === type
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-gray-100"
                        }`}>
                        {type}
                    </button>
                ))}
            </div>

            {/* 最外層容器：不加 overflow-hidden，讓外層裝飾可以順利突出去 */}
            <div className="relative w-full max-w-[320px] mx-auto">
                {/* [外層裝飾] 會乖乖突出在卡片外 */}
                {currentTheme.outerDecorations}

                {/* 卡片本體：加上 overflow-hidden 與 rounded-3xl，鎖住內層紋理與內容 */}
                <div
                    className={`relative w-full ${currentTheme.bg} ${currentTheme.text} ${currentTheme.pattern} overflow-hidden border-2 border-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col items-center transition-all duration-500`}>
                    {/* [內層絕對定位裝飾] 會被卡片邊緣完美裁切，不會亂跑 */}
                    {currentTheme.innerDecorations}

                    {/* 標題 */}
                    <h1 className="font-pixel text-2xl mb-6 tracking-wider relative z-10">
                        {currentTheme.title}
                    </h1>

                    {/* 城市切換列 */}
                    <div className="flex justify-center gap-2 mb-6 w-full relative z-10">
                        {["Taipei", "Barcelona", "Madrid"].map((c, i) => (
                            <span
                                key={c}
                                className={`px-3 py-1 font-pixel text-[11px] border border-black rounded-lg ${
                                    i === 0
                                        ? "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                        : "bg-white/40 text-current"
                                }`}>
                                {c}
                            </span>
                        ))}
                    </div>

                    {/* 城市名稱 */}
                    <h2 className="font-pixel text-sm mb-1 opacity-90 relative z-10">TAIPEI</h2>

                    {/* 溫度 */}
                    <div className="font-pixel text-6xl mb-1 relative z-10">
                        {currentTheme.temp}
                    </div>

                    {/* 天氣描述 */}
                    <p className="font-pixel text-xs mb-8 opacity-90 relative z-10">
                        {currentTheme.desc}
                    </p>

                    {/* 底部數據區塊 */}
                    <div className="grid grid-cols-2 gap-3 w-full relative z-10">
                        <div
                            className={`p-3 ${currentTheme.cardBg} border-2 border-black rounded-2xl`}>
                            <span className="block font-pixel text-[9px] mb-1 opacity-80">
                                HUMIDITY
                            </span>
                            <span className="font-pixel text-sm">77%</span>
                        </div>
                        <div
                            className={`p-3 ${currentTheme.cardBg} border-2 border-black rounded-2xl`}>
                            <span className="block font-pixel text-[9px] mb-1 opacity-80">
                                WIND SPEED
                            </span>
                            <span className="font-pixel text-xs">14.7 km/h</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
