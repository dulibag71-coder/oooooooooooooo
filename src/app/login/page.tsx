'use client'

import { LiquidGrassAnimation } from "@/components/ui/liquid-grass-animation"

export default function LoginPage() {

    const handleGoogleLogin = () => {
        // Implementation for future use
        console.log("Google Login Clicked")
    }

    return (
        <main className="fixed inset-0 w-full h-full overflow-hidden bg-[#171717]">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <LiquidGrassAnimation />
            </div>

            {/* Login Container */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md space-y-8 rounded-2xl bg-black/40 p-10 backdrop-blur-xl border border-white/5 shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-mono tracking-widest text-white uppercase mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-emerald-500/80 font-light tracking-wide text-sm">
                            Premium Golf Swing Analysis
                        </p>
                    </div>

                    <div className="mt-12">
                        <button
                            onClick={handleGoogleLogin}
                            className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-500/20 bg-black/50 px-6 py-4 text-white transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span className="text-sm font-medium tracking-wide">Continue with Google</span>

                            {/* Button Hover Glow */}
                            <div className="absolute inset-0 -z-10 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-xl" />
                        </button>
                    </div>

                    <div className="mt-8 text-center text-xs text-zinc-600 tracking-tighter uppercase font-mono">
                        Secure Authentication by Google
                    </div>
                </div>
            </div>
        </main>
    )
}
