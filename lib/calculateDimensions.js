function calculateDiagonal(height, width) {
  return Math.sqrt(width ** 2 + height ** 2);
}

function calculateByDiagonal(aspectRatioHeight, aspectRatioWidth, diagonal) {
  const aspectRatioDiagonal = calculateDiagonal(
    aspectRatioHeight,
    aspectRatioWidth
  );

  if (diagonal > 0) {
    const factor = diagonal / aspectRatioDiagonal;
    const width = aspectRatioWidth * factor;
    const height = aspectRatioHeight * factor;
    return { width, height };
  }
}

export { calculateByDiagonal, calculateDiagonal };
