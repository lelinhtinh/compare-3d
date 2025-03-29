import { UniqolorOptions } from '@/common/types';
import uniqolor from 'uniqolor';

const COLOR_CONFIG: UniqolorOptions = {
  format: 'hex',
  lightness: [15, 40],
  saturation: [60, 95],
};

export function generateDarkColor(existingColors: string[]): string {
  function createDarkColor(): string | null {
    const { color, isLight } = uniqolor.random(COLOR_CONFIG);
    return isLight ? null : color;
  }

  function isDistinctEnough(newColor: string): boolean {
    return !existingColors.includes(newColor);
  }

  const MAX_ATTEMPTS = 30;
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const newColor = createDarkColor();
    if (newColor && isDistinctEnough(newColor)) {
      return newColor;
    }
  }

  return uniqolor(Date.now().toString() + Math.random(), COLOR_CONFIG).color;
}
