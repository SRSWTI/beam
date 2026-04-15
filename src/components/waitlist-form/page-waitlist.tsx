import React from 'react'
import { TwitterLogoIcon } from '@phosphor-icons/react'
import WaitlistForm from './waitlist-form'

const GradientBars: React.FC = () => {
  const [numBars] = React.useState(15)

  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1)
    const maxHeight = 100
    const minHeight = 30

    const center = 0.5
    const distanceFromCenter = Math.abs(position - center)
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2)

    return minHeight + (maxHeight - minHeight) * heightPercentage
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="flex h-full"
        style={{
          width: '100%',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {Array.from({ length: numBars }).map((_, index) => {
          const height = calculateHeight(index, numBars)
          return (
            <div
              key={index}
              style={{
                flex: '1 0 calc(100% / 15)',
                maxWidth: 'calc(100% / 15)',
                height: '100%',
                background:
                  'linear-gradient(to top, rgb(128, 0, 255), transparent)',
                transform: `scaleY(${height / 100})`,
                transformOrigin: 'bottom',
                transition: 'transform 0.5s ease-in-out',
                animation: 'pulseBar 2s ease-in-out infinite alternate',
                animationDelay: `${index * 0.1}s`,
                outline: '1px solid rgba(0, 0, 0, 0)',
                boxSizing: 'border-box',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

type PageWaitlistProps = {
  showLogo?: boolean
}

const PageWaitlist: React.FC<PageWaitlistProps> = ({ showLogo = true }) => {
  return (
    <section className="relative h-full w-full flex flex-col items-center p-2 sm:p-10 overflow-hidden">
      <div className="absolute inset-0 bg-gray-950"></div>
      <GradientBars />

      {showLogo && (
        <div className="fixed top-10 left-10 z-50">
          <div className="flex items-center space-x-3">
            <img
              src="/favicon.ico"
              alt="SRSWTI Logo"
              className="size-10 sm:size-16 object-contain"
            />
            <span className="text-white font-bold text-xl sm:text-3xl inter-font">
              SRSWTI
            </span>
          </div>
        </div>
      )}

      <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center justify-center h-full py-8 sm:py-16">
        <h1 className="w-full text-white leading-tight tracking-tight mb-6 sm:mb-8 animate-fadeIn px-4">
          <span className="block font-inter font-medium text-xl sm:text-4xl whitespace-nowrap">
            Personal Computing, Reimagined.
          </span>
        </h1>

        <div className="mb-6 sm:mb-10 px-4">
          <p className="text-xs sm:text-base text-gray-400 leading-relaxed animate-fadeIn animation-delay-300 font-space">
            Apply for the Private Beta. Access is curated to ensure a
            high-quality feedback loop. Your answers to a few short questions
            will determine your eligibility for early access.
          </p>
        </div>

        <div className="w-full mb-6 sm:mb-8 px-4">
          <WaitlistForm />
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="https://x.com/srswti_ai"
            className="text-white/60 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogoIcon
              size={20}
              className="w-5 h-5 sm:w-[22px] sm:h-[22px]"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export default PageWaitlist
