"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

function createTubeBetween(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  material: THREE.Material,
) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, length, 12),
    material,
  );

  mesh.position.copy(start).addScaledVector(direction, 0.5);
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize(),
  );

  return mesh;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((node) => {
    if (
      node instanceof THREE.Mesh ||
      node instanceof THREE.Points ||
      node instanceof THREE.LineSegments
    ) {
      node.geometry.dispose();

      const materials = Array.isArray(node.material)
        ? node.material
        : [node.material];

      materials.forEach((material) => material.dispose());
    }
  });
}

function createCircularGrid(material: THREE.Material) {
  const group = new THREE.Group();

  [1.2, 1.85, 2.5, 3.15].forEach((radius) => {
    const points: THREE.Vector3[] = [];

    for (let step = 0; step <= 160; step += 1) {
      const angle = (step / 160) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          -1.84,
          Math.sin(angle) * radius,
        ),
      );
    }

    group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), material));
  });

  for (let index = 0; index < 20; index += 1) {
    const angle = (index / 20) * Math.PI * 2;

    group.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(Math.cos(angle) * 0.8, -1.82, Math.sin(angle) * 0.8),
          new THREE.Vector3(Math.cos(angle) * 3.45, -1.82, Math.sin(angle) * 3.45),
        ]),
        material,
      ),
    );
  }

  return group;
}

export function HeroOilScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = rootRef.current;

    if (!container) {
      return;
    }

    const root = container;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x12396f, 0.046);

    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "h-full w-full";
    root.appendChild(renderer.domElement);

    const model = new THREE.Group();
    const rig = new THREE.Group();
    const wellhead = new THREE.Group();
    const flow = new THREE.Group();
    const ringGroup = new THREE.Group();

    scene.add(model);
    model.add(rig, wellhead, flow, ringGroup);

    const steel = new THREE.MeshPhysicalMaterial({
      color: 0xaec0d1,
      roughness: 0.28,
      metalness: 0.86,
      clearcoat: 0.45,
    });
    const darkSteel = new THREE.MeshPhysicalMaterial({
      color: 0x15345a,
      roughness: 0.36,
      metalness: 0.78,
      clearcoat: 0.35,
    });
    const brandBlue = new THREE.MeshPhysicalMaterial({
      color: 0x12396f,
      emissive: 0x0b2d59,
      emissiveIntensity: 0.75,
      roughness: 0.3,
      metalness: 0.68,
      clearcoat: 0.6,
    });
    const orange = new THREE.MeshBasicMaterial({
      color: 0xff7a14,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0xd9e9f8,
      roughness: 0.08,
      transparent: true,
      opacity: 0.16,
      clearcoat: 1,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0xdbe8f5,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    scene.add(new THREE.AmbientLight(0x8ba5c0, 0.46));

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffb466, 1.7);
    rimLight.position.set(-4, 2.4, -3);
    scene.add(rimLight);

    const orangeLight = new THREE.PointLight(0xff6b00, 54, 14);
    orangeLight.position.set(1.2, 1.4, 2.6);
    scene.add(orangeLight);

    const blueLight = new THREE.PointLight(0x4a8dd0, 36, 14);
    blueLight.position.set(-2.6, 2.4, -2.2);
    scene.add(blueLight);

    model.add(createCircularGrid(gridMaterial));

    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(1.72, 1.92, 0.2, 56),
      darkSteel,
    );
    floor.position.y = -1.7;
    wellhead.add(floor);

    const plinth = new THREE.Mesh(new THREE.TorusGeometry(1.88, 0.035, 12, 128), orange);
    plinth.position.y = -1.55;
    plinth.rotation.x = Math.PI / 2;
    wellhead.add(plinth);

    const centralPipe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.26, 3.35, 32),
      steel,
    );
    centralPipe.position.y = -0.08;
    wellhead.add(centralPipe);

    const glassCasing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.48, 3.52, 48, 1, true),
      glass,
    );
    glassCasing.position.y = -0.03;
    wellhead.add(glassCasing);

    const topValve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.34, 0.28, 32),
      brandBlue,
    );
    topValve.position.y = 1.68;
    wellhead.add(topValve);

    wellhead.add(
      createTubeBetween(
        new THREE.Vector3(-1.45, 0.55, 0),
        new THREE.Vector3(1.45, 0.55, 0),
        0.13,
        steel,
      ),
    );
    wellhead.add(
      createTubeBetween(
        new THREE.Vector3(0, -0.28, -1.14),
        new THREE.Vector3(0, -0.28, 1.14),
        0.1,
        steel,
      ),
    );

    [-1, 1].forEach((side) => {
      const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.025, 12, 48), orange);
      wheel.position.set(side * 1.63, 0.55, 0);
      wheel.rotation.y = Math.PI / 2;
      wellhead.add(wheel);

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.18, 16), brandBlue);
      hub.position.copy(wheel.position);
      hub.rotation.z = Math.PI / 2;
      wellhead.add(hub);

      for (let spokeIndex = 0; spokeIndex < 4; spokeIndex += 1) {
        wellhead.add(
          createTubeBetween(
            new THREE.Vector3(side * 1.63, 0.55, 0),
            new THREE.Vector3(
              side * 1.63,
              0.55 + Math.sin((spokeIndex * Math.PI) / 2) * 0.28,
              Math.cos((spokeIndex * Math.PI) / 2) * 0.28,
            ),
            0.01,
            orange,
          ),
        );
      }
    });

    [
      [new THREE.Vector3(-1.45, -1.65, -1.05), new THREE.Vector3(-0.38, 2.65, -0.28)],
      [new THREE.Vector3(1.45, -1.65, -1.05), new THREE.Vector3(0.38, 2.65, -0.28)],
      [new THREE.Vector3(-1.45, -1.65, 1.05), new THREE.Vector3(-0.38, 2.65, 0.28)],
      [new THREE.Vector3(1.45, -1.65, 1.05), new THREE.Vector3(0.38, 2.65, 0.28)],
    ].forEach(([start, end]) => {
      rig.add(createTubeBetween(start, end, 0.035, brandBlue));
    });

    [-1.08, -0.24, 0.64, 1.52].forEach((level, levelIndex) => {
      const width = 1.18 - levelIndex * 0.2;
      const depth = 0.86 - levelIndex * 0.14;

      rig.add(
        createTubeBetween(
          new THREE.Vector3(-width, level, -depth),
          new THREE.Vector3(width, level + 0.58, -depth),
          0.017,
          steel,
        ),
      );
      rig.add(
        createTubeBetween(
          new THREE.Vector3(width, level, depth),
          new THREE.Vector3(-width, level + 0.58, depth),
          0.017,
          steel,
        ),
      );
      rig.add(
        createTubeBetween(
          new THREE.Vector3(-width, level, depth),
          new THREE.Vector3(width, level + 0.58, depth),
          0.017,
          steel,
        ),
      );
      rig.add(
        createTubeBetween(
          new THREE.Vector3(width, level, -depth),
          new THREE.Vector3(-width, level + 0.58, -depth),
          0.017,
          steel,
        ),
      );
    });

    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.34, 0), orange);
    crown.position.y = 2.85;
    rig.add(crown);

    [0.48, 0.72].forEach((radius, index) => {
      const points: THREE.Vector3[] = [];

      for (let step = 0; step <= 180; step += 1) {
        const progress = step / 180;
        const angle = progress * Math.PI * 2 * (index === 0 ? 3.45 : 2.2);
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            -2.1 + progress * 4.2,
            Math.sin(angle) * radius,
          ),
        );
      }

      flow.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 180, index === 0 ? 0.02 : 0.011, 8, false),
          orange,
        ),
      );
    });

    const ringMaterials: THREE.MeshBasicMaterial[] = [];
    [-0.85, 0.15, 1.12].forEach((height, index) => {
      const material = orange.clone();
      material.opacity = 0.1 + index * 0.035;
      ringMaterials.push(material);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.01, 8, 96), material);
      ring.position.y = height;
      ring.rotation.x = Math.PI / 2;
      ringGroup.add(ring);
    });

    const animationState = {
      time: 0,
    };

    function renderScene() {
      const width = Math.max(root.clientWidth, 1);
      const height = Math.max(root.clientHeight, 1);
      const isMobile = width < 768;
      const time = animationState.time;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 1.35));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = isMobile ? 54 : 43;
      camera.position.set(isMobile ? 2.7 : 4.4, isMobile ? 1.65 : 2.2, 8.2);
      camera.lookAt(isMobile ? 0.7 : 1.2, 0.15, 0);
      camera.updateProjectionMatrix();

      model.position.set(isMobile ? 0.58 : 2.15, isMobile ? -0.34 : -0.18, -1.25);
      model.rotation.set(-0.08, isMobile ? 0.08 : 0.18, 0);
      model.scale.setScalar(isMobile ? 0.78 : 1);

      flow.rotation.y = 0;
      plinth.scale.setScalar(1 + Math.sin(time * 1.5) * 0.014);
      orangeLight.intensity = 48 + Math.sin(time * 1.25) * 7;
      blueLight.intensity = 32 + Math.cos(time * 1.1) * 5;
      crown.scale.setScalar(1 + Math.sin(time * 2.2) * 0.045);

      ringGroup.children.forEach((ring, index) => {
        const pulse = (Math.sin(time * 1.5 + index * 1.6) + 1) / 2;

        ring.scale.setScalar(0.9 + pulse * 0.6);
        ringMaterials[index].opacity = 0.05 + pulse * 0.16;
      });

      renderer.render(scene, camera);
    }

    const observer = new ResizeObserver(renderScene);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      animationState.time += gsap.ticker.deltaRatio(60) / 60;
      renderScene();
    };

    observer.observe(root);
    renderScene();
    if (!reduceMotion) {
      gsap.ticker.add(tick);
    }

    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      if (renderer.domElement.parentNode === root) {
        root.removeChild(renderer.domElement);
      }
      disposeObject(scene);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-hero-media
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    />
  );
}
