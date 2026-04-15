import React, { JSX } from 'react'
import { GradientButton } from './ui/gradient-button'

export default function DownloadButton({
  onClick,
}: {
  onClick?: React.MouseEventHandler
}): JSX.Element {
  return (
    <GradientButton onClick={onClick}>
      Download
    </GradientButton>
  )
}
