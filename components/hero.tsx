'use client'

import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { useState, useEffect } from 'react'

const Hero = () => {
    const [startVisible, setStartVisible] = useState(false)

    // Handle navigation to personal site
    const navigateToPersonalSite = () => {
        window.location.href = "https://xubh.top/"
    }

    // Fade in the start button after animation loads
    useEffect(() => {
        const timer = setTimeout(() => {
            setStartVisible(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
            {/* Spiral Animation */}
            <div className="absolute inset-0">
                <SpiralAnimation />
            </div>

            {/* Premium Content Overlay */}
            <div
                className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-4xl px-4 text-center
          transition-all duration-[1500ms] ease-out
          ${startVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
            >
                <h1 className="text-white text-5xl md:text-7xl font-mono tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    AI SWING TECH
                </h1>

                <p className="text-emerald-400 text-lg md:text-xl font-light tracking-[0.1em] mb-12 max-w-2xl mx-auto">
                    Elevate your game with professional-grade AI swing analysis.
                </p>

                <button
                    onClick={navigateToPersonalSite}
                    className="
            relative group
            text-white text-xl md:text-2xl tracking-[0.2em] font-mono border border-emerald-500/30 px-12 py-4
            transition-all duration-700 overflow-hidden
            hover:border-emerald-400 hover:text-emerald-300
            cursor-pointer bg-black/40 backdrop-blur-sm
          "
                >
                    <span className="relative z-10">무료 스윙 분석 시작하기</span>
                    <div className="absolute inset-0 bg-emerald-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
            </div>
        </div>
    )
}

export { Hero }
