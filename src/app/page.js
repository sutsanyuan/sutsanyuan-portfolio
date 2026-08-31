import Link from "next/link";

export default function Home() {
    return (
        <main className=" flex flex-col min-h-[calc(100vh-140px)] justify-center px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto py-12">
            <section className="space-y-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                    Frontend Developer
                </span>
                <h1 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                    Hi, I&apos;m <br className="block sm:hidden" />
                    {/* 手機版斷行，讓名字單獨一行 */}
                    <span className="relative inline-flex items-baseline font-pixel text-3xl sm:text-5xl text-blue-600 dark:text-blue-400 mx-1 sm:mx-2">
                        {/* 因為像素字體偏小，我們用相對大小調整，這裡 sm:text-5xl 大約等於旁邊的 text-6xl */}
                        TSAN
                    </span>{" "}
                    <br />
                    <span className="text-gray-400 ">I build clean & modern web experiences.</span>
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
