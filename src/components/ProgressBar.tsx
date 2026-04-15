import React, { JSX } from 'react'
import { Check } from '@phosphor-icons/react'

export default function ProgressBar({
  value,
  max,
}: {
  value: number
  max: number
}): JSX.Element {
  const percentage = (value / max) * 100
  const isComplete = value === max

  return (
    <div className="w-full space-y-2">
      {/* Progress percentage display */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white/80">
          Progress
        </span>
        <span className="text-sm font-bold text-white">
          {Math.round(percentage)}%
        </span>
      </div>
      
      {/* Progress bar container */}
    <div
      id="progress-bar"
        className="w-full h-3 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden relative border border-white/20"
    >
        {/* Progress bar fill */}
      <div
        id="progress-bar-fill"
          className={`h-full relative overflow-hidden rounded-full transition-all duration-500 ease-out ${
          isComplete
              ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-500'
              : 'bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600'
          }`}
        style={{ width: `${percentage}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          
          {/* Moving highlight effect for active progress */}
          {!isComplete && percentage > 0 && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3 animate-[shimmer_2s_ease-in-out_infinite]"
              style={{
                animation: 'shimmer 2s ease-in-out infinite',
              }}
            />
          )}
        </div>
        
        {/* Completion indicator */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Check className="w-4 h-4 text-white animate-bounce" weight="bold" />
          </div>
        )}
      </div>
      
      {/* Status text */}
      <div className="text-xs text-white/60 text-center">
        {isComplete ? (
          <span className="flex items-center justify-center gap-1 text-emerald-400 font-medium">
            <Check className="w-3 h-3" weight="bold" />
            Transfer Complete
        </span>
        ) : percentage > 0 ? (
          'Transfer in progress...'
        ) : (
          'Waiting to start...'
        )}
      </div>
    </div>
  )
}

/* Add the shimmer animation to your global CSS or add it via Tailwind config */
