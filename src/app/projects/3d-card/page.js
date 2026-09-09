"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

// 建立完美的 2D 圓角路徑
function createRoundedCardShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;

    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);

    return shape;
}

function PokemonCard() {
    const cardRef = useRef();
    const innerRef = useRef();

    // 記錄總共翻轉了幾次半圈
    const flipCountRef = useRef(0);
    const isAnimatingRef = useRef(false);

    // 載入所有需要的貼圖
    const frontPinkTexture = useLoader(THREE.TextureLoader, "/images/card-front-pink.png");
    const frontGreenTexture = useLoader(THREE.TextureLoader, "/images/card-front-green.png");
    const backTexture = useLoader(THREE.TextureLoader, "/images/card-back.png");

    // 統一處理色彩空間與清晰度優化
    useEffect(() => {
        [frontPinkTexture, frontGreenTexture, backTexture].forEach((texture) => {
            if (texture) {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.generateMipmaps = true;
                texture.minFilter = THREE.LinearMipmapLinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.anisotropy = 16;
                texture.needsUpdate = true;
            }
        });
    }, [frontPinkTexture, frontGreenTexture, backTexture]);

    const { contextSafe } = useGSAP({ scope: cardRef });

    const cardWidth = 3;
    const cardHeight = 4.2;
    const cardThickness = 0.02;
    const cardRadius = 0.18;

    const cardShape = createRoundedCardShape(cardWidth, cardHeight, cardRadius);
    const extrudeSettings = {
        depth: cardThickness,
        bevelEnabled: false,
        steps: 1,
    };

    // 正面材質 Ref
    const frontMaterialRef = useRef();

    // 內層動畫：上下浮動與微幅傾斜
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (innerRef.current) {
            innerRef.current.position.y = Math.sin(t * 1.5) * 0.1;
            innerRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;
        }
    });

    // 點擊觸發 GSAP 翻轉
    const handleClick = contextSafe(() => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        flipCountRef.current += 1;
        // 每次累積目標絕對角度（例如 180°, 360°, 540°...），徹底解決累積誤差
        const targetRotationY = flipCountRef.current * Math.PI;

        gsap.to(cardRef.current.rotation, {
            y: targetRotationY,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                isAnimatingRef.current = false;

                // 關鍵：當 `flipCount` 是奇數（1, 3, 5...）時，代表剛好翻到「背面」
                // 此時使用者正盯著背面看，正面正背對著觀眾！
                // 我們在這個絕對安全的瞬間，偷偷把正面貼圖換掉，絕對不會被任何人看到！
                if (flipCountRef.current % 2 !== 0) {
                    const cycleIndex = Math.floor((flipCountRef.current + 1) / 2);
                    const targetTexture =
                        cycleIndex % 2 !== 0 ? frontGreenTexture : frontPinkTexture;

                    if (frontMaterialRef.current) {
                        frontMaterialRef.current.map = targetTexture;
                        frontMaterialRef.current.needsUpdate = true;
                    }
                }
            },
        });
    });

    return (
        <group ref={cardRef} onClick={handleClick} className="cursor-pointer">
            <group ref={innerRef}>
                {/* 圓角厚度夾心 */}
                <mesh position={[0, 0, -cardThickness / 2]}>
                    <extrudeGeometry args={[cardShape, extrudeSettings]} />
                    <meshBasicMaterial color="#1e293b" />
                </mesh>

                {/* 正面貼圖平面 */}
                <mesh position={[0, 0, cardThickness / 2 + 0.002]}>
                    <planeGeometry args={[cardWidth, cardHeight]} />
                    <meshBasicMaterial
                        ref={frontMaterialRef}
                        map={frontPinkTexture}
                        transparent={true}
                    />
                </mesh>

                {/* 背面貼圖平面 */}
                <mesh position={[0, 0, -cardThickness / 2 - 0.002]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[cardWidth, cardHeight]} />
                    <meshBasicMaterial map={backTexture} transparent={true} />
                </mesh>
            </group>
        </group>
    );
}

export default function ThreeCardPage() {
    const container = useRef(null);

    useGSAP(
        () => {
            gsap.from(".info-content > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
            });
        },
        { scope: container }
    );

    return (
        <div
            ref={container}
            className="relative w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-between px-6 py-8 overflow-hidden">
            <div className="w-full max-w-4xl flex justify-between items-center z-10">
                <Link
                    href="/projects"
                    className="text-sm font-pixel text-blue-600 dark:text-blue-400 hover:underline">
                    &larr; Back to Projects
                </Link>
                <span className="px-3 py-1 text-[10px] font-pixel border-2 border-black dark:border-white bg-blue-100 text-blue-800 rounded">
                    R3F FAKEMON CARD
                </span>
            </div>

            <div className="w-full h-[500px] md:h-[600px] relative cursor-pointer">
                <Canvas
                    camera={{
                        position: [0, 0, 6],
                        fov: 50,
                    }} /* 視窗變高了，把相機距離拉遠到 6，讓卡片維持原本的大小，四周空間變寬裕 */
                    dpr={[1, typeof window !== "undefined" ? window.devicePixelRatio : 2]}
                    gl={{
                        antialias: true,
                        powerPreference: "high-performance",
                        precision: "highp",
                    }}
                    shadows>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
                    <Environment preset="city" />

                    <Suspense fallback={null}>
                        <Center>
                            <PokemonCard />
                        </Center>
                    </Suspense>

                    <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
            </div>

            <div className="info-content text-center z-10 max-w-md">
                <h1 className="font-pixel text-2xl mb-2 text-black dark:text-white">
                    FAKEMON CARD
                </h1>
                <p className="font-pixel text-xs text-gray-600 dark:text-gray-300 mb-4">
                    Click the card to flip smoothly and swap the element. Crystal clear textures at
                    any angle.
                </p>
            </div>
        </div>
    );
}
