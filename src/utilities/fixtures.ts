import { test as base } from '@playwright/test';
import { Login } from "../pages/login";
import { Boards } from '../pages/boards';
import { KanbanBoard } from '../pages/kanbanBoard';

// Declare fixture types
export type fixtures = {
  loginPage: Login;
  boards: Boards;
  kanbanBoard: KanbanBoard;
}

// Extend base test method by providing fixtures
export const test = base.extend<fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new Login(page));
  },

  boards: async ({ page }, use) => {
    await use(new Boards(page));
  },

  kanbanBoard: async ({ page }, use) => {
    // Navigate to login page
    await page.goto('https://trello.com/login');

    // Enter the automation user's email address and click Continue
    let loginPage = new Login(page);
    await loginPage.fillEmailAddressWithAutomationUser();
    await loginPage.clickContinueButton();

    // Enter the automation user's password and click Login
    await loginPage.fillPasswordWithAutomationPassword();
    await loginPage.clickLoginButton();

    // Wait for page to redirect and load
    await page.waitForNavigation({ url: /trello.com/ });
    let boards = new Boards(page);
    await boards.waitForBoardsPageToLoad();

    // Expect to see section titled "YOUR WORKSPACE" with a workspace named "Playwright"
    await boards.assertYourWorkspacesHeaderVisible()
    await boards.assertWorkspaceNameVisible();

    // Open the kanban board to be used by the tests
    await boards.openBoard();

    await use(new KanbanBoard(page));
  },
});