import React from "react";

const AboutTsan = () => {
    const techStack = [
        "JavaScript (ES6+)",
        "React",
        "Next.js (App Router)",
        "Tailwind CSS",
        "Git & GitHub",
        "Vercel Deployment",
    ];
    return (
        <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 space-y-12">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">About Me</h1>
                <p className="text-gray-500">
                    Get to know more about my background and technical skills.
                </p>
            </header>

            <article className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                    Hello! I&apos;m Tsan, an aspiring frontend developer dedicated to bridging the
                    gap between elegant design and efficient code. I love turning complex problems
                    into simple, beautiful, and intuitive interfaces.
                </p>
                <p>
                    My development philosophy is rooted in simplicity and performance—focusing on
                    writing scalable architecture and clean UI/UX rather than unnecessary
                    complexity.
                </p>
            </article>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Tech Stack</h2>
                <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
                    {techStack.map((tech, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-200">
                            {tech}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AboutTsan;
