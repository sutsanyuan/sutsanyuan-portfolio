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
                    Hi, I’m Tsan — a front-end developer with a design background. For the past 3
                    years at TutorABC, I’ve built and shipped responsive marketing landing pages,
                    turning Figma designs into fast, mobile-first pages under tight campaign
                    deadlines. Before that, I spent years in visual and multimedia design, and I
                    hold an MFA in New Media Art.
                </p>
                <p>
                    Today I focus on React: I build products end to end, from UX research and Figma
                    prototypes to tested React code with Jest and React Testing Library.
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
