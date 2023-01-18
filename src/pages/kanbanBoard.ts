import { expect, Locator, Page } from "@playwright/test";
// import { delay } from "../utilities/utilities";

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
    this.allLists = page.locator('div.list');
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
  private getListWithName(name: string) {
    return this.allLists.filter({ has: this.page.locator('h2').getByText(name) });
  }

  /**
   * Get the locator for all of the cards in the list
   * @param listName The name of the parent list
   * @returns The locator for all of the cards in the list
   */
  private getCardsInList(listName: string) {
    let list = this.getListWithName(listName);
    return list.locator('.list-card');
  }

  /**
   * Get the locator for the card with the expected text in the specified list
   * @param listName The name of the the parent list
   * @param cardText The expected text on the card
   * @returns The locator for the card with the expected text
   */
  private getCardInList(listName: string, cardText: string) {
    return this.getCardsInList(listName).filter({ hasText: cardText });
  }

  /**
   * Get the locator of the card with the specified text. This method does not
   * get the card based on the list it is in
   * @param cardText Text on card
   * @returns The locator for the card with the specified text
   */
  private getCardOnBoard(cardText: string) {
    return this.page.getByRole('link', { name: cardText });
  }

  /**
   * Get the locator for the "Get a card" button in the specified list
   * @param listName The name of the list
   * @returns Returns the locator for the "Add a card" button
   */
  private getAddACardButton(listName: string) {
    let list = this.getListWithName(listName);
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
   * @param listName The name of the list
   * @param count Expected number of cards
   */
  async assertCardCountInList(listName: string, count: number) {
    let cards = this.getCardsInList(listName);
    await expect(cards).toHaveCount(count)
  }

  /**
   * Assert the card with the specified text is in the list
   * @param listName The name of the list
   * @param cardText The text on the card
   */
  async assertCardExistsInList(listName: string, cardText: string) {
    let card = this.getCardInList(listName, cardText);
    await expect(card).toBeVisible();
  }

  /**
   * Assert the card with the specified text is not in the list
   * @param listName The name of the list
   * @param cardText The text on the card
   */
  async assertCardDoesNotExistInList(listName: string, cardText: string) {
    let card = this.getCardInList(listName, cardText);
    await expect(card).not.toBeVisible();
  }

  /**
   * Assert the card with the specified text is not on the board
   * @param cardText The text on the card
   */
  async assertCardDoesNotExistOnBoard(cardText: string) {
    let card = this.getCardOnBoard(cardText);
    await expect(card).not.toBeVisible();
  }

  /**
   * Click "Add a card" in the specified list
   * @param listName Name of list
   */
  async clickAddACardInList(listName: string) {
    let addACardButton = this.getAddACardButton(listName);
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
   * Open card with the specified text
   * @param cardText Text on the card to open
   */
  async openCard(cardText: string) {
    let card = this.getCardOnBoard(cardText);
    await card.click();
  }

  /**
   * Drag the specified card to the designated list
   * @param card Text on card to be dragged
   * @param destinationListName Name of list to drag card to
   */
  async dragCardToList(cardText: string, destinationListName: string) {
    let card = this.getCardOnBoard(cardText);
    let list = this.getListWithName(destinationListName);
    await card.dragTo(list);
  }
}