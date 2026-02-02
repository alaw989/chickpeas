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

  test('Order Takeout/Delivery links are external', async ({ page }) => {
    await page.goto('/')

    const takeoutLink = page.locator('nav').locator('a', { hasText: 'Order Takeout' }).first()
    await expect(takeoutLink).toHaveAttribute('target', '_blank')
    await expect(takeoutLink).toHaveAttribute('rel', /noopener/)

    const deliveryLink = page.locator('nav').locator('a', { hasText: 'Order Delivery' }).first()
    await expect(deliveryLink).toHaveAttribute('target', '_blank')
    await expect(deliveryLink).toHaveAttribute('rel', /noopener/)
  })
})
