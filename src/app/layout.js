import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google"; // 1. 引入字體
import "./globals.css";
import Navbar from "@/components/Navbar";

// 2. 設定主要字體 (Geist)
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// 3. 設定妳想要的特殊字體 (Press Start 2P)
// 記得設定 subsets: ['latin']，weight 只能選 400
const pressStart2P = Press_Start_2P({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-press-start", // 定義 CSS 變數名稱
});

export const metadata = {
    title: "Sutsanyuan | Portfolio",
    description: "Frontend Developer Portfolio",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {/* 4. 將字體變數套用到 body 上，這樣全站都可以用 Tailwind 的預設字體 */}
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
                <Navbar />
                <main>{children}</main>
                <footer className="py-6 text-center text-sm text-gray-400 dark:text-gray-600">
                    © {new Date().getFullYear()} Sutsanyuan. All rights reserved.
                </footer>
            </body>
        </html>
    );
}
