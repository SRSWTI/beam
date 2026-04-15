import React from 'react'
import Image from 'next/image'

export default function Header(): React.ReactElement {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="p-6">
        <a href="https://www.srswti.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="SRSWTI Research Labs"
              width={32}
              height={32}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-lg leading-tight tracking-tight">
              SRSWTI Research Labs
            </h1>
            <p className="text-white/70 text-sm font-medium">
              Bodega Beam
            </p>
          </div>
        </a>
      </div>
    </header>
  )
} 