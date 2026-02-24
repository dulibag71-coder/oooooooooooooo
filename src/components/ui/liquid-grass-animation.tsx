'use client'

import { useEffect, useRef } from 'react'

export const LiquidGrassAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let time = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const draw = () => {
            // Background color #171717 with slight trails
            ctx.fillStyle = 'rgba(23, 23, 23, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const strands = Math.floor(canvas.width / 15)

            for (let i = 0; i < strands; i++) {
                const x = i * 15
                const height = canvas.height * 0.6

                // Use sine waves for "liquid" motion
                const offset = Math.sin(time + i * 0.2) * 50
                const cp1x = x + Math.cos(time * 0.5 + i * 0.1) * 30
                const cp1y = canvas.height - height * 0.3
                const cp2x = x + offset
                const cp2y = canvas.height - height * 0.7

                ctx.beginPath()
                ctx.moveTo(x, canvas.height)
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x + offset * 1.5, canvas.height - height)

                // Emerald green to transparent gradient for each strand
                const gradient = ctx.createLinearGradient(x, canvas.height, x + offset, canvas.height - height)
                gradient.addColorStop(0, 'rgba(16, 185, 129, 0)')
                gradient.addColorStop(1, 'rgba(16, 185, 129, 0.4)')

                ctx.strokeStyle = gradient
                ctx.lineWidth = 1.5
                ctx.lineCap = 'round'
                ctx.stroke()
            }

            time += 0.015
            animationFrameId = requestAnimationFrame(draw)
        }

        window.addEventListener('resize', resize)
        resize()
        draw()

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
        />
    )
}
