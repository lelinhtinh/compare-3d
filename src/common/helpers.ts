import { UseFormReturn } from 'react-hook-form';
import uniqolor from 'uniqolor';
import { Product } from '../types';
import { convertToMM } from './utils';

export function generateDarkColor(existingColors: string[]): string {
  function createDarkColor(): string {
    return uniqolor.random({
      format: 'hex',
      lightness: [15, 40],
      saturation: [60, 95],
    }).color;
  }

  function isDistinctEnough(newColor: string): boolean {
    if (existingColors.length === 0) return true;

    for (const color of existingColors) {
      if (color === newColor) return false;
    }

    return true;
  }

  const MAX_ATTEMPTS = 30;
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const newColor = createDarkColor();
    if (isDistinctEnough(newColor)) {
      return newColor;
    }
  }

  return uniqolor(Date.now().toString() + Math.random(), {
    format: 'hex',
    lightness: [15, 40],
    saturation: [60, 95],
  }).color;
}

export function validateDimensions(
  form: UseFormReturn<Product>,
  values: Product
) {
  const dimensionFields = ['width', 'height', 'length'] as const;
  for (const field of dimensionFields) {
    if (!values[field]) {
      form.setError(field, {
        type: 'manual',
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`,
      });
      return false;
    }
  }
  return true;
}

export function calculateSceneParameters(products: Product[]) {
  if (products.length === 0) {
    return { scaleFactor: 1, positions: [] };
  }

  const productsInMM = products.map((product) => ({
    width: convertToMM(product.width!, product.unit),
    height: convertToMM(product.height!, product.unit),
    length: convertToMM(product.length!, product.unit),
  }));

  const maxDimension = Math.max(
    ...productsInMM.flatMap((p) => [p.width, p.height, p.length])
  );

  const totalWidth = productsInMM.reduce((sum, p) => sum + p.width, 0);
  const spacing = 0;
  const sceneLength =
    totalWidth + (products.length - 1) * spacing * maxDimension;

  const canvasSize = 5;
  const targetSize = canvasSize * 0.8;

  const factor1 = targetSize / maxDimension;
  const factor2 = targetSize / sceneLength;

  const scaleFactor = Math.min(factor1, factor2);

  const positions = [];
  let currentX = (-sceneLength * scaleFactor) / 2;

  for (let i = 0; i < products.length; i++) {
    const width = productsInMM[i].width * scaleFactor;
    const height = productsInMM[i].height * scaleFactor;

    positions.push([currentX + width / 2, height / 2, 0]);
    currentX += width + spacing * maxDimension * scaleFactor;
  }

  return { scaleFactor, positions };
}
