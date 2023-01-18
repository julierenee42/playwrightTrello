/**
 * Generate a 6-digit random number, useful for naming things that need unique names
 * @returns A 6-digit random number
 */
export function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}