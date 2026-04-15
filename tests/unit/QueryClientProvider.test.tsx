/// <reference types="@testing-library/jest-dom" />
import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BodegaBeamQueryClientProvider from '../../src/components/QueryClientProvider'

describe('QueryClientProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <BodegaBeamQueryClientProvider>
        <span>child</span>
      </BodegaBeamQueryClientProvider>,
    )
    expect(getByText('child')).toBeInTheDocument()
  })
})
