import { Link } from 'next-view-transitions'
import { JSX } from 'react'
import { GradientButton } from './ui/gradient-button'

export default function ReturnHome(): JSX.Element {
  return (
    <div className="flex justify-center">
      <Link href="/">
        <GradientButton variant="variant">
          Return Home
        </GradientButton>
      </Link>
    </div>
  )
}
