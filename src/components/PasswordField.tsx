import React, { JSX, useState, useCallback } from 'react'
import InputLabel from './InputLabel'
import { Eye, EyeSlash } from '@phosphor-icons/react'

export default function PasswordField({
  value,
  onChange,
  hasError = false,
}: {
  value: string
  onChange: (value: string) => void
  hasError?: boolean
}): JSX.Element {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange],
  )

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  return (
    <div className="w-full">
      <InputLabel hasError={hasError} tooltip="Optional password to secure your transfer">
        Password (optional)
      </InputLabel>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full px-4 py-3 pr-12 rounded-xl bg-white/10 backdrop-blur-sm border transition-all duration-200 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
            hasError
              ? 'border-red-400/60 focus:border-red-400'
              : 'border-white/30 focus:border-blue-400/60 hover:border-white/40'
          }`}
          placeholder="Enter a secret password to protect your files..."
          value={value}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white/60 hover:text-white/80"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeSlash className="w-5 h-5" weight="bold" />
          ) : (
            <Eye className="w-5 h-5" weight="bold" />
          )}
        </button>
      </div>
    </div>
  )
}
