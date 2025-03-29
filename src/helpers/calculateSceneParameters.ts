import { Product } from '@/common/types';
import { convertToMM } from '../utils/convertToMM';

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
