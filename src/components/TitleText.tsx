import React, { JSX } from 'react'

export default function TitleText({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <p className="text-lg text-center text-white drop-shadow-md max-w-md">
      {children}
    </p>
  )
}
