// import { createRoot } from "react-dom/client"

import * as THREE from "three";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";

type Props = {
  position: [number, number, number];
  size: [number, number, number];
  // size: THREE.Vector2[];
  color: string;
};

const Cube = ({ position, size, color }: Props) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshPhongMaterial wireframe />
    </mesh>
  );
};

const Trus = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const speed = hovered ? 1 : 0.5;

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.z += delta * 2;
  });
  return (
    <mesh
      position={[0, 0, 0]}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setHovered(true))}
      onPointerLeave={() => setHovered(false)}
    >
      <torusGeometry args={[1, 0.5, 30, 10]} />
      <meshNormalMaterial wireframe />
    </mesh>
  );
};

const TrusKnot = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const speed = hovered ? 1 : 0.5;

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * 2;
  });
  return (
    <mesh
      position={[0, 0, 0]}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setHovered(true))}
      onPointerLeave={() => setHovered(false)}
    >
      <torusKnotGeometry args={[1, 0.3, 80, 10, 2]} />
      <meshNormalMaterial wireframe />
    </mesh>
  );
};

const Sphere = ({ position, size }: Props) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const speed = hovered ? 1 : 0.5;

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * speed;
  });
  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setHovered(true))}
      onPointerLeave={() => setHovered(false)}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={hovered ? "red" : "white"} wireframe />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      <Sphere position={[0, 0, 0]} size={[2, 30, 30]} color="red" />
      {/* <Cube position={[0, 0, 0]} size={[1, 1, 1]} color="red" /> */}
      <TrusKnot />
      <Trus />
      <OrbitControls />
    </Canvas>
  );
};

export default App;
