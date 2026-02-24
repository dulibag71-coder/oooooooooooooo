'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SpiralAnimation } from '@/components/ui/spiral-animation'

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
                        onClick={() => router.push('/ai-coach')}
                        className="col-span-2 aspect-video rounded-2xl bg-black/40 border border-white/5 p-8 flex flex-col justify-end group cursor-pointer hover:border-emerald-500/30 transition-all"
                    >
                        <span className="text-emerald-500 font-mono text-xs uppercase mb-2">Technical Coaching</span>
                        <h3 className="text-2xl font-medium mb-4">Launch AI Swing Assistant</h3>
                        <div className="w-12 h-1 bg-zinc-800 group-hover:w-full transition-all duration-500" />
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-2xl bg-black/40 border border-white/5 p-6 hover:border-emerald-500/30 transition-all cursor-pointer">
                            <h4 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">User Profile</h4>
                            <div className="flex items-center gap-4">
                                <img
                                    src={user.user_metadata.avatar_url}
                                    alt="Avatar"
                                    className="w-12 h-12 rounded-full border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
                                />
                                <div>
                                    <div className="text-sm font-medium">{user.user_metadata.full_name}</div>
                                    <div className="text-xs text-zinc-500">{user.email}</div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-black/40 border border-white/5 p-6 hover:border-emerald-500/30 transition-all cursor-pointer">
                            <h4 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Latest Stats</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs uppercase text-zinc-600">Accuracy</span>
                                    <span className="text-lg font-mono">82%</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-xs uppercase text-zinc-600">Tempo</span>
                                    <span className="text-lg font-mono">3.1:1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
