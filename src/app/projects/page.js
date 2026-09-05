import React from "react";
import Link from "next/link";

const Projects = () => {
    const projects = [
        {
            title: "Pixel Weather",
            description:
                "A retro pixel-style weather dashboard with dynamic themes and real-time Open-Meteo API data.",
            tags: ["Next.js", "Tailwind CSS", "React", "REST API"],
            github: "https://github.com/sutsanyuan/sutsanyuan-portfolio/tree/main/src/app/projects/weather",
            demo: "/projects/weather",
        },
        {
            title: "Github Finder",
            description:
                "A developer profile search tool leveraging GitHub REST API. Features async data handling, error boundaries, and defensive UI rendering for instant stats exploration.",
            tags: ["Next.js", "Tailwind CSS", "React", "REST API"],
            github: "https://github.com/sutsanyuan/sutsanyuan-portfolio/tree/main/src/app/projects/github-finder",
            demo: "/projects/github-finder",
        },
        {
            title: "Pomodoro Timer",
            description:
                "A retro pixel-art focus timer featuring custom multi-mode intervals (Focus/Break/Rest), dynamic sprite hover animations, and automated work-rest cycle logic.",
            tags: ["Next.js", "Tailwind CSS", "React", "Pixel Art"],
            github: "https://github.com/sutsanyuan/sutsanyuan-portfolio/tree/main/src/app/projects/pomodoro",
            demo: "/projects/pomodoro",
        },
        {
            title: "Personal Portfolio",
            description:
                "A modern, minimalist personal portfolio website built with Next.js App Router, custom pixel typography, and dark mode support deployed on Vercel.",
            tags: ["Next.js", "Tailwind CSS", "React"],
            github: "https://github.com/sutsanyuan/sutsanyuan-portfolio",
            demo: "/",
        },
        {
            title: "Little Lemon Restaurant Reservation System",
            description:
                "An end-to-end restaurant reservation solution bridging UX research and technical execution, delivering a functional, responsive, and robust online booking application.",
            tags: ["React", "JavaScript", "Jest", "Figma", "UX Design"],
            github: "https://github.com/sutsanyuan/little-lemon",
            demo: "https://little-lemon-4k4.pages.dev/", // 這是外部獨立專案，維持原樣沒問題！
        },
    ];
    return (
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-16 space-y-12">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
                <p className="text-gray-500">A selection of things I&apos;ve built recently.</p>
            </header>

            <section className="grid gap-8 sm:grid-cols-2">
                {projects.map((project, index) => (
                    <article
                        key={index}
                        className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                            <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {project.description}
                            </p>
                            <ul className="flex flex-wrap gap-2 pt-2 list-none p-0 m-0">
                                {project.tags.map((tag, i) => (
                                    <li
                                        key={i}
                                        className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                                GitHub →
                            </a>

                            {/* 判斷如果是站內路徑用 Link，外部網址用 a */}
                            {project.demo.startsWith("/") ? (
                                <Link
                                    href={project.demo}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                                    Live Demo →
                                </Link>
                            ) : (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                                    Live Demo →
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default Projects;
