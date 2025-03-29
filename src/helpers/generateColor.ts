import { UniqolorOptions } from '@/common/types';
import uniqolor from 'uniqolor';

const COLOR_CONFIG: UniqolorOptions = {
  format: 'hex',
};

export function generateColor(existingColors: string[]): string {
  function createColor(): string | null {
    const { color } = uniqolor.random(COLOR_CONFIG);
    return color;
  }

  function isDistinctEnough(newColor: string): boolean {
    return !existingColors.includes(newColor);
  }

  const MAX_ATTEMPTS = 30;
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const newColor = createColor();
    if (newColor && isDistinctEnough(newColor)) {
      return newColor;
    }
  }

  return uniqolor(Date.now().toString() + Math.random(), COLOR_CONFIG).color;
}
