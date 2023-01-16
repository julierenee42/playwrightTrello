import { expect, Locator, Page } from "@playwright/test";

export class Login {
  // Input fields
  private emailAddressField: Locator;
  private passwordField: Locator;

  // Buttons
  private continueButton: Locator;
  private loginButton: Locator;

  // Text elements
  private passwordErrorMessage: Locator;


  constructor(page: Page) {
    // Input fields
    this.emailAddressField = page.getByPlaceholder('Enter email');
    this.passwordField = page.getByPlaceholder('Enter password');

    // Buttons
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.loginButton = page.getByRole('button', { name: 'Log in' });

    // Text elements
    this.passwordErrorMessage = page.locator('#password-error');
  }

  /**
   * Enter the user's email address on the login page
   * @param email Email address to be used for login
   */
  async fillEmailAddress(email: string) {
    await this.emailAddressField.fill(email);
  }

  /**
   * Enter the automation user's email address on the login page
   */
  async fillEmailAddressWithAutomationUser() {
    await this.fillEmailAddress(process.env.EMAIL_ADDRESS || "couldn't read email from environment");
  }

  /**
   * Click the Continue button on the email page
   */
  async clickContinueButton() {
    await this.continueButton.click();
  }

  /**
   * Enter the user's password on the login page
   * @param password Password to be used for login
   */
  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  /**
   * Enter the automation user's password on the login page
   */
  async fillPasswordWithAutomationPassword() {
    await this.fillPassword(process.env.PASSWORD || "couldn't read password from environment");
  }

  /**
   * Click the Login button on the password page
   */
  async clickLoginButton() {
    await this.loginButton.click();
  }

  /**
   * Assert the incorrect email/password message appears when logging in with invalid credentials
   */
  async assertIncorrectPasswordMessage() {
    await expect(this.passwordErrorMessage).toContainText(
      "Incorrect email address and / or password. Do you need help logging in?"
    );
  }
}