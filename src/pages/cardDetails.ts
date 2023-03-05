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
  private labelsPopoverDialog: Locator;

  // Buttons
  private saveButton: Locator;
  private closeDetailsButton: Locator;
  private labelButton: Locator;
  private labels: Locator;
  private labelsOnCard: Locator;
  private closeLabelsPopoverButton: Locator;
  private archiveButton: Locator;
  private deleteButton: Locator;
  private confirmDeleteButton: Locator;

  constructor(page: Page) {
    // Playwright built-ins
    this.page = page;

    // Dialog
    this.cardDetailsDialog = page.locator('.card-detail-window');
    this.labelsPopoverDialog = page.getByTestId('labels-popover-labels-screen');

    // Inputs
    this.descriptionInput = this.cardDetailsDialog.getByRole("textbox", { name: 'Main content area, start typing to enter text.' });

    // Text fields
    this.descriptionText = this.cardDetailsDialog.locator('div.description-content').getByRole('paragraph');

    // Buttons
    this.saveButton = this.cardDetailsDialog.getByRole('button', { name: 'Save' }).first();
    this.closeDetailsButton = page.getByRole('button', { name: 'Close dialog' });
    this.labelButton = this.cardDetailsDialog.getByRole('link', { name: 'Labels' });
    this.labels = this.labelsPopoverDialog.locator('label');
    this.labelsOnCard = this.cardDetailsDialog.getByTestId('card-back-labels-container').getByTestId('card-label');
    this.closeLabelsPopoverButton = this.labelsPopoverDialog.getByTestId('popover-close');
    this.archiveButton = this.cardDetailsDialog.getByRole('link', { name: 'Archive' });
    this.deleteButton = this.cardDetailsDialog.getByRole('link', { name: 'Delete' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Delete' });
  }

  /**
   * Parameterized locators
   */

  /**
   * Get the locator for the description field with the expected text
   * @param descriptionText The expected description text
   * @returns locator
   */
  private getDescriptionWithText(descriptionText: string) {
    return this.descriptionText.filter({ hasText: descriptionText });
  }

  /**
   * Get the locator for the checkbox next to the specified label
   * @param label Locator for label
   * @returns locator
   */
  private getLabelCheckbox(label: Locator) {
    return label.locator('input[type="checkbox"]');
  }

  /**
   * Class methods
   */

  /**
   * Enter text in the description field
   * @param descriptionText Text to enter in description field
   */
  async fillDescriptionField(descriptionText: string) {
    await this.descriptionInput.click();
    await this.descriptionInput.type(descriptionText);
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

  /**
   * Add a label to the card
   * @param labelText Text describing label
   */
  async addLabelToCard(labelText: string) {
    // Open the Labels popover
    await this.labelButton.click();

    // Select the specified label and assert the checkbox is checked
    let label = this.labels.filter({ has: this.page.getByText(labelText) });
    await label.click();

    let labelCheckboxAttribute = this.getLabelCheckbox(label).getAttribute("aria-checked");
    expect(labelCheckboxAttribute).toBeTruthy();

    // Close the Labels popover
    await this.closeLabelsPopoverButton.click();
  }

  /**
   * Assert there is a label on the card with the expected text and background color
   * @param expectedLabelText Text on label
   * @param expectedColor Color of label
   */
  async assertLabelIsVisibleWithColor(expectedLabelText: string, expectedColor: string) {
    let label = this.labelsOnCard.filter({ hasText: expectedLabelText });
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("background-color", expectedColor);
  }
}