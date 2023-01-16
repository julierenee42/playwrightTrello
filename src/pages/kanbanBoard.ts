import { expect, Locator, Page } from "@playwright/test";

export class KanbanBoard {
  // Playwright built-in
  private page: Page;

  // Lists
  private allLists: Locator;

  constructor(page: Page) {
    // Playwright built-in
    this.page = page;

    // Lists
    this.allLists = page.locator('.list');
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
   * Assertion methods
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
}