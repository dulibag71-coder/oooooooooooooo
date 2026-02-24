'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SpiralAnimation } from '@/components/ui/spiral-animation'
import { Zap } from 'lucide-react'

export default function DashboardPage() {
    const { user, loading, signOut } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#171717] text-emerald-500 font-mono">
                LOADING EXPERIENCE...
            </div>
        )
    }

    if (!user) return null

    return (
        <main className="min-h-screen bg-[#171717] text-white relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-20">
                <SpiralAnimation />
            </div>

            {/* Navigation Bar */}
            <nav className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-black text-xs">
                        G
                    </div>
                    <span className="font-mono tracking-widest text-sm uppercase">AI Swing Tech</span>
                </div>
                <button
                    onClick={() => signOut()}
                    className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-500 transition-colors"
                >
                    Logout
                </button>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-mono tracking-tighter uppercase mb-2">
                        Welcome, {user.user_metadata.full_name || 'Golfer'}
                    </h1>
                    <p className="text-zinc-500 font-light max-w-xl">
                        Ready to elevate your game? Your personalized swing analysis and performance history are waiting.
                    </p>
                </header>

                {/* Dashboard Grid Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        onClick={() => router.push('/analysis')}
                        className="col-span-2 aspect-video rounded-2xl bg-black/40 border border-white/5 p-8 flex flex-col justify-end group cursor-pointer hover:border-emerald-500/30 transition-all"
                    >
                        <span className="text-emerald-500 font-mono text-xs uppercase mb-2">Technical Analysis</span>
                        <h3 className="text-2xl font-medium mb-4">Upload Swing Video</h3>
                        <div className="w-12 h-1 bg-zinc-800 group-hover:w-full transition-all duration-500" />
                    </div>

                    <div className="space-y-6">
                        <div
                            onClick={() => router.push('/ai-coach')}
                            className="rounded-2xl bg-black/40 border border-white/5 p-6 hover:border-emerald-500/30 transition-all cursor-pointer group"
                        >
                            <h4 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4 group-hover:text-emerald-500 transition-colors">AI Coaching</h4>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-white">Ask anything about your game</span>
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                    <Zap className="w-4 h-4 text-emerald-500" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-black/40 border border-white/5 p-6 hover:border-emerald-500/30 transition-all cursor-pointer">
                            <h4 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Latest Insights</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs uppercase text-zinc-600">Tempo Score</span>
                                    <span className="text-lg font-mono">3.1:1</span>
                                </div>
                                <div className="flex justify-between items-end text-emerald-500/40">
                                    <span className="text-[10px] uppercase">Awaiting Data</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
