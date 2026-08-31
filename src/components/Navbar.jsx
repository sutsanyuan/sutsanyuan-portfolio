"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <nav className="max-w-5xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
        
        {/* Logo / 名字 */}
        <Link href="/" className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
          sutsanyuan
        </Link>

        {/* 桌面版導覽列 */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</Link>
          <Link href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Projects</Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</Link>
        </div>

        {/* 手機版：漢堡按鈕 */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {/* 上橫線 */}
          <span
            className={`absolute w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ${
              isOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          {/* 中間橫線 */}
          <span
            className={`absolute w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* 下橫線 */}
          <span
            className={`absolute w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ${
              isOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </nav>

      {/* 手機版展開選單 */}
      <div className={`md:hidden grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
  <div className="overflow-hidden border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
    <div className="flex flex-col space-y-4 px-6 py-4 text-base font-medium text-gray-700 dark:text-gray-200">
      <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
      <Link href="/aboutTsan" onClick={() => setIsOpen(false)}>About</Link>
      <Link href="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
      <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
    </div>
  </div>
</div>
    </header>
  );
}