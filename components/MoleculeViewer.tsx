"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { VitaminData } from "@/data/vitamins";

interface MoleculeViewerProps {
  vitamin: VitaminData;
  className?: string;
}

// Optimized CPK Palette with rich visual contrast tailored for dark luxury aesthetics
const ELEMENT_COLORS: Record<string, { color: number; radius: number; roughness: number; metalness: number }> = {
  C: { color: 0x242226, radius: 0.38, roughness: 0.35, metalness: 0.2 },  // Carbon (Graphite Obsidian)
  H: { color: 0xf3ede2, radius: 0.22, roughness: 0.45, metalness: 0.05 }, // Hydrogen (Ivory Bone)
  O: { color: 0xd63031, radius: 0.36, roughness: 0.25, metalness: 0.1 },  // Oxygen (Ruby Crimson)
  N: { color: 0x0984e3, radius: 0.36, roughness: 0.25, metalness: 0.1 },  // Nitrogen (Sapphire Blue)
  P: { color: 0xe67e22, radius: 0.44, roughness: 0.3, metalness: 0.15 },  // Phosphorus (Amber Gold)
  S: { color: 0xfdcb6e, radius: 0.44, roughness: 0.3, metalness: 0.15 },  // Sulfur (Canary Topaz)
  Co: { color: 0x8e44ad, radius: 0.52, roughness: 0.15, metalness: 0.7 }, // Cobalt (Metallic Amethyst)
};

export const MoleculeViewer: React.FC<MoleculeViewerProps> = ({
  vitamin,
  className = "w-full h-[400px] sm:h-[480px] lg:h-[540px]",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Pointer drag interaction
  const isDraggingRef = useRef<boolean>(false);
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.0035 });

  // Reset rotation to default orientation
  const handleReset = useCallback(() => {
    if (moleculeGroupRef.current) {
      moleculeGroupRef.current.rotation.set(0.2, 0.4, 0);
      rotationVelocityRef.current = { x: 0, y: 0.0035 };
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    cameraRef.current = camera;

    // 3. Renderer with high performance settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting: Fast, crisp 3-point studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.6);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xaad0ff, 0.6);
    fillLight.position.set(-8, -4, -6);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffeedd, 1.2, 25);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // 5. Molecule Group
    const moleculeGroup = new THREE.Group();
    moleculeGroupRef.current = moleculeGroup;
    scene.add(moleculeGroup);

    // Center of mass calculation
    let centerX = 0, centerY = 0, centerZ = 0;
    vitamin.atoms.forEach((a) => {
      centerX += a.x;
      centerY += a.y;
      centerZ += a.z;
    });
    const atomCount = vitamin.atoms.length || 1;
    centerX /= atomCount;
    centerY /= atomCount;
    centerZ /= atomCount;

    // Shared low/medium poly geometries for ultra smooth rendering (60-120fps)
    const sphereGeom = new THREE.SphereGeometry(1, 16, 12);
    const cylinderGeom = new THREE.CylinderGeometry(0.08, 0.08, 1, 10);

    // Bond material: sleek titanium-champagne metallic cylinder
    const bondMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a847c,
      roughness: 0.35,
      metalness: 0.4,
    });

    // Materials cache by element
    const materialsByElement = new Map<string, THREE.MeshStandardMaterial>();

    // Add Atoms (Ball & Stick)
    vitamin.atoms.forEach((atom) => {
      const config = ELEMENT_COLORS[atom.element] || ELEMENT_COLORS.C;
      let mat = materialsByElement.get(atom.element);
      if (!mat) {
        mat = new THREE.MeshStandardMaterial({
          color: config.color,
          roughness: config.roughness,
          metalness: config.metalness,
        });
        materialsByElement.set(atom.element, mat);
      }

      const atomMesh = new THREE.Mesh(sphereGeom, mat);
      atomMesh.position.set(atom.x - centerX, atom.y - centerY, atom.z - centerZ);
      atomMesh.scale.setScalar(config.radius);
      moleculeGroup.add(atomMesh);
    });

    // Add Bonds
    vitamin.bonds.forEach(([i1, i2]) => {
      const a1 = vitamin.atoms[i1];
      const a2 = vitamin.atoms[i2];
      if (!a1 || !a2) return;

      const p1 = new THREE.Vector3(a1.x - centerX, a1.y - centerY, a1.z - centerZ);
      const p2 = new THREE.Vector3(a2.x - centerX, a2.y - centerY, a2.z - centerZ);
      const distance = p1.distanceTo(p2);

      const cylinder = new THREE.Mesh(cylinderGeom, bondMaterial);
      const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      cylinder.position.copy(midPoint);
      cylinder.scale.set(1, distance, 1);

      const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
      const orientation = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction
      );
      cylinder.quaternion.copy(orientation);
      moleculeGroup.add(cylinder);
    });

    // Default orientation
    moleculeGroup.rotation.set(0.2, 0.4, 0);

    // Adjust camera distance based on molecule boundary
    let maxDist = 0;
    vitamin.atoms.forEach((a) => {
      const dist = Math.hypot(a.x - centerX, a.y - centerY, a.z - centerZ);
      if (dist > maxDist) maxDist = dist;
    });
    camera.position.z = Math.max(11, maxDist * 2.1);

    // 6. Animation Loop & Visibility Gating
    let isRunning = false;

    const renderFrame = () => {
      if (!isRunning) return;

      if (!isDraggingRef.current && moleculeGroup) {
        moleculeGroup.rotation.y += rotationVelocityRef.current.y;
        moleculeGroup.rotation.x += rotationVelocityRef.current.x;

        // Subtle damping to idle drift
        rotationVelocityRef.current.x *= 0.95;
        rotationVelocityRef.current.y =
          rotationVelocityRef.current.y * 0.95 + 0.0035 * 0.05;
      }

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(renderFrame);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animFrameIdRef.current = requestAnimationFrame(renderFrame);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };

    // IntersectionObserver to completely halt rendering loop when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Initial render once
    renderer.render(scene, camera);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // WebGL Context Loss and Restore handlers
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      stopLoop();
    };
    const handleContextRestored = () => {
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      if (isVisibleRef.current) {
        startLoop();
      }
    };

    const canvas = renderer.domElement;
    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener("webglcontextrestored", handleContextRestored, false);

    return () => {
      observer.disconnect();
      stopLoop();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      renderer.dispose();
      sphereGeom.dispose();
      cylinderGeom.dispose();
      bondMaterial.dispose();
      materialsByElement.forEach((mat) => mat.dispose());
      if (container) container.innerHTML = "";
    };
  }, [vitamin]);

  // Pointer event handlers for silky drag rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsInteracting(true);
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !moleculeGroupRef.current) return;

    const deltaX = e.clientX - prevPointerRef.current.x;
    const deltaY = e.clientY - prevPointerRef.current.y;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };

    moleculeGroupRef.current.rotation.y += deltaX * 0.007;
    moleculeGroupRef.current.rotation.x += deltaY * 0.007;

    rotationVelocityRef.current = {
      x: deltaY * 0.0015,
      y: deltaX * 0.0015,
    };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    setTimeout(() => setIsInteracting(false), 600);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      className={`relative rounded-3xl bg-[#090807] border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] ${className}`}
    >
      {/* Background Soft Chromatic Glow */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none blur-[120px]"
        style={{
          background: `radial-gradient(circle at 60% 40%, ${vitamin.accentColor}, transparent 65%)`,
        }}
      />

      {/* Top HUD: Technical Metadata */}
      <div className="absolute top-4 left-5 right-5 z-10 flex items-center justify-between text-white/60 pointer-events-none">
        <div className="flex items-center space-x-3">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/50">
            ESTÚDIO 3D &middot; {vitamin.letter}
          </span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span className="text-[10px] font-mono text-white/70">
            BALL &amp; STICK
          </span>
        </div>

        {/* State indicator pill */}
        <div className="flex items-center space-x-2 text-[9px] font-mono uppercase bg-white/5 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isInteracting ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
            }`}
          />
          <span className="text-white/80">
            {isInteracting ? "ROTACIONANDO" : "ORBITAL LIVRE"}
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
      />

      {/* Bottom HUD: Reset & PubChem metadata */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-3 text-white/70 pointer-events-auto">
        <button
          onClick={handleReset}
          title="Resetar orientação"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 text-[10px] font-mono transition-colors"
        >
          <span>↺</span>
          <span className="uppercase tracking-wider">Resetar</span>
        </button>

        <div className="flex items-center space-x-2">
          <a
            href={`https://pubchem.ncbi.nlm.nih.gov/compound/${vitamin.pubchemCid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/60 hover:text-white border border-white/10 text-[10px] font-mono transition-colors"
          >
            PUBCHEM CID: {vitamin.pubchemCid} &#8599;
          </a>
        </div>
      </div>
    </div>
  );
};
