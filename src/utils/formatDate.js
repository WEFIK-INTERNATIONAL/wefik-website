export function formatDate(date) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const newDate = new Date(date);
    return newDate.toLocaleDateString(undefined, options);
}
