import React, { JSX, useState, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

export default function DropZone({
  onDrop,
}: {
  onDrop: (files: File[]) => void
}): JSX.Element {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy'
    }
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      if (e.dataTransfer) {
        const files = Array.from(e.dataTransfer.files)
        onDrop(files)
      }
    },
    [onDrop],
  )

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files)
        onDrop(files)
      }
    },
    [onDrop],
  )

  return (
    <>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200',
          'bg-white/10 backdrop-blur-sm border-white/30',
          isDragging
            ? 'border-white/60 bg-white/20'
            : 'hover:border-white/50 hover:bg-white/15'
        )}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
          ref={fileInputRef}
        />
        <div className="mb-4">
          <svg
            className="w-12 h-12 mx-auto text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="text-lg font-medium text-white mb-2">
          Drop files here or{' '}
          <button
            onClick={handleClick}
            className="text-white underline hover:text-white/80 transition-colors"
          >
            click to browse
          </button>
        </p>
        <p className="text-sm text-white/70">
          Select multiple files to share them as a zip archive
        </p>
      </div>
    </>
  )
}
