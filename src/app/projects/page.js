import React from "react";

const Projects = () => {
    const projects = [
        {
            title: "Personal Portfolio",
            description:
                "A modern, minimalist personal portfolio website built with Next.js App Router, Tailwind CSS, and deployed on Vercel.",
            tags: ["Next.js", "Tailwind CSS", "React"],
            github: "https://github.com/sutsanyuan/sutsanyuan-portfolio",
            demo: "https://sutsanyuan-portfolio.vercel.app/",
        },
        {
            title: "Little Lemon Restaurant Reservation System",
            description: `Developed an end-to-end restaurant reservation solution to address the lack of online booking capabilities for Little Lemon Restaurant. This project bridges the gap between user experience research and technical execution, delivering a functional, responsive, and robust application.`,
            tags: [
                "React",
                "create-react-app",
                "JavaScript",
                "HTML5",
                "SCSS",
                "Jest",
                "Figma",
                "Jest",
                "UX Design",
            ],
            github: "https://github.com/sutsanyuan/little-lemon",
            demo: "https://little-lemon-4k4.pages.dev/",
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
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                                Live Demo →
                            </a>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default Projects;
