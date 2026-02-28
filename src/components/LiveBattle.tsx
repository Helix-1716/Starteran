import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Eye, Timer, Users, Trophy, ChevronRight } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import confetti from 'canvas-confetti';

export default function LiveBattle() {
    const [battleState, setBattleState] = useState<'lobby' | 'active' | 'finished'>('lobby');
    const [timer, setTimer] = useState(60); // 60 second battle
    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const { addXp, levelTitle } = useGame();

    // Start Battle
    const handleJoinBattle = () => {
        setBattleState('active');
        setPlayerScore(0);
        setOpponentScore(0);
        setTimer(60);
    };

    // Timer logic
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (battleState === 'active' && timer > 0) {
            interval = setInterval(() => {
                setTimer(t => t - 1);

                // Simulate opponent scoring randomly
                if (Math.random() > 0.5) {
                    setOpponentScore(prev => prev + Math.floor(Math.random() * 15));
                }
            }, 1000);
        } else if (timer === 0 && battleState === 'active') {
            setBattleState('finished');

            // Winner logic
            if (playerScore >= opponentScore) {
                addXp(500, 'Battle Victory');
                confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
            }
        }
        return () => clearInterval(interval);
    }, [battleState, timer, addXp, playerScore, opponentScore]);

    // Simulate player actions during active battle
    const handleAction = () => {
        if (battleState !== 'active') return;
        setPlayerScore(prev => prev + Math.floor(Math.random() * 20) + 5);
    };

    return (
        <div className="min-h-full bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F7] font-sans text-gray-900 p-4 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col items-center p-8 relative">

                {/* Header */}
                <div className="flex flex-col items-center mb-10 w-full text-center">
                    <div className="w-16 h-16 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-blue-100">
                        <Swords className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Live Battle Arena</h1>
                    <p className="text-gray-500 font-medium mt-2 max-w-sm">Compete in real-time coding sprints. Win battles to earn massive XP drops.</p>
                </div>

                <AnimatePresence mode="popLayout">

                    {/* LOBBY STATE */}
                    {battleState === 'lobby' && (
                        <motion.div
                            key="lobby"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center w-full"
                        >
                            <div className="flex items-center gap-6 mb-8 w-full max-w-md bg-gray-50 p-6 rounded-2xl border border-gray-100 justify-between">
                                <div className="flex flex-col items-center text-center">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anirban" alt="You" className="w-16 h-16 rounded-full border-4 border-white shadow-sm mb-2 bg-white" />
                                    <span className="font-bold text-gray-900">You</span>
                                    <span className="text-xs text-gray-500 font-medium">{levelTitle}</span>
                                </div>

                                <div className="text-[#2563EB] font-black text-2xl italic tracking-wider">VS</div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full border-4 border-gray-100 bg-gray-200 flex items-center justify-center mb-2 shadow-sm text-gray-400">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-gray-400">Searching...</span>
                                    <span className="text-xs text-gray-300 font-medium">Any Level</span>
                                </div>
                            </div>

                            <button
                                onClick={handleJoinBattle}
                                className="w-full max-w-md bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-md shadow-blue-500/20"
                            >
                                Join Matchmaking <ChevronRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {/* ACTIVE BATTLE STATE */}
                    {battleState === 'active' && (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center w-full"
                        >
                            {/* HUD */}
                            <div className="flex items-center justify-between w-full mb-8">
                                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold border border-red-100">
                                    <Timer className="w-5 h-5 animate-pulse" /> 00:{timer.toString().padStart(2, '0')}
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 text-gray-500 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-100">
                                    <Eye className="w-4 h-4" /> 14 Spectating
                                </div>
                            </div>

                            {/* Main Arena */}
                            <div className="relative w-full h-48 bg-gray-50 border border-gray-200 rounded-2xl flex items-end overflow-hidden">
                                {/* Background Grid */}
                                <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                                {/* Player Score Bar */}
                                <div className="w-1/2 flex flex-col justify-end items-end pr-2 bg-blue-50/50 h-full border-r border-dashed border-gray-300 z-10 transition-all duration-300">
                                    <div className="font-black text-4xl text-[#2563EB] mb-2 mr-4">{playerScore}</div>
                                    <div
                                        className="w-full bg-[#2563EB] rounded-t-lg transition-all duration-300 ease-out"
                                        style={{ height: `${Math.min((playerScore / 300) * 100, 100)}%` }}
                                    />
                                </div>

                                {/* Opponent Score Bar */}
                                <div className="w-1/2 flex flex-col justify-end items-start pl-2 bg-red-50/50 h-full z-10 transition-all duration-300">
                                    <div className="font-black text-4xl text-red-500 mb-2 ml-4">{opponentScore}</div>
                                    <div
                                        className="w-full bg-red-500 rounded-t-lg transition-all duration-300 ease-out"
                                        style={{ height: `${Math.min((opponentScore / 300) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col items-center w-full max-w-xs">
                                <button
                                    onClick={handleAction}
                                    className="w-full bg-gray-900 active:bg-gray-700 hover:-translate-y-1 text-white font-bold py-6 rounded-2xl text-xl shadow-lg transition-all disabled:opacity-50 flex flex-col items-center"
                                >
                                    <span>SUBMIT CODE</span>
                                    <span className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">+ XP Actions</span>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* FINISHED STATE */}
                    {battleState === 'finished' && (
                        <motion.div
                            key="finished"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center text-center"
                        >
                            {playerScore >= opponentScore ? (
                                <>
                                    <div className="w-20 h-20 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mb-6 border-4 border-yellow-200">
                                        <Trophy className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">VICTORY!</h2>
                                    <p className="text-gray-500 font-medium mb-6 text-lg tracking-wide">You crushed it. +500 XP Earned.</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-6 border-4 border-gray-200">
                                        <Swords className="w-10 h-10 transform translate-y-1 rotate-45" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">DEFEAT</h2>
                                    <p className="text-gray-500 font-medium mb-6 text-lg tracking-wide">Better luck next time. Dust yourself off.</p>
                                </>
                            )}

                            <div className="flex items-center gap-8 mb-8">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">You</span>
                                    <span className="text-3xl font-black text-[#2563EB]">{playerScore}</span>
                                </div>
                                <div className="h-10 w-px bg-gray-200" />
                                <div className="flex flex-col items-center">
                                    <span className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Opponent</span>
                                    <span className="text-3xl font-black text-red-500">{opponentScore}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setBattleState('lobby')}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-xl transition-colors"
                            >
                                Return to Lobby
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
