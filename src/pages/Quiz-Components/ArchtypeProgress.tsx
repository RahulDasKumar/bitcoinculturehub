import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";
import useArchtype from "./QuizContext";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

type TestProps = {
    selection: string;
};

gsap.registerPlugin(DrawSVGPlugin);

const ArchtypeProgress: React.FC<TestProps> = ({ selection }) => {
    const value = useArchtype((state) => state.archtypes);

    const pathRefs = useRef<Record<string, SVGPathElement>>({});

    const [endPosMap, setEndPosMap] = useState<Record<string, { x: number; y: number }>>({});

    const dMap: Record<string, { holder: string; segment: string; img: string }> = {
        HODLer: {
            holder:
                "M 6 10 Q 5.773 9.54 5.387 9.359 Q 5 9.2 4.902 8.835 Q 4.867 8.691 4.864 8.558 Q 4.865 8.463 4.865 8.383 L 4.862 8.257",
            segment:
                "M 6 10 Q 5.773 9.54 5.387 9.359 Q 5 9.2 4.902 8.835 Q 4.867 8.691 4.864 8.558 Q 4.865 8.463 4.865 8.383 L 4.862 8.257",
            img: "images/Citadel representation logo.png",
        },
        Creator: {
            holder:
                "M 6 10 Q 5.882 9.458 5.656 9.306 Q 5.423 9.154 5.381 9.011 Q 5.353 8.918 5.347 8.768 Q 5.339 8.606 5.341 8.438 L 5.341 8.274",
            segment:
                "M 6 10 Q 5.882 9.458 5.656 9.306 Q 5.423 9.154 5.381 9.011 Q 5.353 8.918 5.347 8.768 Q 5.339 8.606 5.341 8.438 L 5.341 8.274",
            img: "images/Forger-Archetype.png",
        },
        Explorer: {
            holder: "M 6 10 L 6 9.5 L 6 9.2 L 6.001 8.801 L 6 8.453 L 6 8.26",
            segment: "M 6 10 L 6 9.5 L 6 9.2 L 6.001 8.801 L 6 8.453 L 6 8.26",
            img: "images/Luminary-Archetype.png",
        },
        Maximalist: {
            holder:
                "M 6 10 Q 6.12 9.459 6.362 9.305 Q 6.584 9.151 6.627 9.026 Q 6.657 8.926 6.676 8.752 Q 6.689 8.611 6.701 8.441 Q 6.707 8.319 6.705 8.278",
            segment:
                "M 6 10 Q 6.12 9.459 6.362 9.305 Q 6.584 9.151 6.627 9.026 Q 6.657 8.926 6.676 8.752 Q 6.689 8.611 6.701 8.441 Q 6.707 8.319 6.705 8.278",
            img: "images/Sentinel-Archetype.png",
        },
        Begninner: {
            holder:
                "M 6 10 Q 6.251 9.532 6.658 9.312 Q 7.021 9.172 7.097 8.748 Q 7.119 8.613 7.126 8.506 Q 7.129 8.406 7.126 8.337 L 7.124 8.266",
            segment:
                "M 6 10 Q 6.251 9.532 6.658 9.312 Q 7.021 9.172 7.097 8.748 Q 7.119 8.613 7.126 8.506 Q 7.129 8.406 7.126 8.337 L 7.124 8.266",
            img: "images/Voyager-Archetype.png",
        },
    };

    useEffect(() => {
        Object.values(pathRefs.current).forEach((path) => {
            gsap.set(path, { drawSVG: "1%" });
        });
    }, []);

    useEffect(() => {
        if (!selection) return;
        const path = pathRefs.current[selection];
        if (!path) return;

        const percent = `${value[selection] * 20}%`;
        gsap.to(path, { drawSVG: percent, duration: 1, ease: "power1.inOut" });
    }, [selection, value]);

    useEffect(() => {
        const newMap: Record<string, { x: number; y: number }> = {};
        Object.keys(dMap).forEach((id) => {
            const path = pathRefs.current[id];
            if (path) {
                const len = path.getTotalLength();
                const pt = path.getPointAtLength(len);
                newMap[id] = { x: pt.x - 0.15, y: pt.y - 0.14 };
            }
        });
        setEndPosMap(newMap);
    }, []);

    return (
        <div className="w-1/2 h-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="4.6 8 3 2">
                {Object.entries(dMap).map(([id, { holder, segment, img }]) => {
                    const pos = endPosMap[id];
                    return (
                        <g key={id}>
                            {/* Holder path */}
                            <path d={holder} stroke="#ccc" strokeWidth="0.05" fill="none" />
                            {/* Animated segment */}
                            <path
                                id={`segment-${id}`}
                                d={segment}
                                stroke="orange"
                                strokeWidth="0.05"
                                fill="none"
                                ref={(el) => {
                                    if (el) pathRefs.current[id] = el;
                                }}
                            />
                            {/* Image at end */}
                            {pos && <image href={img} width={0.5} height={0.5} x={pos.x -.1} y={pos.y} />}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default ArchtypeProgress;
