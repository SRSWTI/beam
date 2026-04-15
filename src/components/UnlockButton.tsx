import React, { JSX } from 'react'
import { GradientButton } from './ui/gradient-button'

export default function UnlockButton({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return (
    <GradientButton onClick={onClick}>
      Unlock
    </GradientButton>
  )
}
