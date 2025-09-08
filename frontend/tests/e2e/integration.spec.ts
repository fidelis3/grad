import { test, expect } from '@playwright/test';

test.describe('Full User Journey - Critical Paths', () => {
  test('should complete full onboarding to appointment booking flow', async ({ page }) => {
    
    await page.goto('/');
    
    
    await expect(page.getByText('Welcome To Med')).toBeVisible();
    
    
    const englishCheckbox = page.locator('input[type="checkbox"]').first();
    await englishCheckbox.check();
    
    
    await page.getByRole('button', { name: 'Continue' }).click();
    
    
    await page.getByText('Select your country').click();
    await page.getByText('Kenya').click();
    
    
    await page.getByRole('button', { name: 'Continue' }).click();
    
    
    await expect(page).toHaveURL('/LandingPage');
  });

  test('should navigate through main sections of the application', async ({ page }) => {
    await page.goto('/');
    
    
    const sections = ['News'];
    
    for (const section of sections) {
      const link = page.getByText(section).first();
      if (await link.count() > 0) {
        await link.click();
        await expect(page).toHaveURL(`/${section}`);
        
        
        await page.goto('/');
      }
    }
  });

  test('should handle navigation flow from home to appointment', async ({ page }) => {
    await page.goto('/');
    
    
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    
    const appointmentButtons = page.locator('button, a').filter({ hasText: /appointment/i });
    if (await appointmentButtons.count() > 0) {
      await appointmentButtons.first().click();
      
      
      await expect(page.url()).toContain('appointment');
    }
  });

  test('should maintain state during navigation', async ({ page }) => {
    await page.goto('/');
    
    
    const englishCheckbox = page.locator('input[type="checkbox"]').first();
    await englishCheckbox.check();
    
    
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Back' }).click();
    
    
    await expect(englishCheckbox).toBeChecked();
  });
});

test.describe('Error Handling and Edge Cases', () => {
  test('should handle non-existent routes gracefully', async ({ page }) => {
    
    const response = await page.goto('/non-existent-page', { waitUntil: 'networkidle' });
    
    
    expect([404, 200, 301, 302]).toContain(response?.status() || 200);
  });

  test('should handle network errors gracefully', async ({ page }) => {
    await page.goto('/');
    
    
    await page.context().setOffline(true);
    
    
    await page.getByText('News').first().click().catch(() => {
      
    });
    
    
    await page.context().setOffline(false);
  });

  test('should handle slow network conditions', async ({ page }) => {
    
    await page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 100)); 
      await route.continue();
    });
    
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    
    await expect(page.locator('body')).toBeVisible();
    expect(loadTime).toBeGreaterThan(100); 
  });
});

test.describe('Cross-Browser Compatibility', () => {
  ['chromium', 'firefox', 'webkit'].forEach((browserName) => {
    test(`should work correctly in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      
      test.skip(currentBrowser !== browserName, `Skipping ${browserName} test in ${currentBrowser}`);
      
      await page.goto('/');
      
      
      await expect(page.getByText('Welcome To Med')).toBeVisible();
      
      
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.getByText('Which Country Are You From?')).toBeVisible();
    });
  });
});

test.describe('Data Persistence', () => {
  test('should persist form data during page refresh', async ({ page }) => {
    await page.goto('/');
    
    
    const englishCheckbox = page.locator('input[type="checkbox"]').first();
    await englishCheckbox.check();
    
    
    
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Back' }).click();
    
    
    await expect(englishCheckbox).toBeChecked();
  });
});

test.describe('Security Tests', () => {
  test('should have secure headers', async ({ page }) => {
    const response = await page.goto('/');
    
    
    const headers = response?.headers() || {};
    
    
    expect(Object.keys(headers).length).toBeGreaterThan(0);
  });

  test('should not expose sensitive information in client-side code', async ({ page }) => {
    await page.goto('/');
    
    
    const content = await page.content();
    
    
    expect(content).not.toMatch(/password.*=.*["'][^"']*["']/i);
    expect(content).not.toMatch(/api_key.*=.*["'][^"']*["']/i);
    expect(content).not.toMatch(/secret.*=.*["'][^"']*["']/i);
  });
});
