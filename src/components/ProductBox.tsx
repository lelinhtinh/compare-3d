import { ProductBoxProps } from '@/common/types';
import { convertToMM } from '@/utils/convertToMM';
import { Box, Edges, Html } from '@react-three/drei';
import { useState } from 'react';

function ProductBox({ product, position, scaleFactor }: ProductBoxProps) {
  const { width, height, length, unit, color } = product;

  const boxWidth = convertToMM(width!, unit) * scaleFactor;
  const boxHeight = convertToMM(height!, unit) * scaleFactor;
  const boxLength = convertToMM(length!, unit) * scaleFactor;

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <group>
      <Box
        position={position}
        material-color={color}
        args={[boxWidth, boxHeight, boxLength]}
        onPointerOver={() => setShowTooltip(true)}
        onPointerOut={() => setShowTooltip(false)}
      >
        <Edges visible scale={1} color="black" />
      </Box>
      {showTooltip && (
        <Html position={position} center style={{ pointerEvents: 'none' }}>
          <div
            style={{
              background: color || 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              whiteSpace: 'nowrap',
            }}
          >
            {product.name}
          </div>
        </Html>
      )}
    </group>
  );
}

export default ProductBox;
