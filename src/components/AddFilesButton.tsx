import React, { JSX, useCallback, useRef } from 'react'
import { UploadedFile } from '../types'
import { Plus } from '@phosphor-icons/react'

export default function AddFilesButton({
  onAdd,
}: {
  onAdd: (files: UploadedFile[]) => void
}): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files)
        onAdd(files)
      }
    },
    [onAdd],
  )

  return (
    <>
      <input
        type="file"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
        ref={fileInputRef}
      />
      <button
        onClick={handleClick}
        className="inline-flex items-center text-white/80 hover:text-white underline decoration-white/50 hover:decoration-white transition-all duration-200 text-sm font-medium"
      >
        <Plus className="w-4 h-4 mr-1" weight="bold" />
        Add more files
      </button>
    </>
  )
}
