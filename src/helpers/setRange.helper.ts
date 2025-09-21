export function getDateRange(days: number) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);

  return {
    starttime: start.toISOString(),
    endtime: end.toISOString(),
  };
}
