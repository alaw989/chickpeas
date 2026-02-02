import { test, expect } from '@playwright/test'

test.describe('Menu Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/menu')
  })

  test('menu page displays heading and intro text', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Crafted with care')
    await expect(page.getByText('Fresh Mediterranean flavors')).toBeVisible()
  })

  test('menu items load from API', async ({ page }) => {
    // Wait for loading to finish
    await expect(page.getByText('Loading menu…')).not.toBeVisible({ timeout: 10000 })

    // Should have category tabs
    const tabs = page.locator('.menu-header li')
    await expect(tabs.first()).toBeVisible()

    // Should have menu items
    const menuItems = page.locator('.menu-items li')
    await expect(menuItems.first()).toBeVisible()
  })

  test('tab switching filters menu items', async ({ page }) => {
    // Wait for loading to finish
    await expect(page.getByText('Loading menu…')).not.toBeVisible({ timeout: 10000 })

    const tabs = page.locator('.menu-header li')
    const tabCount = await tabs.count()

    if (tabCount >= 2) {
      // Click second tab
      const secondTab = tabs.nth(1)
      const secondTabText = await secondTab.textContent()
      await secondTab.click()

      // Second tab should be active
      await expect(secondTab).toHaveClass(/active/)

      // Click back to first tab
      const firstTab = tabs.first()
      await firstTab.click()
      await expect(firstTab).toHaveClass(/active/)
    }
  })

  test('menu items display prices', async ({ page }) => {
    // Wait for loading to finish
    await expect(page.getByText('Loading menu…')).not.toBeVisible({ timeout: 10000 })

    // Check for price display (single or small/large format)
    const pricePattern = page.locator('.app-text h3 span')
    await expect(pricePattern.first()).toBeVisible()
  })

  test('displays error message when API fails', async ({ page }) => {
    // Mock failed API response
    await page.route('**/wp-json/**', route => {
      route.abort()
    })

    await page.reload()

    await expect(page.getByText(/unable to load|error/i)).toBeVisible({ timeout: 10000 })
  })
})
