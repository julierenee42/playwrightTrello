import { expect, Locator, Page } from "@playwright/test";

export class CardDetails {
  // Playwright built-in
  private page: Page;

  // Inputs
  private emptyDescriptionField: Locator;

  // Buttons
  private saveButton: Locator;
  private closeDetailsButton: Locator;
  private archiveButton: Locator;
  private deleteButton: Locator;
  private confirmDeleteButton: Locator;

  // Text elements
  private descriptionFieldText: Locator;

  constructor(page: Page) {
    // Playwright built-in
    this.page = page;

    // Inputs
    this.emptyDescriptionField = page.getByPlaceholder('Add a more detailed description…');

    // Buttons
    this.saveButton = page.getByRole('button', { name: 'Save' }).first();
    this.closeDetailsButton = page.getByRole('button', { name: 'Close dialog' });
    this.archiveButton = page.getByRole('link', { name: 'Archive' });
    this.deleteButton = page.getByRole('link', { name: 'Delete' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Delete' });

    // Text elements
    this.descriptionFieldText = page.locator('div.description-content').getByText('Text in the description field.');
  }

  /**
   * Enter text in the description field
   * @param descriptionText Text to enter in description field
   */
  async fillDescriptionField(descriptionText: string) {
    await this.emptyDescriptionField.fill(descriptionText);
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
    await expect(this.descriptionFieldText).toHaveText(descriptionText);
  }

  /**
   * Click the X on the card details dialog to close it
   */
  async closeDetails() {
    await this.closeDetailsButton.click();
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