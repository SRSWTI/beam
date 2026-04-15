/// <reference types="@testing-library/jest-dom" />
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TermsAcceptance from '../../src/components/TermsAcceptance'

describe('TermsAcceptance', () => {
  it('renders checkbox when showTerms is true', () => {
    const { getByText } = render(
      <TermsAcceptance onTermsChange={vi.fn()} showTerms={true} checked={false} />
    )
    expect(getByText('I accept the Bodega Beam terms and conditions')).toBeInTheDocument()
    expect(getByText('Terms & Conditions')).toBeInTheDocument()
  })

  it('calls onTermsChange when checkbox is clicked', () => {
    const onTermsChange = vi.fn()
    const { getByRole } = render(
      <TermsAcceptance onTermsChange={onTermsChange} showTerms={true} checked={false} />
    )
    const checkbox = getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(onTermsChange).toHaveBeenCalledWith(true)
  })
})
