/**
 * Returns a pluralized string based on the count.
 * @param count - The number to determine singular or plural form
 * @param singular - The singular form of the word
 * @param plural - The plural form of the word
 * @returns The count with the appropriate singular or plural form
 */
export function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`
}
