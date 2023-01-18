import { test } from "../utilities/fixtures";

test('Assert lists on board', async ({ kanbanBoard }) => {
  // Assert board has 4 lists
  await kanbanBoard.assertListCount(4);

  // Assert lists have the expected names
  await kanbanBoard.assertListExists('Project Resources');
  await kanbanBoard.assertListExists('To Do');
  await kanbanBoard.assertListExists('Doing');
  await kanbanBoard.assertListExists('Done');
});

test('Assert Project Resources list has cards', async ({ kanbanBoard }) => {
  // Assert list has 4 cards
  let listName = "Project Resources";
  await kanbanBoard.assertCardCountInList(listName, 4);

  // Assert 1 of the cards has text "Weekly Updates"
  await kanbanBoard.assertCardExistsInList(listName, "Weekly Updates");
});