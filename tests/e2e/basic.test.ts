/// <reference types="@playwright/test" />
import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(
    page.getByText('Beam your files anywhere on the planet, securely..'),
  ).toBeVisible()
})
