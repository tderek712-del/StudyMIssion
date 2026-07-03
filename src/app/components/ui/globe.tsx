// Aceternity-style Globe — ported to Vite (no next/dynamic)
// Requires: three, three-globe (both installed)
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ─── public types (match Aceternity's API) ────────────────────────────────────
export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  arcHeightMultiplier?: number;
  arcStroke?: number;
  ambientIntensity?: number;
};

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

// ─── World component ──────────────────────────────────────────────────────────
export function World({
  globeConfig,
  data,
}: {
  globeConfig: GlobeConfig;
  data: Position[];
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth  || 400;
    const H = mount.clientHeight || 400;

    // ── renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // Limit pixel ratio to improve initial load performance on high-DPI devices
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.setClearColor(0x061028, 0);
    renderer.domElement.style.opacity = '0';
    renderer.domElement.style.transition = 'opacity 0.25s ease';
    mount.appendChild(renderer.domElement);

    // ── scene & camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const aspect = W / H;
    const camZ   = aspect > 1 ? 300 / aspect + 200 : 480;

    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 2000);
    camera.position.set(0, 0, camZ);

    // initial orientation from config
    if (globeConfig.initialPosition) {
      const { lat, lng } = globeConfig.initialPosition;
      const phi   = ((90 - lat) * Math.PI) / 180;
      const theta = ((180 + lng) * Math.PI) / 180;
      camera.position.set(
        -camZ * Math.sin(phi) * Math.cos(theta),
         camZ * Math.cos(phi),
         camZ * Math.sin(phi) * Math.sin(theta)
      );
    }

    // ── controls ──────────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping    = true;
    controls.dampingFactor    = 0.05;
    controls.enableZoom       = false;
    controls.enablePan        = false;
    controls.autoRotate       = globeConfig.autoRotate      ?? true;
    controls.autoRotateSpeed  = globeConfig.autoRotateSpeed ?? 0.5;
    controls.minPolarAngle    = Math.PI * 0.3;
    controls.maxPolarAngle    = Math.PI * 0.7;

    // ── globe ─────────────────────────────────────────────────────────────────
    const globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true });
    globe.onGlobeReady(() => {
      renderer.domElement.style.opacity = '1';
    });

    globe
      .showAtmosphere(globeConfig.showAtmosphere ?? true)
      .atmosphereColor(globeConfig.atmosphereColor ?? '#ffffff')
      .atmosphereAltitude(globeConfig.atmosphereAltitude ?? 0.1);

    // Fetch country polygons from public/globe.json (served as static asset)
    fetch('/globe.json')
      .then(r => r.json())
      .then(geo => {
        globe
          .hexPolygonsData(geo.features)
          // lower resolution for faster render while keeping dotted look
          .hexPolygonResolution(2)
          .hexPolygonMargin(0.6)
          // force bright polygons for high contrast against the dark globe
          .hexPolygonColor(() => globeConfig.polygonColor ?? '#ffffff');
      })
      .catch(() => { /* polygon layer optional */ });

    // Material (needs a tick to be available after init) — increase contrast
    setTimeout(() => {
      const mat = globe.globeMaterial() as THREE.MeshPhongMaterial;
      // Strong dark base with low emissive so white polygons contrast sharply
      mat.color = new THREE.Color(globeConfig.globeColor ?? '#061028');
      mat.emissive = new THREE.Color(globeConfig.emissive ?? '#000000');
      mat.emissiveIntensity = globeConfig.emissiveIntensity ?? 0.02;
      mat.shininess = globeConfig.shininess ?? 0.9;
      // Slightly increase specular-like appearance
      (mat as any).specular = new THREE.Color('#111217');
    }, 0);

    // ── arcs ──────────────────────────────────────────────────────────────────
    globe
      .arcsData(data)
      .arcStartLat((d: any)  => d.startLat)
      .arcStartLng((d: any)  => d.startLng)
      .arcEndLat((d: any)    => d.endLat)
      .arcEndLng((d: any)    => d.endLng)
      .arcColor((d: any)     => d.color)
      // scale arc altitude to make arcs much higher above the globe
      .arcAltitude((d: any)  => (d.arcAlt || 0.2) * (globeConfig.arcHeightMultiplier ?? 3))
      .arcStroke(() => globeConfig.arcStroke ?? 0.9)
      .arcDashLength(globeConfig.arcLength ?? 0.8)
      .arcDashInitialGap((d: any) => d.order)
      .arcDashGap(18)
      .arcDashAnimateTime(() => globeConfig.arcTime ?? 900);

    scene.add(globe);

    // ── lighting ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(globeConfig.ambientLight ?? '#ffffff', globeConfig.ambientIntensity ?? 0.9));

    const dLeft = new THREE.DirectionalLight(globeConfig.directionalLeftLight ?? '#ffffff', 0.8);
    dLeft.position.set(-400, 100, 400);
    scene.add(dLeft);

    const dTop = new THREE.DirectionalLight(globeConfig.directionalTopLight ?? '#ffffff', 0.8);
    dTop.position.set(-200, 500, 200);
    scene.add(dTop);

    const pt = new THREE.PointLight(globeConfig.pointLight ?? '#ffffff', 0.8, 800);
    pt.position.set(-200, 500, 200);
    scene.add(pt);

    // ── resize ────────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(mount);

    // ── loop ──────────────────────────────────────────────────────────────────
    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
