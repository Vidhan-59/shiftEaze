"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * "The Living Roster Wall" — an instanced grid where rows = operators and
 * columns = days, coloured by ShiftEaze's DDNNOO rotation. A calm sine ripple
 * keeps it breathing; the signature beat is the AI absence→backfill loop:
 * a Day/Night tile flares maroon (predicted absence), pulses, then resolves to
 * a fresh indigo (auto-backfilled) before settling — the product, in motion.
 *
 * Colours are the site's own brand tokens (navy #302e86, accent #d51f2c, …),
 * NOT the 3D brief's slightly-different hexes — one canonical palette, per the
 * "don't leave three indigos floating around" guardrail.
 */

const SIZE = 0.62;
const GAP = 0.14;
const STEP = SIZE + GAP;

const C_DAY = new THREE.Color("#302e86"); // teal-400 (brand navy)
const C_NIGHT = new THREE.Color("#211d55"); // deeper navy for Night
const C_OFF = new THREE.Color("#a7abc9"); // muted indigo-gray, dimmed
const C_FLAG = new THREE.Color("#d51f2c"); // accent-500 — predicted absence
const C_BACKFILL = new THREE.Color("#4b49ab"); // teal-300 — fresh fill "pops"

const CYCLE = ["D", "D", "N", "N", "O", "O"] as const;

type Tile = { x: number; z: number; base: THREE.Color; working: boolean };
type Beat = { idx: number; start: number };

const BEAT_DURATION = 2.6; // seconds, full predict→settle arc
const SPAWN_EVERY = 1.5;
const MAX_CONCURRENT = 3;

function buildTiles(rows: number, cols: number): Tile[] {
  const tiles: Tile[] = [];
  const w = cols * STEP;
  const d = rows * STEP;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const type = CYCLE[(c + r) % CYCLE.length]; // per-row rotation offset
      const base = type === "D" ? C_DAY : type === "N" ? C_NIGHT : C_OFF;
      tiles.push({
        x: c * STEP - w / 2 + SIZE / 2,
        z: r * STEP - d / 2 + SIZE / 2,
        base: base.clone(),
        working: type !== "O", // Off tiles are never picked for absence beats
      });
    }
  }
  return tiles;
}

export function RosterWall({ rows, cols }: { rows: number; cols: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmp = useMemo(() => new THREE.Color(), []);
  const tiles = useMemo(() => buildTiles(rows, cols), [rows, cols]);
  const count = tiles.length;

  const beats = useRef<Beat[]>([]);
  const active = useRef<Set<number>>(new Set());
  const lastSpawn = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollN = useRef(0);

  // Seed every instance's base colour once (setColorAt lazily allocates the
  // instanceColor buffer). Per-frame we only rewrite tiles that are mid-beat.
  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    for (let i = 0; i < count; i++) m.setColorAt(i, tiles[i].base);
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [count, tiles]);

  // Passive listeners (no rAF of their own) feeding the shared useFrame loop.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scrollN.current = Math.min(1, window.scrollY / 700);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const t = clock.getElapsedTime();

    // Spawn a new absence beat on a random working tile.
    if (t - lastSpawn.current > SPAWN_EVERY && beats.current.length < MAX_CONCURRENT) {
      for (let tries = 0; tries < 12; tries++) {
        const idx = Math.floor(Math.random() * count);
        if (tiles[idx].working && !active.current.has(idx)) {
          beats.current.push({ idx, start: t });
          active.current.add(idx);
          lastSpawn.current = t;
          break;
        }
      }
    }

    let colorDirty = false;

    // Retire finished beats, restoring their base colour.
    beats.current = beats.current.filter((b) => {
      if (t - b.start > BEAT_DURATION) {
        active.current.delete(b.idx);
        m.setColorAt(b.idx, tiles[b.idx].base);
        colorDirty = true;
        return false;
      }
      return true;
    });

    // Ambient ripple — position only, all tiles.
    for (let i = 0; i < count; i++) {
      const tile = tiles[i];
      const y = Math.sin(t * 0.9 + tile.x * 0.4 + tile.z * 0.4) * 0.1;
      dummy.position.set(tile.x, y, tile.z);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }

    // Signature beat: override position + colour for tiles mid-arc.
    for (const b of beats.current) {
      const tile = tiles[b.idx];
      const p = (t - b.start) / BEAT_DURATION; // 0..1
      const baseY = Math.sin(t * 0.9 + tile.x * 0.4 + tile.z * 0.4) * 0.1;
      let lift = 0;
      let scale = 1;

      if (p < 0.22) {
        // predict — rise + redden
        const k = p / 0.22;
        lift = 0.55 * k;
        scale = 1 + 0.14 * k;
        tmp.copy(tile.base).lerp(C_FLAG, k);
      } else if (p < 0.58) {
        // alert — hold maroon, pulse
        const k = (p - 0.22) / 0.36;
        const pulse = 0.5 + 0.5 * Math.sin(k * Math.PI * 4);
        lift = 0.55 + pulse * 0.16;
        scale = 1.14;
        tmp.copy(C_FLAG);
      } else if (p < 0.82) {
        // resolve — maroon → fresh indigo backfill, pop
        const k = (p - 0.58) / 0.24;
        lift = 0.55 + Math.sin(k * Math.PI) * 0.12;
        scale = 1.14 + Math.sin(k * Math.PI) * 0.1;
        tmp.copy(C_FLAG).lerp(C_BACKFILL, k);
      } else {
        // settle — ease back down to base
        const k = (p - 0.82) / 0.18;
        lift = (1 - k) * 0.25;
        scale = 1 + (1 - k) * 0.05;
        tmp.copy(C_BACKFILL).lerp(tile.base, k);
      }

      dummy.position.set(tile.x, baseY + lift, tile.z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      m.setMatrixAt(b.idx, dummy.matrix);
      m.setColorAt(b.idx, tmp);
      colorDirty = true;
    }

    m.instanceMatrix.needsUpdate = true;
    if (colorDirty && m.instanceColor) m.instanceColor.needsUpdate = true;

    // Camera: pointer parallax (capped) + slow idle drift + gentle scroll dolly.
    const targetX = pointer.current.x * 1.1 + Math.sin(t * 0.05) * 0.3;
    const targetY = 9 - pointer.current.y * 0.5 + scrollN.current * 1.6;
    const targetZ = 12 + scrollN.current * 2.6;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return (
    <instancedMesh
      key={count}
      ref={mesh}
      args={[undefined, undefined, count] as never}
      frustumCulled={false}
    >
      <boxGeometry args={[SIZE, 0.14, SIZE]} />
      <meshStandardMaterial roughness={0.5} metalness={0.05} toneMapped={false} />
    </instancedMesh>
  );
}
