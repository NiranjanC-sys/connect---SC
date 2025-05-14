import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

interface OrbCoreProps {
  isAnimating?: boolean;
  color?: string;
}

const OrbCore: React.FC<OrbCoreProps> = ({ 
  isAnimating = false, 
  color = '#1300FF' 
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const initialScale = useRef(1);
  
  useEffect(() => {
    initialScale.current = isAnimating ? 1.1 : 1;
  }, [isAnimating]);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      // Base rotation
      mesh.current.rotation.x = clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.3;
      
      // Pulsating scale when animating
      if (isAnimating) {
        const pulseScale = initialScale.current + Math.sin(clock.getElapsedTime() * 3) * 0.1;
        mesh.current.scale.set(pulseScale, pulseScale, pulseScale);
      } else {
        mesh.current.scale.set(initialScale.current, initialScale.current, initialScale.current);
      }
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshPhongMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.5}
        shininess={50}
      />
    </mesh>
  );
};

interface OrbAuraProps {
  isAnimating?: boolean;
  color?: string;
}

const OrbAura: React.FC<OrbAuraProps> = ({ 
  isAnimating = false, 
  color = '#4233FF'
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      // Reverse rotation of the aura
      mesh.current.rotation.x = -clock.getElapsedTime() * 0.1;
      mesh.current.rotation.y = -clock.getElapsedTime() * 0.15;
      
      // Pulsating opacity when animating
      if (isAnimating && mesh.current.material instanceof THREE.Material) {
        const material = mesh.current.material as THREE.MeshBasicMaterial;
        material.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
      }
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent
        opacity={0.4}
        wireframe
      />
    </mesh>
  );
};

interface OrbParticlesProps {
  isAnimating?: boolean;
  count?: number;
}

const OrbParticles: React.FC<OrbParticlesProps> = ({ 
  isAnimating = false,
  count = 20
}) => {
  const points = useRef<THREE.Points>(null);
  
  // Generate random points around a sphere
  const generateSpherePoints = (count: number, radius: number) => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  };
  
  useFrame(({ clock }) => {
    if (points.current) {
      // Rotate particles
      points.current.rotation.x = clock.getElapsedTime() * 0.1;
      points.current.rotation.y = clock.getElapsedTime() * 0.15;
      
      // Scale particles when animating
      if (isAnimating) {
        const scale = 1 + Math.sin(clock.getElapsedTime()) * 0.1;
        points.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={generateSpherePoints(count, 1.5)}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        color="#E13CFF" 
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

interface AIOrb3DProps {
  isAnimating?: boolean;
}

const AIOrb3D: React.FC<AIOrb3DProps> = ({ isAnimating = false }) => {
  return (
    <group>
      <OrbCore isAnimating={isAnimating} />
      <OrbAura isAnimating={isAnimating} />
      <OrbParticles isAnimating={isAnimating} count={30} />
    </group>
  );
};

interface AIOrb3DWrapperProps {
  isAnimating?: boolean;
  className?: string;
}

const AIOrb: React.FC<AIOrb3DWrapperProps> = ({ 
  isAnimating = false,
  className = "w-40 h-40"
}) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <AIOrb3D isAnimating={isAnimating} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
};

export default AIOrb;