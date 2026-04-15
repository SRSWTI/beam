import React, { JSX } from 'react'
import ReturnHome from '../components/ReturnHome'
import TitleText from '../components/TitleText'
import OrbAnimation from '../components/OrbAnimation'

export const metadata = {
  title: 'Bodega Beam - 404: Transfer Not Found',
  description: 'Oops! This transfer seems to be missing.',
}

export default function NotFound(): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-5 py-10 max-w-2xl mx-auto px-4">
      <OrbAnimation />
      <TitleText>404: Looks like this transfer got lost in the beam!</TitleText>
      <ReturnHome />
    </div>
  )
}
