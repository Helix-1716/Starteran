import { useEffect, useRef } from 'react';

/**
 * 3D INTERACTIVE BACKGROUND
 * 
 * A pure CSS 3D rotating Diamond (Intersecting glass planes) 
 * with nested counter-rotating core.
 * Zero-lag 60fps parallax floating via requestAnimationFrame.
 */
export default function InteractiveBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable on small devices for performance and UX
        if (window.innerWidth < 768) return;

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            // Calculate cursor offset relative to the center of the screen
            const xOffset = (e.clientX / window.innerWidth - 0.5) * 2;
            const yOffset = (e.clientY / window.innerHeight - 0.5) * 2;

            // Maximum movement radius in pixels (parallax amount)
            targetX = xOffset * -45; // move opposite to mouse
            targetY = yOffset * -45;
        };

        const animate = () => {
            // Smooth lerp (linear interpolation) towards target
            currentX += (targetX - currentX) * 0.05;
            currentY += (targetY - currentY) * 0.05;

            if (containerRef.current) {
                // We apply only the 2D parallax movement to the parent wrapper
                containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden [perspective:1000px]">
            <style>
                {`
          @keyframes spin3d {
            0% { transform: rotateX(-15deg) rotateY(0deg); }
            100% { transform: rotateX(-15deg) rotateY(360deg); }
          }
          @keyframes spinReverse {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(-360deg); }
          }
          .glass-plane {
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            /* Using backdrop filter on 3d transforms works beautifully in Chromium, gracefully falls back in Safari */
            backdrop-filter: blur(2px); 
          }
        `}
            </style>

            <div
                ref={containerRef}
                className="relative w-full h-full flex items-center justify-center"
                style={{ willChange: 'transform' }}
            >

                {/* Soft Ambient Glows Behind the 3D Object */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-fuchsia-500/20 rounded-full blur-[80px] mix-blend-screen"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/20 rounded-full blur-[60px] mix-blend-screen"></div>

                {/* The 3D Rotating Diamond Container */}
                <div
                    className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] [transform-style:preserve-3d]"
                    style={{ animation: 'spin3d 14s linear infinite' }}
                >
                    {/* Diffuse Inner Core Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-400/40 to-pink-500/40 rounded-full blur-[40px] mix-blend-screen"></div>

                    {/* Outer Diamond Planes (4 Intersecting Faces) */}
                    <div
                        className="absolute inset-0 glass-plane bg-gradient-to-br from-white/30 via-purple-500/10 to-transparent border-[1.5px] border-white/40 shadow-[0_0_30px_rgba(168,85,247,0.3)_inset]"
                        style={{ transform: 'rotateY(0deg)' }}
                    ></div>
                    <div
                        className="absolute inset-0 glass-plane bg-gradient-to-br from-white/20 via-pink-500/10 to-transparent border border-white/20"
                        style={{ transform: 'rotateY(45deg)' }}
                    ></div>
                    <div
                        className="absolute inset-0 glass-plane bg-gradient-to-br from-white/30 via-blue-500/10 to-transparent border-[1.5px] border-white/40 shadow-[0_0_30px_rgba(59,130,246,0.3)_inset]"
                        style={{ transform: 'rotateY(90deg)' }}
                    ></div>
                    <div
                        className="absolute inset-0 glass-plane bg-gradient-to-br from-white/20 via-purple-500/10 to-transparent border border-white/20"
                        style={{ transform: 'rotateY(135deg)' }}
                    ></div>

                    {/* Inner Core Floating Diamond (Counter-Rotating) */}
                    <div
                        className="absolute left-[20%] top-[20%] w-[60%] h-[60%] [transform-style:preserve-3d]"
                        style={{ animation: 'spinReverse 8s linear infinite' }}
                    >
                        <div
                            className="absolute inset-0 glass-plane bg-gradient-to-br from-indigo-500/50 to-transparent border-[1.5px] border-white/50"
                            style={{ transform: 'rotateY(0deg)' }}
                        ></div>
                        <div
                            className="absolute inset-0 glass-plane bg-gradient-to-br from-fuchsia-500/50 to-transparent border-[1.5px] border-white/50"
                            style={{ transform: 'rotateY(60deg)' }}
                        ></div>
                        <div
                            className="absolute inset-0 glass-plane bg-gradient-to-br from-purple-500/50 to-transparent border-[1.5px] border-white/50"
                            style={{ transform: 'rotateY(120deg)' }}
                        ></div>
                    </div>

                </div>

                {/* Floating Particles for extra depth */}
                <div className="absolute top-[15%] left-[10%] w-3 h-3 bg-purple-400/80 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-[20%] right-[10%] w-4 h-4 bg-pink-400/70 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '4.5s' }}></div>
                <div className="absolute top-[80%] left-[25%] w-2 h-2 bg-blue-400/80 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '2.5s' }}></div>
                <div className="absolute top-[30%] right-[20%] w-5 h-5 bg-fuchsia-400/50 rounded-full blur-[3px] animate-pulse" style={{ animationDuration: '6s' }}></div>

            </div>
        </div>
    );
}
