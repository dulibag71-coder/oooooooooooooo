'use client'

import { useEffect, useRef } from 'react'

export const SpiralAnimation = () => {
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
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const centerX = canvas.width / 2
            const centerY = canvas.height / 2
            const points = 200
            const radiusStep = 2
            const angleStep = 0.1

            ctx.beginPath()
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
            ctx.lineWidth = 1

            for (let i = 0; i < points; i++) {
                const angle = i * angleStep + time
                const radius = i * radiusStep
                const x = centerX + Math.cos(angle) * radius
                const y = centerY + Math.sin(angle) * radius

                if (i === 0) {
                    ctx.moveTo(x, y)
                } else {
                    ctx.lineTo(x, y)
                }
            }
            ctx.stroke()

            time += 0.01
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
