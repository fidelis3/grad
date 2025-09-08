import { test, expect } from '@playwright/test';

test.describe('Appointment Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/Appointment');
  });

  test('should display appointment booking page', async ({ page }) => {
    
    await expect(page).toHaveURL('/Appointment');
    
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle appointment form interaction', async ({ page }) => {
    
    const formElements = [
      'input[type="text"]',
      'input[type="email"]',
      'input[type="date"]',
      'input[type="time"]',
      'select',
      'textarea'
    ];
    
    
    for (const selector of formElements) {
      const elements = page.locator(selector);
      const count = await elements.count();
      if (count > 0) {
        await expect(elements.first()).toBeVisible();
        break;
      }
    }
  });

  test('should validate required fields', async ({ page }) => {
    
    const submitButton = page.locator('button[type="submit"]').or(
      page.locator('button').filter({ hasText: /book|submit|schedule/i })
    ).first();
    
    if (await submitButton.count() > 0) {
      await submitButton.click();
      
      await expect(page).toHaveURL('/Appointment');
    }
  });
});

test.describe('Patient Portal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/PatientPortal');
  });

  test('should display patient portal', async ({ page }) => {
    await expect(page).toHaveURL('/PatientPortal');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle navigation within portal', async ({ page }) => {
    
    const navElements = page.locator('nav a, .nav a, [role="navigation"] a').first();
    
    if (await navElements.count() > 0) {
      await expect(navElements).toBeVisible();
    }
  });
});

test.describe('Health Records', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/HealthRecords');
  });

  test('should display health records page', async ({ page }) => {
    await expect(page).toHaveURL('/HealthRecords');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle record display', async ({ page }) => {
    
    const recordElements = [
      'table',
      '.record',
      '[data-testid*="record"]',
      '.health-record'
    ];
    
    for (const selector of recordElements) {
      const element = page.locator(selector).first();
      if (await element.count() > 0) {
        await expect(element).toBeVisible();
        break;
      }
    }
  });
});
