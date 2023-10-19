import { expect, Locator, Page } from '@playwright/test'

export const assignmentCardSelectors = {
  discoverCardDetails: '[data-test="discover-card-details"]',
  discoverCardDetailsFilters: '[data-test="app-filters"]',
}

class AssignmentCardElements {
  discoverCardDetails: Locator
  discoverCardDetailsFilters: Locator

  constructor(page: Page) {
    this.discoverCardDetails = page.locator(assignmentCardSelectors.discoverCardDetails)
    this.discoverCardDetailsFilters = page.locator(assignmentCardSelectors.discoverCardDetailsFilters)
  }
}

export class AssignmentCardOverlay {
  page: Page
  elements: AssignmentCardElements

  constructor(page: Page) {
    this.page = page
    this.elements = new AssignmentCardElements(this.page)
  }

  async checkAssignmentCarOverlay () {
    await expect(this.elements.discoverCardDetails).toBeVisible()
    const button = this.elements.discoverCardDetailsFilters.locator('button')
    await expect(button).toHaveCount(2)

    const buttonsCount = await button.count();

    for (let index= 0; index < buttonsCount ; index++) {
      const element = button.nth(index);

      await element.click()
    }
  }
}
