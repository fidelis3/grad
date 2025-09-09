import { test, expect, Page } from '@playwright/test'; // Typed import

test.describe('Doctor Flow E2E', () => {
  test('signup and login flow', async ({ page }: { page: Page }) => { // Typed page
    await page.goto('http://localhost:3000/auth/doctor-signup', {
      waitUntil: 'networkidle',
    });
    await expect(page).toHaveTitle(/Doctor Signup/); // Safe

    // Signup
    await page.fill('input[name="fullName"]', 'Dr Test'); // Safe with type
    await page.fill('input[name="emailAddress"]', 'test@example.com');
    await page.selectOption('select[name="specialty"]', 'General');
    await page.fill('input[name="licenseNumber"]', 'LIC123');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');
    await page.click('button:has-text("Create Doctor Account")');

    await expect(page).toHaveURL(/dashboard/);
  });

  test('dashboard to appointments navigation', async ({ page }: { page: Page }) => {
    await page.goto('http://localhost:3000/doctor/dashboard', { waitUntil: 'networkidle' });
    await page.click('text=Appointments');
    await expect(page).toHaveURL(/appointments/);
  });

  test('AI assistant interaction', async ({ page }: { page: Page }) => {
    await page.goto('http://localhost:3000/doctor/ai-assistant', { waitUntil: 'networkidle' });
    await page.fill('input[placeholder*="symptoms"]', 'headache');
    await page.click('button:has-text("Start Assessment")');
    await expect(page.locator('text=AI analysis')).toBeVisible();
  });
});