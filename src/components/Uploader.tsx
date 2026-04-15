// TODO: UX - Add connection quality indicator showing network health
// TODO: UX - Add option to copy long/short URLs with one click
// TODO: Performance - Debounce connection status updates to reduce re-renders

'use client'

import React, { JSX, useCallback, useEffect } from 'react'
import { UploadedFile, UploaderConnectionStatus } from '../types'
import { useWebRTCPeer } from './WebRTCProvider'
import QRCode from 'react-qr-code'
import Loading from './Loading'
import StopButton from './StopButton'
import { useUploaderChannel } from '../hooks/useUploaderChannel'
import { useUploaderConnections } from '../hooks/useUploaderConnections'
import { CopyableInput } from './CopyableInput'
import { ConnectionListItem } from './ConnectionListItem'
import { ErrorMessage } from './ErrorMessage'
import { setRotating } from '../hooks/useRotatingSpinner'
import { Link, Plus } from '@phosphor-icons/react'

const QR_CODE_SIZE = 128

export default function Uploader({
  files,
  password,
  onStop,
}: {
  files: UploadedFile[]
  password: string
  onStop: () => void
}): JSX.Element {
  const { peer, stop } = useWebRTCPeer()
  const { isLoading, error, longSlug, shortSlug, longURL, shortURL } =
    useUploaderChannel(peer.id)
  const connections = useUploaderConnections(peer, files, password)

  const handleStop = useCallback(() => {
    stop()
    onStop()
  }, [stop, onStop])

  const activeDownloaders = connections.filter(
    (conn) => conn.status === UploaderConnectionStatus.Uploading,
  ).length

  useEffect(() => {
    setRotating(activeDownloaders > 0)
  }, [activeDownloaders])

  if (isLoading || !longSlug || !shortSlug) {
    return <Loading text="Creating channel..." />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <>
      {/* Modern QR Code and URL Section */}
      <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl p-6 border mb-4 border-white/20 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* QR Code Section */}
          <div className="flex-shrink-0">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
          <QRCode value={shortURL ?? ''} size={QR_CODE_SIZE} />
        </div>
            <p className="text-center text-white/80 text-sm mt-3 font-medium">
              Scan to download
            </p>
          </div>
          
          {/* URLs Section */}
          <div className="flex-1 w-full space-y-4">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Link className="w-5 h-5" weight="bold" />
                Share Links
              </h3>
              <div className="space-y-3">
                <CopyableInput label="Full URL" value={longURL ?? ''} />
          <CopyableInput label="Short URL" value={shortURL ?? ''} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Status Section */}
      <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              Active Transfers
          </h2>
            <p className="text-white/70 text-sm">
              {activeDownloaders} downloading • {connections.length} total connections
            </p>
          </div>
          <StopButton onClick={handleStop} />
        </div>
        
        <div className="space-y-4">
          {connections.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-white/60" weight="bold" />
              </div>
              <p className="text-white/60 text-sm">
                No connections yet. Share the link or QR code to start transfers.
              </p>
            </div>
          ) : (
            connections.map((conn, i) => (
          <ConnectionListItem key={i} conn={conn} />
            ))
          )}
        </div>
      </div>
    </>
  )
}
