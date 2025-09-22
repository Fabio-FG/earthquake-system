export function getDateRange(days: number) {
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - days);

  return {
    starttime: start.toISOString(),
    endtime: end.toISOString(),
  };
}
