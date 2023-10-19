import { expect, Locator, Page } from '@playwright/test'

export const staticCardSelectors = {
  staticCardDetails: '[data-test="static-card-details"]',
}

class StaticCardElements {
  staticCardDetails: Locator

  constructor(page: Page) {
    this.staticCardDetails = page.locator(staticCardSelectors.staticCardDetails)
  }
}

export class StaticCardOverlay {
  page: Page
  elements: StaticCardElements

  constructor(page: Page) {
    this.page = page
    this.elements = new StaticCardElements(this.page)
  }

  async checkStaticCardOverlay () {
    await expect(this.elements.staticCardDetails).toBeVisible()
  }
}
