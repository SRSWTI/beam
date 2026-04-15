'use client'

import React, { useState } from 'react'
import { GradientButton } from './ui/gradient-button'
import FAQ from './FAQ'
import TechnicalFeatures from './TechnicalFeatures'
import { PortalModal } from './KnowMoreDialog'

export default function KnowMoreModal(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <GradientButton onClick={handleOpen}>know more</GradientButton>

      <PortalModal isOpen={isOpen} onClose={handleClose}>
        <div className="p-8">
          <div className="flex justify-between items-center not-only:text-center">
            <h2 id="modal-title" className="text-3xl font-bold text-white mx-auto ">
              About Bodega Beam
            </h2>
          </div>

          <div className="w-full bg-white/20  my-6 h-0.5 mb-20"></div>

          <div className="space-y-12">
            <FAQ />
            <TechnicalFeatures />
          </div>
        </div>
      </PortalModal>
    </>
  )
}
