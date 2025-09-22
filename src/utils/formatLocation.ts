export function formatLocation(location: string) {
  if (location.length > 35) {
    return location.substring(0, 35) + "...";
  }
  return location;
}
