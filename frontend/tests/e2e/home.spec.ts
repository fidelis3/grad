import { test, expect } from '@playwright/test';

test.describe('Home Page - Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the welcome message and onboarding content', async ({ page }) => {
    
    await expect(page.getByText('Welcome To Med')).toBeVisible();
    await expect(page.getByText('dical')).toBeVisible();
    
    
    await expect(page.getByText('Choose Your Preferred Language:')).toBeVisible();
    
    
    await expect(page.getByText('English')).toBeVisible();
    await expect(page.getByText('Swahili')).toBeVisible();
    await expect(page.getByText('Amharic')).toBeVisible();
    await expect(page.getByText('French')).toBeVisible();
  });

  test('should allow language selection', async ({ page }) => {
    
    const englishCheckbox = page.locator('input[type="checkbox"]').first();
    await englishCheckbox.check();
    await expect(englishCheckbox).toBeChecked();
    
    
    const swahiliCheckbox = page.locator('text=Swahili').locator('..').locator('input[type="checkbox"]');
    await swahiliCheckbox.check();
    await expect(swahiliCheckbox).toBeChecked();
    
    
    await englishCheckbox.uncheck();
    await expect(englishCheckbox).not.toBeChecked();
  });

  test('should navigate through onboarding slides', async ({ page }) => {
    
    await page.getByRole('button', { name: 'Continue' }).click();
    
    
    await expect(page.getByText('Which Country Are You From?')).toBeVisible();
    await expect(page.getByText('Select your country')).toBeVisible();
    
    
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
  });

 


  test('should navigate back from second slide', async ({ page }) => {
    
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Which Country Are You From?')).toBeVisible();
    
    
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByText('Choose Your Preferred Language:')).toBeVisible();
  });

  test('should complete onboarding and navigate to landing page', async ({ page }) => {
    
    await page.getByRole('button', { name: 'Continue' }).click(); 
    await page.getByRole('button', { name: 'Continue' }).click(); 
    
    
    await expect(page).toHaveURL('/LandingPage');
  });
});

test.describe('Navigation Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display navigation menu items', async ({ page }) => {
    
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.getByText('Services')).toBeVisible();
    await expect(page.getByText('Doctors')).toBeVisible();
    await expect(page.getByText('News')).toBeVisible();
    await expect(page.getByText('Contact')).toBeVisible();
  });

  

  test('should navigate to news page', async ({ page }) => {
    await page.getByText('News').first().click();
    await expect(page).toHaveURL('/News');
  });
});
