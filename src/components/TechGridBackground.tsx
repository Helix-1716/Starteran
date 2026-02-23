import React from 'react';

interface TechGridBackgroundProps {
    /** Opacity of the grid lines (from 0 to 1). Default: 0.04 (4%) */
    gridOpacity?: number;
    /** Size of the grid squares in pixels. Default: 50 */
    gridSpacing?: number;
    /** Opacity of the massive glowing orb behind the cards. Default: 0.15 */
    glowOpacity?: number;
    /** If true, the background glow subtly pulses over time */
    animated?: boolean;
}

/**
 * TECH GRID BACKGROUND
 * 
 * A modern SaaS-style background featuring a soft gradient base,
 * an ultra-light technical grid overlay, and a massive blurred radial glow.
 * 
 * Usage: Place this component as the very first child inside a 
 * `position: relative` section or container.
 */
export default function TechGridBackground({
    gridOpacity = 0.04,
    gridSpacing = 50,
    glowOpacity = 0.15,
    animated = false,
}: TechGridBackgroundProps) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

            {/* 1️⃣ Base Layer: Very soft vertical gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, #f8fbff, #eef4ff)'
                }}
            />

            {/* 2️⃣ Tech Grid Overlay: Ultra-light 1px grid lines */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, ${gridOpacity}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, ${gridOpacity}) 1px, transparent 1px)
          `,
                    backgroundSize: `${gridSpacing}px ${gridSpacing}px`,
                    /* Optional: Fade the grid out slightly at the top and bottom edges */
                    maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
                }}
            />

            {/* 3️⃣ Radial Glow Behind Cards: Adds depth and focus */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full max-h-[800px]">
                {/* We use an oval shape stretched horizontally to match card layouts */}
                <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-[100%] blur-[120px] ${animated ? 'animate-pulse' : ''}`}
                    style={{
                        background: `radial-gradient(ellipse at center, rgba(59,130,246,${glowOpacity}), transparent 70%)`
                    }}
                />
            </div>

        </div>
    );
}
