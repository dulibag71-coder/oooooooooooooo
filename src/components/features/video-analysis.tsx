'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useVideoUpload } from "@/hooks/use-video-upload"
import { FileVideo, X, Upload, Trash2, Zap, Play, Info } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function VideoAnalysis() {
    const {
        previewUrl,
        fileName,
        file,
        fileInputRef,
        handleThumbnailClick,
        handleFileChange,
        handleRemove,
    } = useVideoUpload()

    const [isDragging, setIsDragging] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<string | null>(null)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(false)

            const droppedFile = e.dataTransfer.files?.[0]
            if (droppedFile && droppedFile.type.startsWith("video/")) {
                const fakeEvent = {
                    target: {
                        files: [droppedFile] as unknown as FileList,
                    },
                } as unknown as React.ChangeEvent<HTMLInputElement>
                handleFileChange(fakeEvent)
            }
        },
        [handleFileChange],
    )

    const runAnalysis = async () => {
        if (!file) return
        setIsAnalyzing(true)

        // Simulate AI API Call
        setTimeout(() => {
            setAnalysisResult(`영상 분석이 완료되었습니다! 
      
1. 백스윙: 정점에서의 팔 위치는 완벽합니다.
2. 다운스윙: 체중 이동이 약간 늦어지는 경향이 있습니다.
3. 임팩트: 클럽 패스가 정렬되어 있어 방향성이 좋습니다.

해결책: 다운스윙 시작 시 왼쪽 힙의 회전을 조금 더 의식해 보세요.`)
            setIsAnalyzing(false)
        }, 3000)
    }

    return (
        <div className="w-full max-w-2xl space-y-8 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/5 p-8 shadow-2xl">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-mono tracking-tight uppercase text-white">Swing Analysis</h3>
                    <p className="text-sm text-zinc-500 font-light mt-1 text-balance">
                        Upload your swing video and let our AI engine provide professional technical feedback.
                    </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Zap className="w-6 h-6 text-emerald-500" />
                </div>
            </div>

            <Input
                type="file"
                accept="video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            <AnimatePresence mode="wait">
                {!previewUrl ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={handleThumbnailClick}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={cn(
                            "flex h-80 cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 transition-all hover:bg-white/[0.08] group",
                            isDragging && "border-emerald-500/50 bg-emerald-500/5",
                        )}
                    >
                        <div className="rounded-2xl bg-black/40 p-5 shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
                            <Upload className="h-8 w-8 text-emerald-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-medium text-white">영상 선택하기</p>
                            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">
                                또는 파일을 이곳으로 드래그 하세요
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video">
                            <video
                                src={previewUrl}
                                className="h-full w-full object-contain"
                                controls
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={handleRemove}
                                    className="rounded-full bg-black/60 backdrop-blur-md border hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-500 transition-all"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                            <FileVideo className="w-5 h-5 text-emerald-500" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{fileName}</p>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Ready for Engine Analysis</p>
                            </div>
                            <Button
                                onClick={runAnalysis}
                                disabled={isAnalyzing}
                                className="shadow-lg shadow-emerald-500/20"
                            >
                                {isAnalyzing ? "Analyzing..." : "AI 분석 시작"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Analysis Results Display */}
            {analysisResult && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-4"
                >
                    <div className="flex items-center gap-2 text-emerald-500">
                        <Info className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase tracking-widest">Analysis Result</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap font-light">
                        {analysisResult}
                    </p>
                </motion.div>
            )}
        </div>
    )
}
