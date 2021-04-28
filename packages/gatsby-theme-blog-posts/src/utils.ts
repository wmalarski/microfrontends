export function chunk<T>(array: T[], size: number): T[][] {
  return array.reduce(
    (prev, _curr, index, arr) =>
      index % size !== 0 ? prev : [...prev, arr.slice(index, index + size)],
    []
  );
}
