import { expect, Locator, Page } from "@playwright/test";

export class Boards {
  // Sections
  private workspacesSection: Locator;

  // Text elements
  private loggedInHeader: Locator;
  private yourWorkspacesHeader: Locator;
  private workspaceName: Locator;

  // Links
  private boardLink: Locator;

  constructor(page: Page) {
    // Sections
    this.workspacesSection = page.locator('div.boards-page-board-section');

    // Text elements
    this.loggedInHeader = page.locator('#logged-in-skeleton-header');
    this.yourWorkspacesHeader = page.getByRole('heading', { name: 'YOUR WORKSPACES' });
    this.workspaceName = this.workspacesSection.getByRole('heading', { name: 'Playwright' });

    // Links
    this.boardLink = this.workspacesSection.getByRole('link', { name: 'Playwright Test Board' });
  }

  /**
   * Wait for the logged in skeleton header to appear and disappear
   */
  async waitForBoardsPageToLoad() {
    await this.loggedInHeader.waitFor({ state: "visible" });
    await this.loggedInHeader.waitFor({ state: "hidden" });
  }

  /**
   * Assert header with text "YOUR WORKSPACES" is visible on the Boards page
   */
  async assertYourWorkspacesHeaderVisible() {
    await expect(this.yourWorkspacesHeader).toBeVisible();
  }

  /**
   * Assert header with Workspace name "Playwright" is visible on the Boards page
   */
  async assertWorkspaceNameVisible() {
    await expect(this.workspaceName).toBeVisible();
  }

  /**
   * Click link to board named "Playwright Test Board"
   */
  async openBoard() {
    await this.boardLink.click();
  }
}