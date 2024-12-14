import { test, expect } from '@playwright/test';

const url = 'https://onlinelibrary.wiley.com/'

const title = 'Wiley Online Library | Scientific research articles, journals, books, and reference works'

test.beforeEach( async({ page }) => {
    await page.goto(url)
    expect(page).toHaveTitle(title)
})


test.describe('Footer test', () => {
    test('Verify footer links' , async({ page }) => {
    
        const footerSec = await page.locator('.main-footer')
    
        await expect(footerSec).toBeVisible()
    
        const footerLinks = footerSec.locator('a')
        const linkCount = await footerLinks.count()
    
        for(let i = 0; i < linkCount; i++) {
            const link = footerLinks.nth(i)
    
            await expect(link).toBeVisible();
    
            //const linkText = await link.textContent()
            const href = await link.getAttribute('href')
    
            expect(href).not.toBeNull()
            expect(href).not.toBe('')
    
            await expect(link).toHaveAttribute('href', href)
        }
    })
    
    
    test('Test invalid or broken link' , async({ page }) => {
        const footerSec = page.locator('.main-footer')
        await page.waitForSelector('.main-footer')
        await expect(footerSec).toBeVisible()
    
        const footerLinks = footerSec.locator('a')
        const linkCount = await footerLinks.count()
    
        for(let i = 0; i < linkCount; i++) {
            const link = footerLinks.nth(i)
    
            if(!await link.isVisible()) {
                continue
            }
    
            const href = await link.getAttribute('href')
    
            const response = await page.goto(`${href}/test`)
    
            if(response) {
                expect(response.status()).not.toBe(200)
            } else {
                expect(response).not.toBeNull()
            }
            
        }
    })
})
