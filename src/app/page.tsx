'use client'

import React, { JSX, useCallback, useState } from 'react'
import WebRTCPeerProvider from '../components/WebRTCProvider'
import { FileUpload } from '../components/ui/file-upload'
import Uploader from '../components/Uploader'
import PasswordField from '../components/PasswordField'
import StartButton from '../components/StartButton'
import { UploadedFile } from '../types'
import OrbAnimation from '../components/OrbAnimation'
import CancelButton from '../components/CancelButton'
import TitleText from '../components/TitleText'
import SubtitleText from '../components/SubtitleText'
import { pluralize } from '../utils/pluralize'
import TermsAcceptance from '../components/TermsAcceptance'
import AddFilesButton from '../components/AddFilesButton'
import KnowMoreModal from '../components/KnowMoreModal'
import UploadFileList from '../components/UploadFileList'
import Header from '../components/Header'
import { Files, Lock } from '@phosphor-icons/react'
import { Toaster, toast } from 'sonner'
import WaitlistBodega from '@/components/ui/waitlist-bodega'
import Footer from '@/components/Footer'
import UpdateTutorialToast from './update-tutorial-toast'

function ContentContainer({
  children,
  isVisible = true,
}: {
  children: React.ReactNode
  isVisible?: boolean
}): JSX.Element {
  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isVisible
          ? 'opacity-100 transform translate-y-0'
          : 'opacity-0 transform translate-y-4 pointer-events-none'
      }`}
    >
      {children}
    </div>
  )
}

function InitialStateContent({
  onDrop,
  onTermsChange,
  termsAccepted,
}: {
  onDrop: (files: UploadedFile[]) => void
  onTermsChange: (accepted: boolean) => void
  termsAccepted: boolean
}): JSX.Element {
  return (
    <ContentContainer>
      <div className="flex flex-col items-center space-y-8 w-full max-w-2xl">
        <div className="flex flex-col items-center space-y-1 max-w-md">
          <TitleText>unlimited, unrestricted, unwatched.</TitleText>
        </div>
        <FileUpload onChange={onDrop} />
        <TermsAcceptance
          onTermsChange={onTermsChange}
          showTerms={false}
          checked={termsAccepted}
        />
        <KnowMoreModal />
      </div>
    </ContentContainer>
  )
}

function ConfirmUploadStateContent({
  uploadedFiles,
  password,
  onChangePassword,
  onCancel,
  onStart,
  onRemoveFile,
  onAddFiles,
  termsAccepted,
  onTermsChange,
  isVisible = true,
}: {
  uploadedFiles: UploadedFile[]
  password: string
  onChangePassword: (pw: string) => void
  onCancel: () => void
  onStart: () => void
  onRemoveFile: (index: number) => void
  onAddFiles: (files: UploadedFile[]) => void
  termsAccepted: boolean
  onTermsChange: (accepted: boolean) => void
  isVisible?: boolean
}): JSX.Element {
  const fileListData = uploadedFiles.map((file) => ({
    fileName: file.name,
    type: file.type,
  }))

  return (
    <ContentContainer isVisible={isVisible}>
      <div className="flex flex-col items-center space-y-8 w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <TitleText>
            You are about to start beaming{' '}
            {pluralize(uploadedFiles.length, 'file', 'files')}.
          </TitleText>
          <AddFilesButton onAdd={onAddFiles} />
        </div>

        {/* Main Content Card */}
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl space-y-6">
          {/* Files Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <Files className="w-5 h-5" weight="bold" />
              Selected Files
            </h3>
            <UploadFileList files={fileListData} onRemove={onRemoveFile} />
          </div>

          {/* Security Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" weight="bold" />
              Security (Optional)
            </h3>
            <PasswordField value={password} onChange={onChangePassword} />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <CancelButton onClick={onCancel} />
            <StartButton onClick={onStart} />
          </div>
        </div>

        {/* Terms Section */}
        <div className="mt-6">
          <TermsAcceptance
            onTermsChange={onTermsChange}
            showTerms={true}
            checked={termsAccepted}
          />
        </div>
      </div>
    </ContentContainer>
  )
}

function UploadingStateContent({
  uploadedFiles,
  password,
  onStop,
  isVisible = true,
}: {
  uploadedFiles: UploadedFile[]
  password: string
  onStop: () => void
  isVisible?: boolean
}): JSX.Element {
  const fileListData = uploadedFiles.map((file) => ({
    fileName: file.name,
    type: file.type,
  }))

  return (
    <ContentContainer isVisible={isVisible}>
      <TitleText>
        You are beaming {pluralize(uploadedFiles.length, 'file', 'files')}.
      </TitleText>
      <SubtitleText>
        Leave this tab open. Bodega Beam does not store files.
      </SubtitleText>
      <UploadFileList files={fileListData} />
      <WebRTCPeerProvider>
        <Uploader files={uploadedFiles} password={password} onStop={onStop} />
      </WebRTCPeerProvider>
    </ContentContainer>
  )
}

export default function UploadPage(): JSX.Element {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [password, setPassword] = useState('')
  const [uploading, setUploading] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleDrop = useCallback((files: UploadedFile[]): void => {
    setUploadedFiles(files)
  }, [])

  const handleChangePassword = useCallback((pw: string) => {
    setPassword(pw)
  }, [])

  const handleStart = useCallback(() => {
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions')
      return
    }

    setTransitioning(true)
    setTimeout(() => {
      setUploading(true)
      setTransitioning(false)
    }, 250) // Half of the transition duration
  }, [termsAccepted])

  const handleStop = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setUploading(false)
      setTransitioning(false)
    }, 250)
  }, [])

  const handleCancel = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setUploadedFiles([])
      setUploading(false)
      setTransitioning(false)
    }, 250)
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles((fs) => fs.filter((_, i) => i !== index))
  }, [])

  const handleAddFiles = useCallback((files: UploadedFile[]) => {
    setUploadedFiles((fs) => [...fs, ...files])
  }, [])

  return (
    <>
      <WaitlistBodega />
      <Toaster />
      <Footer />
      <UpdateTutorialToast />

      <Header />
      <div className="flex flex-col items-center space-y-12 max-w-4xl mx-auto px-4 scale-[0.7] -translate-y-24">
        <OrbAnimation />

        {/* Content area with smooth transitions */}
        <div className="relative w-full min-h-[500px] flex justify-center space-y-4">
          {/* Initial State */}
          {!uploadedFiles.length && (
            <div className="absolute inset-0 flex justify-center">
              <InitialStateContent
                onDrop={handleDrop}
                onTermsChange={setTermsAccepted}
                termsAccepted={termsAccepted}
              />
            </div>
          )}

          {/* Confirm Upload State */}
          {uploadedFiles.length > 0 && !uploading && (
            <div className="absolute inset-0 flex justify-center">
              <ConfirmUploadStateContent
                uploadedFiles={uploadedFiles}
                password={password}
                onChangePassword={handleChangePassword}
                onCancel={handleCancel}
                onStart={handleStart}
                onRemoveFile={handleRemoveFile}
                onAddFiles={handleAddFiles}
                termsAccepted={termsAccepted}
                onTermsChange={setTermsAccepted}
                isVisible={!transitioning}
              />
            </div>
          )}

          {/* Uploading State */}
          {uploading && (
            <div className="absolute inset-0 flex justify-center">
              <UploadingStateContent
                uploadedFiles={uploadedFiles}
                password={password}
                onStop={handleStop}
                isVisible={!transitioning}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
