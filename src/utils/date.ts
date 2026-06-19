export class DateUtils {
  /**
   * Returns the current date formatted as YYYY-MM-DD.
   */
  static getTodayString(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Adds/subtracts days from a given date and returns it as a YYYY-MM-DD string.
   */
  static addDays(days: number, fromDate: Date = new Date()): string {
    const targetDate = new Date(fromDate);
    targetDate.setDate(targetDate.getDate() + days);
    return targetDate.toISOString().split('T')[0];
  }

  /**
   * Converts any date string or object into a clean YYYY-MM-DD format.
   */
  static formatDateString(date: Date | string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      throw new Error(`Invalid date format provided: ${date}`);
    }
    return d.toISOString().split('T')[0];
  }
}
