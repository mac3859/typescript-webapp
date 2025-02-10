import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Logout', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5174');
        await page.getByLabel('Email').fill('david2@test.com');
        await page.getByLabel('Password').fill('123qwe');
        await page.getByRole('button', { name: 'Sign In' }).click();
    
        await expect(page).toHaveURL('http://localhost:5174/dashboard');
});

    test('should display logout button', async ({ page }) => {
        await percySnapshot(page, 'Dashboard with Logout Button');
        const logoutButton = page.getByRole('button', { name: 'Logout'})
        await expect(logoutButton).toBeVisible();

        await logoutButton.click();
        await percySnapshot(page, 'After Logout');
    });
});