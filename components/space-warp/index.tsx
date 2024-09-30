"use client"
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float warpSpeed;
  varying vec2 vUv;
  
  // Improved Perlin noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv;
    float noise = snoise(vec2(uv.x * 10.0 + time * 0.1, uv.y * 10.0 - time * 0.1));
    float warp = noise * 0.1 * warpSpeed;
    uv.x += warp;
    uv.y += warp * 0.5;
    vec4 color = vec4(0.7, 0.7, 1.0, 1.0);  // Light blue color
    float alpha = smoothstep(0.7, 0.2, length(uv - 0.5));  // Create a circular gradient
    gl_FragColor = color * alpha;
  }
`;

const SpaceWarp: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWarping, setIsWarping] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const warpPlaneRef = useRef<THREE.Mesh | null>(null);
  const warpSpeedRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    cameraRef.current.position.z = 1;
    cameraRef.current.rotation.x = Math.PI/2;

    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(rendererRef.current.domElement);

    // Create stars
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(18000);  // 6000 stars * 3 coordinates
    const velocities = new Float32Array(6000);  // 6000 stars

    for (let i = 0; i < 18000; i += 3) {
      positions[i] = Math.random() * 600 - 300;
      positions[i+1] = Math.random() * 600 - 300;
      positions[i+2] = Math.random() * 600 - 300;
      velocities[i/3] = Math.random() * 0.5 + 0.5;  // Random velocity for each star
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));

    // Create a round star texture
    const starTexture = new THREE.TextureLoader().load('/star.png');

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      map: starTexture,
      blending: THREE.AdditiveBlending,
    });

    starsRef.current = new THREE.Points(starGeo, starMaterial);
    sceneRef.current.add(starsRef.current);

    // Create warp effect plane
    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const warpMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        warpSpeed: { value: 0 }
      },
      transparent: true,
      depthWrite: false
    });
    warpPlaneRef.current = new THREE.Mesh(planeGeometry, warpMaterial);
    warpPlaneRef.current.position.z = 0.5;
    sceneRef.current.add(warpPlaneRef.current);

    // Resize handling
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      rendererRef.current.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !starsRef.current || !warpPlaneRef.current) return;

      const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = starsRef.current.geometry.attributes.velocity.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i+1] -= (velocities[i/3] + warpSpeedRef.current * 2);
        
        if (positions[i+1] < -200) {
          positions[i+1] = 200;
          positions[i] = Math.random() * 600 - 300;
          positions[i+2] = Math.random() * 600 - 300;
        }
      }

      starsRef.current.geometry.attributes.position.needsUpdate = true;
      starsRef.current.rotation.y += 0.0002;

      // Update warp effect
      const warpMaterial = warpPlaneRef.current.material as THREE.ShaderMaterial;
      warpMaterial.uniforms.time.value += 0.1;
      warpMaterial.uniforms.warpSpeed.value = warpSpeedRef.current;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
      starGeo.dispose();
      (starsRef.current?.material as THREE.Material).dispose();
      planeGeometry.dispose();
      warpMaterial.dispose();
    };
  }, []);

  useEffect(() => {
    const targetWarpSpeed = isWarping ? 2 : 0;
    let animationFrameId: number;

    const animate = () => {
      warpSpeedRef.current += (targetWarpSpeed - warpSpeedRef.current) * 0.05;
      if (Math.abs(targetWarpSpeed - warpSpeedRef.current) > 0.001) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        warpSpeedRef.current = targetWarpSpeed;
      }
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isWarping]);

  const handleInteractionStart = () => setIsWarping(true);
  const handleInteractionEnd = () => setIsWarping(false);

  return (
    <div 
      ref={containerRef}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    />
  );
};

export default SpaceWarp;