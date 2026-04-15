import React from 'react'
import { GradientButton } from './ui/gradient-button'
import { Stop } from '@phosphor-icons/react'

export default function StopButton({
  onClick,
  isDownloading = false,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isDownloading?: boolean
}): React.ReactElement {
  return (
    <GradientButton variant="variant" onClick={onClick}>
      <Stop className="w-4 h-4 mr-2" weight="bold" />
      {isDownloading ? 'Stop Download' : 'Stop Beam'}
    </GradientButton>
  )
}
