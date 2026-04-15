'use client'

import React, { useState } from 'react'
import GlowBtn from './glow-btn'
import { PortalModal } from '../KnowMoreDialog'
import PageWaitlist from '../waitlist-form/page-waitlist'

export default function WaitlistBodega(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <GlowBtn
        className="fixed top-5 right-5 cursor-pointer rounded-full font-bold text-white min-w-fit z-[99999] border-purple-800 bg-[linear-gradient(110deg,#4a0072,45%,#9d4edd,55%,#4a0072)]"
        onClick={handleOpen}
      >
        Bodega OS is here!
      </GlowBtn>

      <PortalModal className='overflow-hidden' isOpen={isOpen} onClose={handleClose}>
        <PageWaitlist />
      </PortalModal>
    </>
  )
}
