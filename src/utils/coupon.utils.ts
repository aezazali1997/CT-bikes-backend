export const hasDatePassed = (date: Date): boolean => {
    const today = new Date(); // Get the current date

    // Compare the year, month, and day of the provided date and today's date
    if (date.getFullYear() < today.getFullYear()) {
        return true; // Year has passed
    } else if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() < today.getMonth()
    ) {
        return true; // Month has passed
    } else if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() < today.getDate()
    ) {
        return true; // Day has passed
    }

    return false; // Date has not passed
}