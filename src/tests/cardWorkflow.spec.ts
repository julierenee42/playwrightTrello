import { Locator } from "@playwright/test";
import { test } from "../utilities/fixtures";

let destinationList: Locator;
let titleOfCard = "Card to test in Playwright";

test('Card workflow', async ({ kanbanBoard, cardDetails }) => {
  // Add a card to the list "To Do"
  let startingList: Locator;
  startingList = kanbanBoard.getListWithName("To Do");
  await kanbanBoard.clickAddACardInList(startingList);
  await kanbanBoard.enterTitleForNewCard(titleOfCard);
  await kanbanBoard.clickAddCardButton();

  // Assert card was created
  await kanbanBoard.assertCardExistsInList(startingList, titleOfCard);

  // Open card
  let card = kanbanBoard.getCardInList(startingList, titleOfCard);
  await kanbanBoard.openCard(card);

  // Add card details
  let textInDescriptionField = "Text in the description field. Added by Playwright.";
  await cardDetails.fillDescriptionField(textInDescriptionField);
  await cardDetails.clickSaveButton();

  // Assert the card details were added
  await cardDetails.assertDescriptionFieldText(textInDescriptionField);

  // Close card details
  await cardDetails.closeDetails();

  // Drag card to the "Done" column
  destinationList = kanbanBoard.getListWithName("Done");
  await kanbanBoard.dragCardToList(card, destinationList);

  // Assert card is in the "Done" column
  await kanbanBoard.assertCardExistsInList(destinationList, titleOfCard);
});

// Delete the card that was created in the test
test.afterEach(async ({ kanbanBoard, cardDetails } ) => {
  // Open card
  let card = kanbanBoard.getCardInList(destinationList, titleOfCard);
  await kanbanBoard.openCard(card);

  // Archive card
  await cardDetails.archiveCard();

  // Delete card
  await cardDetails.deleteCard();

  // Assert the card doesn't exist
  await kanbanBoard.assertCardDoesNotExistInList(destinationList, titleOfCard);
});