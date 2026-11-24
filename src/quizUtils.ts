export function isAnswerCorrect(selected: number[], correct: number[]): boolean {
  if (selected.length !== correct.length) return false;
  const sortedSelected = [...selected].sort((a, b) => a - b);
  const sortedCorrect = [...correct].sort((a, b) => a - b);
  return sortedSelected.every((value, i) => value === sortedCorrect[i]);
}

export function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
