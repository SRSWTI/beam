import React, { JSX } from 'react'

export default function InputLabel({
  children,
  hasError = false,
  tooltip,
}: {
  children: React.ReactNode
  hasError?: boolean
  tooltip?: string
}): JSX.Element {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <label className={`text-sm font-medium ${hasError ? 'text-red-300' : 'text-white/90'}`}>
        {children}
      </label>
      {/* TODO: Accessibility - Convert to button element or add proper ARIA attributes */}
      {/* The info icon should be focusable and announce tooltip to screen readers */}
      {tooltip && (
        <div className="group relative">
          <svg className="w-4 h-4 text-white/60 hover:text-white/80 transition-colors cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-black/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap max-w-xs z-10">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
          </div>
        </div>
      )}
    </div>
  )
}
