import { useCallback, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useTheme } from '../contexts/ThemeContext';

export function useThreeBackground() {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const { theme } = useTheme();

  const createParticles = useCallback(() => {
    if (!sceneRef.current) return;

    // Remove existing particles if any
    if (particlesRef.current) {
      sceneRef.current.remove(particlesRef.current);
    }

    // Create particles
    const particleCount = 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
      color: theme === 'dark' ? 0x6366f1 : 0x6366f1, // Primary color
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    // Create positions for each particle
    const particlesArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlesArray[i] = (Math.random() - 0.5) * 10; // x
      particlesArray[i + 1] = (Math.random() - 0.5) * 10; // y
      particlesArray[i + 2] = (Math.random() - 0.5) * 10; // z
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlesArray, 3));
    
    particlesRef.current = new THREE.Points(particleGeometry, particlesMaterial);
    sceneRef.current.add(particlesRef.current);
  }, [theme]);

  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;

    // Rotate particles slowly
    particlesRef.current.rotation.x += 0.0003;
    particlesRef.current.rotation.y += 0.0005;

    // Render
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    
    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;
    
    // Update camera aspect ratio
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    
    // Update renderer size
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!particlesRef.current) return;
    
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Subtle rotation based on mouse position
    gsap.to(particlesRef.current.rotation, {
      x: mouseY * 0.1,
      y: mouseX * 0.1,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  const initBackground = useCallback(() => {
    // Create scene
    sceneRef.current = new THREE.Scene();
    
    // Create camera
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 3;
    
    // Create renderer
    rendererRef.current = new THREE.WebGLRenderer({
      alpha: true, // Transparent background
      antialias: true,
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add canvas to DOM
    document.body.appendChild(rendererRef.current.domElement);
    
    // Create particles
    createParticles();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation loop
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && rendererRef.current.domElement) {
        document.body.removeChild(rendererRef.current.domElement);
      }
    };
  }, [animate, createParticles, handleMouseMove, handleResize]);

  return { initBackground };
}