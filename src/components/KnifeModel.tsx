"use client";

import { useRef, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type KnifeModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  children?: React.ReactNode;
};

function Model(props: KnifeModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/landing/Knife.glb", true);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={group} {...props}>
      <primitive
        object={scene}
        scale={1.2}
        position={[0, 0, 0]}
        rotation={[0, 0, Math.PI / 4]}
      />
    </group>
  );
}

export function KnifeModel(props: KnifeModelProps) {
  return (
    <Suspense fallback={null}>
      <Model {...props} />
    </Suspense>
  );
}
