"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.25, "rgba(163, 131, 86, 0.9)");
  gradient.addColorStop(0.62, "rgba(85, 125, 165, 0.32)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 96, 96);

  return new THREE.CanvasTexture(canvas);
}

function createTubeBetween(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  material: THREE.Material,
) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, length, 10),
    material,
  );

  mesh.position.copy(start).addScaledVector(direction, 0.5);
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize(),
  );

  return mesh;
}

function buildHelix(radius: number, height: number, turns: number) {
  const points: THREE.Vector3[] = [];

  for (let index = 0; index <= 180; index += 1) {
    const progress = index / 180;
    const angle = progress * Math.PI * 2 * turns;
    const wave = Math.sin(progress * Math.PI * 6) * 0.08;

    points.push(
      new THREE.Vector3(
        Math.cos(angle) * (radius + wave),
        -height / 2 + progress * height,
        Math.sin(angle) * (radius + wave),
      ),
    );
  }

  return new THREE.CatmullRomCurve3(points);
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

function createCircularGrid() {
  const group = new THREE.Group();
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xa4a7b2,
    transparent: true,
    opacity: 0.13,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const accentMaterial = new THREE.LineBasicMaterial({
    color: 0xa38356,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  [1.2, 1.85, 2.5, 3.15].forEach((radius, index) => {
    const points: THREE.Vector3[] = [];

    for (let step = 0; step <= 160; step += 1) {
      const angle = (step / 160) * Math.PI * 2;

      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          -1.81,
          Math.sin(angle) * radius,
        ),
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.LineSegments(
      geometry,
      index === 1 ? accentMaterial : lineMaterial,
    );

    group.add(line);
  });

  for (let index = 0; index < 24; index += 1) {
    const angle = (index / 24) * Math.PI * 2;
    const start = new THREE.Vector3(
      Math.cos(angle) * 0.85,
      -1.8,
      Math.sin(angle) * 0.85,
    );
    const end = new THREE.Vector3(
      Math.cos(angle) * 3.3,
      -1.8,
      Math.sin(angle) * 3.3,
    );
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);

    group.add(
      new THREE.LineSegments(
        geometry,
        index % 6 === 0 ? accentMaterial : lineMaterial,
      ),
    );
  }

  return group;
}

export function HeroOilScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const container = root;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isCompactViewport = window.matchMedia("(max-width: 767px)").matches;
    const sparkCount = isCompactViewport ? 180 : 280;
    const dropletCount = isCompactViewport ? 20 : 28;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x244766, 0.046);

    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 120);
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
    container.appendChild(renderer.domElement);

    const model = new THREE.Group();
    const wellhead = new THREE.Group();
    const rig = new THREE.Group();
    const helixGroup = new THREE.Group();
    const ringGroup = new THREE.Group();
    const gridGroup = createCircularGrid();
    const depthScale = new THREE.Group();

    scene.add(model);
    model.add(gridGroup, rig, wellhead, helixGroup, ringGroup, depthScale);

    const steel = new THREE.MeshPhysicalMaterial({
      color: 0x9fb2c4,
      roughness: 0.26,
      metalness: 0.88,
      clearcoat: 0.55,
      clearcoatRoughness: 0.18,
    });
    const darkSteel = new THREE.MeshPhysicalMaterial({
      color: 0x17334d,
      roughness: 0.36,
      metalness: 0.78,
      clearcoat: 0.35,
      clearcoatRoughness: 0.22,
    });
    const violet = new THREE.MeshPhysicalMaterial({
      color: 0x557da5,
      emissive: 0x1d3d5f,
      emissiveIntensity: 0.7,
      roughness: 0.28,
      metalness: 0.68,
      clearcoat: 0.62,
      clearcoatRoughness: 0.2,
    });
    const oil = new THREE.MeshPhysicalMaterial({
      color: 0x090705,
      emissive: 0x2b241c,
      emissiveIntensity: 0.8,
      roughness: 0.18,
      metalness: 0.42,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x9fb2c4,
      roughness: 0.08,
      metalness: 0,
      transparent: true,
      opacity: 0.12,
      transmission: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const orangeGlow = new THREE.MeshBasicMaterial({
      color: 0xa38356,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const violetGlow = new THREE.MeshBasicMaterial({
      color: 0x557da5,
      transparent: true,
      opacity: 0.36,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    scene.add(new THREE.AmbientLight(0x7a84a0, 0.34));

    const orangeLight = new THREE.PointLight(0xa38356, 66, 13);
    orangeLight.position.set(1.2, 1.2, 2.3);
    scene.add(orangeLight);

    const purpleLight = new THREE.PointLight(0x557da5, 48, 14);
    purpleLight.position.set(-2.6, 2.4, -2.2);
    scene.add(purpleLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe6d7c0, 1.45);
    rimLight.position.set(-4, 2.4, -3);
    scene.add(rimLight);

    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(1.62, 1.8, 0.2, 48),
      darkSteel,
    );
    floor.position.y = -1.7;
    wellhead.add(floor);

    const premiumPlinthMaterial = orangeGlow.clone();
    premiumPlinthMaterial.opacity = 0.5;
    const premiumPlinth = new THREE.Mesh(
      new THREE.TorusGeometry(1.82, 0.035, 12, 128),
      premiumPlinthMaterial,
    );
    premiumPlinth.position.y = -1.56;
    premiumPlinth.rotation.x = Math.PI / 2;
    wellhead.add(premiumPlinth);

    const centralPipe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.26, 3.35, 32),
      steel,
    );
    centralPipe.position.y = -0.1;
    wellhead.add(centralPipe);

    const innerOil = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.13, 3.5, 32),
      oil,
    );
    innerOil.position.y = -0.03;
    wellhead.add(innerOil);

    const glassCasing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.48, 3.55, 48, 1, true),
      glass,
    );
    glassCasing.position.y = -0.03;
    wellhead.add(glassCasing);

    const topValve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.34, 0.28, 32),
      violet,
    );
    topValve.position.y = 1.7;
    wellhead.add(topValve);

    const horizontalPipe = createTubeBetween(
      new THREE.Vector3(-1.45, 0.55, 0),
      new THREE.Vector3(1.45, 0.55, 0),
      0.13,
      steel,
    );
    wellhead.add(horizontalPipe);

    const depthPipe = createTubeBetween(
      new THREE.Vector3(0, -0.28, -1.16),
      new THREE.Vector3(0, -0.28, 1.16),
      0.1,
      steel,
    );
    wellhead.add(depthPipe);

    [-1, 1].forEach((side) => {
      const wheel = new THREE.Mesh(
        new THREE.TorusGeometry(0.32, 0.025, 12, 42),
        orangeGlow,
      );
      wheel.position.set(side * 1.63, 0.55, 0);
      wheel.rotation.y = Math.PI / 2;
      wellhead.add(wheel);

      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.18, 16),
        violet,
      );
      hub.position.copy(wheel.position);
      hub.rotation.z = Math.PI / 2;
      wellhead.add(hub);

      for (let spokeIndex = 0; spokeIndex < 4; spokeIndex += 1) {
        const spoke = createTubeBetween(
          new THREE.Vector3(side * 1.63, 0.55, 0),
          new THREE.Vector3(
            side * 1.63,
            0.55 + Math.sin((spokeIndex * Math.PI) / 2) * 0.28,
            Math.cos((spokeIndex * Math.PI) / 2) * 0.28,
          ),
          0.01,
          orangeGlow,
        );
        wellhead.add(spoke);
      }
    });

    for (let index = 0; index < 16; index += 1) {
      const angle = (index / 16) * Math.PI * 2;
      const bolt = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.05, 0.08),
        steel,
      );
      bolt.position.set(Math.cos(angle) * 0.45, -1.55, Math.sin(angle) * 0.45);
      bolt.rotation.y = -angle;
      wellhead.add(bolt);
    }

    const legPoints = [
      [new THREE.Vector3(-1.45, -1.65, -1.05), new THREE.Vector3(-0.38, 2.65, -0.28)],
      [new THREE.Vector3(1.45, -1.65, -1.05), new THREE.Vector3(0.38, 2.65, -0.28)],
      [new THREE.Vector3(-1.45, -1.65, 1.05), new THREE.Vector3(-0.38, 2.65, 0.28)],
      [new THREE.Vector3(1.45, -1.65, 1.05), new THREE.Vector3(0.38, 2.65, 0.28)],
    ] as const;

    legPoints.forEach(([start, end]) => {
      rig.add(createTubeBetween(start, end, 0.035, violet));
    });

    const braceLevels = [-1.08, -0.24, 0.64, 1.52];
    braceLevels.forEach((level, levelIndex) => {
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

    const crown = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.34, 0),
      orangeGlow,
    );
    crown.position.y = 2.85;
    rig.add(crown);

    const scaleMaterial = new THREE.LineBasicMaterial({
      color: 0xe8ecff,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const accentScaleMaterial = new THREE.LineBasicMaterial({
      color: 0xa38356,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    depthScale.position.set(2.18, 0.08, -0.38);
    depthScale.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -1.62, 0),
          new THREE.Vector3(0, 2.18, 0),
        ]),
        scaleMaterial,
      ),
    );

    for (let index = 0; index < 10; index += 1) {
      const y = -1.55 + index * 0.4;
      const major = index % 3 === 0;

      depthScale.add(
        new THREE.LineSegments(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, y, 0),
            new THREE.Vector3(major ? 0.36 : 0.2, y, 0),
          ]),
          major ? accentScaleMaterial : scaleMaterial,
        ),
      );
    }

    const reservoirBand = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.055, 10, 128),
      violetGlow.clone(),
    );
    reservoirBand.position.y = -1.92;
    reservoirBand.rotation.x = Math.PI / 2;
    model.add(reservoirBand);

    const oilCurve = buildHelix(0.48, 4.2, 3.45);
    const orangeFlow = new THREE.Mesh(
      new THREE.TubeGeometry(oilCurve, 220, 0.022, 9, false),
      orangeGlow,
    );
    const pressureFlow = new THREE.Mesh(
      new THREE.TubeGeometry(buildHelix(0.72, 4.0, 2.2), 180, 0.01, 7, false),
      violetGlow,
    );
    helixGroup.add(orangeFlow, pressureFlow);

    const ringMaterials: THREE.MeshBasicMaterial[] = [];
    [-0.85, 0.15, 1.12].forEach((height, index) => {
      const material = orangeGlow.clone();
      material.opacity = 0.18 - index * 0.035;
      ringMaterials.push(material);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.01, 8, 96), material);
      ring.position.y = height;
      ring.rotation.x = Math.PI / 2;
      ringGroup.add(ring);
    });

    const glowTexture = createGlowTexture();
    const sparkPositions = new Float32Array(sparkCount * 3);

    for (let index = 0; index < sparkCount; index += 1) {
      const radius = 1.2 + Math.random() * 4.6;
      const angle = Math.random() * Math.PI * 2;
      sparkPositions[index * 3] = Math.cos(angle) * radius;
      sparkPositions[index * 3 + 1] = -2 + Math.random() * 5.4;
      sparkPositions[index * 3 + 2] = Math.sin(angle) * radius - 1.2;
    }

    const sparkGeometry = new THREE.BufferGeometry();
    sparkGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(sparkPositions, 3),
    );

    const sparks = new THREE.Points(
      sparkGeometry,
      new THREE.PointsMaterial({
        color: 0xb99666,
        map: glowTexture ?? undefined,
        transparent: true,
        opacity: 0.82,
        size: 0.055,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scene.add(sparks);

    const dropletGeometry = new THREE.SphereGeometry(0.045, 12, 12);
    const droplets = new THREE.InstancedMesh(
      dropletGeometry,
      orangeGlow,
      dropletCount,
    );
    helixGroup.add(droplets);

    const dummy = new THREE.Object3D();
    const pointer = { x: 0, y: 0 };
    const smoothedPointer = { x: 0, y: 0 };
    const timer = new THREE.Timer();
    let isInViewport = true;
    let animationFrame = 0;

    timer.connect(document);

    function updateDroplets(time: number) {
      for (let index = 0; index < dropletCount; index += 1) {
        const progress = (index / dropletCount + time * 0.08) % 1;
        const angle = progress * Math.PI * 2 * 3.45 + time * 0.9;
        const radius = 0.48 + Math.sin(progress * Math.PI * 6) * 0.08;

        dummy.position.set(
          Math.cos(angle) * radius,
          -2.1 + progress * 4.2,
          Math.sin(angle) * radius,
        );
        dummy.scale.setScalar(0.65 + Math.sin(time * 4 + index) * 0.18);
        dummy.updateMatrix();
        droplets.setMatrixAt(index, dummy.matrix);
      }

      droplets.instanceMatrix.needsUpdate = true;
    }

    function resize() {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const isMobile = width < 768;
      const targetPixelRatio = isMobile ? 1.15 : 1.4;

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, targetPixelRatio),
      );
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = isMobile ? 54 : 43;
      camera.position.set(isMobile ? 2.7 : 4.4, isMobile ? 1.65 : 2.2, 8.2);
      camera.lookAt(isMobile ? 0.7 : 1.2, 0.15, 0);
      camera.updateProjectionMatrix();

      model.position.set(isMobile ? 0.58 : 2.15, isMobile ? -0.34 : -0.18, -1.25);
      model.scale.setScalar(isMobile ? 0.78 : 1);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    function handlePointerMove(event: PointerEvent) {
      const bounds = container.getBoundingClientRect();

      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    }

    if (!prefersCoarsePointer) {
      container.addEventListener("pointermove", handlePointerMove);
    }

    function drawFrame(time: number) {
      const pointerInfluence = prefersCoarsePointer ? 0 : 1;

      smoothedPointer.x += (pointer.x - smoothedPointer.x) * 0.045;
      smoothedPointer.y += (pointer.y - smoothedPointer.y) * 0.045;

      model.rotation.y =
        Math.sin(time * 0.22) * 0.12 + smoothedPointer.x * 0.1 * pointerInfluence;
      model.rotation.x = -0.08 + smoothedPointer.y * 0.035 * pointerInfluence;
      rig.rotation.y = Math.sin(time * 0.35) * 0.06;
      centralPipe.rotation.y = time * 0.18;
      glassCasing.rotation.y = -time * 0.08;
      topValve.rotation.y = time * 0.34;
      helixGroup.rotation.y = time * 0.52;
      gridGroup.rotation.y = -time * 0.035;
      reservoirBand.rotation.z = time * 0.08;
      sparks.rotation.y = time * 0.018;
      sparks.rotation.x = Math.sin(time * 0.12) * 0.045;
      crown.scale.setScalar(1 + Math.sin(time * 2.4) * 0.08);
      premiumPlinth.scale.setScalar(1 + Math.sin(time * 1.6) * 0.015);
      premiumPlinthMaterial.opacity = 0.42 + Math.sin(time * 1.6) * 0.08;

      ringGroup.children.forEach((ring, index) => {
        const pulse = (Math.sin(time * 1.55 + index * 1.7) + 1) / 2;

        ring.scale.setScalar(0.9 + pulse * 0.72);
        ring.rotation.z = time * (0.12 + index * 0.035);
        ringMaterials[index].opacity = 0.06 + pulse * 0.18;
      });

      orangeLight.intensity = 46 + Math.sin(time * 1.35) * 9;
      purpleLight.intensity = 34 + Math.cos(time * 1.1) * 7;

      updateDroplets(time);
      renderer.render(scene, camera);
    }

    function render(timestamp: number) {
      animationFrame = 0;
      timer.update(timestamp);
      const time = timer.getElapsed();
      const isVisibleDocument = document.visibilityState === "visible";

      drawFrame(time);

      if (!reduceMotion && isInViewport && isVisibleDocument) {
        animationFrame = requestAnimationFrame(render);
      }
    }

    function renderOnce() {
      timer.update(performance.now());
      drawFrame(timer.getElapsed());
    }

    function startAnimation() {
      if (
        reduceMotion ||
        animationFrame !== 0 ||
        !isInViewport ||
        document.visibilityState !== "visible"
      ) {
        return;
      }

      animationFrame = requestAnimationFrame(render);
    }

    function stopAnimation() {
      if (animationFrame !== 0) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        if (reduceMotion) {
          renderOnce();
        } else {
          startAnimation();
        }

        return;
      }

      stopAnimation();
    }

    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry?.isIntersecting ?? true;

        if (isInViewport) {
          if (reduceMotion) {
            renderOnce();
          } else {
            startAnimation();
          }

          return;
        }

        stopAnimation();
      },
      { threshold: 0.12 },
    );

    viewportObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (reduceMotion) {
      renderOnce();
    } else {
      startAnimation();
    }

    return () => {
      stopAnimation();
      observer.disconnect();
      viewportObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (!prefersCoarsePointer) {
        container.removeEventListener("pointermove", handlePointerMove);
      }
      container.removeChild(renderer.domElement);
      timer.dispose();
      disposeObject(scene);
      glowTexture?.dispose();
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
