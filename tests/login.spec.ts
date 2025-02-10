import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Login functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5174');
  });

  test('should display login form', async ({ page }) => {
    await percySnapshot(page, 'Login Form');
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    await expect(page.getByText('Failed to sign in')).toBeVisible();
    await percySnapshot(page, 'Login Error State');
  });

  test('should redirect to dashboard with valid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('david2@test.com');
    await page.getByLabel('Password').fill('123qwe');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL('http://localhost:5174/dashboard');
    await percySnapshot(page, 'Dashboard After Login');
  });
});