'use client'

import React, { JSX } from 'react'

export default function TermsAcceptance({
  onTermsChange,
  showTerms = false,
  checked = false,
}: {
  onTermsChange: (accepted: boolean) => void
  showTerms?: boolean
  checked?: boolean
}): JSX.Element {
  if (!showTerms) return <></>

  return (
    <div className="text-center max-w-md">
      {/* Custom Checkbox */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onTermsChange(e.target.checked)}
              className="sr-only peer"
            />
            <div
              className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
                checked ? 'border-blue-400 bg-blue-400' : 'border-white/40'
              } group-hover:border-white/60 peer-checked:group-hover:border-blue-300`}
            >
              <svg
                className={`w-3 h-3 text-white transition-opacity duration-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                  checked ? 'opacity-100' : 'opacity-0'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <span className="text-white/90 font-medium text-sm select-none">
            I accept the Bodega Beam terms and conditions
          </span>
        </label>
      </div>

      {/* Terms Details - Only shown when showTerms is true */}
      {showTerms && (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <h4 className="text-white/80 font-semibold text-xs mb-3 uppercase tracking-wide">
            Terms & Conditions
          </h4>
          <div className="space-y-3 text-xs text-white/60">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                You agree not to share illegal, harmful, or copyrighted content
                through this service.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                Service provided "as is" without warranties. Files transfer
                directly between users with no server storage.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// terms and conditions, and the terms checkbox before starting the beam, also change the name in landing page forr terms,

// fix the know more content and the terms acceptance,
