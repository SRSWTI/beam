'use client'

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface PortalModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function PortalModal({
  isOpen,
  onClose,
  children,
  className = '',
}: PortalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement

      setTimeout(() => {
        modalRef.current?.focus()
      }, 100)
    } else {
      previousFocusRef.current?.focus()
    }

    return () => {}
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`bg-white/5 backdrop-blur-lg relative border border-white/20 rounded-[24px] max-w-7xl w-full  shadow-2xl focus:outline-none ${className}`}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 bg-red-500 size-3 rounded-full hover:bg-red-600  max-h-[90vh] overflow-y-auto"></button>

            <div className="max-h-[90vh] overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Portal to body
  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null
}
