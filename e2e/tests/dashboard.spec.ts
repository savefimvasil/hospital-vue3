import { expect, Locator, Page } from '@playwright/test'
import { test } from "@e2e/playwright-fixture-extention";
import { HomePage as HomePageType } from '@e2e/pages/home-page/home-page'

export const dashboardSelector = {
  dashboardCards: '[data-test="dashboard-cards"]',
  cardComponent: '[data-test="card-component"]',
  sliderComponent: '[data-test="card-component-assignment"]',
}

class DashboardElements {
  dashboardCards: Locator
  cardComponent: Locator
  sliderComponent: Locator

  constructor(page: HomePageType) {
    this.dashboardCards = page.page.locator(dashboardSelector.dashboardCards)
    this.cardComponent = page.page.locator(dashboardSelector.cardComponent)
    this.sliderComponent = page.page.locator(dashboardSelector.sliderComponent)
  }
}

test.describe("Dashboard test", () => {
  test.only('Dashboard', async ({ HomePage, page }: { page: Page, HomePage: HomePageType }) => {
    await page.goto('/')

    // call constructor with global elements
    const elements = new DashboardElements(HomePage)

    // do user have one or multiple role
    const userHasMultipleRole = await elements.dashboardCards.getAttribute('class') === 'dashboard-cards-8'

    // is cards visible
    await expect(elements.dashboardCards).toBeVisible()
    // is dashboard with 6 cards
    await expect(elements.cardComponent).toHaveCount(6)

    if (userHasMultipleRole) {
      // with multiple role we need to have 2 sliders
      await expect(elements.sliderComponent).toHaveCount(2)
    } else {
      // with multiple role we need to have 1 slider
      await expect(elements.sliderComponent).toHaveCount(1)
    }

    // check cards
    await HomePage.checkDashboardCards()
  })
});
