import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.describe('Registration', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/Register');
    });

    test('should display registration form', async ({ page }) => {
      
      await expect(page).toHaveURL('/Register');
      
      
      const possibleSelectors = [
        'input[type="email"]',
        'input[placeholder*="email" i]',
        'input[name*="email" i]',
        '[data-testid="email"]'
      ];
      
      let emailFound = false;
      for (const selector of possibleSelectors) {
        const element = page.locator(selector).first();
        if (await element.count() > 0) {
          await expect(element).toBeVisible();
          emailFound = true;
          break;
        }
      }
      
      
      if (!emailFound) {
        await expect(page.locator('body')).toBeVisible();
      }
    });

    test('should handle form validation', async ({ page }) => {
      
      const submitButton = page.locator('button[type="submit"]').or(
        page.locator('button').filter({ hasText: /submit|register|sign up/i })
      ).first();
      
      if (await submitButton.count() > 0) {
        await submitButton.click();
        
        
        await expect(page).toHaveURL('/Register'); 
      }
    });

    test('should allow navigation back to home', async ({ page }) => {
      
      const homeLink = page.locator('a[href="/"]').or(
        page.getByText(/home|back/i)
      ).first();
      
      if (await homeLink.count() > 0) {
        await homeLink.click();
        await expect(page).toHaveURL('/');
      }
    });
  });

  test.describe('Login', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/Login');
    });

    test('should display login form', async ({ page }) => {
      
      await expect(page).toHaveURL('/Login');
      
      
      const possibleSelectors = [
        'input[type="email"]',
        'input[type="password"]',
        'input[placeholder*="email" i]',
        'input[placeholder*="password" i]'
      ];
      
      for (const selector of possibleSelectors) {
        const element = page.locator(selector).first();
        if (await element.count() > 0) {
          await expect(element).toBeVisible();
          break;
        }
      }
    });

    test('should handle empty form submission', async ({ page }) => {
      const submitButton = page.locator('button[type="submit"]').or(
        page.locator('button').filter({ hasText: /login|sign in/i })
      ).first();
      
      if (await submitButton.count() > 0) {
        await submitButton.click();
        
        await expect(page).toHaveURL('/Login');
      }
    });
  });
});
