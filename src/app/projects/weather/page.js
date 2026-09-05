"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function WeatherPage() {
    const [selectedCity, setSelectedCity] = useState("Taipei, TW");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherType, setWeatherType] = useState("sunny");
    // 搜尋功能
    const [searchInput, setSearchInput] = useState("");

    // 城市經緯度對照（用 Key 作為查詢對應）
    const cities = {
        Taipei: { name: "Taipei, TW", query: "Taipei", lat: 25.0478, lon: 121.5318 },
        Barcelona: { name: "Barcelona, ES", query: "Barcelona", lat: 41.3851, lon: 2.1734 },
        Madrid: { name: "Madrid, ES", query: "Madrid", lat: 40.4168, lon: -3.7038 },
    };

    // 根據 Open-Meteo 的 weather_code 轉譯成妳的樣式 key
    const translateWeatherCode = (code, isNight) => {
        // 0: 晴天
        if (code === 0) return isNight ? "night" : "sunny";
        // 1, 2, 3: 多雲 / 陰天
        if (code >= 1 && code <= 3) return "cloudy";
        // 51-67, 80-99: 雨天 / 陣雨
        if ((code >= 51 && code <= 67) || (code >= 80 && code <= 99)) return "rainy";
        // 預設
        return isNight ? "night" : "sunny";
    };

    // 抓取 API 資料（透過快捷按鈕的 key 取得）
    const fetchWeather = async (cityKey) => {
        setLoading(true);
        setError(null);
        try {
            const cityObj = cities[cityKey];
            if (!cityObj) throw new Error("City not found");

            const { lat, lon } = cityObj;
            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m`,
            );

            if (!res.ok) throw new Error("Error fetching data！");
            const data = await res.json();

            const current = data.current;
            setWeatherData(current);
            setSelectedCity(cityObj.name);

            // 判斷是否為夜晚 (is_day === 0 代表晚上)
            const isNight = current.is_day === 0;
            const matchedType = translateWeatherCode(current.weather_code, isNight);
            setWeatherType(matchedType);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 畫面載入時自動抓取預設城市 (Taipei)
    useEffect(() => {
        fetchWeather("Taipei");
    }, []);

    // 根據城市名稱搜尋經緯度並取得天氣
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!searchInput.trim()) return;

        setLoading(true);
        setError(null);

        try {
            // 1. 透過 Open-Meteo Geocoding API 查出城市的經緯度
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchInput)}&count=1`,
            );
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error("City not found, please check the spelling");
            }

            const { latitude, longitude, name, country } = geoData.results[0];
            const cityName = country ? `${name}, ${country}` : name;
            setSelectedCity(cityName);

            // 2. 用查到的經緯度去抓天氣
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m`,
            );

            if (!weatherRes.ok) throw new Error("Failed fetching data！");
            const weatherData = await weatherRes.json();

            const current = weatherData.current;
            setWeatherData(current);

            // 判斷日夜並切換主題
            const isNight = current.is_day === 0;
            setWeatherType(translateWeatherCode(current.weather_code, isNight));
            setSearchInput(""); // 搜尋完清空輸入框
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 天氣主題設定檔：包含背景色、文字色、內外層裝飾、紋理與預設數值
    const weatherThemes = {
        sunny: {
            bg: "bg-[#009DFF]",
            text: "text-black",
            tempText: "text-[#FFDB00]",
            cardBg: "bg-[#ffF]/30",
            title: "WEATHER",
            temp: "39°",
            desc: "Sunny",
            pattern: "", // 乾淨背景
            innerDecorations: (
                <>
                    <img
                        src="/images/weather/deco_sunny_inner_l.png"
                        alt="sun"
                        className="absolute -top-[-10%] -left-16  w-[150] h-[150] pointer-events-none animate-pulse"
                    />
                    <img
                        src="/images/weather/deco_sunny_inner_r.png"
                        alt="cloud"
                        className="absolute -top-[-70%] -right-[-20%] w-[112.35] h-[60.06px] image-rendering-pixelated pointer-events-none animate-sway"
                    />
                </>
            ),
            outerDecorations: (
                <>
                    <img
                        src="/images/weather/deco_cloudy_outer_l.png"
                        alt="cloud"
                        className="absolute -top-[-60%] -left-16 w-[112.35] h-[40.02px] image-rendering-pixelated pointer-events-none animate-sway z-50"
                    />
                    <img
                        src="/images/weather/deco_cloudy_outer_r.png"
                        alt="cloud"
                        className="absolute -top-[-40%] -right-16 w-[138.79] h-[66.72px] image-rendering-pixelated pointer-events-none animate-sway z-50"
                        style={{ animationDuration: "6s", animationDelay: "1s" }}
                    />
                </>
            ),
        },
        cloudy: {
            bg: "bg-[#BFF9FF]",
            text: "text-slate-900",
            tempText: "",
            cardBg: "bg-[#BFE9F4]/30",
            title: "WEATHER",
            temp: "30°",
            desc: "Partly Cloud",
            pattern: "",
            innerDecorations: (
                <>
                    <img
                        src="/images/weather/deco_cloudy_inner_l.png"
                        alt="cloud"
                        className="absolute -top-[-60%] -left-16 w-[191.35] h-[113.43px] image-rendering-pixelated pointer-events-none animate-sway"
                        style={{ animationDuration: "8s", animationDelay: "1.2s" }}
                    />
                    <img
                        src="/images/weather/deco_cloudy_inner_r.png"
                        alt="cloud"
                        className="absolute -top-[-60%] -right-16 w-[376.73] h-[193.49px] image-rendering-pixelated pointer-events-none animate-sway"
                    />
                </>
            ),
            outerDecorations: (
                <>
                    <img
                        src="/images/weather/deco_cloudy_outer_l.png"
                        alt="cloud"
                        className="absolute -top-[-40%] -left-16 w-[112.35] h-[40.02px] image-rendering-pixelated pointer-events-none animate-sway z-50"
                    />
                    <img
                        src="/images/weather/deco_cloudy_outer_r.png"
                        alt="cloud"
                        className="absolute -top-[-40%] -right-16 w-[138.79] h-[66.72px] image-rendering-pixelated pointer-events-none animate-sway z-50"
                        style={{ animationDuration: "6s", animationDelay: "1s" }}
                    />
                </>
            ),
        },
        rainy: {
            bg: "bg-[#68A9D2]",
            text: "text-slate-900",
            tempText: "text-white",
            cardBg: "bg-[#fff]/30",
            title: "WEATHER",
            temp: "20°",
            desc: "Rainy / Shower",
            pattern: "",
            innerDecorations: (
                <>
                    <div className="w-[100%] h-[100%] absolute -top-[0%] -left-0 bg-[url(/images/weather/pattern_rainy.png)] bg-center bg-repeat bg-size-[84px_auto] animate-pulse"></div>
                    <img
                        src="/images/weather/deco_rainy_inner_r.png"
                        alt="cloud"
                        className="absolute -top-[-20%] -left-16 w-[200] h-auto image-rendering-pixelated pointer-events-none animate-sway"
                        style={{ animationDuration: "8s", animationDelay: "1.2s" }}
                    />
                    <img
                        src="/images/weather/deco_rainy_inner_r.png"
                        alt="cloud"
                        className="absolute -top-[-70%] -right-16 w-[200] h-auto image-rendering-pixelated pointer-events-none animate-sway"
                    />
                </>
            ),
            outerDecorations: (
                <>
                    <img
                        src="/images/weather/deco_rainy_outer_l.png"
                        alt="cloud"
                        className="absolute -top-[-50%] -left-16 w-[144] h-[47] image-rendering-pixelated pointer-events-none animate-sway z-50"
                    />
                    <img
                        src="/images/weather/deco_rainy_outer_r.png"
                        alt="cloud"
                        className="absolute -top-[-25%] -right-16 w-[177] h-[57] image-rendering-pixelated pointer-events-none animate-sway z-50"
                        style={{ animationDuration: "6s", animationDelay: "1s" }}
                    />
                </>
            ),
        },
        night: {
            bg: "bg-[#0059C5]",
            text: "text-white",
            tempText: "",
            cardBg: "bg-white/10",
            title: "WEATHER",
            temp: "18°",
            desc: "Clear Night",
            pattern: "",
            innerDecorations: (
                <>
                    <img
                        src="/images/weather/deco_clear-night_inner_l-1.png"
                        alt="star"
                        className="absolute -top-[-30%] -left-[-10%]  w-[20.74] h-[20.74] pointer-events-none animate-pulse"
                    />
                    <img
                        src="/images/weather/deco_clear-night_inner_l-2.png"
                        alt="star"
                        className="absolute -top-[-48%] -left-[-15%]  w-[34.57] h-[34.63] pointer-events-none animate-pulse"
                        style={{ animationDuration: "1s", animationDelay: "1s" }}
                    />
                    <img
                        src="/images/weather/deco_clear-night_inner_l-3.png"
                        alt="star"
                        className="absolute -top-[-66%] -left-[-5%]  w-[20.74] h-[34.63] pointer-events-none animate-pulse"
                        style={{ animationDuration: "2s", animationDelay: "2s" }}
                    />
                    <img
                        src="/images/weather/deco_clear-night_inner_r-1.png"
                        alt="cloud"
                        className="absolute -top-[-65%] -right-[-6%] w-[34.57] h-[34.63] image-rendering-pixelated pointer-events-none animate-pulse"
                        style={{ animationDuration: "1.2s", animationDelay: "1s" }}
                    />
                </>
            ),
            outerDecorations: (
                <>
                    <img
                        src="/images/weather/deco_clear-night_outer_r.png"
                        alt="moon"
                        className="absolute -top-[-9%] -right-10 w-[100] h-auto image-rendering-pixelated pointer-events-none z-9"
                    />
                </>
            ),
        },
    };

    const currentTheme = weatherThemes[weatherType] || weatherThemes.sunny;

    return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] justify-center items-center px-6 max-w-xxl mx-auto py-12 overflow-hidden">
            {/* 返回按鈕 */}
            <div className="w-full text-left mb-6 max-w-[320px]">
                <Link
                    href="/projects"
                    className="text-sm font-pixel text-blue-600 dark:text-blue-400 hover:underline">
                    &larr; Back to Projects
                </Link>
            </div>

            {/* 城市搜尋表單 */}
            <form
                onSubmit={handleSearchSubmit}
                className="flex gap-2 mb-6 w-full max-w-[320px] relative z-10">
                <input
                    type="text"
                    placeholder="Search city (e.g. Tokyo)..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-white/80 text-black border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-xs font-pixel bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    GO
                </button>
            </form>

            {/* 錯誤與載入提示 */}
            {error && (
                <div className="mb-4 text-xs font-pixel text-red-500 bg-red-100 p-2 border border-red-400 rounded max-w-[320px] w-full text-center">
                    {error}
                </div>
            )}

            {/* 最外層容器 */}
            <div className="relative w-full max-w-[320px] mx-auto">
                {currentTheme.outerDecorations}

                <div
                    className={`relative w-full ${currentTheme.bg} ${currentTheme.text} ${currentTheme.pattern} overflow-hidden rounded-3xl p-6 text-center flex flex-col items-center transition-all duration-500`}>
                    {currentTheme.innerDecorations}

                    <h1 className="font-pixel text-2xl mb-6 tracking-wider relative z-10">
                        {currentTheme.title}
                    </h1>

                    {/* 城市切換列 */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6 w-full relative z-10">
                        {Object.keys(cities).map((key) => {
                            const cityObj = cities[key];
                            return (
                                <button
                                    key={key}
                                    onClick={() => fetchWeather(key)}
                                    className={`px-3 py-1 font-pixel text-[11px] border rounded-md transition ${
                                        selectedCity === cityObj.name
                                            ? "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                            : "bg-white/40 text-current hover:bg-white/60"
                                    }`}>
                                    {key}
                                </button>
                            );
                        })}
                    </div>

                    <h2 className="font-pixel text-xl mb-4 opacity-90 relative z-10">
                        {selectedCity}
                    </h2>

                    {/* 溫度 */}
                    <div
                        className={`font-pixel text-6xl mb-1 relative z-10 pl-16 ${currentTheme.tempText}`}>
                        {loading ? "--" : `${Math.round(weatherData?.temperature_2m ?? 0)}°`}
                    </div>

                    <p
                        className={`font-pixel text-xs mb-8 opacity-90 relative z-10 ${currentTheme.tempText}`}>
                        {loading ? "FETCHING..." : currentTheme.desc}
                    </p>

                    {/* 底部數據區塊 */}
                    <div className="grid grid-cols-2 gap-3 w-full relative z-10">
                        <div className={`p-3 ${currentTheme.cardBg} backdrop-blur-sm rounded-2xl`}>
                            <span className="block font-pixel text-[9px] mb-1 opacity-80">
                                HUMIDITY
                            </span>
                            <span className="font-pixel text-xl">
                                {loading ? "--" : `${weatherData?.relative_humidity_2m}%`}
                            </span>
                        </div>
                        <div className={`p-3 ${currentTheme.cardBg} backdrop-blur-sm rounded-2xl`}>
                            <span className="block font-pixel text-[9px] mb-1 opacity-80">
                                WIND SPEED
                            </span>
                            <span className="font-pixel text-xs text-nowrap">
                                {loading ? "--" : weatherData?.wind_speed_10m}{" "}
                                <span className="text-xs">km/h</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
