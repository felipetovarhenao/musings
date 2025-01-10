// Utility function to check if a puzzle is completed
export const isPuzzleCompleted = (puzzle: string): boolean => {
  const storedData = localStorage.getItem("completedPuzzles");
  if (storedData) {
    const completedPuzzles = JSON.parse(storedData);
    return !!completedPuzzles[puzzle];
  }
  return false;
};
