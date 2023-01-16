import { test } from "../utilities/fixtures";

test('Assert lists on board', async ({ kanbanBoard }) => {
  // Assert board has 6 lists
  await kanbanBoard.assertListCount(6);

  // Assert lists have the expected names
  await kanbanBoard.assertListExists('Project Resources');
  await kanbanBoard.assertListExists('Questions For Next Meeting');
  await kanbanBoard.assertListExists('To Do');
  await kanbanBoard.assertListExists('Pending');
  await kanbanBoard.assertListExists('Blocked');
  await kanbanBoard.assertListExists('Done');
});

test('Assert Project Resources list has cards', async ({ kanbanBoard }) => {
  // Assert list has 4 cards
  let list = kanbanBoard.getListWithName("Project Resources");
  await kanbanBoard.assertCardCountInList(list, 4);

  // Assert 1 of the cards has text "Weekly Updates"
  await kanbanBoard.assertCardExistsInList(list, "Weekly Updates");
});