import { notFound } from 'next/navigation'
import { JSX } from 'react'
import { getOrCreateChannelRepo } from '../../../channel'
import Downloader from '@/components/Downloader'
import OrbAnimation from '@/components/OrbAnimation'
import WebRTCPeerProvider from '@/components/WebRTCProvider'
import ReportTermsViolationButton from '@/components/ReportTermsViolationButton'
import Header from '@/components/Header'

const normalizeSlug = (rawSlug: string[]): string => {
  if (rawSlug.length === 1) {
    return rawSlug[0]
  } else {
    return rawSlug.join('/')
  }
}

export default async function DownloadPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<JSX.Element> {
  const { slug: slugRaw } = await params
  const { removelinks } = await searchParams
  const slug = normalizeSlug(slugRaw)
  const channel = await getOrCreateChannelRepo().fetchChannel(slug)

  if (!channel) {
    notFound()
  }

  const shouldShowHeader = removelinks !== 'true'

  return (
    <>
      {shouldShowHeader && <Header />}
      <div className="flex flex-col items-center space-y-8 py-10 max-w-2xl mx-auto px-4 pt-24">
      <OrbAnimation />
      <WebRTCPeerProvider>
        <Downloader 
          uploaderPeerID={channel.uploaderPeerID} 
          showReturnHome={shouldShowHeader}
        />
        <ReportTermsViolationButton
          uploaderPeerID={channel.uploaderPeerID}
          slug={slug}
        />
      </WebRTCPeerProvider>
    </div>
    </>
  )
}
