"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function PlaygroundPage() {
    const p5ContainerRef = useRef();

    useEffect(() => {
        // 動態載入 p5.js 確保只在客戶端執行
        let p5Instance = null;

        import("p5").then((p5) => {
            const sketch = (s) => {
                let cols, rows;
                let scale = 60;
                let flying = 0;

                s.setup = () => {
                    const canvas = s.createCanvas(window.innerWidth, window.innerHeight, s.WEBGL);
                    canvas.parent(p5ContainerRef.current);
                };

                s.draw = () => {
                    s.background(0);
                    s.rotateX(s.PI);
                    s.translate(-s.width, -s.height);

                    // 經典的 p5.js 柏林雜訊地形波浪（很有復古網格感）
                    flying -= 0.08;
                    let yoff = flying;
                    for (let y = 0; y < 15; y++) {
                        let xoff = 0;
                        s.beginShape(s.TRIANGLE_STRIP);
                        for (let x = 0; x < 50; x++) {
                            let z = s.map(s.noise(xoff, yoff), 0, 1, -50, 50);
                            s.fill(0);
                            s.stroke(255);
                            s.vertex(x * scale, y * scale, z);
                            s.vertex(x * scale, (y + 1) * scale, z);
                            xoff += 0.5;
                        }
                        s.endShape();
                        yoff += 0.1;
                    }
                };

                s.windowResized = () => {
                    s.resizeCanvas(window.innerWidth, window.innerHeight);
                };
            };

            p5Instance = new p5.default(sketch);
        });

        return () => {
            if (p5Instance) p5Instance.remove(); // 清理畫布防記憶體洩漏
        };
    }, []);

    return (
        <div className="relative min-h-[calc(100vh-140px)] flex flex-col items-center justify-center overflow-hidden">
            {/* p5.js 畫布容器 */}
            <div ref={p5ContainerRef} className="absolute inset-0 -z-10 pointer-events-none" />

            <div className="z-10 text-center px-6 bg-white/80 dark:bg-black/80 p-8 rounded-2xl border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h1 className="font-pixel text-3xl mb-4">P5.JS GENERATIVE LAB</h1>
                <p className="font-pixel text-xs mb-6">
                    Using canvas and math for retro grid effects.
                </p>
                <Link
                    href="/"
                    className="px-4 py-2 font-pixel text-xs bg-black text-white dark:bg-white dark:text-black border border-black">
                    BACK HOME
                </Link>
            </div>
        </div>
    );
}
