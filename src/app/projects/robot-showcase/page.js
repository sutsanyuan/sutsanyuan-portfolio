"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, useAnimations } from "@react-three/drei";
import Link from "next/link";

const MODEL_URL = "https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb";
function Robot() {
    const groupRef = useRef();

    // 直接透過官方穩定的 CDN 載入 .glb 模型與內建動畫
    const { scene, animations } = useGLTF(MODEL_URL);
    // 利用 drei 的 useAnimations 抓取機器人的所有動作清單
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        // 機器人內建很多動作（例如：'Idle', 'Walking', 'Running', 'Dance', 'Wave' 等）
        // 這裡我們讓它一載入就自動播放 "Dance"（跳舞）動畫！
        if (actions && actions["Dance"]) {
            actions["Dance"].reset().fadeIn(0.5).play();
        }

        return () => {
            if (actions && actions["Dance"]) {
                actions["Dance"].fadeOut(0.5);
            }
        };
    }, [actions]);
    return (
        <group ref={groupRef}>
            <primitive object={scene} scale={[0.8, 0.8, 0.8]} position={[0, -1.5, 0]} />
        </group>
    );
}
export default function RobotShowcasePage() {
    return (
        <div className="relative w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-between px-6 py-8 overflow-hidden bg-white text-grey-900">
            <div className="w-full max-w-4xl flex justify-between items-center z-10">
                <Link
                    href="/projects"
                    className="text-sm font-pixel text-blue-600 dark:text-blue-400 hover:underline">
                    &larr; Back to Projects
                </Link>
                <span className="px-3 py-1 text-[10px] font-pixel border-2 border-blue-500 text-blue-500 rounded">
                    3D GLTF ANIMATION TEST
                </span>
            </div>

            {/* 3D 畫布區域 */}
            <div className="w-full h-[500px] md:h-[600px] relative">
                <Canvas
                    camera={{ position: [0, 2, 8], fov: 50 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, precision: "highp" }}
                    shadows>
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[5, 8, 5]} intensity={2} castShadow />
                    <Environment preset="city" />

                    <Suspense fallback={null}>
                        <Robot />
                    </Suspense>

                    <OrbitControls enableZoom={true} enablePan={false} />
                </Canvas>
            </div>

            <div className="text-center z-10 max-w-md">
                <h1 className="font-pixel text-xl mb-2 text-white">ROBOT DANCE SHOWCASE</h1>
                <p className="font-pixel text-xs text-gray-400">
                    Loaded directly from a .glb file with skeletal animations via R3F.
                </p>
            </div>
        </div>
    );
}

// 預先載入模型，優化網頁體驗
useGLTF.preload(MODEL_URL);
