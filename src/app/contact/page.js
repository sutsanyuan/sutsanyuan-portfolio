import React from "react";

const Contact = () => {
    return (
        <main className="max-w-3xl mx-auto px-6 sm:px-12 py-16 space-y-8">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Get in Touch</h1>
                <p className="text-gray-500">
                    I&apos;m currently open to new opportunities, collaborations, or just a friendly
                    chat.
                </p>
            </header>

            <section className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-6">
                <div className="space-y-1">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                        Email
                    </h2>
                    <address className="not-italic">
                        <a
                            href="mailto:your.email@example.com"
                            className="text-lg font-medium text-blue-600 hover:underline">
                            tsanyuansu@gmail.com
                        </a>
                    </address>
                </div>

                <div className="space-y-1">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                        Socials
                    </h2>
                    <nav className="flex gap-6 pt-1">
                        <a
                            href="https://github.com/sutsanyuan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 font-medium transition">
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/tsanyuansu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 font-medium transition">
                            LinkedIn
                        </a>
                    </nav>
                </div>
            </section>
        </main>
    );
};

export default Contact;
