import React from 'react'
import { GradientButton } from './ui/gradient-button'

export default function CancelButton({
  onClick,
  text = 'Cancel',
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  text?: string
}): React.ReactElement {
  return (
    <GradientButton variant="variant" onClick={onClick}>
      {text}
    </GradientButton>
  )
}
