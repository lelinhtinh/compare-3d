import { UnitEnum } from '../types';
import { units } from './constants';

export function convertToMM(
  value: number = 0,
  unit: UnitEnum = UnitEnum.mm
): number {
  return value * units[unit];
}
