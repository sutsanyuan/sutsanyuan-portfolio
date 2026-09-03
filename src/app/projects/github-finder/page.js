"use client";

import { useState } from "react";
import Link from "next/link";

export default function GithubFinderPage() {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGithubUser = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setLoading(true);
        setError(null);
        setProfile(null);

        try {
            const res = await fetch(`https://api.github.com/users/${username}`);

            if (!res.ok) {
                throw new Error("Invalid username, please try again!");
            }

            const data = await res.json();
            setProfile(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
            <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-8 sm:p-8 shadow-sm text-center flex flex-col items-center">
                <h1 className="font-pixel text-3xl text-gray-900 dark:text-white mb-2 tracking-wider">
                    <span className="text-blue-600">DEV</span> FINDER
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Search GitHub profiles and explore developer stats instantly.
                </p>

                {/* 搜尋表單 */}
                <form onSubmit={fetchGithubUser} className="w-full flex gap-2 mb-8">
                    <input
                        type="text"
                        placeholder="Enter GitHub username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="min-w-0 flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-xl transition shadow-sm disabled:opacity-50 whitespace-nowrap">
                        {loading ? "Searching..." : "Search"}
                    </button>
                </form>

                {/* 錯誤訊息 */}
                {error && (
                    <div className="w-full p-4 mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                {/* 搜尋結果卡片 */}
                {profile && (
                    <div className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl p-3 sm:p-6 flex flex-col items-center text-left">
                        <div className="flex items-center gap-4 w-full mb-6">
                            <img
                                src={profile.avatar_url}
                                alt={profile.login}
                                className="w-16 h-16 rounded-full border border-gray-200 dark:border-gray-800"
                            />
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {profile.name || profile.login}
                                </h2>
                                <a
                                    href={profile.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                                    @{profile.login}
                                </a>
                            </div>
                        </div>

                        {profile.bio && (
                            <p className="w-full text-sm text-gray-600 dark:text-gray-300 mb-6 bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                {profile.bio}
                            </p>
                        )}

                        {/* 數據統計列 */}
                        <div className="grid grid-cols-3 gap-1 sm:gap-3 w-full text-center">
                            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                <span className="block text-xs text-gray-400 mb-1">Repos</span>
                                <span className="text-base font-bold text-gray-900 dark:text-white">
                                    {profile.public_repos}
                                </span>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                <span className="block text-xs text-gray-400 mb-1">Followers</span>
                                <span className="text-base font-bold text-gray-900 dark:text-white">
                                    {profile.public_followers || profile.followers}
                                </span>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                <span className="block text-xs text-gray-400 mb-1">Following</span>
                                <span className="text-base font-bold text-gray-900 dark:text-white">
                                    {profile.following}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
