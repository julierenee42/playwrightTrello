import { expect, Locator, Page } from "@playwright/test";

export class KanbanBoard {
  // Playwright built-in
  private page: Page;

  // Lists
  private allLists: Locator;

  // Inputs
  private titleForNewCardInput: Locator;

  // Buttons
  private addCardButton: Locator

  constructor(page: Page) {
    // Playwright built-in
    this.page = page;

    // Lists
    this.allLists = page.locator('.list');
    this.titleForNewCardInput = page.getByPlaceholder('Enter a title for this card…');

    // Buttons
    this.addCardButton = page.getByRole('button', { name: 'Add card' });
  }

  /**
   * Parameterized locators
   */

  /**
   * Get the locator of the list on the board with the specified name
   * @param name Name of list
   * @returns The locator of the list with the specified name
   */
  getListWithName(name: string) {
    return this.allLists.filter({ has: this.page.locator('h2').getByText(name) });
  }

  /**
   * Get the locator for all of the cards in the list
   * @param list The locator for the parent list
   * @returns The locator for all of the cards in the list
   */
  getCardsInList(list: Locator) {
    return list.locator('.list-card');
  }

  /**
   * Get the locator for the card with the expected text in the specified list
   * @param list The locator for the parent list
   * @param text The expected text on the card
   * @returns The locator for the card with the expected text
   */
  getCardInList(list: Locator, text: string) {
    return this.getCardsInList(list).filter({ hasText: text });
  }

  /**
   * Get the locator for the "Get a card" button in the specified list
   * @param list The locator for the parent list
   * @returns Returns the locator for the "Add a card" button
   */
  getAddACardButton(list: Locator) {
    return list.locator('.open-card-composer');
  }

  /**
   * Class methods
   */

  /**
   * Assert that the board has the expected number of lists
   * @param count Number of lists expected
   */
  async assertListCount(count: number) {
    await expect(this.allLists).toHaveCount(count);
  }

  /**
   * Assert a list with the specified name exists on the board
   * @param name Name of list on board
   */
  async assertListExists(name: string) {
    let list = this.getListWithName(name);
    await expect(list).toBeVisible();
  }

  /**
   * Assert the specified list has the expected number of cards
   * @param list Locator for list on board
   * @param count Expected number of cards
   */
  async assertCardCountInList(list: Locator, count: number) {
    let cards = this.getCardsInList(list);
    await expect(cards).toHaveCount(count)
  }

  /**
   * Assert the list has a card with the specified text
   * @param list Locator for list on board
   * @param text Expected text on card
   */
  async assertCardExistsInList(list: Locator, text: string) {
    let card = this.getCardInList(list, text);
    await expect(card).toBeVisible();
  }

  /**
   * Assert the list does not have a card with the specified text
   * @param list Locator for list on board
   * @param text Expected text on card
   */
  async assertCardDoesNotExistInList(list: Locator, text: string) {
    let card = this.getCardInList(list, text);
    await expect(card).not.toBeVisible();
  }

  /**
   * Click "Add a card" in the specified list
   * @param list Locator for list on board
   */
  async clickAddACardInList(list: Locator) {
    let addACardButton = this.getAddACardButton(list);
    await addACardButton.click();
  }

  /**
   * Enter a title for the card to be created
   * @param titleOfCard Name to give to card
   */
  async enterTitleForNewCard(titleOfCard: string) {
    await this.titleForNewCardInput.fill(titleOfCard);
  }

  /**
   * Click "Add card" button
   */
  async clickAddCardButton() {
    await this.addCardButton.click();
  }

  /**
   * Open the specified card
   * @param card Locator for the card to open
   */
  async openCard(card: Locator) {
    await card.click();
  }

  /**
   * Drag the specified card to the designated list
   * @param card Card to be dragged
   * @param destinationList List to drag card to
   */
  async dragCardToList(card: Locator, destinationList: Locator) {
    await card.dragTo(destinationList);
  }
}