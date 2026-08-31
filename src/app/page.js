import Link from "next/link";

export default function Home() {
    return (
        <main className=" flex flex-col min-h-[calc(100vh-140px)] justify-center px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto py-12">
            <section className="space-y-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                    Frontend Developer
                </span>
                <h1 className="font-sans tracking-tight text-gray-900 dark:text-white">
                    {/* 手機版直排、桌機版橫排的標題區塊 */}
                    <span className="block sm:inline-block text-5xl  font-normal text-gray-900 dark:text-white mb-4 sm:mb-2">
                        <span className=" mb-2 sm:mb-0  text-gray-500 dark:text-gray-400 sm:text-gray-900 sm:dark:text-white">
                            Hi, I&apos;m
                        </span>{" "}
                        <span className="relative inline-flex items-center translate-y-[0.15em] sm:translate-y-[0.2em] font-pixel sm:text-[0.85em] text-4xl text-blue-600 dark:text-blue-400 mx-0">
                            TSAN
                        </span>
                    </span>

                    {/* 第三行：核心定位 */}
                    <span className="block text-3xl sm:text-5xl font-semibold leading-tight text-gray-400 dark:text-white">
                        I build clean & modern web experiences.
                    </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    Passionate about crafting intuitive, high-performance web applications with
                    React, Next.js, and Tailwind CSS. Focused on writing clean code and delivering
                    seamless user experiences.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                    <Link
                        href="/projects"
                        className="px-6 py-3 font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition shadow-sm">
                        View Projects
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Get in Touch
                    </Link>
                </div>
            </section>
        </main>
    );
}
