import { test as base } from '@playwright/test';
import { HomePage } from './pages/home-page/home-page';

type Pages = {
    HomePage: HomePage,
}

type EnvironmentVariables = {
    baseUrl: string
    restApiBaseUrl: string
}

export const test = base.extend<Pages & EnvironmentVariables>({
    HomePage: async ({ page}, use) => {
        await use(new HomePage(page));
    },
})

export default test;
export const expect = test.expect;
