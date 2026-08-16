"use client";

/**
 * TEMPORARY — Phase 3D live web test.
 * Compares the current A-villa-red-sun.glb and A-villa-red-sun.fbx exports
 * side by side, under identical camera/lighting/background conditions,
 * with measurements taken from the actual loaded runtime scene graph
 * (not hardcoded from the offline forensic audit).
 *
 * Loads three.js's GLTFLoader/FBXLoader/OrbitControls directly rather than
 * via @react-three/drei's barrel export — that barrel re-exports its full
 * feature set (Text3D, Splat, AsciiRenderer, etc.) and one of those
 * sub-modules fails to resolve in this project's Turbopack setup, which
 * breaks the whole import even though only 3 named exports were needed.
 *
 * Not part of the permanent portfolio narrative — isolated to this file
 * and its single call site in app/projects/villa-red-sun/page.tsx so it
 * can be removed by deleting both.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";

type Measurement = {
  loadTimeMs: number;
  width: number;
  depth: number;
  height: number;
  center: [number, number, number];
  meshCount: number;
  materialCount: number;
  materialSummaries: string[];
  triangleCount: number;
  textureCount: number;
};

function summarizeMaterial(mat: THREE.Material): string {
  const anyMat = mat as THREE.MeshStandardMaterial &
    THREE.MeshPhongMaterial & { opacity: number; transparent: boolean };
  const color =
    "color" in anyMat && anyMat.color
      ? `#${anyMat.color.getHexString()}`
      : "n/a";
  const opacity =
    typeof anyMat.opacity === "number" ? anyMat.opacity.toFixed(3) : "n/a";
  return `${mat.name || "(unnamed)"} — color ${color}, opacity ${opacity}, transparent=${String(anyMat.transparent)}`;
}

function measureScene(root: THREE.Object3D, loadTimeMs: number): Measurement {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  let meshCount = 0;
  let triangleCount = 0;
  let textureCount = 0;
  const materials = new Map<string, THREE.Material>();

  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    meshCount += 1;
    const geom = mesh.geometry;
    const posCount = geom.attributes.position?.count ?? 0;
    triangleCount += geom.index ? geom.index.count / 3 : posCount / 3;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) {
      if (m) materials.set(m.uuid, m);
      const anyMat = m as unknown as Record<string, unknown>;
      for (const key of ["map", "normalMap", "roughnessMap", "alphaMap"]) {
        if (anyMat[key]) textureCount += 1;
      }
    }
  });

  return {
    loadTimeMs,
    width: size.x,
    depth: size.z,
    height: size.y,
    center: [center.x, center.y, center.z],
    meshCount,
    materialCount: materials.size,
    materialSummaries: Array.from(materials.values()).map(summarizeMaterial),
    triangleCount: Math.round(triangleCount),
    textureCount,
  };
}

function FitCameraToScene({
  center,
  maxDim,
}: {
  center: [number, number, number];
  maxDim: number;
}) {
  const { camera } = useThree();
  useEffect(() => {
    const distance = maxDim * 1.6;
    const azimuth = THREE.MathUtils.degToRad(35);
    const elevation = THREE.MathUtils.degToRad(28);
    const x = center[0] + distance * Math.cos(elevation) * Math.sin(azimuth);
    const y = center[1] + distance * Math.sin(elevation);
    const z = center[2] + distance * Math.cos(elevation) * Math.cos(azimuth);
    camera.position.set(x, y, z);
    camera.lookAt(center[0], center[1], center[2]);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.updateProjectionMatrix();
    }
  }, [center, maxDim, camera]);
  return null;
}

/** Thin OrbitControls wrapper — three.js's own controls, driven directly,
 * no drei dependency. */
function OrbitControls({
  target,
  minDistance,
  maxDistance,
}: {
  target: [number, number, number];
  minDistance: number;
  maxDistance: number;
}) {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    const controls = new OrbitControlsImpl(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controlsRef.current = controls;
    return () => controls.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, gl]);

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.target.set(target[0], target[1], target[2]);
    controlsRef.current.minDistance = minDistance;
    controlsRef.current.maxDistance = maxDistance;
    controlsRef.current.update();
  }, [target, minDistance, maxDistance]);

  useFrame(() => controlsRef.current?.update());
  return null;
}

function GlbModel({ onMeasured }: { onMeasured: (m: Measurement) => void }) {
  const startRef = useRef(performance.now());
  const gltf = useLoader(GLTFLoader, "/3d-test/A-villa-red-sun.glb");
  useEffect(() => {
    onMeasured(measureScene(gltf.scene, performance.now() - startRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gltf]);
  return <primitive object={gltf.scene} />;
}

function FbxModel({ onMeasured }: { onMeasured: (m: Measurement) => void }) {
  const startRef = useRef(performance.now());
  const fbx = useLoader(FBXLoader, "/3d-test/A-villa-red-sun.fbx");
  useEffect(() => {
    onMeasured(measureScene(fbx, performance.now() - startRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbx]);
  return <primitive object={fbx} />;
}

function ViewerPanel({
  label,
  children,
  measurement,
}: {
  label: string;
  children: React.ReactNode;
  measurement: Measurement | null;
}) {
  const center = measurement?.center ?? [0, 0, 0];
  const maxDim = measurement
    ? Math.max(measurement.width, measurement.height, measurement.depth)
    : 10;

  return (
    <div className="flex-1 min-w-0">
      <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-3">
        {label}
      </p>
      <div className="aspect-square w-full border border-divider bg-[var(--color-env-stone)]">
        <Canvas
          camera={{ fov: 40, near: 0.01, far: 10000 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <color attach="background" args={["#ede7db"]} />
          <ambientLight intensity={0.65} />
          <directionalLight position={[8, 12, 6]} intensity={1.1} />
          <directionalLight position={[-6, 4, -8]} intensity={0.35} />
          <Suspense fallback={null}>{children}</Suspense>
          {measurement && <FitCameraToScene center={center} maxDim={maxDim} />}
          <OrbitControls
            target={center}
            minDistance={maxDim * 0.3}
            maxDistance={maxDim * 4}
          />
        </Canvas>
      </div>

      <div className="mt-4 font-body text-meta text-ink/80 space-y-1">
        {!measurement ? (
          <p className="text-neutral">Loading…</p>
        ) : (
          <>
            <p>
              Measured (m): {measurement.width.toFixed(2)} (W) ×{" "}
              {measurement.depth.toFixed(2)} (D) × {measurement.height.toFixed(2)} (H)
            </p>
            <p>Center: [{measurement.center.map((v) => v.toFixed(2)).join(", ")}]</p>
            <p>
              Meshes: {measurement.meshCount} · Materials: {measurement.materialCount} ·
              Triangles: {measurement.triangleCount.toLocaleString()} · Textures:{" "}
              {measurement.textureCount}
            </p>
            <p>Load time: {measurement.loadTimeMs.toFixed(0)} ms</p>
            {measurement.materialSummaries.map((s, i) => (
              <p key={i} className="text-neutral">
                Material {i}: {s}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export function ModelExportTest() {
  const [glbMeasurement, setGlbMeasurement] = useState<Measurement | null>(null);
  const [fbxMeasurement, setFbxMeasurement] = useState<Measurement | null>(null);

  const discrepancy = useMemo(() => {
    if (!glbMeasurement || !fbxMeasurement) return null;
    const dw = Math.abs(glbMeasurement.width - fbxMeasurement.width);
    const dd = Math.abs(glbMeasurement.depth - fbxMeasurement.depth);
    const dh = Math.abs(glbMeasurement.height - fbxMeasurement.height);
    const maxDelta = Math.max(dw, dd, dh);
    const maxDim = Math.max(
      glbMeasurement.width,
      glbMeasurement.depth,
      glbMeasurement.height,
    );
    return maxDelta / maxDim > 0.05; // >5% relative disagreement
  }, [glbMeasurement, fbxMeasurement]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 border-t border-divider">
      <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-4">
        Temporary — Phase 3D Live Test
      </p>
      <h2 className="font-display text-h1 text-ink mb-4 leading-tight">
        3d model export comparison
      </h2>
      <p className="prose-narrative text-body font-body text-ink/85 leading-relaxed mb-4">
        The current GLB and FBX exports of Villa Red Sun, rendered live, side by
        side, under identical camera framing, lighting, and background. Dimensions
        below are measured directly from the loaded scene graph in this browser —
        not copied from the earlier forensic report.
      </p>
      <p className="text-meta font-body text-neutral mb-12">
        Not part of the final portfolio. For live PM review only.
      </p>

      {discrepancy && (
        <p className="text-meta font-body text-accent mb-8 border border-accent/40 p-4">
          GLB and FBX measured dimensions disagree by more than 5% — see readouts
          below. Reported as-is, not silently reconciled.
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-12">
        <ViewerPanel label="GLB" measurement={glbMeasurement}>
          <GlbModel onMeasured={setGlbMeasurement} />
        </ViewerPanel>
        <ViewerPanel label="FBX" measurement={fbxMeasurement}>
          <FbxModel onMeasured={setFbxMeasurement} />
        </ViewerPanel>
      </div>
    </section>
  );
}
