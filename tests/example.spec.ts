import { test, expect } from '@playwright/test'

test.describe('Template Base - Smoke Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')
    
    // Verificar se a página carregou
    await expect(page).toHaveTitle(/nextjs-solid-boilerplate/i)
    
    // Capturar screenshot para evidência
    await page.screenshot({ path: 'tests/evidence/homepage.png' })
  })

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/')
    
    // Verificar meta tags importantes
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /Modern Next.js boilerplate/i)
    
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1')
  })

  test('should be responsive', async ({ page }) => {
    await page.goto('/')
    
    // Testar diferentes viewports
    await page.setViewportSize({ width: 375, height: 667 }) // Mobile
    await page.screenshot({ path: 'tests/evidence/mobile-view.png' })
    
    await page.setViewportSize({ width: 1200, height: 800 }) // Desktop
    await page.screenshot({ path: 'tests/evidence/desktop-view.png' })
    
    // Verificar se não há overflow horizontal
    const body = await page.locator('body').boundingBox()
    expect(body?.width).toBeLessThanOrEqual(375)
  })
})