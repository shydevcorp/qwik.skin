"use client";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type KnifeModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  children?: React.ReactNode;
};

export function KnifeModel(props: KnifeModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/landing/Knife.glb");

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
