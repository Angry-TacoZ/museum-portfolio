import { test, expect, type Page } from '@playwright/test'

const webglFallback = process.env.MUSEUM_TEST_WEBGL_FALLBACK === 'true'
const pagesBasePath = process.env.MUSEUM_TEST_BASE_PATH === '/museum-portfolio/' ? '/museum-portfolio/' : '/'

function appPath(path: string) {
  return pagesBasePath === '/' ? path : `${pagesBasePath}${path.replace(/^\//, '')}`
}

async function openMuseum(page: Page, path = '/') {
  const target = webglFallback && path === '/' ? '/?forceWebglFailure=1' : path
  await page.goto(appPath(target))
}

async function expectInitialContent(page: Page) {
  if (webglFallback) {
    await expect(page.getByText('3D view unavailable', { exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Tools for thinking' })).toBeVisible()
  } else {
    await expect(page.locator('#entrance-content')).toBeVisible()
  }
}

async function skip(page: Page) {
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to exhibit content' })).toBeFocused()
  await page.keyboard.press('Enter')
}

async function next(page: Page) {
  const button = page.getByRole('navigation', { name: 'Exhibition navigation', exact: true }).getByRole('button', { name: 'Next →' })
  await expect(button).toBeEnabled()
  await button.click()
}

test('central exhibit controls navigate both ways after resizing', async ({ page }) => {
  test.skip(webglFallback, 'The fallback uses the footer navigation.')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openMuseum(page)
  await expectInitialContent(page)

  for (const size of [{ width: 1440, height: 900 }, { width: 800, height: 1100 }]) {
    await page.setViewportSize(size)
    await next(page)
    for (let station = 2; station <= 4; station++) {
      await expect(page.getByText(`${station} / 5`, { exact: true })).toBeVisible()
      await page.getByRole('navigation', { name: 'Exhibit controls', exact: true }).getByRole('button').last().click()
    }
    await expect(page.getByText('5 / 5', { exact: true })).toBeVisible()
    for (let station = 4; station >= 1; station--) {
      // A real click catches CSS 3D depth placing the sign behind the canvas.
      await page.getByRole('button', { name: 'Previous exhibit', exact: true }).click()
      await expect(page.getByText(`${station} / 5`, { exact: true })).toBeVisible()
    }
  }
})

test(`${pagesBasePath === '/' ? 'Root path' : 'Pages base path'} loads all portrait textures in the WebGL scene`, async ({ page }) => {
  test.skip(webglFallback, 'Windows CI uses the accessible fallback; Ubuntu verifies full WebGL.')
  const portraits = new Map<string, number>()
  const errors: string[] = []
  page.on('response', response => {
    const pathname = new URL(response.url()).pathname
    if (/-ink\.(png|webp)$/.test(pathname)) portraits.set(pathname, response.status())
  })
  page.on('pageerror', error => errors.push(error.message))

  await openMuseum(page)
  await expect(page.locator('canvas')).toBeVisible()
  await expect.poll(() => portraits.size).toBe(4)

  const expectedPortraits = [
    `${pagesBasePath}portraits/alan-kay-ink.png`,
    `${pagesBasePath}portraits/bret-victor-ink.png`,
    `${pagesBasePath}portraits/douglas-engelbart-ink.png`,
    `${pagesBasePath}portraits/james-lane-ink.webp`,
  ].sort()
  expect([...portraits.keys()].sort()).toEqual(expectedPortraits)
  expect([...portraits.values()]).toEqual([200, 200, 200, 200])
  expect(errors).toEqual([])
})

test('James portrait stays within its initial-load asset budget', async ({ request }) => {
  // Also runs on Windows, where the browser scene uses the accessible fallback.
  const response = await request.get(appPath('/portraits/james-lane-ink.webp'))
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('image/webp')
  const bytes = await response.body()
  expect(bytes.byteLength).toBeGreaterThan(0)
  expect(bytes.byteLength).toBeLessThanOrEqual(150_000)
})

test('desktop skip reaches visible entrance and keyboard enters the tour', async ({ page }) => {
  await openMuseum(page)
  const content = page.locator(webglFallback ? '#exhibit-content' : '#entrance-content')
  await expectInitialContent(page)
  await skip(page)
  await expect(content).toBeFocused()
  await page.keyboard.press('Tab')
  const enterTour = webglFallback
    ? page.getByRole('navigation', { name: 'Exhibition navigation', exact: true }).getByRole('button', { name: 'Next →' })
    : page.getByRole('button', { name: 'Enter the exhibition' })
  await expect(enterTour).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByText('2 / 5', { exact: true })).toBeVisible()
})

test('dialog keeps focus through camera arrival and returns to its opener', async ({ page }) => {
  await openMuseum(page)
  await expectInitialContent(page)
  await next(page)
  if (!webglFallback) await expect(page.getByText('Moving…', { exact: true })).toBeVisible()
  const opener = page.getByRole('button', { name: 'Selected work ↗' })
  await opener.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  const firstLink = page.getByRole('dialog').getByRole('link').first()
  await expect(firstLink).toBeFocused()
  // Camera arrival rerenders App while the dialog remains open.
  await expect(page.locator('.museum-footer')).toContainText('2 / 5')
  await expect(firstLink).toBeFocused()
  await page.getByRole('button', { name: 'Close', exact: true }).focus()
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByRole('dialog').getByRole('link').last()).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(opener).toBeFocused()
})

for (const mobile of [false, true]) {
  test(`${mobile ? 'mobile' : 'desktop'} route, controls, reset lock, and overflow`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    if (mobile) await page.setViewportSize({ width: 390, height: 844 })
    await openMuseum(page)
    if (webglFallback) await expect(page.getByText('3D view unavailable', { exact: true })).toBeVisible()
    else await expect(page.locator('canvas')).toBeVisible()
    if (mobile) {
      await skip(page)
      await expect(page.locator('#exhibit-content')).toBeFocused()
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    }
    await next(page)
    await page.getByRole('button', { name: 'Collaboration', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Collaboration', exact: true })).toHaveAttribute('aria-pressed', 'true')
    await next(page)
    await page.getByLabel('Position', { exact: true }).fill('0.5')
    await expect(page.getByLabel('Position', { exact: true })).toHaveValue('0.5')
    await next(page)
    await page.getByRole('slider', { name: 'Gravity', exact: true }).fill('10')
    await expect(page.getByRole('slider', { name: 'Gravity', exact: true })).toHaveValue('10')
    await next(page)
    await expect(page.getByText('5 / 5', { exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'EXPLORE MY WORK →' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.keyboard.press('Escape')
    await page.getByRole('link', { name: /^JAMES LANE/ }).click()
    const nextButton = page.getByRole('navigation', { name: 'Exhibition navigation', exact: true }).getByRole('button', { name: 'Next →' })
    if (webglFallback) await expect(nextButton).toBeEnabled()
    else await expect(nextButton).toBeDisabled()
    await expect(page.getByText('1 / 5', { exact: true })).toBeVisible()
    expect(errors).toEqual([])
  })

  test(`${mobile ? 'mobile' : 'desktop'} WebGL failure retains skip and complete navigation`, async ({ page }) => {
    if (mobile) await page.setViewportSize({ width: 390, height: 844 })
    await openMuseum(page, '/?forceWebglFailure=1')
    await expect(page.getByText('3D view unavailable', { exact: true })).toBeVisible()
    await skip(page)
    await expect(page.locator('#exhibit-content')).toBeFocused()
    for (let index = 0; index < 4; index++) await next(page)
    await expect(page.getByText('5 / 5', { exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'View work ↗' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await page.getByRole('navigation', { name: 'Exhibition navigation', exact: true }).getByRole('button', { name: '← Previous' }).click()
    await expect(page.getByText('4 / 5', { exact: true })).toBeVisible()
  })
}

for (const preference of ['toggle', 'os'] as const) {
  test(`${preference} reduced motion covers UI and route`, async ({ page }) => {
    if (preference === 'os') await page.emulateMedia({ reducedMotion: 'reduce' })
    await openMuseum(page)
    await expectInitialContent(page)
    if (preference === 'toggle') await page.getByRole('button', { name: 'Pause motion' }).click()
    await expect(page.locator('main')).toHaveClass(/museum-app--reduced-motion/)
    await next(page)
    await expect(page.getByText('2 / 5', { exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Selected work ↗' }).click()
    await expect(page.getByRole('dialog')).toHaveCSS('transform', 'none')
    expect(await page.locator('.header-work').evaluate(el => parseFloat(getComputedStyle(el).transitionDuration))).toBeLessThan(.001)
  })
}
