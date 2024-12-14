import { test, expect } from '@playwright/test';

const url = 'https://onlinelibrary.wiley.com/';
const title = 'Wiley Online Library | Scientific research articles, journals, books, and reference works';

test.beforeEach(async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle(title); // Ensure page title matches
});

test('Search for an article', async ({ page }) => {

    await page.getByPlaceholder('Search publications, articles, keywords, etc.').fill('Artificial Intelligence')

    await page.getByRole('button' , { name : 'Search'}).click()

    await expect(page).toHaveURL('https://onlinelibrary.wiley.com/action/doSearch?AllField=Artificial+Intelligence')

    //Won't excute from here beacuce of human varification
    const searchResults = page.locator('.search-results__list .search-result')
    let count = searchResults.count()

    await expect(count).toBeGreaterThanOrEqual(0)



});
