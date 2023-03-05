import { test } from "../utilities/fixtures";
import { generateRandomNumber } from "../utilities/utilities";

let cardText: string;
let startingListName: string = "To Do";
let destinationListName: string = "Done";

test.beforeEach(async ({ kanbanBoard, browserName }) => {
  // Add a card to the list "To Do"
  await kanbanBoard.clickAddACardInList(startingListName);

  let randomNumber = generateRandomNumber();
  cardText = `Card to test in Playwright ${browserName} ${randomNumber}`;
  await kanbanBoard.enterTitleForNewCard(cardText);
  await kanbanBoard.clickAddCardButton();

  // Assert card was created
  await kanbanBoard.assertCardExistsInList(startingListName, cardText);
  console.log(`title of card ${cardText}`);
});

test('Add details to card', async ({ kanbanBoard, cardDetails, browserName }) => {
  // Open card
  await kanbanBoard.openCard(cardText);

  // Add a description to the card
  let textInDescriptionField = "Text in the description field. Added by Playwright.";
  await cardDetails.fillDescriptionField(textInDescriptionField);
  await cardDetails.clickSaveButton();

  // Assert the description was added
  await cardDetails.assertDescriptionFieldText(textInDescriptionField);

  // Close and reopen card to assert the description stays
  await cardDetails.closeDetails();
  await kanbanBoard.openCard(cardText);

  await cardDetails.assertDescriptionFieldText(textInDescriptionField);
});

test(`Drag a card`, async ({ kanbanBoard }) => {
  // Assert card is not in the "Done" column
  await kanbanBoard.assertCardDoesNotExistInList(destinationListName, cardText);

  // Drag card to the "Done" column
  await kanbanBoard.dragCardToList(cardText, destinationListName);

  // Assert card is in the "Done" column
  await kanbanBoard.assertCardDoesNotExistInList(startingListName, cardText);
  await kanbanBoard.assertCardExistsInList(destinationListName, cardText);
});

// Test cleanup
test.afterEach(async ({ page, cardDetails, kanbanBoard }) => {
  // Open card if it's not already open
  if (!(await cardDetails.isCardDetailsDialogOpen())) {
    await kanbanBoard.openCard(cardText)
  }

  // Archive card
  await cardDetails.archiveCard();

  // Delete card
  await cardDetails.deleteCard();

  // Assert the card doesn't exist
  await kanbanBoard.assertCardDoesNotExistOnBoard(cardText)
});