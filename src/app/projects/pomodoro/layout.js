export const metadata = {
    title: "Pomodoro | sutsanyuan",
    description:
        "A retro pixel-art focus timer featuring custom multi-mode intervals and sprite animations.",
    openGraph: {
        title: "Pomodoro | sutsanyuan",
        description:
            "A retro pixel-art focus timer featuring custom multi-mode intervals and sprite animations.",
        url: "https://sutsanyuan-portfolio.vercel.app/projects/pomodoro",
        images: [
            {
                url: "/images/pomodoro-og.jpg", // 這是這個專案專屬的預覽縮圖
                width: 1200,
                height: 630,
                alt: "Pomodoro Timer Preview",
            },
        ],
    },
};
export default function PomodoroLayout({ children }) {
    return <>{children}</>;
}
