import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('home page loads correctly', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Chickpea/)
    await expect(page.locator('img[alt="Chickpea\'s Restaurant logo"]')).toBeVisible()
  })

  test('can navigate to Menu page', async ({ page }) => {
    await page.goto('/')

    await page.click('text=View Our Menu')

    await expect(page).toHaveURL('/menu')
    await expect(page.locator('h1, h2').filter({ hasText: /menu/i })).toBeVisible()
  })

  test('can navigate to Contact page', async ({ page }) => {
    await page.goto('/')

    await page.click('text=Contact Us')

    await expect(page).toHaveURL('/contact')
  })

  test('logo navigates to home page', async ({ page }) => {
    await page.goto('/menu')

    await page.click('img[alt="Chickpea\'s Restaurant logo"]')

    await expect(page).toHaveURL('/')
  })

  test('Order Online link is external', async ({ page }) => {
    await page.goto('/')

    const orderLink = page.locator('nav').locator('a', { hasText: 'Order Online' }).first()
    await expect(orderLink).toHaveAttribute('target', '_blank')
    await expect(orderLink).toHaveAttribute('rel', /noopener/)
  })
})
