import { JSX } from 'react'
import Spinner from '../../components/Spinner'
import Wordmark from '../../components/Wordmark'
import TitleText from '../../components/TitleText'
import ReturnHome from '../../components/ReturnHome'

export default function ReportedPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-5 py-10 max-w-md mx-auto">
      <Spinner direction="down" />
      <Wordmark />

      <TitleText>This delivery has been halted.</TitleText>
      <div className="px-8 py-6 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
        <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">
          Message from the management
        </h3>
        <p className="text-lg text-white/90 mb-4">
          Thank you for reporting this content. Our team will review it promptly.
        </p>
        <p className="text-sm text-white/70">
          - The SRSWTI Research Labs Team
        </p>
      </div>

      <ReturnHome />
    </div>
  )
}
