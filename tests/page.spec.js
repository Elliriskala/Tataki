import { test, expect, beforeEach } from '@playwright/test';



beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/user.html');
  await page.fill('input[name="login-email"]', 'testikayttaja@metropolia.fi');
  await page.fill('input[name="login-password"]', 'TestiSalasana123');
  await page.click('text=Submit');
  // page has h2 element with text "Welcome testikayttaja"
  await expect(page.getByText('Hi, testikayttaja')).toBeVisible();
  await page.goto('http://localhost:3000/index.html');
});

beforeEach(async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 400, height: 800 }, // Mobile dimensions
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1', // Mobile user-agent
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000/user.html');

  // Fill login form and submit
  await page.fill('input[name="login-email"]', 'testikayttaja@metropolia.fi');
  await page.fill('input[name="login-password"]', 'TestiSalasana123');
  await page.click('text=Submit');

  // Verify login success
  await expect(page.getByText('Hi, testikayttaja')).toBeVisible();

  // Navigate to home page
  await page.goto('http://localhost:3000/index.html');

  // Close the context after setup
  await context.close();
});


test('Navigation works', async ({ page }) => {
  await expect(page).toHaveURL('http://localhost:3000/index.html');

  // Navigoi "pöytävaraus" -sivulle
  await page.click('text=Reserve a table');
  await expect(page).toHaveURL('http://localhost:3000/reservation.html');

  // Navigoi takaisin etusivulle
  await page.click('text=Home Page');
  await expect(page).toHaveURL('http://localhost:3000/index.html');
});


test('screenshot capture' , async ({ page }) => {
  await page.goto('http://localhost:3000/contact.html');
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot('screenshot.png', {threshold: 0.5});
});


test('Use information that requires a login', async ({ page }) => {
  await page.goto('http://localhost:3000/reservation.html');
  await page.click('text=Use saved information');
  await expect(page.getByTestId('reservation-email-input')).toBeVisible();
  const emailValue = page.getByTestId('reservation-email-input');
  await expect(emailValue).toHaveValue('testikayttaja@metropolia.fi');
});

test('navigating works for mobile', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 400, height: 800 }, // Mobile dimensions
  });
  const page = await context.newPage(); // Create a new page within the context

  await page.goto('http://localhost:3000/index.html'); // Ensure the test starts from the home page
  await page.waitForLoadState('domcontentloaded');

  // Wait for and interact with the hamburger button
  const button = page.getByTestId('hamburger-button');
  await page.waitForSelector('[data-testid="hamburger-button"]', { timeout: 20000 });
  await expect(button).toBeVisible();
  await button.click();

  // Navigate to "Reserve a table" and verify the URL
  await page.waitForSelector('text=Reserve a table', { timeout: 5000 });
  await page.click('text=Reserve a table');
  await expect(page).toHaveURL('http://localhost:3000/reservation.html');

  // Navigate back to "Home Page" and verify the URL
  await button.click(); // Reopen the menu
  await page.waitForSelector('text=Home Page', { timeout: 5000 });
  await page.click('text=Home Page');
  await expect(page).toHaveURL('http://localhost:3000/index.html');

  await context.close(); // Clean up the browser context
});


test('screenshot capture for mobile', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 400, height: 800 }, // Mobile dimensions
  });

  const page = await context.newPage(); // Create a new page within the context
  await page.goto('http://localhost:3000/contact.html');

  // Capture and compare the screenshot
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot('mobile-screenshot.png', {threshold: 0.5}); // Save snapshot as 'mobile-screenshot.png'

  await context.close(); // Close the context after test
});


test('Use information that requires a login for mobile', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 400, height: 800 }, // Mobile dimensions
  });
  const page = await context.newPage(); // Create a new page within the context

  await page.goto('http://localhost:3000/reservation.html'); // Ensure the test starts from the reservation page
  await page.waitForLoadState('domcontentloaded');

  // Wait for and click the "Use saved information" button
  const useSavedInfoButton = page.locator('text=Use saved information');
  await page.waitForSelector('text=Use saved information', { timeout: 5000 });
  await expect(useSavedInfoButton).toBeVisible();
  await useSavedInfoButton.click();

  // Wait for and verify the email input field is visible
  const emailInput = page.locator('[data-testid="reservation-email-input"]');
  await page.waitForSelector('[data-testid="reservation-email-input"]', { timeout: 5000 });
  await expect(emailInput).toBeVisible();

  // Check that the email input field contains the expected value
  await expect(emailInput).toHaveValue('testikayttaja@metropolia.fi', { timeout: 20000 });

  await context.close(); // Clean up the browser context
});


// TestiSalasana123 testikayttaja testikayttaja@metropolia.fi