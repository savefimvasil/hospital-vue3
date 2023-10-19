import { expect, Locator, Page } from '@playwright/test'
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";
import { AssignmentCardOverlay } from '@e2e/pages/home-page/fragments/assignment-card-overlay'
import { StaticCardOverlay } from '@e2e/pages/home-page/fragments/static-card-overlay'

const checkCardsSelectors = {
    cardComponent: '[data-test="card-component"]',
    appCardDetails: '[data-test="app-card-details"]',
    appCardDetailsClose: '[data-test="app-card-details-close"]',
}

class CheckDashboardCardsElements {
    cardComponent: Locator
    appCardDetails: Locator
    appCardDetailsClose: Locator

    constructor(page: Page) {
        this.cardComponent = page.locator(checkCardsSelectors.cardComponent)
        this.appCardDetails = page.locator(checkCardsSelectors.appCardDetails)
        this.appCardDetailsClose = page.locator(checkCardsSelectors.appCardDetailsClose)
    }
}

export class HomePage extends PageWithHeaderAndFooter {
    elements: CheckDashboardCardsElements
    constructor(page: Page) {
        super(page);

        this.elements = new CheckDashboardCardsElements(this.page)
    }

    async checkDashboardCards() {
        // get count of cards
        const cardComponentCount = await this.elements.cardComponent.count();

        // iterate by all cards
        for (let index= 0; index < cardComponentCount ; index++) {
            // check every card
            const element = this.elements.cardComponent.nth(index);
            const elClass = await element.getAttribute('class');

            if (elClass && !elClass.includes('info')) {
                // all logic for elements with overlay
                await element.click()
                await this.page.waitForTimeout(1000)

                // find app card details overlay
                const appCardDetails = this.page.locator(checkCardsSelectors.appCardDetails)
                await expect(appCardDetails).toBeVisible()

                // check card logic
                const divInsideCard = element.locator('> div')
                if (await divInsideCard.getAttribute('class') === 'assignment-card') {
                    const assignmentCardOverlay = new AssignmentCardOverlay(this.page)

                    await assignmentCardOverlay.checkAssignmentCarOverlay()
                } else {
                    const staticCardOverlay = new StaticCardOverlay(this.page)

                    await staticCardOverlay.checkStaticCardOverlay()
                }

                // close overlay
                await this.page.locator(checkCardsSelectors.appCardDetailsClose).click()
                await this.page.waitForTimeout(1000)
            }
        }
    }
}
