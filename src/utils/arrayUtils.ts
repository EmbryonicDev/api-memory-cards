export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  const result: T[] = [];

  while (result.length < array.length && shuffled.length > 0) {
    const randomIndex = Math.floor(Math.random() * shuffled.length);
    const [item] = shuffled.splice(randomIndex, 1);
    result.push(item);
  }

  return result;
}