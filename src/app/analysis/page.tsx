'use client'

import { VideoAnalysis } from "@/components/features/video-analysis"
import { motion } from 'framer-motion'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { SpiralAnimation } from "@/components/ui/spiral-animation"

export default function AnalysisPage() {
    return (
        <main className="min-h-screen bg-[#171717] text-white relative overflow-hidden flex flex-col">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-20">
                <SpiralAnimation />
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
                    <span className="text-sm font-mono uppercase tracking-widest">Dashboard</span>
                </Link>

                <div className="flex items-center gap-6">
                    <button className="text-zinc-500 hover:text-white transition-colors">
                        <HelpCircle className="w-5 h-5" />
                    </button>
                    <div className="text-right border-l border-white/10 pl-6">
                        <h1 className="text-2xl font-mono tracking-tighter uppercase">Swing Analytics</h1>
                        <p className="text-emerald-500 text-[10px] uppercase tracking-[0.2em] font-medium">AI Precision Scanning</p>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-2xl text-center mb-12"
                >
                    <h2 className="text-5xl font-medium tracking-tight mb-4">
                        Data-Driven <span className="text-emerald-500 italic">Excellence</span>.
                    </h2>
                    <p className="text-zinc-500 text-sm font-light max-w-md mx-auto leading-relaxed">
                        Our neural core analyzes frame-by-frame movement to detect subtle inefficiencies in your kinetic chain.
                    </p>
                </motion.div>

                <div className="relative z-10 w-full flex justify-center">
                    <VideoAnalysis />
                </div>
            </div>

            {/* Footer Data */}
            <div className="relative z-10 px-6 py-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                    <div className="space-y-1">
                        <div className="text-zinc-400">Processing Node</div>
                        <div>Edge-04-Seoul</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-zinc-400">Analysis Mode</div>
                        <div>Kinetic-Sequencing</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-zinc-400">Frame Capacity</div>
                        <div>Up to 4K @ 120FPS</div>
                    </div>
                    <div className="space-y-1 text-right">
                        <div className="text-zinc-400">System Priority</div>
                        <div className="text-emerald-500/50">Ultra-High</div>
                    </div>
                </div>
            </div>
        </main>
    )
}
