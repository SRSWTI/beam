import React, { JSX } from 'react'
import useClipboard from '../hooks/useClipboard'
import { Check, Copy } from '@phosphor-icons/react'

export function CopyableInput({
  label,
  value,
}: {
  label: string
  value: string
}): JSX.Element {
  const { hasCopied, onCopy } = useClipboard(value)

  return (
    <div className="w-full">
      <label className="block text-white/90 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={`copyable-input-${label.toLowerCase().replace(/\s+/g, '-')}`}
          className="w-full px-4 py-3 pr-20 text-sm text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200 placeholder-white/50 font-mono"
          value={value}
          readOnly
          placeholder="Generating link..."
        />
        <button
          className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
            hasCopied
              ? 'bg-green-500/80 text-white'
              : 'bg-white/20 hover:bg-white/30 text-white/90 hover:text-white'
          } backdrop-blur-sm border border-white/20`}
          onClick={onCopy}
        >
          {hasCopied ? (
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3" weight="bold" />
              Copied
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Copy className="w-3 h-3" weight="bold" />
              Copy
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
