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

// Optimized CPK Palette with rich visual contrast tailored for dark luxury aesthetics (Original version)
const ELEMENT_SPECS: Record<
  string,
  { color: number; radius: number; roughness: number; metalness: number }
> = {
  C: { color: 0x242226, radius: 0.38, roughness: 0.35, metalness: 0.2 },  // Carbon (Graphite Obsidian)
  H: { color: 0xf3ede2, radius: 0.22, roughness: 0.45, metalness: 0.05 }, // Hydrogen (Ivory Bone)
  O: { color: 0xd63031, radius: 0.36, roughness: 0.25, metalness: 0.1 },  // Oxygen (Ruby Crimson)
  N: { color: 0x0984e3, radius: 0.36, roughness: 0.25, metalness: 0.1 },  // Nitrogen (Sapphire Blue)
  P: { color: 0xe67e22, radius: 0.44, roughness: 0.3, metalness: 0.15 },  // Phosphorus (Amber Gold)
  S: { color: 0xfdcb6e, radius: 0.44, roughness: 0.3, metalness: 0.15 },  // Sulfur (Canary Topaz)
  Co: { color: 0x8e44ad, radius: 0.52, roughness: 0.15, metalness: 0.7 }, // Cobalt (Metallic Amethyst)
  Cl: { color: 0x2ecc71, radius: 0.42, roughness: 0.3, metalness: 0.15 }, // Chlorine: Emerald
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

  // Dynamically update camera position without rebuilding WebGL scene
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z =
        baseCameraDistRef.current * cameraDistanceMultiplier * zoomLevel;
    }
  }, [cameraDistanceMultiplier, zoomLevel]);

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
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting: Fast, crisp 3-point studio lighting (Original version)
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

    // Shared low/medium poly geometries for ultra smooth rendering (60-120fps)
    const sphereGeom = new THREE.SphereGeometry(1, 16, 12);
    const cylinderGeom = new THREE.CylinderGeometry(0.08, 0.08, 1, 10);
    const bondMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a847c,
      roughness: 0.35,
      metalness: 0.4,
    });
    const atomMaterials = new Map<string, THREE.MeshStandardMaterial>();

    const getLocalAtomMaterial = (element: string): THREE.MeshStandardMaterial => {
      let mat = atomMaterials.get(element);
      if (!mat) {
        const spec = ELEMENT_SPECS[element] || ELEMENT_SPECS.C;
        mat = new THREE.MeshStandardMaterial({
          color: spec.color,
          roughness: spec.roughness,
          metalness: spec.metalness,
        });
        atomMaterials.set(element, mat);
      }
      return mat;
    };

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

    // Add Atoms (Ball)
    atoms.forEach((atom) => {
      const spec = ELEMENT_SPECS[atom.element] || ELEMENT_SPECS.C;
      const mat = getLocalAtomMaterial(atom.element);

      const atomMesh = new THREE.Mesh(sphereGeom, mat);
      atomMesh.position.set(atom.x - centerX, atom.y - centerY, atom.z - centerZ);
      atomMesh.scale.setScalar(spec.radius);
      moleculeGroup.add(atomMesh);
    });

    // Add Bonds (Stick)
    const bonds = vitamin.bonds || [];
    bonds.forEach(([i1, i2]) => {
      const a1 = atoms[i1];
      const a2 = atoms[i2];
      if (!a1 || !a2) return;

      _v1.set(a1.x - centerX, a1.y - centerY, a1.z - centerZ);
      _v2.set(a2.x - centerX, a2.y - centerY, a2.z - centerZ);
      const distance = _v1.distanceTo(_v2);

      const cylinder = new THREE.Mesh(cylinderGeom, bondMaterial);
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
    const calculatedDist = Math.max(11, maxDist * 2.2);
    baseCameraDistRef.current = calculatedDist;
    camera.position.z = calculatedDist;

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
    const intersectionObserver = new IntersectionObserver(
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
    intersectionObserver.observe(container);

    // Dynamic ResizeObserver for accurate sizing on initial layout
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0 && renderer && camera) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
          renderer.render(scene, camera);
        }
      }
    });
    resizeObserver.observe(container);

    // Initial render
    renderer.render(scene, camera);

    if (onReady) onReady();

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
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      stopLoop();

      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);

      // Clean up local Three.js geometries and materials
      sphereGeom.dispose();
      cylinderGeom.dispose();
      bondMaterial.dispose();
      atomMaterials.forEach((m) => m.dispose());

      // Free WebGL context explicitly to avoid GPU context limit
      renderer.forceContextLoss();
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
    } catch { }
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
    } catch { }
  };

  // Wheel zoom interaction (only zooms if Ctrl/Meta key is held, otherwise lets page scroll freely)
  const handleWheel = (e: React.WheelEvent) => {
    if (!interactive) return;
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      setZoomLevel((prev) => {
        const next = prev + e.deltaY * 0.001;
        return Math.min(1.8, Math.max(0.6, next));
      });
    }
  };

  return (
    <div
      className={`relative select-none touch-pan-y ${className}`}
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
        <div className="absolute bottom-3 right-4 pointer-events-none flex items-center space-x-2 text-xs font-mono tracking-widest text-white/40 uppercase">
          <span>ARRASTE PARA GIRAR</span>
        </div>
      )}

      {/* Subtle re-center button when user has rotated or zoomed */}
      {interactive && (
        <button
          onClick={handleResetOrientation}
          title="Recentralizar orientação"
          className="absolute top-3 right-4 px-2.5 py-1 rounded text-xs font-mono uppercase tracking-wider text-white/50 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 transition-colors pointer-events-auto"
        >
          RESET 3D
        </button>
      )}
    </div>
  );
};
