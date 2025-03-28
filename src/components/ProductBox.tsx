import { convertToMM } from '@/common/utils';
import { ProductBoxProps } from '@/types';
import { Box, Edges } from '@react-three/drei';

function ProductBox({ product, position, scaleFactor }: ProductBoxProps) {
  const { width, height, length, unit, color } = product;

  const boxWidth = convertToMM(width!, unit) * scaleFactor;
  const boxHeight = convertToMM(height!, unit) * scaleFactor;
  const boxLength = convertToMM(length!, unit) * scaleFactor;

  return (
    <Box
      position={position}
      material-color={color}
      args={[boxWidth, boxHeight, boxLength]}
    >
      <Edges visible scale={1} color="black" />
    </Box>
  );
}

export default ProductBox;
