import { useEffect, useRef } from 'react';

interface BigCircularNeuralFlowProps {
    /** Number of particles in the brain core. Default: 200 */
    particleCount?: number;
    /** Global wave movement speed multiplier. Default: 1 */
    speed?: number;
    /** Max distance for lines to connect. Default: 150 */
    connectionDistance?: number;
    /** Opacity multiplier for the glowing effect. Default: 1 */
    glowIntensity?: number;
}

/**
 * 🧠 BIG CIRCULAR NEURAL FLOW
 * 
 * An animated, highly-optimized Canvas particle network constrained 
 * perfectly within a circle. It features sine-wave distortions,
 * gentle rotation, pulsing core glow, and proximity-based connections.
 * 
 * Perfect for elegant AI / Web3 backgrounds.
 */
export default function BigCircularNeuralFlow({
    particleCount = 200,
    speed = 1,
    connectionDistance = 150,
    glowIntensity = 1,
}: BigCircularNeuralFlowProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Transparent background allowing it to be placed anywhere
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let centerX = 0;
        let centerY = 0;
        let radius = 0;
        let nodes: Node[] = [];
        let time = 0;

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const dpr = window.devicePixelRatio || 1;
                width = parent.clientWidth;
                height = parent.clientHeight;

                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;

                ctx.scale(dpr, dpr);
                centerX = width / 2;
                centerY = height / 2;
                // Perfect circle that fills the container
                radius = Math.min(width, height) / 2;

                initNodes();
            }
        };

        class Node {
            baseX: number;
            baseY: number;
            x: number;
            y: number;
            size: number;
            phase: number;
            speedModifier: number;

            constructor() {
                // Distribute within the circle area using square root for even density
                const r = radius * Math.sqrt(Math.random());
                const theta = Math.random() * 2 * Math.PI;

                this.baseX = centerX + r * Math.cos(theta);
                this.baseY = centerY + r * Math.sin(theta);
                this.x = this.baseX;
                this.y = this.baseY;

                // Depth simulation
                this.size = Math.random() * 2.5 + 0.5;
                this.phase = Math.random() * Math.PI * 2;
                this.speedModifier = Math.random() * 0.4 + 0.6;
            }

            update(time: number) {
                // 🌊 Oceanic Sine-wave Math: 
                // 1. Distort horizontally based on their vertical `baseY` string
                const waveX = Math.sin(time * 0.0003 * speed + this.baseY * 0.01 + this.phase) * 35 * this.speedModifier;

                // 2. Distort vertically based on their horizontal `baseX` string
                const waveY = Math.sin(time * 0.0004 * speed + this.baseX * 0.008 + this.phase) * 45 * this.speedModifier;

                // 3. Very subtle universal drifting
                const driftX = Math.sin(time * 0.0001 * speed) * 40;
                const driftY = Math.cos(time * 0.00015 * speed) * 30;

                this.x = this.baseX + waveX + driftX;
                this.y = this.baseY + waveY + driftY;
            }
        }

        const initNodes = () => {
            nodes = [];
            for (let i = 0; i < particleCount; i++) {
                nodes.push(new Node());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            time += 16; // Increment stable time ms lock

            // Update positions without drawing
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].update(time);
            }

            ctx.save();

            // 🔵 Circular Masking: Clip everything perfectly to a circle boundary
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.clip();

            // 🔄 Subtle global rotation of the entire network around the core
            ctx.translate(centerX, centerY);
            ctx.rotate(time * 0.00005 * speed);
            ctx.translate(-centerX, -centerY);

            // 🌟 Soft ambient pulse glowing from the center behind the nodes
            const pulse = Math.sin(time * 0.0008) * 0.3 + 0.7; // 0.4 -> 1.0 range
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, radius
            );
            // Cyan-blue tint for bright/dark contrasting functionality
            gradient.addColorStop(0, `rgba(59, 130, 246, ${0.1 * glowIntensity * pulse})`);
            gradient.addColorStop(0.5, `rgba(147, 197, 253, ${0.03 * glowIntensity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

            // 🔌 Render Lines (Proximity based matrix logic)
            ctx.lineWidth = 0.8;
            for (let i = 0; i < nodes.length; i++) {
                const n1 = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const dx = n1.x - n2.x;
                    const dy = n1.y - n2.y;
                    const distSq = dx * dx + dy * dy;
                    const maxDistSq = connectionDistance * connectionDistance;

                    // If close enough, draw connection
                    if (distSq < maxDistSq) {
                        const dist = Math.sqrt(distSq);
                        // Non-linear fade so lines snap sharply as nodes drift apart
                        const opacity = Math.pow(1 - (dist / connectionDistance), 1.8) * glowIntensity;

                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                        // Saturated blue that works on light background
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.5})`;
                        ctx.stroke();
                    }
                }
            }

            // ✨ Render Nodes
            ctx.shadowBlur = 8 * glowIntensity;
            ctx.shadowColor = 'rgba(96, 165, 250, 0.4)';
            ctx.fillStyle = 'rgba(59, 130, 246, 0.85)';

            for (let i = 0; i < nodes.length; i++) {
                ctx.beginPath();
                ctx.arc(nodes[i].x, nodes[i].y, nodes[i].size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore(); // Important: Remove clip and rotation transformations for next frame 

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleCount, speed, connectionDistance, glowIntensity]);

    return (
        // Massive, absolutely centered positioning so it easily escapes relative boundaries 
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-90 transition-opacity duration-1000">
            <div className="w-[800px] h-[800px] sm:w-[900px] sm:h-[900px] md:w-[1200px] md:h-[1200px]">
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
        </div>
    );
}
