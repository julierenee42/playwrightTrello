# playwrightTrello
Automated tests for a simple Trello board, including:
- Entering invalid credentials
- Successfully logging in
- Kanban board initial status
  - List count
  - Count of cards in 1st list
  - Existence of card with specific test
- Typical card workflow
  - Adding a card
  - Adding a description to the card
  - Dragging the card to a different column
  - Deleting/archiving the card to clean-up after test
  
Tests run in Chrome and Firefox via a GitHub action workflow on push/pull. Click the "Actions" tab to check out the results!
