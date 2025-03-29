import { units } from '@/common/constants';
import { UnitEnum } from '../common/types';

export function convertToMM(
  value: number = 0,
  unit: UnitEnum = UnitEnum.mm
): number {
  return value * units[unit];
}
