import React from 'react'
import { GradientButton } from './ui/gradient-button'

export default function StartButton({
  onClick,
  disabled,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}): React.ReactElement {
  return (
    <GradientButton onClick={onClick} disabled={disabled}>
      Start
    </GradientButton>
  )
}
