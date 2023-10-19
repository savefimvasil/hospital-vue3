import { BaseFragment } from '@e2e/framework/page-base/base-fragment'
import { expect, Locator, Page } from '@playwright/test'

export const headerSelectors = {
    appNavigation: '[data-test="app-navigation"]',
    appNavigationLink: '[data-test="app-navigation-link"]',
}

class HeaderElements {
    appNavigation: Locator
    appNavigationLink: Locator

    constructor(page: Page) {
        this.appNavigation = page.locator(headerSelectors.appNavigation)
        this.appNavigationLink = page.locator(headerSelectors.appNavigationLink)
    }
}

export class HeaderFragment extends BaseFragment {
    elements: HeaderElements

    constructor(page: Page) {
        super(page);

        this.elements = new HeaderElements(this.page)
    }

    async validateHeaderClickable(returnUrl: string) {
        await expect(this.elements.appNavigation).toBeVisible()

        const headerLinksCount = await this.elements.appNavigationLink.count();

        for (let index= 0; index < headerLinksCount ; index++) {
            // check every card
            const element = this.elements.appNavigationLink.nth(index).locator('a');

            await element.click()

            await this.page.goto(returnUrl)
        }
    }
}
