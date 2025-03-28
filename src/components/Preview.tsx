import { calculateSceneParameters } from '@/common/helpers';
import { Position, PreviewProps } from '@/types';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import ProductBox from './ProductBox';

function Preview({ products }: PreviewProps) {
  const { scaleFactor, positions } = useMemo(
    () => calculateSceneParameters(products),
    [products]
  );

  return (
    <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={0.7} />
      {products.map((product, index) => (
        <ProductBox
          key={product.name}
          product={product}
          position={(positions[index] as Position) || [0, 0, 0]}
          scaleFactor={scaleFactor}
        />
      ))}
      <gridHelper args={[20, 20]} />
      <OrbitControls />
    </Canvas>
  );
}

export default Preview;
