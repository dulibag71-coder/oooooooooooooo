'use client'

import { AnimatedAIChat } from "@/components/ui/animated-ai-chat"
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { LiquidGrassAnimation } from "@/components/ui/liquid-grass-animation"

export default function AICoachPage() {
    return (
        <main className="min-h-screen bg-[#171717] text-white relative overflow-hidden flex flex-col">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <LiquidGrassAnimation />
            </div>

            {/* Header / Navigation */}
            <nav className="relative z-10 px-6 py-8 flex items-center justify-between max-w-7xl mx-auto w-full">
                <Link
                    href="/dashboard"
                    className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-mono uppercase tracking-widest">Back to Hub</span>
                </Link>

                <div className="text-right">
                    <h1 className="text-2xl font-mono tracking-tighter uppercase">AI Technical Coach</h1>
                    <p className="text-emerald-500 text-[10px] uppercase tracking-[0.2em] font-medium">Session Active • Swing Analysis Mode</p>
                </div>
            </nav>

            {/* Main Chat Container */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-4xl"
                >
                    <div className="text-center mb-8">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono uppercase tracking-widest mb-4">
                            Deep Learning Engine V2.4
                        </div>
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
                            Let's perfect your <span className="text-emerald-500 italic">Swing</span>.
                        </h2>
                        <p className="text-zinc-500 max-w-lg mx-auto text-sm font-light leading-relaxed">
                            Upload your video or describe your ball flight for immediate professional feedback.
                        </p>
                    </div>

                    <AnimatedAIChat />
                </motion.div>
            </div>

            {/* Footer Status */}
            <div className="relative z-10 px-6 py-4 flex justify-between items-center text-[8px] font-mono text-zinc-700 uppercase tracking-widest border-t border-white/5 bg-black/20">
                <span>System Latency: 14ms</span>
                <span>Neural Core: Stable</span>
                <span>© 2024 SwingTech Research</span>
            </div>
        </main>
    )
}
