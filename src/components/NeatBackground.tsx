'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import { NeatConfig, NeatGradient } from '@firecms/neat'
import { AnimatePresence, motion } from 'framer-motion'

// Current gradient configuration (original)
const config1: NeatConfig = {
  colors: [
    {
      color: '#FF5373',
      enabled: true,
    },
    {
      color: '#17E7FF',
      enabled: true,
    },
    {
      color: '#FFC858',
      enabled: true,
    },
    {
      color: '#6D3BFF',
      enabled: true,
    },
    {
      color: '#f5e1e5',
      enabled: false,
    },
  ],
  speed: 6,
  horizontalPressure: 7,
  verticalPressure: 8,
  waveFrequencyX: 2,
  waveFrequencyY: 1,
  waveAmplitude: 8,
  shadows: 4,
  highlights: 6,
  colorBrightness: 0.95,
  colorSaturation: -8,
  wireframe: false,
  colorBlending: 10,
  backgroundColor: '#003FFF',
  backgroundAlpha: 1,
  grainScale: 4,
  grainIntensity: 0.25,
  grainSpeed: 1,
  resolution: 1,
  yOffset: 0,
}

// Ocean theme gradient
const config2: NeatConfig = {
  colors: [
    {
      color: '#0b3954',
      enabled: true,
    },
    {
      color: '#087e8b',
      enabled: true,
    },
    {
      color: '#bfd7ea',
      enabled: true,
    },
    {
      color: '#ff5a5f',
      enabled: true,
    },
    {
      color: '#c81d25',
      enabled: true,
    },
  ],
  speed: 4,
  horizontalPressure: 4,
  verticalPressure: 3,
  waveFrequencyX: 0,
  waveFrequencyY: 0,
  waveAmplitude: 0,
  shadows: 2,
  highlights: 7,
  colorBrightness: 1,
  colorSaturation: 8,
  wireframe: false,
  colorBlending: 5,
  backgroundColor: '#FF0000',
  backgroundAlpha: 1,
  grainScale: 0,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 0,
  resolution: 0.5,
  yOffset: 0,
}

// Vibrant theme gradient
const config3: NeatConfig = {
  colors: [
    {
      color: '#ffbe0b',
      enabled: true,
    },
    {
      color: '#fb5607',
      enabled: true,
    },
    {
      color: '#ff006e',
      enabled: true,
    },
    {
      color: '#8338ec',
      enabled: true,
    },
    {
      color: '#3a86ff',
      enabled: true,
    },
  ],
  speed: 4,
  horizontalPressure: 2,
  verticalPressure: 2,
  waveFrequencyX: 1,
  waveFrequencyY: 2,
  waveAmplitude: 7,
  shadows: 10,
  highlights: 10,
  colorBrightness: 1,
  colorSaturation: 2,
  wireframe: false,
  colorBlending: 5,
  backgroundColor: '#FFBE0B',
  backgroundAlpha: 1,
  grainScale: 2,
  grainSparsity: 0,
  grainIntensity: 0.3,
  grainSpeed: 0,
  resolution: 1,
  yOffset: 0,
}

const themes = {
  alejandra: config1,
  ocean: config2,
  vibrant: config3,
}

function NeatBackground({
  className,
  theme,
}: {
  theme: 'alejandra' | 'ocean' | 'vibrant'
  className: string
}): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const neatRef = useRef<NeatGradient | null>(null)

  console.log('THEME', theme)

  useEffect(() => {
    if (!canvasRef.current) return

    if (neatRef.current) {
      neatRef.current.destroy()
    }

    const config = themes[theme]
    neatRef.current = new NeatGradient({
      ref: canvasRef.current,
      ...config,
    })

    return () => {
      if (neatRef.current) {
        neatRef.current.destroy()
        neatRef.current = null
      }
    }
  }, [theme])

  return (
    <div>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 h-screen  w-screen ${className}`}
        id="neat-gradient"
      />
    </div>
  )
}

export default memo(NeatBackground)

export const BackgroundChangingNeat = (): React.ReactElement => {
  const themeOptions: Array<'alejandra' | 'ocean' | 'vibrant'> = [
    'alejandra',
    'ocean',
    'vibrant',
  ]
  const [themeIndex, setThemeIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setThemeIndex((prev) => (prev + 1) % themeOptions.length)
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={themeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 w-screen h-screen"
      >
        <NeatBackground className="" theme={themeOptions[themeIndex]} />
      </motion.div>
    </AnimatePresence>
  )
}
