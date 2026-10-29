/** Format a number with en-US thousands separators. */
export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

/** "Emma Wilson" -> "Emma W." */
export function shortName(name: string) {
  return name.replace(/ (\w)\w+$/, " $1.");
}
