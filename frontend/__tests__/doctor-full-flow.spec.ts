import { test, expect } from '@playwright/test';

test.describe('Doctor Full Flow', () => {
  test('Signup, login, dashboard, appointments, AI', async ({ page }) => {
    // Signup
    await page.goto('http://localhost:3000/auth/doctor-signup');
    await page.fill('input[name="fullName"]', 'Dr Test');
    // ... fill all, submit
    await expect(page).toHaveURL(/dashboard/);

    // Login 
    // Navigate to appointments
    await page.click('text=Appointments');
    await expect(page.locator('h1')).toContainText('Appointments');

    // AI
    await page.click('text=AI Assistant');
    await page.fill('input[placeholder="Describe symptoms..."]', 'headache');
    await page.click('button:has-text("Start Assessment")');
    await expect(page.locator('.bg-blue-50')).toBeVisible(); // Response

    // Report (from appointments list)
    await page.click('button:has-text("View Report")');
    await expect(page.locator('table')).toBeVisible();
  });
});