

/**
 * 1️⃣ FIRST TIME LOGIN / SIGNUP LOADER
 * 
 * A full-screen, premium animated loading screen that appears
 * during the initial authentication loading phase.
 * 
 * Features:
 * - Star glowing pulse effect
 * - Arrow moving upward
 * - Gradient flowing animation
 * - Blurred overlay
 */
export default function AuthLoader() {
    return (
        <>
            <style>
                {`
          @keyframes starPulse {
            0%, 100% { 
              transform: scale(1); 
              filter: drop-shadow(0 0 15px rgba(236, 72, 153, 0.4)); 
            }
            50% { 
              transform: scale(1.08); 
              filter: drop-shadow(0 0 35px rgba(139, 92, 246, 0.8)); 
            }
          }
          @keyframes arrowUp {
            0% { transform: translateY(0px); opacity: 0.8; }
            50% { transform: translateY(-6px); opacity: 1; }
            100% { transform: translateY(0px); opacity: 0.8; }
          }
          @keyframes flowGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes shimmerSweep {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(200%) skewX(-15deg); }
          }

          .animate-star {
            animation: starPulse 2.5s ease-in-out infinite;
          }
          .animate-arrow {
            animation: arrowUp 1.5s ease-in-out infinite;
          }
          .gradient-text-flow {
            background: linear-gradient(270deg, #8b5cf6, #ec4899, #8b5cf6, #ec4899);
            background-size: 300% 300%;
            animation: flowGradient 4s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .animate-shimmer {
            animation: shimmerSweep 2.5s infinite linear;
          }
        `}
            </style>
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-900/60 backdrop-blur-xl transition-all duration-500 fade-in zoom-in-95">

                {/* Core Container */}
                <div className="relative flex flex-col items-center px-12 py-10 bg-white/10 rounded-[2rem] border border-white/20 shadow-[0_0_60px_rgba(139,92,246,0.15)] overflow-hidden">

                    {/* Logo Container */}
                    <div className="relative w-28 h-28 flex items-center justify-center mb-6">

                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full blur-[30px] opacity-60 animate-pulse"></div>

                        {/* Star Icon (Gradient Vector) */}
                        <svg viewBox="0 0 24 24" fill="none" className="w-24 h-24 animate-star drop-shadow-2xl absolute z-10">
                            <defs>
                                <linearGradient id="gradLogo" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#gradLogo)" opacity="0.9" />
                        </svg>

                        {/* Inner Arrow */}
                        <div className="absolute animate-arrow text-white drop-shadow-md z-20 flex flex-col items-center pt-2">
                            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Typography */}
                    <h2 className="text-3xl font-extrabold tracking-tight mb-2 gradient-text-flow drop-shadow-sm">
                        StartEarn
                    </h2>

                    {/* Progress bar simulation */}
                    <div className="h-1.5 w-48 bg-gray-800/50 rounded-full overflow-hidden mt-3 relative shadow-inner">
                        <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 w-full animate-[flowGradient_2s_ease-in-out_infinite_alternate] rounded-full"></div>
                        {/* Motion sweep inside bar */}
                        <div className="absolute top-0 left-0 w-1/2 h-full bg-white/30 animate-shimmer"></div>
                    </div>

                    <p className="text-gray-300 font-medium text-[11px] mt-4 tracking-[0.25em] uppercase opacity-80">
                        Securing Connection
                    </p>
                </div>
            </div>
        </>
    );
}
