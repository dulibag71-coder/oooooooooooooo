import { useState, useRef, useCallback } from "react"

interface UseVideoUploadProps {
    onUpload?: (url: string) => void
}

export function useVideoUpload({ onUpload }: UseVideoUploadProps = {}) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleThumbnailClick = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0]
            if (selectedFile) {
                setFile(selectedFile)
                setFileName(selectedFile.name)
                const url = URL.createObjectURL(selectedFile)
                setPreviewUrl(url)
                if (onUpload) {
                    onUpload(url)
                }
            }
        },
        [onUpload],
    )

    const handleRemove = useCallback(() => {
        setPreviewUrl(null)
        setFileName(null)
        setFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [])

    return {
        previewUrl,
        fileName,
        file,
        fileInputRef,
        handleThumbnailClick,
        handleFileChange,
        handleRemove,
    }
}
