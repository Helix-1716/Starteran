import { useState, useEffect } from 'react';

export default function AuthLoader() {
  const [loadingText, setLoadingText] = useState("Initializing Secure Node...");

  useEffect(() => {
    const texts = [
      "Initializing Secure Node...",
      "Encrypting Data Stream...",
      "Establishing Encrypted Tunnel..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse-soft {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
          .ring-loader {
            border: 3px solid #E5E7EB;
            border-top-color: #2563EB;
            border-radius: 50%;
            animation: spin-slow 1s linear infinite;
          }
          .ring-loader-inner {
            border: 3px solid #F3F4F6;
            border-bottom-color: #60A5FA;
            border-radius: 50%;
            animation: spin-slow 1.5s ease-in-out infinite reverse;
          }
        `}
      </style>

      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F7] text-gray-900 font-sans">

        {/* 9:16 mobile ratio card */}
        <div className="relative z-10 w-[85vw] max-w-[320px] aspect-[9/16] max-h-[580px] flex flex-col items-center justify-center px-6 py-10 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Logo & Loaders */}
          <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center mb-8">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 ring-loader"></div>

            {/* Inner rotating ring */}
            <div className="absolute inset-3 ring-loader-inner"></div>

            {/* Star Logo */}
            <div className="relative z-10 animate-[pulse-soft_2s_ease-in-out_infinite]">
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 md:w-12 md:h-12">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#2563EB" />
              </svg>
              {/* Inner Arrow */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-[2px]">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Typography */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-gray-900">
            Start<span className="text-[#2563EB]">Earn</span>
          </h2>

          {/* Loader text */}
          <div className="mt-6 flex flex-col items-center w-full px-4">
            <p className="text-gray-500 text-sm md:text-base font-medium transition-opacity duration-300">
              {loadingText}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
