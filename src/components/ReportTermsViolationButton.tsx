'use client'

import { JSX } from 'react'
import { useWebRTCPeer } from './WebRTCProvider'
import { useCallback, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import CancelButton from './CancelButton'
import { GradientButton } from './ui/gradient-button'

export default function ReportTermsViolationButton({
  uploaderPeerID,
  slug,
}: {
  uploaderPeerID: string
  slug: string
}): JSX.Element {
  
  const [showModal, setShowModal] = useState(false)
  const [isReporting, setIsReporting] = useState(false)
  const { peer } = useWebRTCPeer()

  const reportMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/destroy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      if (!response.ok) {
        throw new Error('Failed to report violation')
      }
      return response.json()
    },
  })

  const handleReport = useCallback(() => {
    try {
      // Destroy the channel so no further downloads can be made.
      setIsReporting(true)
      reportMutation.mutate()

      // Send a report message to the uploader to hard-redirect them to the reported page.
      // The uploader will broadcast a report message to all connections, which will hard-redirect all downloaders to the reported page.
      if (peer) {
        const conn = peer.connect(uploaderPeerID, {
          metadata: { type: 'report' },
        })

        // Set a timeout to redirect after 2 seconds even if connection doesn't open
        const timeout = setTimeout(() => {
          conn.close()
          window.location.href = '/reported'
        }, 2000)

        conn.on('open', () => {
          clearTimeout(timeout)
          conn.close()
          window.location.href = '/reported'
        })
      } else {
        // If no peer connection, just redirect
        setTimeout(() => {
          window.location.href = '/reported'
        }, 1000)
      }
    } catch (error) {
      console.error('Failed to report violation', error)
      setIsReporting(false)
    }
  }, [peer, uploaderPeerID, reportMutation])

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="text-sm text-red-400 hover:text-red-300 hover:underline transition-colors duration-200"
          aria-label="Report terms violation"
        >
          Report suspicious transfer
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="modal-title"
              className="text-xl font-bold mb-4 text-white"
            >
              Found a suspicious transfer?
            </h2>

            <div className="space-y-4 text-white/80">
              <p className="text-sm text-white/80 mb-4">
                Before reporting this delivery, please note our Bodega Beam terms:
              </p>

              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/10">
                  <span className="text-base">✅</span>
                  <span className="text-sm">
                    Only share files you have the right to distribute
                  </span>
                </li>
                <li className="flex items-start gap-3 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/10">
                  <span className="text-base">🔒</span>
                  <span className="text-sm">
                    Share download links only with known recipients
                  </span>
                </li>
                <li className="flex items-start gap-3 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/10">
                  <span className="text-base">⚠️</span>
                  <span className="text-sm">
                    No illegal or harmful content allowed
                  </span>
                </li>
              </ul>

              <p>
                If you've spotted a violation of these terms, click Report to
                halt its delivery.
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <CancelButton onClick={() => setShowModal(false)} />
              <GradientButton
                disabled={isReporting}
                onClick={handleReport}
                aria-label="Confirm report"
              >
                {isReporting ? 'Reporting...' : 'Report'}
              </GradientButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
