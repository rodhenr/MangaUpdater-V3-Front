export function getDaysAgo(dateInput: string | Date): string {
  const inputDate = new Date(dateInput);
  const currentDate = new Date();

  inputDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const diffInMs = currentDate.getTime() - inputDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "today";
  if (diffInDays === 1) return "yesterday";

  return `${diffInDays} days ago`;
}
