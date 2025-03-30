import { Product, UnitEnum } from '@/common/types';
import { UseFormReturn } from 'react-hook-form';

export function extractDimensionsFromClipboard(
  form: UseFormReturn<Product>,
  clipboardData: string
) {
  const regex =
    /(?<width>[0-9,.]+)\s*[x×*]\s*(?<height>[0-9,.]+)\s*[x×*]\s*(?<length>[0-9,.]+)[\s\-(]*(?<unit>mm|cm|inches|inch|in)?/;
  const match = regex.exec(clipboardData);
  if (!match) return false;

  const { width, height, length, unit } = match.groups!;
  const dimensions = [width, height, length].map((dim) => {
    const parsedDim = parseFloat(dim.replace(',', '.'));
    return isNaN(parsedDim) ? null : parsedDim;
  });
  if (dimensions.some((dim) => dim === null)) return false;

  if (unit) {
    let unitValue: UnitEnum;
    switch (unit) {
      case 'cm':
        unitValue = UnitEnum.cm;
        break;
      case 'inches':
      case 'inch':
      case 'in':
        unitValue = UnitEnum.inch;
        break;
      default:
        unitValue = UnitEnum.mm;
        break;
    }
    form.setValue('unit', unitValue);
  }

  form.setValue('width', dimensions[0]);
  form.setValue('height', dimensions[1]);
  form.setValue('length', dimensions[2]);
  return true;
}
