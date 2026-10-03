"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { VitaminData } from "@/data/vitamins";

interface MoleculeViewerProps {
  vitamin: VitaminData;
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  externalRotationY?: number;
  externalRotationX?: number;
  cameraDistanceMultiplier?: number;
  onReady?: () => void;
}

// Scientific CPK Color Palette with rich depth
const ELEMENT_SPECS: Record<
  string,
  { color: number; radius: number; roughness: number; metalness: number }
> = {
  C: { color: 0x222024, radius: 0.38, roughness: 0.35, metalness: 0.25 }, // Carbon: Graphite obsidian
  H: { color: 0xf5efe6, radius: 0.22, roughness: 0.5, metalness: 0.05 },  // Hydrogen: Cream bone
  O: { color: 0xdf3838, radius: 0.36, roughness: 0.25, metalness: 0.15 }, // Oxygen: Ruby scarlet
  N: { color: 0x1f75fe, radius: 0.36, roughness: 0.25, metalness: 0.15 }, // Nitrogen: Deep azure
  P: { color: 0xe67e22, radius: 0.44, roughness: 0.3, metalness: 0.2 },   // Phosphorus: Amber
  S: { color: 0xf1c40f, radius: 0.44, roughness: 0.3, metalness: 0.2 },   // Sulfur: Golden topaz
  Co: { color: 0x9b59b6, radius: 0.52, roughness: 0.15, metalness: 0.75 },// Cobalt: Metallic amethyst
  Cl: { color: 0x2ecc71, radius: 0.42, roughness: 0.3, metalness: 0.15 }, // Chlorine: Emerald
};

// Singleton shared geometries & materials for all molecules (0 duplicate GPU buffer allocations)
const SHARED_SPHERE_GEOM = new THREE.SphereGeometry(1, 12, 8);
const SHARED_CYLINDER_GEOM = new THREE.CylinderGeometry(0.08, 0.08, 1, 6);
const SHARED_BOND_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0x908a82,
  roughness: 0.35,
  metalness: 0.45,
});

const SHARED_ATOM_MATERIALS = new Map<string, THREE.MeshStandardMaterial>();
const getAtomMaterial = (element: string): THREE.MeshStandardMaterial => {
  let mat = SHARED_ATOM_MATERIALS.get(element);
  if (!mat) {
    const spec = ELEMENT_SPECS[element] || ELEMENT_SPECS.C;
    mat = new THREE.MeshStandardMaterial({
      color: spec.color,
      roughness: spec.roughness,
      metalness: spec.metalness,
    });
    SHARED_ATOM_MATERIALS.set(element, mat);
  }
  return mat;
};

// Reusable scratch math objects to eliminate Garbage Collection thrashing during layout
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _mid = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _quat = new THREE.Quaternion();

export const MoleculeViewer: React.FC<MoleculeViewerProps> = ({
  vitamin,
  className = "w-full h-full min-h-[320px]",
  autoRotate = true,
  interactive = true,
  externalRotationY,
  externalRotationX,
  cameraDistanceMultiplier = 1.0,
  onReady,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Base camera distance calculated from molecule radius
  const baseCameraDistRef = useRef<number>(14);

  // Interaction tracking
  const isDraggingRef = useRef<boolean>(false);
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.0035 });
  const userRotationRef = useRef<{ x: number; y: number }>({ x: 0.2, y: 0.4 });

  // Update external GSAP rotations if provided
  useEffect(() => {
    if (!moleculeGroupRef.current) return;
    if (externalRotationY !== undefined) {
      moleculeGroupRef.current.rotation.y = userRotationRef.current.y + externalRotationY;
    }
    if (externalRotationX !== undefined) {
      moleculeGroupRef.current.rotation.x = userRotationRef.current.x + externalRotationX;
    }
  }, [externalRotationY, externalRotationX]);

  // Update camera distance multiplier
  useEffect(() => {
    if (!cameraRef.current) return;
    const targetZ = baseCameraDistRef.current * cameraDistanceMultiplier * zoomLevel;
    cameraRef.current.position.z = targetZ;
  }, [cameraDistanceMultiplier, zoomLevel]);

  // Reset to default viewing angle
  const handleResetOrientation = useCallback(() => {
    userRotationRef.current = { x: 0.2, y: 0.4 };
    rotationVelocityRef.current = { x: 0, y: 0.0035 };
    setZoomLevel(1);
    if (moleculeGroupRef.current) {
      moleculeGroupRef.current.rotation.set(0.2, 0.4, 0);
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting: Cinematic Studio Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff6ec, 1.8);
    keyLight.position.set(7, 10, 9);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa5c4e8, 0.7);
    fillLight.position.set(-8, -4, -6);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffe6c4, 1.3, 30);
    rimLight.position.set(0, 7, -6);
    scene.add(rimLight);

    // 5. Molecule Group
    const moleculeGroup = new THREE.Group();
    moleculeGroupRef.current = moleculeGroup;
    scene.add(moleculeGroup);

    // Calculate center of mass
    let centerX = 0, centerY = 0, centerZ = 0;
    const atoms = vitamin.atoms || [];
    atoms.forEach((a) => {
      centerX += a.x;
      centerY += a.y;
      centerZ += a.z;
    });
    const atomCount = atoms.length || 1;
    centerX /= atomCount;
    centerY /= atomCount;
    centerZ /= atomCount;

    // Add Atoms (Ball) using shared geometry and shared element materials
    atoms.forEach((atom) => {
      const spec = ELEMENT_SPECS[atom.element] || ELEMENT_SPECS.C;
      const mat = getAtomMaterial(atom.element);

      const atomMesh = new THREE.Mesh(SHARED_SPHERE_GEOM, mat);
      atomMesh.position.set(atom.x - centerX, atom.y - centerY, atom.z - centerZ);
      atomMesh.scale.setScalar(spec.radius);
      moleculeGroup.add(atomMesh);
    });

    // Add Bonds (Stick) reusing scratch vectors to prevent GC allocations
    const bonds = vitamin.bonds || [];
    bonds.forEach(([i1, i2]) => {
      const a1 = atoms[i1];
      const a2 = atoms[i2];
      if (!a1 || !a2) return;

      _v1.set(a1.x - centerX, a1.y - centerY, a1.z - centerZ);
      _v2.set(a2.x - centerX, a2.y - centerY, a2.z - centerZ);
      const distance = _v1.distanceTo(_v2);

      const cylinder = new THREE.Mesh(SHARED_CYLINDER_GEOM, SHARED_BOND_MATERIAL);
      _mid.addVectors(_v1, _v2).multiplyScalar(0.5);
      cylinder.position.copy(_mid);
      cylinder.scale.set(1, distance, 1);

      _dir.subVectors(_v2, _v1).normalize();
      _quat.setFromUnitVectors(_up, _dir);
      cylinder.quaternion.copy(_quat);
      moleculeGroup.add(cylinder);
    });

    // Initial orientation
    moleculeGroup.rotation.set(userRotationRef.current.x, userRotationRef.current.y, 0);

    // Compute bounding sphere to set base camera distance
    let maxDist = 0;
    atoms.forEach((a) => {
      const dist = Math.hypot(a.x - centerX, a.y - centerY, a.z - centerZ);
      if (dist > maxDist) maxDist = dist;
    });
    const calculatedDist = Math.max(10, maxDist * 2.2);
    baseCameraDistRef.current = calculatedDist;
    camera.position.z = calculatedDist * cameraDistanceMultiplier * zoomLevel;

    // 6. Animation Loop with Visibility Gating
    let isRunning = false;

    const renderFrame = () => {
      if (!isRunning) return;

      if (!isDraggingRef.current && moleculeGroup) {
        if (autoRotate) {
          moleculeGroup.rotation.y += rotationVelocityRef.current.y;
          moleculeGroup.rotation.x += rotationVelocityRef.current.x;

          // Subtle damping to idle drift
          rotationVelocityRef.current.x *= 0.95;
          rotationVelocityRef.current.y =
            rotationVelocityRef.current.y * 0.95 + 0.003 * 0.05;

          userRotationRef.current.x = moleculeGroup.rotation.x;
          userRotationRef.current.y = moleculeGroup.rotation.y;
        }
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

    // Pause WebGL rendering loop when offscreen
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

    // Initial render
    renderer.render(scene, camera);

    if (onReady) onReady();

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

    // WebGL Context Loss Handlers
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
      if (container) container.innerHTML = "";
    };
  }, [vitamin, autoRotate, onReady]);

  // Pointer drag interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    setIsInteracting(true);
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !moleculeGroupRef.current || !interactive) return;

    const deltaX = e.clientX - prevPointerRef.current.x;
    const deltaY = e.clientY - prevPointerRef.current.y;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };

    moleculeGroupRef.current.rotation.y += deltaX * 0.007;
    moleculeGroupRef.current.rotation.x += deltaY * 0.007;

    rotationVelocityRef.current = {
      x: deltaY * 0.003,
      y: deltaX * 0.003,
    };

    userRotationRef.current.x = moleculeGroupRef.current.rotation.x;
    userRotationRef.current.y = moleculeGroupRef.current.rotation.y;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDraggingRef.current = false;
    setIsInteracting(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Wheel zoom interaction
  const handleWheel = (e: React.WheelEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    setZoomLevel((prev) => {
      const next = prev + e.deltaY * 0.001;
      return Math.min(1.8, Math.max(0.6, next));
    });
  };

  return (
    <div
      className={`relative select-none touch-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      style={{ cursor: interactive ? (isInteracting ? "grabbing" : "grab") : "default" }}
      aria-label={`Molécula 3D de ${vitamin.name} (${vitamin.chemicalName})`}
    >
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full block" />

      {/* Discrete interaction hint when hovered or active */}
      {interactive && (
        <div className="absolute bottom-3 right-4 pointer-events-none flex items-center space-x-2 text-[10px] font-mono tracking-widest text-white/30 uppercase">
          <span>ARRASTE PARA GIRAR</span>
          <span>&middot;</span>
          <span>SCROLL ZOOM</span>
        </div>
      )}

      {/* Subtle re-center button when user has rotated or zoomed */}
      {interactive && (
        <button
          onClick={handleResetOrientation}
          title="Recentralizar orientação"
          className="absolute top-3 right-4 px-2 py-1 rounded text-[9px] font-mono uppercase tracking-widest text-white/40 hover:text-white/80 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors pointer-events-auto"
        >
          RESET 3D
        </button>
      )}
    </div>
  );
};
