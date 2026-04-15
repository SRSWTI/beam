// TODO: UX - Add connection quality indicator (network health between peers)
// TODO: UX - Add file preview for images/videos before downloading
// TODO: Accessibility - Add aria-live region for status updates
import React, { JSX } from 'react'
import { UploaderConnection, UploaderConnectionStatus } from '../types'
import ProgressBar from './ProgressBar'
import { 
  CloudArrowDown, 
  Check, 
  Pause, 
  X, 
  Clock,
  Monitor 
} from '@phosphor-icons/react'

export function ConnectionListItem({
  conn,
}: {
  conn: UploaderConnection
}): JSX.Element {
  const getStatusColor = (status: UploaderConnectionStatus) => {
    switch (status) {
      case UploaderConnectionStatus.Uploading:
        return 'bg-blue-500/80 text-white'
      case UploaderConnectionStatus.Paused:
        return 'bg-yellow-500/80 text-white'
      case UploaderConnectionStatus.Done:
        return 'bg-emerald-500/80 text-white'
      case UploaderConnectionStatus.Closed:
        return 'bg-red-500/80 text-white'
      case UploaderConnectionStatus.InvalidPassword:
        return 'bg-red-500/80 text-white'
      default:
        return 'bg-gray-500/80 text-white'
    }
  }

  const getStatusIcon = (status: UploaderConnectionStatus) => {
    switch (status) {
      case UploaderConnectionStatus.Uploading:
        return <CloudArrowDown className="w-3 h-3" weight="bold" />
      case UploaderConnectionStatus.Done:
        return <Check className="w-3 h-3" weight="bold" />
      case UploaderConnectionStatus.Paused:
        return <Pause className="w-3 h-3" weight="bold" />
      case UploaderConnectionStatus.Closed:
      case UploaderConnectionStatus.InvalidPassword:
        return <X className="w-3 h-3" weight="bold" />
      default:
        return <Clock className="w-3 h-3" weight="bold" />
    }
  }

  return (
    <div className="w-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          {/* Device/Browser info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Monitor className="w-4 h-4 text-white/70" weight="bold" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">
            {conn.browserName && conn.browserVersion ? (
              <>
                {conn.browserName}{' '}
                    <span className="text-white/60 font-normal">v{conn.browserVersion}</span>
              </>
            ) : (
              'Downloader'
            )}
              </div>
              <div className="text-white/50 text-xs">
                {conn.completedFiles} of {conn.totalFiles} files completed
              </div>
        </div>
          </div>
              </div>

        {/* Status badge */}
        <div className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${getStatusColor(conn.status)} backdrop-blur-sm border border-white/20`}>
          {getStatusIcon(conn.status)}
          {conn.status.replace(/_/g, ' ')}
        </div>
      </div>

      {/* Current file info */}
      {conn.uploadingFileName && conn.status === UploaderConnectionStatus.Uploading && (
        <div className="mb-3 p-2 bg-white/5 rounded-lg border border-white/10">
          <div className="text-white/80 text-xs font-medium mb-1">
            Current file:
          </div>
          <div className="text-white text-sm truncate">
            {conn.uploadingFileName}
          </div>
          <div className="text-white/60 text-xs mt-1">
            {Math.round(conn.currentFileProgress * 100)}% complete
          </div>
        </div>
      )}

      {/* Progress bar */}
      <ProgressBar
        value={
          conn.completedFiles === conn.totalFiles
            ? 1
            : (conn.completedFiles + conn.currentFileProgress) / conn.totalFiles
        }
        max={1}
      />
    </div>
  )
}
