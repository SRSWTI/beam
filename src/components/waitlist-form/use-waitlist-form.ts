import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { FormData, WAITLIST_STORAGE_KEY, STEPS } from './waitlist-data'

export const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxeWR5cHp1bW1qeWhxanVra21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxNDY4MzgsImV4cCI6MjAyNzcyMjgzOH0.zXHCK0pd7vvrHQj9UqjCkMgzHU8UFud6dFFe4ytBwac'
export const SUPABASE_URL = 'https://api.srswti.com'

export const useWaitlistForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    twitter: '',
    operatingSystem: '',
    ram: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  useEffect(() => {
    const checkPreviousSubmission = () => {
      const stored = localStorage.getItem(WAITLIST_STORAGE_KEY)
      if (stored) {
        try {
          const { timestamp, email: storedEmail } = JSON.parse(stored)
          const now = Date.now()
          const twentyFourHours = 24 * 60 * 60 * 1000

          if (now - timestamp < twentyFourHours) {
            setIsSubmitted(true)
            setFormData((prev) => ({ ...prev, email: storedEmail }))
          } else {
            localStorage.removeItem(WAITLIST_STORAGE_KEY)
          }
        } catch {
          localStorage.removeItem(WAITLIST_STORAGE_KEY)
        }
      }
    }

    checkPreviousSubmission()
  }, [])

  const validateField = (
    field: keyof FormData,
    value: string,
  ): string | null => {
    switch (field) {
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!value.includes('@')) return 'Please enter a valid email'
        return null
      case 'name':
        // Name is optional, so only validate if provided
        if (value.trim() && value.length < 1) return 'Please enter a valid name'
        return null
      case 'twitter':
        // Twitter is optional, so only validate if provided
        if (value.trim() && value.length < 1)
          return 'Please enter a valid Twitter handle'
        return null
      default:
        return null
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}

    if (step === 1) {
      const emailError = validateField('email', formData.email)
      if (emailError) newErrors.email = emailError
    }

    if (step === 2) {
      // Only validate name if it's provided since it's optional
      if (formData.name.trim()) {
        const nameError = validateField('name', formData.name)
        if (nameError) newErrors.name = nameError
      }
    }

    if (step === 3) {
      // Only validate Twitter if it's provided since it's optional
      if (formData.twitter.trim()) {
        const twitterError = validateField('twitter', formData.twitter)
        if (twitterError) newErrors.twitter = twitterError
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const canProceed = () => {
    if (currentStep === 1) {
      return (
        Boolean(formData.email.trim()) &&
        formData.email.includes('@') &&
        !errors.email
      )
    }
    if (currentStep === 2) {
      // Can proceed if no name provided (since it's optional) or if valid name provided
      return !errors.name
    }
    if (currentStep === 3) {
      // Can proceed if no Twitter provided (since it's optional) or if valid Twitter provided
      return !errors.twitter
    }
    return true
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const skipStep = () => {
    if (currentStep < STEPS.length && !STEPS[currentStep - 1].required) {
      setCurrentStep((prev) => prev + 1)
      setErrors({})
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      setErrors({})
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    if (!formData.email.trim()) {
      toast.error('Email is required')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/exclusive_waitlist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name.trim() || null,
            twitter_handle: formData.twitter.trim() || null,
            operating_system: formData.operatingSystem || null,
            ram: formData.ram || null,
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        // Check for duplicate key constraint violation (409 status code)
        if (
          response.status === 409 ||
          (errorData &&
            (errorData.code === '23505' || // PostgreSQL unique violation
              errorData.message?.toLowerCase().includes('duplicate') ||
              errorData.message?.toLowerCase().includes('already exists') ||
              errorData.details?.toLowerCase().includes('already exists')))
        ) {
          toast.error('This email is already on the waitlist!')
          return
        }

        throw new Error('Failed to join waitlist')
      }

      localStorage.setItem(
        WAITLIST_STORAGE_KEY,
        JSON.stringify({
          email: formData.email,
          timestamp: Date.now(),
        }),
      )

      setIsSubmitted(true)
      toast.success("You've joined the early access!")
    } catch (err) {
      console.error('Error joining waitlist:', err)
      toast.error("Couldn't join the early access")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    currentStep,
    formData,
    isSubmitting,
    isSubmitted,
    errors,
    updateFormData,
    canProceed,
    nextStep,
    skipStep,
    prevStep,
    handleSubmit,
  }
}
