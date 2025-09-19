export function formatTime(date: string | number) {
  const formattedDate = new Date(date);
  return formattedDate.toUTCString();
}
