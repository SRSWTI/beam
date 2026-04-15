'use client'

import React, { JSX, useState, useEffect } from 'react'
import { X, Download } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'

function UpdateTutorialToast(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isPlaying] = useState<boolean>(false)
  const [platform, setPlatform] = useState<string>('mac')

  useEffect(() => {
    // Check if update-tutorial parameter is true
    const urlParams = new URLSearchParams(window.location.search)
    const showTutorial = urlParams.get('update-tutorial') === 'true'

    if (!showTutorial) return

    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.includes('linux')) {
      setPlatform('linux')
    } else if (userAgent.includes('win')) {
      setPlatform('windows')
    } else {
      setPlatform('mac')
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = (): void => {
    setIsVisible(false)
  }

  const getVideoUrl = (): string => {
    return `https://api.srswti.com/storage/v1/object/public/bodega-public/media/${platform}-update.mp4`
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          className="fixed bottom-4 left-4 z-50 max-w-md"
        >
          <div className="bg-black/30 backdrop-blur-2xl border border-white/20 rounded-[23px] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Download className="w-6 h-6 text-white" />
                <h3 className="text-base font-semibold text-white">
                  How to Update Bodega
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="text-xs space-y-1 mb-4">
                <p className='mb-2 text-sm'>
                  Once the download is complete, you can follow the steps below
                  to update Bodega to the latest version:
                </p>
                <ul className="space-y-2 text-white/80">
                  <li className='ml-2'>1. Close the Bodega app</li>
                  <li className='ml-2'>2. Follow the steps shown in the video below</li>
                  <li className='ml-2'>3. Open the app, and you're all set!</li>{' '}
                </ul>
              </div>

              <div className="relative bg-black/50 rounded-md overflow-hidden">
                <video
                  src={getVideoUrl()}
                  className="w-full h-auto rounded-[12px] aspect-video object-cover"
                  loop
                  muted
                  playsInline
                  controls
                  ref={(video) => {
                    if (video) {
                      if (isPlaying) {
                        video.play()
                      } else {
                        video.pause()
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={handleClose}
                className="w-full bg-white/20 hover:bg-white/40 text-white text-xs py-2 px-3 rounded-md transition-colors"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default UpdateTutorialToast
