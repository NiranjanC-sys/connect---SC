import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const generatePoints = (count: number, radius: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    points[i3] = radius * Math.sin(phi) * Math.cos(theta);
    points[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    points[i3 + 2] = radius * Math.cos(phi);
  }
  return points;
};

interface ParticlesProps {
  count?: number;
  radius?: number;
  color?: string;
  size?: number;
}

const Particles: React.FC<ParticlesProps> = ({ 
  count = 1000, 
  radius = 10, 
  color = '#4233FF',
  size = 0.05
}) => {
  const points = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <Points 
      ref={points} 
      positions={generatePoints(count, radius)} 
      stride={3} 
      frustumCulled={false}
    >
      <PointMaterial 
        transparent 
        color={color} 
        size={size} 
        sizeAttenuation={true} 
        depthWrite={false} 
      />
    </Points>
  );
};

const FloatingPolygons: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.1;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.15;
      mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2, 1]} />
      <meshPhongMaterial 
        color="#7266FF" 
        transparent 
        opacity={0.2} 
        wireframe={true} 
      />
    </mesh>
  );
};

const LightOrbs: React.FC = () => {
  const orbGroup = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (orbGroup.current) {
      orbGroup.current.rotation.y = clock.getElapsedTime() * 0.1;
      orbGroup.current.children.forEach((child, i) => {
        const t = clock.getElapsedTime() + i * 100;
        child.position.x = Math.sin(t * 0.2) * 5;
        child.position.z = Math.cos(t * 0.2) * 5;
        child.position.y = Math.sin(t * 0.3) * 2;
      });
    }
  });

  return (
    <group ref={orbGroup}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[Math.sin(i) * 5, 0, Math.cos(i) * 5]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#33FFEF" : "#E13CFF"} />
        </mesh>
      ))}
    </group>
  );
};

const FloatingGrid: React.FC = () => {
  const grid = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (grid.current) {
      grid.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
      grid.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={grid} position={[0, -5, 0]}>
      <gridHelper 
        args={[30, 30, "#4233FF", "#4233FF"]}
        position={[0, 0, 0]}
      />
      <gridHelper 
        args={[30, 30, "#E13CFF", "#E13CFF"]}
        position={[0, 0.1, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />
    </group>
  );
};

const FloatingRings: React.FC = () => {
  const rings = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (rings.current) {
      rings.current.rotation.x = clock.getElapsedTime() * 0.1;
      rings.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={rings}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * (Math.PI / 3)]}>
          <torusGeometry args={[3 + i, 0.05, 16, 100]} />
          <meshPhongMaterial 
            color={i === 0 ? "#4233FF" : i === 1 ? "#33FFEF" : "#E13CFF"}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

interface ParticleBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  intensity = 'medium' 
}) => {
  const particleCount = {
    low: 500,
    medium: 1500,
    high: 3000
  }[intensity];

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles count={particleCount} color="#4233FF" />
        <Particles count={particleCount * 0.3} radius={20} color="#E13CFF" size={0.02} />
        <FloatingPolygons />
        <LightOrbs />
        <FloatingGrid />
        <FloatingRings />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;