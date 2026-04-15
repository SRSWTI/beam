import React, { JSX } from 'react'
import { 
  File, 
  X, 
  FileImage,
  FileVideo,
  FileAudio,
  FilePdf,
  FileText,
  FileZip,
  FileCode,
  FileCsv,
  FileDoc,
  FilePpt,
  FileXls
} from '@phosphor-icons/react'

type UploadedFileLike = {
  fileName: string
  type: string
}

function getFileIcon(fileName: string, type: string) {
  const extension = fileName.split('.').pop()?.toLowerCase()
  
  // Images
  if (type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'].includes(extension || '')) {
    return <FileImage className="w-5 h-5 text-white" weight="bold" />
  }
  
  // Videos
  if (type.startsWith('video/') || ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', '3gp'].includes(extension || '')) {
    return <FileVideo className="w-5 h-5 text-white" weight="bold" />
  }
  
  // Audio
  if (type.startsWith('audio/') || ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma'].includes(extension || '')) {
    return <FileAudio className="w-5 h-5 text-white" weight="bold" />
  }
  
  // PDFs
  if (type === 'application/pdf' || extension === 'pdf') {
    return <FilePdf className="w-5 h-5 text-white" weight="bold" />
  }
  
  // Text files
  if (type.startsWith('text/') || ['txt', 'md', 'rtf'].includes(extension || '')) {
    return <FileText className="w-5 h-5 text-white" weight="bold" />
  }
  
  // Code files
  if (['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'scss', 'json', 'xml', 'py', 'java', 'cpp', 'c', 'php', 'rb', 'go', 'rs', 'swift', 'kt'].includes(extension || '')) {
    return <FileCode className="w-5 h-5 text-white" weight="bold" />
  }
  
  // Archives
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'].includes(extension || '')) {
    return <FileZip className="w-5 h-5 text-white" weight="bold" />
  }
  
  // Spreadsheets
  if (['xls', 'xlsx', 'ods'].includes(extension || '') || type.includes('spreadsheet')) {
    return <FileXls className="w-5 h-5 text-white" weight="bold" />
  }
  
  // Presentations
  if (['ppt', 'pptx', 'odp'].includes(extension || '') || type.includes('presentation')) {
    return <FilePpt className="w-5 h-5 text-white" weight="bold" />
  }
  
  // Documents
  if (['doc', 'docx', 'odt'].includes(extension || '') || type.includes('document')) {
    return <FileDoc className="w-5 h-5 text-white" weight="bold" />
  }
  
  // CSV
  if (extension === 'csv' || type === 'text/csv') {
    return <FileCsv className="w-5 h-5 text-white" weight="bold" />
  }
  
  // Default file icon
  return <File className="w-5 h-5 text-white" weight="bold" />
}

export default function UploadFileList({
  files,
  onRemove,
}: {
  files: UploadedFileLike[]
  onRemove?: (index: number) => void
}): JSX.Element {
  return (
    <div className="w-full space-y-3 my-5">
      {files.map((file, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-all duration-200"
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                {getFileIcon(file.fileName, file.type)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {file.fileName}
              </p>
              <p className="text-white/60 text-xs">
                {file.type || 'Unknown type'}
              </p>
            </div>
          </div>
          {onRemove && (
            <button
              onClick={() => onRemove(index)}
              className="flex-shrink-0 ml-3 p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" weight="bold" />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
