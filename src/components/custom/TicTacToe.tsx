"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
const motion = m as any;
import {
    RefreshCw,
    Cpu,
    User,
    Users,
    Trophy,
    Gamepad2,
    Sparkles,
    Brain,
    ShieldAlert,
    SlidersHorizontal,
    X,
} from "lucide-react";
import { cn } from "../../lib/utils";

type Player = "X" | "O" | null;
type GameMode = "ai" | "friend";
type Difficulty = "easy" | "medium" | "impossible";

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Cols
    [0, 4, 8],
    [2, 4, 6], // Diagonals
];

// Custom X Icon to match the reference (Slimmer, rounded)
const CustomX = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M18 6L6 18M6 6l12 12" />
    </svg>
);

// Custom O Icon - Fully rounded circle as requested
const CustomO = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="8" />
    </svg>
);

export const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<Player | "Draw">(null);
    const [winningLine, setWinningLine] = useState<number[] | null>(null);
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

    const [gameMode, setGameMode] = useState<GameMode>("ai");
    const [difficulty, setDifficulty] = useState<Difficulty>("medium"); // Set to medium by default
    const [showSettings, setShowSettings] = useState(false);

    const calculateWinner = (squares: Player[]) => {
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const [a, b, c] = WINNING_COMBINATIONS[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return { player: squares[a], line: WINNING_COMBINATIONS[i] };
            }
        }
        if (!squares.includes(null))
            return { player: "Draw" as const, line: null };
        return null;
    };

    const makeMove = useCallback(
        (i: number, player: Player) => {
            if (winner || board[i]) return;

            const newBoard = [...board];
            newBoard[i] = player;
            setBoard(newBoard);

            const result = calculateWinner(newBoard);
            if (result) {
                setWinner(result.player);
                setWinningLine(result.line);
            } else {
                setIsXNext(player === "O");
            }
        },
        [board, winner],
    );

    const getAiMove = (currentBoard: Player[], diff: Difficulty): number => {
        const emptySquares = currentBoard
            .map((s, i) => (s === null ? i : null))
            .filter((s) => s !== null) as number[];
        if (emptySquares.length === 0) return -1;

        if (diff === "easy")
            return emptySquares[
                Math.floor(Math.random() * emptySquares.length)
            ];
        if (diff === "medium" && Math.random() > 0.5)
            return emptySquares[
                Math.floor(Math.random() * emptySquares.length)
            ];

        // Block or Win strategy
        for (const move of emptySquares) {
            const tempBoard = [...currentBoard];
            tempBoard[move] = "O";
            if (calculateWinner(tempBoard)?.player === "O") return move;
        }
        for (const move of emptySquares) {
            const tempBoard = [...currentBoard];
            tempBoard[move] = "X";
            if (calculateWinner(tempBoard)?.player === "X") return move;
        }
        if (emptySquares.includes(4)) return 4;
        return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    };

    useEffect(() => {
        if (gameMode === "ai" && !isXNext && !winner) {
            setIsAiThinking(true);
            const timer = setTimeout(() => {
                const bestMove = getAiMove(board, difficulty);
                if (bestMove !== -1) {
                    makeMove(bestMove, "O");
                }
                setIsAiThinking(false);
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [isXNext, winner, board, makeMove, gameMode, difficulty]);

    const handleUserClick = (i: number) => {
        if (winner || board[i] || isAiThinking) return;
        if (gameMode === "ai" && !isXNext) return;
        makeMove(i, isXNext ? "X" : "O");
    };

    const resetGame = () => {
        setIsRotating(true);
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setWinningLine(null);
        setIsAiThinking(false);
        setTimeout(() => setIsRotating(false), 800);
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-105">
            {/* Top Floating Badge - Outlined Style */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-6 py-2.5 border border-primary/40 rounded-full shadow-2xl backdrop-blur-md self-end mr-2"
            >
                <Gamepad2 size={16} className="text-primary" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
                    Play a Quick Game
                </span>
            </motion.div>

            {/* Main Console - Decreased from rounded-[4rem] to rounded-3xl */}
            <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-10 md:p-12 w-full shadow-[0_48px_80px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col min-h-130 md:min-h-145">
                {/* Header Unit */}
                <div className="flex justify-between items-start mb-12">
                    <div className="flex flex-col gap-1.5">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary opacity-90">
                            {gameMode === "ai"
                                ? `VS AI (${difficulty.toUpperCase()})`
                                : "VS FRIEND"}
                        </h4>
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase">
                            Tic Tac Toe
                        </h2>
                    </div>

                    <div className="flex gap-3 z-50">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center transition-all bg-[#1e293b]/40 border border-white/5 text-muted hover:text-white hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20 cursor-pointer",
                                showSettings &&
                                    "bg-primary text-white border-primary shadow-lg shadow-primary/25",
                            )}
                        >
                            <AnimatePresence mode="wait">
                                {showSettings ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                    >
                                        <X size={22} strokeWidth={3} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="settings"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                    >
                                        <SlidersHorizontal
                                            size={20}
                                            strokeWidth={2.5}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                        <button
                            onClick={resetGame}
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-[#1e293b]/40 border border-white/5 text-muted hover:text-white hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                        >
                            <motion.div
                                animate={{ rotate: isRotating ? 360 : 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 12,
                                }}
                            >
                                <RefreshCw size={20} strokeWidth={2.5} />
                            </motion.div>
                        </button>
                    </div>
                </div>

                {/* Combat Grid */}
                <div className="relative grow flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-5 w-full">
                        {board.map((square, i) => (
                            <motion.button
                                key={i}
                                whileHover={
                                    !square && !winner ? { scale: 1.02 } : {}
                                }
                                whileTap={
                                    !square && !winner ? { scale: 0.96 } : {}
                                }
                                onClick={() => handleUserClick(i)}
                                className={cn(
                                    "relative aspect-square rounded-2xl flex items-center justify-center transition-all duration-300",
                                    "bg-[#1e293b]/30 border border-white/5",
                                    winningLine?.includes(i) &&
                                        "bg-primary text-white border-primary shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] z-10",
                                )}
                            >
                                <AnimatePresence mode="wait">
                                    {square === "X" && (
                                        <motion.div
                                            initial={{ scale: 0.2, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 25,
                                            }}
                                        >
                                            <CustomX className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                                        </motion.div>
                                    )}
                                    {square === "O" && (
                                        <motion.div
                                            initial={{ scale: 0.2, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 25,
                                            }}
                                        >
                                            <CustomO className="w-16 h-16 md:w-20 md:h-20 text-secondary" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>

                    {/* Victory Overlay - Decreased from rounded-[4rem] to rounded-3xl */}
                    <AnimatePresence>
                        {winner && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute -inset-6 z-30 bg-[#0f172a]/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                            >
                                <Trophy
                                    size={48}
                                    className="text-primary mb-4"
                                />
                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                                    {winner === "Draw"
                                        ? "Parity Reached"
                                        : `${winner} DOMINATES`}
                                </h3>
                                <button
                                    onClick={resetGame}
                                    className="mt-6 px-10 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/25 cursor-pointer"
                                >
                                    Restart
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Settings Overlay - Decreased from rounded-[4rem] to rounded-3xl */}
                    <AnimatePresence>
                        {showSettings && (
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 22,
                                }}
                                className="
                                    absolute -inset-6 z-40
                                    rounded-3xl
                                    border border-white/10
                                    bg-[#0a0f1e]/80
                                    backdrop-blur-xl
                                    p-10
                                    flex flex-col
                                    shadow-[0_20px_80px_rgba(0,0,0,0.6)]
                                "
                            >
                                <div className="space-y-6">
                                    {/* MODE */}
                                    <div className="space-y-5">
                                        <span className="text-[9px] font-black uppercase tracking-[0.35em] text-muted">
                                            Engagement Mode
                                        </span>

                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                {
                                                    id: "ai",
                                                    icon: Cpu,
                                                    label: "Virtual",
                                                },
                                                {
                                                    id: "friend",
                                                    icon: Users,
                                                    label: "Local",
                                                },
                                            ].map((m) => (
                                                <button
                                                    key={m.id}
                                                    onClick={() => {
                                                        setGameMode(
                                                            m.id as GameMode,
                                                        );
                                                        resetGame();
                                                    }}
                                                    className={cn(
                                                        `
                                    cursor-pointer
                                    flex items-center justify-center gap-2
                                    py-4 rounded-2xl
                                    text-[10px] font-black uppercase tracking-widest
                                    transition-all duration-200
                                    border
                                    `,
                                                        gameMode === m.id
                                                            ? `
                                            bg-primary
                                            text-white
                                            border-primary
                                            shadow-lg
                                            shadow-primary/30
                                            scale-[1.03]
                                          `
                                                            : `
                                            border-white/10
                                            text-muted
                                            hover:border-white/20
                                            hover:bg-white/5
                                            hover:text-white
                                            active:scale-95
                                          `,
                                                    )}
                                                >
                                                    <m.icon size={15} />
                                                    {m.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* DIFFICULTY */}
                                    {gameMode === "ai" && (
                                        <div className="space-y-5">
                                            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-muted">
                                                Intelligence Tier
                                            </span>

                                            <div className="grid grid-cols-3 gap-3">
                                                {[
                                                    {
                                                        id: "easy",
                                                        icon: Sparkles,
                                                    },
                                                    {
                                                        id: "medium",
                                                        icon: Brain,
                                                    },
                                                    {
                                                        id: "impossible",
                                                        icon: ShieldAlert,
                                                    },
                                                ].map((lvl) => (
                                                    <button
                                                        key={lvl.id}
                                                        onClick={() => {
                                                            setDifficulty(
                                                                lvl.id as Difficulty,
                                                            );
                                                            resetGame();
                                                        }}
                                                        className={cn(
                                                            `
                                        cursor-pointer
                                        flex flex-col items-center gap-2
                                        py-5 rounded-2xl
                                        border
                                        transition-all duration-200
                                        `,
                                                            difficulty ===
                                                                lvl.id
                                                                ? `
                                                bg-primary/20
                                                border-primary
                                                text-primary
                                                shadow-md
                                                shadow-primary/20
                                                scale-[1.05]
                                              `
                                                                : `
                                                bg-white/5
                                                border-transparent
                                                text-muted
                                                hover:border-white/15
                                                hover:bg-white/10
                                                hover:text-white
                                                active:scale-95
                                              `,
                                                        )}
                                                    >
                                                        <lvl.icon size={18} />
                                                        <span className="text-[8px] font-black uppercase tracking-widest">
                                                            {lvl.id}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* APPLY BUTTON */}
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="
                                        cursor-pointer
                                        mt-auto py-5
                                        rounded-2xl
                                        bg-white text-black
                                        text-[10px] font-black uppercase tracking-[0.3em]
                                        transition-all duration-200
                                        hover:scale-[1.02]
                                        active:scale-95
                                        hover:shadow-xl
                                    "
                                >
                                    Apply Config
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Status Unit (Footer) - Enhanced Symmetry and Sizing */}
                <div className="mt-12">
                    <div className="h-0.5 w-full bg-white/10 mb-8 rounded-full" />
                    <div className="flex items-center justify-between px-1">
                        {/* User Side - Explicitly using items-center */}
                        <div
                            className={cn(
                                "flex items-center gap-3 transition-opacity",
                                isXNext && !winner
                                    ? "opacity-100"
                                    : "opacity-30",
                            )}
                        >
                            <User
                                size={18}
                                strokeWidth={3}
                                className="text-primary shrink-0 align-middle"
                            />
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary whitespace-nowrap flex items-center h-full">
                                YOU (X)
                            </span>
                        </div>

                        {/* AI Side - Explicitly using items-center */}
                        <div
                            className={cn(
                                "flex items-center gap-3 transition-opacity",
                                !isXNext && !winner
                                    ? "opacity-100"
                                    : "opacity-30",
                            )}
                        >
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary whitespace-nowrap flex items-center h-full">
                                {gameMode === "ai" ? "CPU" : "FRIEND"} (O)
                            </span>
                            <Cpu
                                size={18}
                                strokeWidth={3}
                                className={cn(
                                    "text-secondary shrink-0 align-middle",
                                    isAiThinking && "animate-pulse",
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
