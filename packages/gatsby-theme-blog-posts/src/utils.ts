export function chunk<T>(array: T[], size: number): T[][] {
  return array.reduce(
    (prev, _curr, index, arr) =>
      index % size !== 0 ? prev : [...prev, arr.slice(index, index + size)],
    []
  );
}

export function groupBy<K extends string | number | symbol, T>(
  array: T[],
  fnc: (t: T) => K
): Record<K, T[]> {
  return array.reduce<Record<K, T[]>>((prev, curr) => {
    const key = fnc(curr);
    const keyArray = prev[key] ?? [];
    return { ...prev, [key]: [...keyArray, curr] };
  }, {} as Record<K, T[]>);
}
