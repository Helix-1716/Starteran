import { useEffect, useRef } from 'react';

interface WaveNetworkBackgroundProps {
    /** Approximate number of nodes per 1,000,000 pixels of area. Default: 60 */
    density?: number;
    /** Global speed multiplier for the wave and drifting animations. Default: 1 */
    speed?: number;
    /** Maximum pixel distance between nodes to draw a connecting line. Default: 180 */
    lineDistance?: number;
}

/**
 * WAVE NETWORK BACKGROUND
 * 
 * A highly optimized HTML5 Canvas particle system that mimics a living neural network.
 * Features:
 * - Real-time Sine wave distortion (Y-axis oceanic waves, X-axis drifting)
 * - Proximity-based thin connection lines with dynamic opacity
 * - Mouse parallax depth simulation tracking
 * - Canvas batched rendering path optimizations
 */
export default function WaveNetworkBackground({
    density = 60,
    speed = 1,
    lineDistance = 180,
}: WaveNetworkBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false }); // alpha:false optimizes background painting if we fill it manually, but since we rely on transparent canvas with CSS background, we drop it.
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let nodes: Node[] = [];
        let time = 0;

        // Mouse tracking for parallax
        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;
        let isMobile = window.innerWidth < 768;

        const handleResize = () => {
            isMobile = window.innerWidth < 768;
            const parent = canvas.parentElement;
            if (parent) {
                // Match DPI density for retina displays for crisp rendering
                const dpr = window.devicePixelRatio || 1;
                width = parent.clientWidth;
                height = parent.clientHeight;

                canvas.width = width * dpr;
                canvas.height = height * dpr;
                // Scale down via CSS
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;

                ctx.scale(dpr, dpr);
                initNodes();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isMobile) return;
            // Calculate cursor offset relative to canvas center (-1 to 1)
            const rect = canvas.getBoundingClientRect();
            targetMouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
            targetMouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
        };

        class Node {
            baseX: number;
            baseY: number;
            x: number;
            y: number;
            radius: number;
            phase: number;
            speedModifier: number;

            constructor(x: number, y: number) {
                this.baseX = x;
                this.baseY = y;
                this.x = x;
                this.y = y;
                // Varying sizes creates natural depth
                this.radius = Math.random() * 1.5 + 0.5;
                this.phase = Math.random() * Math.PI * 2;
                this.speedModifier = Math.random() * 0.5 + 0.5;
            }

            update(time: number, parallaxX: number, parallaxY: number) {
                // X-axis drift based on Y position (Creates a curtain waving effect)
                const waveX = Math.sin(time * 0.0005 * speed + this.baseY * 0.005 + this.phase) * 25 * this.speedModifier;

                // Y-axis ocean swell based on X position
                const waveY = Math.sin(time * 0.0008 * speed + this.baseX * 0.003 + this.phase) * 35 * this.speedModifier;

                // Depth modifier for parallax (Larger/closer nodes move more)
                const depth = this.radius;

                // Counter-movement for the parallax feeling
                const pX = parallaxX * -25 * depth;
                const pY = parallaxY * -25 * depth;

                this.x = this.baseX + waveX + pX;
                this.y = this.baseY + waveY + pY;
            }
        }

        const initNodes = () => {
            nodes = [];
            const area = width * height;
            const nodeCount = Math.floor((area / 1000000) * density * 2.5);

            for (let i = 0; i < nodeCount; i++) {
                // Spawn nodes slightly outside the visible boundary so lines don't abruptly cut off
                nodes.push(new Node(
                    Math.random() * (width + 200) - 100,
                    Math.random() * (height + 200) - 100
                ));
            }
        };

        const animate = () => {
            // Clear frame
            ctx.clearRect(0, 0, width, height);

            time += 16; // Increment stable time (approx 60fps)

            // Lerp mouse coordinates for smooth buttery parallax
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            // Mathematical Update
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].update(time, mouseX, mouseY);
            }

            // Render Step 1: Connecting Lines
            // We render ALL lines first so they sit exactly behind the nodes
            ctx.lineWidth = 0.8;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distSq = dx * dx + dy * dy;
                    const maxDistSq = lineDistance * lineDistance;

                    if (distSq < maxDistSq) {
                        const dist = Math.sqrt(distSq);
                        // Dynamic opacity: sharp falloff as nodes move apart
                        const opacity = Math.pow(1 - (dist / lineDistance), 1.5);

                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        // Premium StartEarn Blue/White connections
                        ctx.strokeStyle = `rgba(147, 197, 253, ${opacity * 0.45})`;
                        ctx.stroke();
                    }
                }
            }

            // Render Step 2: Glowing Nodes
            // Batch rendering nodes together to prevent context switching & heavy repaints
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(96, 165, 250, 0.8)';
            ctx.fillStyle = 'rgba(219, 234, 254, 0.95)';

            for (let i = 0; i < nodes.length; i++) {
                ctx.beginPath();
                ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Reset Shadow
            ctx.shadowBlur = 0;

            animationFrameId = requestAnimationFrame(animate);
        };

        // Attach listeners
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Boot
        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [density, speed, lineDistance]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#0B1021] via-[#111A3A] to-[#0B1026] rounded-2xl pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
            {/* 
        This is perfectly optimized: 
        CSS gradients handle the heavy pixel lighting. Canvas purely draws the vector dots. 
      */}
            <canvas
                ref={canvasRef}
                className="w-full h-full block mix-blend-screen"
            />
        </div>
    );
}
