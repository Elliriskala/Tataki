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
  expect(screenshot).toMatchSnapshot('screenshot.png');
});


test('Use information that requires a login', async ({ page }) => {
  await page.goto('http://localhost:3000/reservation.html');
  await page.click('text=Use saved information');
  await expect(page.getByTestId('reservation-email')).toBeVisible();
  const emailValue = await page.getByTestId('reservation-email').inputValue();
  await expect(emailValue).toBe('testikayttaja@metropolia.fi');
});

test('navigating works for mobile', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 400, height: 800 }, // Mobile dimensions
  });
  const page = await context.newPage(); // Create a new page within the context
  const button = page.getByTestId('hamburger');
  await expect(button).toBeVisible();
  await button.click();
  await page.click('text=Reserve a table');
  await expect(page).toHaveURL('http://localhost:3000/reservation.html');
  await expect(button).toBeVisible();
  await button.click();
  await page.click('text=Home Page');
  await expect(page).toHaveURL('http://localhost:3000/index.html');
});

test('screenshot capture for mobile', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 400, height: 800 }, // Mobile dimensions
  });

  const page = await context.newPage(); // Create a new page within the context
  await page.goto('http://localhost:3000/contact.html');

  // Capture and compare the screenshot
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot('mobile-screenshot.png'); // Save snapshot as 'mobile-screenshot.png'

  await context.close(); // Close the context after test
});


test('Use information that requires a login for mobile', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 400, height: 800 }, // Mobile dimensions
  });
  const page = await context.newPage(); // Create a new page within the context
  await page.goto('http://localhost:3000/reservation.html');
  await page.click('text=Use saved information');
  await expect(page.getByTestId('reservation-email')).toBeVisible();
  const emailValue = await page.getByTestId('reservation-email').inputValue();
  await expect(emailValue).toBe('testikayttaja@metropolia.fi');
});



  






// TestiSalasana123 testikayttaja testikayttaja@metropolia.fi