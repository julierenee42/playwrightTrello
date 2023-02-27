import { expect, Locator, Page } from "@playwright/test";

export class CardDetails {
  // Playwright built-ins
  private page: Page;

  // Dialog
  private cardDetailsDialog: Locator;

  // Inputs
  private descriptionInput: Locator;

  // Text fields
  private descriptionText: Locator;

  // Buttons
  private saveButton: Locator;
  private closeDetailsButton: Locator;
  private archiveButton: Locator;
  private deleteButton: Locator;
  private confirmDeleteButton: Locator;

  constructor(page: Page) {
    // Playwright built-ins
    this.page = page;

    // Dialog
    this.cardDetailsDialog = page.locator('.card-detail-window');

    // Inputs
    this.descriptionInput = page.getByRole("textbox", { name: 'Main content area, start typing to enter text.' });

    // Text fields
    this.descriptionText = page.locator('div.description-content').getByRole('paragraph');

    // Buttons
    this.saveButton = page.getByRole('button', { name: 'Save' }).first();
    this.closeDetailsButton = page.getByRole('button', { name: 'Close dialog' });
    this.archiveButton = page.getByRole('link', { name: 'Archive' });
    this.deleteButton = page.getByRole('link', { name: 'Delete' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Delete' });
  }

  /**
   * Parameterized locators
   */

  /**
   * Get the locator for the description field with the expected text
   * @param descriptionText The expected description text
   * @returns
   */
  private getDescriptionWithText(descriptionText: string) {
    return this.descriptionText.filter({ hasText: descriptionText });
  }

  /**
   * Class methods
   */

  /**
   * Enter text in the description field
   * @param descriptionText Text to enter in description field
   */
  async fillDescriptionField(descriptionText: string) {
    await this.descriptionInput.fill(descriptionText);
  }

  /**
   * Click the "Save" button
   */
  async clickSaveButton() {
    await this.saveButton.click();
  }

  /**
   * Assert the description field has the expected text
   * @param descriptionText Expected text in description field
   */
  async assertDescriptionFieldText(descriptionText: string) {
    let descriptionField = this.getDescriptionWithText(descriptionText);
    await expect(descriptionField).toBeVisible();
  }

  /**
   * Click the X on the card details dialog to close it
   */
  async closeDetails() {
    await this.closeDetailsButton.click();
    await this.cardDetailsDialog.waitFor({ state: "hidden" });
  }

  /**
   * Check if the card details dialog is open
   * @returns boolean
   */
  async isCardDetailsDialogOpen() {
    return await this.cardDetailsDialog.isVisible();
  }

  /**
   * Click the "Archive" button
   */
  async archiveCard() {
    await this.archiveButton.click();
  }

  /**
   * Click the "Delete" button, then click the "Delete" button that shows up in the "Delete card?" dialog
   */
  async deleteCard() {
    await this.deleteButton.click();
    await this.confirmDeleteButton.click();
  }
}