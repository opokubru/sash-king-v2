import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./styles.css";

import { ProgressSpinner } from "primereact/progressspinner";

const LoadingAnimation = () => {
  const meshRef = useRef();

  // Rotate the mesh on each frame to create a spinning effect
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.02; // Rotate around the Z-axis to create a spinning effect
    }
  });

  return (
    <Html className="spinner">
      <ProgressSpinner />
    </Html>
  );
};

export default LoadingAnimation;
