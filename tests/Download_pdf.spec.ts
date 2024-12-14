import { test, expect, chromium } from '@playwright/test';

const url = 'https://onlinelibrary.wiley.com/'

const title = 'Wiley Online Library | Scientific research articles, journals, books, and reference works'

test.beforeEach( async({ page }) => {
    /*const browser = await chromium.launch({ headless: false }); // Set headless: false to open a visible browser window
    page = await browser.newPage();*/

    await page.goto(url)
    expect(page).toHaveTitle(title)
})

test('Access free publications', async({ page }) => {

    await page.getByRole('button', { name : 'Computer Science & Information Technology'}).click()
    await page.getByRole('link' , { name : 'Information Science & Technology' }).click()

    expect(page).toHaveURL('https://onlinelibrary.wiley.com/topic/browse/000073')

    //await page.pause(); 

    //Won't excute from here beacuce of human varification
    await page.locator('a:has-text("Cover Image")').click();
    
    await page.getByRole('link', { name : 'PDF'}).click();
    expect(page).toHaveURL('https://asistdl.onlinelibrary.wiley.com/doi/epdf/10.1002/asi.24796')

})

