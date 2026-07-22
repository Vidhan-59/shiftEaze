"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const COUNT = 70;
const RANGE_X = 17;
const RANGE_Y = 10;
const RANGE_Z = 12;
const LINK_DISTANCE = 4.4;

/**
 * Ambient WebGL backdrop — a drifting network of nodes that link when close,
 * evoking terminals/operators connected by live data. Purely decorative
 * (pointer-events-none, aria-hidden), tuned low-opacity so it never competes
 * with foreground text. Mounted client-only via dynamic import (see Hero.tsx)
 * so three.js never lands in the critical render path. Skips entirely under
 * prefers-reduced-motion.
 */
export function NetworkScene({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;
    if (!width || !height) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    // Node positions + gentle per-node drift velocities.
    const positions = new Float32Array(COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * RANGE_X;
      positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE_Y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * RANGE_Z;
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.006
        )
      );
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: 0x302e86,
      size: 0.16,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);

    const maxLines = COUNT * 8;
    const linePositions = new Float32Array(maxLines * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6b6a9e,
      transparent: true,
      opacity: 0.16,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);

    const group = new THREE.Group();
    group.add(points);
    group.add(lines);
    scene.add(group);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let alive = true;
    let raf = 0;

    const tick = () => {
      if (!alive) return;
      const pos = pointsGeo.attributes.position.array as Float32Array;

      for (let i = 0; i < COUNT; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        if (pos[i * 3] > RANGE_X / 2 || pos[i * 3] < -RANGE_X / 2) velocities[i].x *= -1;
        if (pos[i * 3 + 1] > RANGE_Y / 2 || pos[i * 3 + 1] < -RANGE_Y / 2) velocities[i].y *= -1;
        if (pos[i * 3 + 2] > RANGE_Z / 2 || pos[i * 3 + 2] < -RANGE_Z / 2) velocities[i].z *= -1;
      }
      pointsGeo.attributes.position.needsUpdate = true;

      let li = 0;
      for (let i = 0; i < COUNT && li < maxLines; i++) {
        for (let j = i + 1; j < COUNT && li < maxLines; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < LINK_DISTANCE * LINK_DISTANCE) {
            const base = li * 6;
            linePositions[base] = pos[i * 3];
            linePositions[base + 1] = pos[i * 3 + 1];
            linePositions[base + 2] = pos[i * 3 + 2];
            linePositions[base + 3] = pos[j * 3];
            linePositions[base + 4] = pos[j * 3 + 1];
            linePositions[base + 5] = pos[j * 3 + 2];
            li++;
          }
        }
      }
      lineGeo.setDrawRange(0, li * 2);
      lineGeo.attributes.position.needsUpdate = true;

      group.rotation.y += 0.0007;
      camera.position.x += (mouse.x * 2.4 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 1.6 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      const nowAlive = document.visibilityState === "visible";
      if (nowAlive && !alive) {
        alive = true;
        raf = requestAnimationFrame(tick);
      }
      if (!nowAlive) alive = false;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      pointsGeo.dispose();
      pointsMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={mountRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    />
  );
}
