import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface GameContextType {
    xp: number;
    level: number;
    levelTitle: string;
    nextLevelXp: number;
    currentLevelXp: number;
    addXp: (amount: number, source?: string) => void;
    recentXpGains: { id: string; amount: number; source: string }[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [xp, setXp] = useState(1240); // Initial XP
    const [recentXpGains, setRecentXpGains] = useState<{ id: string; amount: number; source: string }[]>([]);

    // Calculate Level (Base 1000, 1.5 multiplier per level)
    // L1: 0-1000
    // L2: 1000-2500
    // L3: 2500-4750
    const getLevelInfo = (currentXp: number) => {
        let lvl = 1;
        let required = 1000;
        let base = 0;

        while (currentXp >= base + required) {
            base += required;
            lvl++;
            required = Math.floor(required * 1.5);
        }

        return {
            level: lvl,
            currentLevelBaseXp: base,
            nextLevelBaseXp: base + required,
            progressToNext: currentXp - base,
            requiredForNext: required,
        };
    };

    const { level, currentLevelBaseXp, nextLevelBaseXp } = getLevelInfo(xp);

    const levelTitles = [
        "Novice Learner",
        "Rising Star",
        "Campus Challenger",
        "Elite Contender",
        "Grandmaster",
        "Legend"
    ];
    const levelTitle = levelTitles[Math.min(level - 1, levelTitles.length - 1)];

    // Watch for Level Ups
    const [prevLevel, setPrevLevel] = useState(level);
    useEffect(() => {
        if (level > prevLevel) {
            // Trigger Confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#2563EB', '#60A5FA', '#93C5FD', '#FFFFFF'],
            });
            setPrevLevel(level);
        }
    }, [level, prevLevel]);

    const addXp = (amount: number, source: string = "Action") => {
        setXp(prev => prev + amount);

        const id = Math.random().toString(36).substr(2, 9);
        setRecentXpGains(prev => [...prev, { id, amount, source }]);

        // Auto-remove the notification after 3s
        setTimeout(() => {
            setRecentXpGains(prev => prev.filter(gain => gain.id !== id));
        }, 3000);
    };

    return (
        <GameContext.Provider value={{
            xp,
            level,
            levelTitle,
            nextLevelXp: nextLevelBaseXp,
            currentLevelXp: xp - currentLevelBaseXp, // relative to current level
            addXp,
            recentXpGains
        }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
