import { test } from '../utilities/fixtures';

test('Enter invalid credentials', async ({ page, loginPage }) => {
  // Navigate to login page
  await page.goto('https://trello.com/login');

  // Enter an email address and click Continue
  await loginPage.fillEmailAddress('test@gmail.com');
  await loginPage.clickContinueButton();

  // Enter an invalid password and click Login
  await loginPage.fillPassword('password');
  await loginPage.clickLoginButton();

  // Assert an error message appears saying the credentials are incorrect
  await loginPage.assertIncorrectPasswordMessage();
});

test('Enter valid credentials', async ({ page, loginPage, boards }) => {
  // Navigate to login page
  await page.goto('https://trello.com/login');

  // Enter the automation user's email address and click Continue
  await loginPage.fillEmailAddressWithAutomationUser();
  await loginPage.clickContinueButton();

  // Enter the automation user's password and click Login
  await loginPage.fillPasswordWithAutomationPassword();
  await loginPage.clickLoginButton();

  // Wait for page to redirect and load
  await page.waitForNavigation({ url: /trello.com/ });
  await boards.waitForBoardsPageToLoad();

  // Expect to see section titled "YOUR WORKSPACE" with a workspace named "Playwright"
  await boards.assertYourWorkspacesHeaderVisible()
  await boards.assertWorkspaceNameVisible();
});