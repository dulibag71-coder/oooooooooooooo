'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, Bot, Sparkles, ChevronRight } from 'lucide-react'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

export function AnimatedAIChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: '안녕하세요! 당신의 AI 골프 코치입니다. 오늘 어떤 스윙 고민이 있으신가요?',
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages, isTyping])

    const handleSend = async () => {
        if (!input.trim() || isTyping) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMsg])
        const currentInput = input
        setInput('')
        setIsTyping(true)

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'chat',
                    messages: [...messages, userMsg].map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'AI 응답을 가져오는데 실패했습니다.')
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.content,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMsg])
        } catch (error: any) {
            console.error('Chat error:', error)
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `죄송합니다. 오류가 발생했습니다: ${error.message}`,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMsg])
        } finally {
            setIsTyping(false)
        }
    }

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/5 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                            <Bot className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#171717] ring-1 ring-emerald-500/50" />
                    </div>
                    <div>
                        <h3 className="text-white font-mono text-sm tracking-widest uppercase">Premium AI Coach</h3>
                        <p className="text-emerald-500/60 text-[10px] uppercase tracking-tighter">Pro-Analysis Engine Active</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500/40" />
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
            >
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${msg.role === 'user'
                                ? 'bg-emerald-500/10 border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                                : 'bg-white/5 border-white/10'
                                }`}>
                                {msg.role === 'user' ? <User className="w-4 h-4 text-emerald-500" /> : <Bot className="w-4 h-4 text-zinc-400" />}
                            </div>
                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-emerald-500 text-black font-medium shadow-lg shadow-emerald-500/10 rounded-tr-none'
                                : 'bg-white/5 text-zinc-200 border border-white/5 rounded-tl-none'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-zinc-400" />
                            </div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full" />
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full" />
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/5 bg-black/20">
                <div className="relative group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="스윙에 대해 궁금한 점을 물어보세요..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-14 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-600 focus:bg-white/[0.07]"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition-colors disabled:opacity-30 disabled:hover:bg-emerald-500"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">
                    <span className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Real-time Feedback</span>
                    <span className="flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Swing Data Sync</span>
                </div>
            </div>
        </div>
    )
}
