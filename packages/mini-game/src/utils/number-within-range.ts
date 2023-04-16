interface INumberWithinRangeArgs {
  /**The number we're testing */
  num: number;
  /**The minimum of the range */
  min: number;
  /**The maximum of the range, inclusive */
  max: number;
}

export function numberWithinRange({ num, min, max }: INumberWithinRangeArgs) {
  return num >= min && num <= max;
}
