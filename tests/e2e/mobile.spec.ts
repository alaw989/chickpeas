import { test, expect } from '@playwright/test'

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('hamburger menu button is visible on mobile', async ({ page }) => {
    await page.goto('/')

    const hamburger = page.locator('button[aria-label="Open menu"]')
    await expect(hamburger).toBeVisible()
  })

  test('hamburger menu opens mobile nav', async ({ page }) => {
    await page.goto('/')

    const hamburger = page.locator('button[aria-label="Open menu"]')
    await hamburger.click()

    // Mobile menu should be visible
    const mobileMenu = page.locator('.mobile-menu')
    await expect(mobileMenu).toHaveClass(/translate-x-0/)

    // Navigation links should be visible
    await expect(page.locator('.mobile-menu').locator('text=View Our Menu')).toBeVisible()
    await expect(page.locator('.mobile-menu').locator('text=Contact Us')).toBeVisible()
  })

  test('can navigate using mobile menu', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu
    await page.locator('button[aria-label="Open menu"]').click()

    // Click menu link
    await page.locator('.mobile-menu').locator('text=View Our Menu').click()

    // Should navigate to menu page
    await expect(page).toHaveURL('/menu')
  })

  test('mobile menu closes after navigation', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu
    await page.locator('button[aria-label="Open menu"]').click()

    // Click menu link
    await page.locator('.mobile-menu').locator('text=View Our Menu').click()

    // Wait for navigation
    await expect(page).toHaveURL('/menu')

    // Mobile menu should be closed (translated off-screen)
    const mobileMenu = page.locator('.mobile-menu')
    await expect(mobileMenu).toHaveClass(/translate-x-full/)
  })

  test('close button closes mobile menu', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu
    await page.locator('button[aria-label="Open menu"]').click()

    // Menu should be open
    await expect(page.locator('.mobile-menu')).toHaveClass(/translate-x-0/)

    // Click close button
    await page.locator('button[aria-label="Close menu"]').click()

    // Menu should be closed
    await expect(page.locator('.mobile-menu')).toHaveClass(/translate-x-full/)
  })
})
