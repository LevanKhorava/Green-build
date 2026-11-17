#!/usr/bin/env node
/**
 * Generates src/data/floorPlanRegions.ts — the clickable apartment outlines of the
 * interactive floor plans — from the architect's floor sheets.
 *
 *   node scripts/floor-plans/extract-regions.mjs --src <folder with the sheets> [--debug <folder>]
 *
 * <folder with the sheets> holds the original 5032×3579 JPGs whose file names start with
 * the storey number ("1 სართული.jpg" … "11 სართული.jpg"). Needs ffmpeg on PATH; no npm
 * packages. With --debug, one overlay JPG per storey (shipped outlines drawn over the
 * sheet) is written to that folder for a visual check.
 *
 * The sheets shown on the site (src/assets/floor-plans/floor-<N>.avif) are made from the
 * same JPGs, uncropped, with:
 *
 *   ffmpeg -i "<N> სართული.jpg" -vf "scale=2516:1790:flags=lanczos,format=yuv420p" \
 *     -frames:v 1 -c:v libsvtav1 -crf 26 -preset 4 floor-<N>.avif
 *
 * Keep both dimensions even: Chrome shows nothing for a 4:2:0 AVIF whose width or height
 * is odd when it is stored as tiles (which is what macOS `sips` writes), although macOS
 * itself opens such a file without complaint.
 *
 * How it works: every apartment on a sheet is a flat green or blue fill. The script
 * finds those fills, attaches detached balcony / terrace pieces and the white furniture
 * drawn inside each apartment, traces the outline, simplifies it and names it with the
 * apartment number from the tables below (the numbers printed on the sheets). It then
 * refuses to write the file unless every check in "gate" passes on all 11 sheets.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SHEET_W = 5032;
const SHEET_H = 3579;
// Work at half resolution: plenty for outlines and four times less to chew through.
const W = SHEET_W / 2;
const H = Math.round(SHEET_H / 2);
const N = W * H;
const SCALE = SHEET_W / W;

/**
 * Apartments per sheet: [x %, y %, number, total m² printed on the label].
 * (x, y) is a point inside the apartment, in percent of the sheet. Sheets 3–7 repeat
 * sheet 2 with +17 per storey; sheet 9 repeats the tower part of sheet 8 with +8.
 */
const TYPICAL = [
  [15.4, 63.6, 17, 93.0], [15.6, 82.0, 16, 65.7], [23.6, 80.9, 15, 52.0], [28.9, 59.8, 18, 55.3],
  [32.6, 79.3, 14, 75.2], [36.6, 58.2, 19, 57.1], [46.1, 54.5, 25, 72.3], [48.4, 73.0, 24, 82.3],
  [54.6, 49.9, 26, 51.5], [58.9, 69.0, 23, 53.4], [61.8, 46.5, 27, 53.2], [66.4, 65.1, 22, 55.2],
  [69.2, 43.0, 28, 51.2], [76.1, 61.2, 21, 82.4], [76.2, 39.7, 29, 51.1], [84.0, 37.2, 30, 63.0],
  [88.1, 53.9, 20, 63.0],
];
const TOWER = [
  [12.0, 62.7, 119, 93.0], [12.1, 83.2, 118, 65.7], [20.8, 82.2, 117, 52.0],
  [26.5, 59.0, 120, 55.3], [30.6, 80.5, 116, 75.2], [34.9, 57.3, 121, 57.1],
];
const offset = (rows, by) => rows.map(([x, y, n, m2]) => [x, y, n + by, m2]);
const UNITS = {
  1: [
    // Apartment 2's label misprints its total as 75.2; its parts (40.2 + 11.8) give 52.0.
    [16.3, 65.9, 4, 73.7], [16.3, 81.5, 3, 65.6], [24.2, 80.4, 2, 52.0], [31.8, 61.6, 5, 65.3],
    [33.2, 79.0, 1, 75.2], [47.3, 56.7, 10, 56.1], [49.1, 72.9, 9, 82.3], [55.7, 52.4, 11, 39.5],
    [59.5, 68.8, 8, 53.4], [62.9, 48.9, 12, 40.7], [67.0, 64.7, 7, 55.2], [72.6, 44.4, 13, 62.3],
    [75.6, 59.4, 6, 58.2],
  ],
  2: TYPICAL,
  3: offset(TYPICAL, 17),
  4: offset(TYPICAL, 34),
  5: offset(TYPICAL, 51),
  6: offset(TYPICAL, 68),
  7: offset(TYPICAL, 85),
  8: [...TOWER, [49.6, 61.0, 123, 266.2], [75.3, 50.5, 122, 481.3]],
  9: offset(TOWER, 8),
  10: [
    [41.4, 52.1, 133, 93.0], [41.6, 76.9, 132, 65.7], [52.4, 75.6, 131, 52.0],
    [59.4, 46.9, 134, 55.3], [64.5, 73.5, 130, 75.2], [69.8, 44.8, 135, 57.1],
  ],
  11: [[36.6, 51.9, 138, 99.3], [39.1, 75.6, 137, 94.0], [57.3, 72.9, 136, 99.6], [60.0, 44.8, 139, 110.5]],
};

/** Points on corridors, stairs and lifts (x %, y %): no outline may contain them. */
const PUBLIC_TYPICAL = [[25.0, 71.0], [35.8, 71.9], [40.8, 76.7], [65.0, 55.6], [52.0, 65.8], [81.0, 54.5]];
const PUBLIC = {
  1: [[25.0, 69.5], [62.0, 56.5], [35.8, 69.7], [52.0, 64.0]],
  2: PUBLIC_TYPICAL, 3: PUBLIC_TYPICAL, 4: PUBLIC_TYPICAL, 5: PUBLIC_TYPICAL, 6: PUBLIC_TYPICAL, 7: PUBLIC_TYPICAL,
  8: [[25.0, 69.0], [79.5, 52.0], [83.5, 53.5]],
  9: [[25.0, 69.0], [60.0, 60.0]],
  10: [[53.0, 62.0], [68.3, 64.0]],
  11: [[55.0, 58.7], [63.0, 62.5], [46.6, 64.2]],
};

/** Median outline area per printed m² (sheet px²) of the reviewed run, per drawing scale. */
const REFERENCE_SCALE = { 1: 3682, 2: 3684, 3: 3684, 4: 3684, 5: 3684, 6: 3684, 7: 3684, 8: 4401, 9: 4401, 10: 6781, 11: 6789 };
/**
 * How far an outline's area may be from the m² printed on its label, relative to the rest
 * of the sheet. Storeys 2–11 land within 2 % (6 % for penthouse 122 with its terrace and for
 * 132, whose fill is drawn too wide on sheet 10). Storey 1 needs more room: its balconies
 * are drawn shallower than the m² printed for them (apartments 1–3 and 7–9 come out 4–9 % small).
 */
const AREA_TOLERANCE = { 1: 0.1 };
const DEFAULT_AREA_TOLERANCE = 0.07;

// ---------------------------------------------------------------------------------------
// Small raster toolkit (binary masks as Uint8Array, row-major)

/** Square dilation (grow = true) or erosion of a w×h mask by `radius` pixels. */
function morph(src, w, h, radius, grow) {
  const pass = (input, stride, count, lines) => {
    const out = new Uint8Array(w * h);
    for (let line = 0; line < lines; line++) {
      for (let i = 0; i < count; i++) {
        let value = grow ? 0 : 1;
        for (let d = -radius; d <= radius; d++) {
          const j = i + d;
          const sample = j < 0 || j >= count ? 0 : input[stride === 1 ? line * w + j : j * w + line];
          if (grow ? sample : !sample) { value = grow ? 1 : 0; break; }
        }
        out[stride === 1 ? line * w + i : i * w + line] = value;
      }
    }
    return out;
  };
  return pass(pass(src, 1, w, h), w, h, w);
}
const close = (mask, w, h, radius) => morph(morph(mask, w, h, radius, true), w, h, radius, false);
const open = (mask, w, h, radius) => morph(morph(mask, w, h, radius, false), w, h, radius, true);

const stack = new Int32Array(N);
/** Calls `visit(pixels)` for every 4-connected component of a w×h mask. */
function components(mask, w, h, visit) {
  const seen = new Uint8Array(w * h);
  for (let start = 0; start < w * h; start++) {
    if (!mask[start] || seen[start]) continue;
    let top = 0;
    stack[top++] = start;
    seen[start] = 1;
    const pixels = [];
    while (top) {
      const p = stack[--top];
      pixels.push(p);
      const x = p % w;
      if (x > 0 && mask[p - 1] && !seen[p - 1]) { seen[p - 1] = 1; stack[top++] = p - 1; }
      if (x < w - 1 && mask[p + 1] && !seen[p + 1]) { seen[p + 1] = 1; stack[top++] = p + 1; }
      if (p >= w && mask[p - w] && !seen[p - w]) { seen[p - w] = 1; stack[top++] = p - w; }
      if (p < w * h - w && mask[p + w] && !seen[p + w]) { seen[p + w] = 1; stack[top++] = p + w; }
    }
    visit(pixels);
  }
}

/** Outline of the component containing the first set pixel, as corner points (clockwise). */
function trace(mask, w, h) {
  const first = mask.indexOf(1);
  if (first < 0) return [];
  const inside = (x, y) => x >= 0 && y >= 0 && x < w && y < h && mask[y * w + x] === 1;
  const x0 = first % w;
  const y0 = (first - x0) / w;
  let x = x0, y = y0, dir = 0; // 0 right, 1 down, 2 left, 3 up — the shape stays on the right
  const points = [];
  for (let steps = 0; ; steps++) {
    let left, right; // the two pixels ahead of the current corner
    if (dir === 0) { left = inside(x, y - 1); right = inside(x, y); }
    else if (dir === 1) { left = inside(x, y); right = inside(x - 1, y); }
    else if (dir === 2) { left = inside(x - 1, y); right = inside(x - 1, y - 1); }
    else { left = inside(x - 1, y - 1); right = inside(x, y - 1); }
    const next = !right ? (dir + 1) % 4 : left ? (dir + 3) % 4 : dir;
    if (steps > 0 && x === x0 && y === y0 && next === 0) break;
    if (next !== dir || steps === 0) points.push([x, y]);
    dir = next;
    if (dir === 0) x++; else if (dir === 1) y++; else if (dir === 2) x--; else y--;
    if (steps > 8e6) throw new Error("outline tracing did not terminate");
  }
  return points;
}

/** Douglas–Peucker on a closed ring. */
function simplify(ring, tolerance) {
  if (ring.length < 4) return ring;
  const reduce = (points) => {
    const keep = new Uint8Array(points.length);
    keep[0] = keep[points.length - 1] = 1;
    const todo = [[0, points.length - 1]];
    while (todo.length) {
      const [a, b] = todo.pop();
      const [ax, ay] = points[a], [bx, by] = points[b];
      const dx = bx - ax, dy = by - ay, length = Math.hypot(dx, dy) || 1;
      let worst = 0, at = -1;
      for (let i = a + 1; i < b; i++) {
        const distance = Math.abs(dy * (points[i][0] - ax) - dx * (points[i][1] - ay)) / length;
        if (distance > worst) { worst = distance; at = i; }
      }
      if (worst > tolerance) { keep[at] = 1; todo.push([a, at], [at, b]); }
    }
    return points.filter((_, i) => keep[i]);
  };
  let far = 0, best = 0;
  for (let i = 1; i < ring.length; i++) {
    const d = (ring[i][0] - ring[0][0]) ** 2 + (ring[i][1] - ring[0][1]) ** 2;
    if (d > best) { best = d; far = i; }
  }
  const a = reduce(ring.slice(0, far + 1));
  const b = reduce(ring.slice(far).concat([ring[0]]));
  return a.slice(0, -1).concat(b.slice(0, -1));
}

/** Angle at each vertex and the lengths of its two edges. */
function corner(ring, i) {
  const [px, py] = ring[(i + ring.length - 1) % ring.length];
  const [vx, vy] = ring[i];
  const [qx, qy] = ring[(i + 1) % ring.length];
  const ax = px - vx, ay = py - vy, bx = qx - vx, by = qy - vy;
  const la = Math.hypot(ax, ay), lb = Math.hypot(bx, by);
  const cos = Math.max(-1, Math.min(1, (ax * bx + ay * by) / (la * lb || 1)));
  return { angle: (Math.acos(cos) * 180) / Math.PI, la, lb };
}
const NEEDLE_ANGLE = 15;
const NEEDLE_LEG = 10; // half-resolution pixels
const isNeedle = (ring, i) => {
  const { angle, la, lb } = corner(ring, i);
  return angle < NEEDLE_ANGLE && la > NEEDLE_LEG && lb > NEEDLE_LEG;
};
/** Drops zero-width spikes (the outline running out along a wall and straight back). */
function dropNeedles(ring) {
  let points = ring;
  for (let changed = true; changed && points.length > 3; ) {
    changed = false;
    for (let i = 0; i < points.length; i++) {
      if (isNeedle(points, i)) { points = points.filter((_, j) => j !== i); changed = true; break; }
    }
  }
  return points;
}

/** Calls `paint(x, y)` for every pixel centre inside the rings (even-odd, so holes work). */
function fill(rings, paint) {
  let top = H, bottom = 0;
  for (const ring of rings) for (const [, y] of ring) { if (y < top) top = y; if (y > bottom) bottom = y; }
  for (let y = Math.max(0, Math.floor(top)); y < Math.min(H, Math.ceil(bottom)); y++) {
    const yc = y + 0.5;
    const crossings = [];
    for (const ring of rings) {
      for (let i = 0; i < ring.length; i++) {
        const [x1, y1] = ring[i], [x2, y2] = ring[(i + 1) % ring.length];
        if ((y1 <= yc && y2 > yc) || (y2 <= yc && y1 > yc)) crossings.push(x1 + ((yc - y1) * (x2 - x1)) / (y2 - y1));
      }
    }
    crossings.sort((a, b) => a - b);
    for (let k = 0; k + 1 < crossings.length; k += 2) {
      const from = Math.max(0, Math.ceil(crossings[k] - 0.5));
      const to = Math.min(W - 1, Math.floor(crossings[k + 1] - 0.5));
      for (let x = from; x <= to; x++) paint(x, y);
    }
  }
}
const contains = (rings, x, y) => {
  let inside = false;
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i], [xj, yj] = ring[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
  }
  return inside;
};
const ringArea = (ring) => {
  let twice = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ring[i], [x2, y2] = ring[(i + 1) % ring.length];
    twice += x1 * y2 - x2 * y1;
  }
  return Math.abs(twice) / 2;
};
const shapeArea = (rings) => rings.reduce((sum, ring, i) => sum + (i === 0 ? 1 : -1) * ringArea(ring), 0);
const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

// ---------------------------------------------------------------------------------------
// One sheet: pixels → apartment outlines

const GREEN = 1, BLUE = 2, WHITE = 3, DARK = 4;
const APARTMENT_MIN = 20000; // px: smaller fills are balcony strips or stray patches
const PIECE_MIN = 600;
const FIXTURE_MAX = 12000; // px: larger white areas are corridors, stairs or the page itself
const HOLE_MIN = 5000; // px: smaller holes are furniture; larger ones are public cores

function decode(file) {
  const rgb = execFileSync(
    "ffmpeg",
    ["-v", "error", "-i", file, "-vf", `scale=${W}:${H}:flags=area`, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
    { maxBuffer: N * 3 + 1024 },
  );
  if (rgb.length !== N * 3) throw new Error(`${file}: unexpected image size`);
  const kind = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    const r = rgb[3 * i], g = rgb[3 * i + 1], b = rgb[3 * i + 2];
    if (g > r + 10 && g > b + 14 && r >= 140 && r <= 200 && g >= 165 && g <= 225) kind[i] = GREEN;
    else if (b > r + 40 && b > g + 15 && r >= 100 && r <= 175 && b >= 190) kind[i] = BLUE;
    else if (r >= 200 && g >= 200 && b >= 200) kind[i] = WHITE;
    else if (r < 110 && g < 110 && b < 110) kind[i] = DARK;
  }
  return { rgb, kind };
}

function extract(sheet, file) {
  const { rgb, kind } = decode(file);

  // 1. Apartments = large fills of one colour. Radius 2 bridges door swings and thin lines
  //    but not the wall between two same-coloured neighbours (24 / 25 on storeys 2–7).
  const owner = new Int32Array(N); // pixel → region id (1-based), 0 = none
  const regions = [];
  const pieces = [];
  for (const colour of [GREEN, BLUE]) {
    const mask = close(Uint8Array.from(kind, (k) => (k === colour ? 1 : 0)), W, H, 2);
    components(mask, W, H, (pixels) => {
      if (pixels.length >= APARTMENT_MIN) {
        const id = regions.length + 1;
        let sx = 0;
        for (const p of pixels) { owner[p] = id; sx += p % W; }
        regions.push({ id, colour, x: (100 * sx) / pixels.length / W, multipart: false, dropped: false });
      } else if (pixels.length >= PIECE_MIN) {
        pieces.push({ pixels, colour });
      }
    });
  }

  // 2. A detached piece (balcony strip behind a wall) joins the same-coloured apartment it
  //    faces within 10 px. Pieces facing none stay out (a stray patch on sheet 11).
  for (const piece of pieces) {
    const votes = new Map();
    for (const p of piece.pixels) {
      const x = p % W, y = (p - x) / W;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        for (let d = 1; d <= 10; d++) {
          const xx = x + dx * d, yy = y + dy * d;
          if (xx < 0 || yy < 0 || xx >= W || yy >= H) break;
          const id = owner[yy * W + xx];
          if (id) { if (regions[id - 1].colour === piece.colour) votes.set(id, (votes.get(id) ?? 0) + 1); break; }
        }
      }
    }
    const [id, count] = [...votes].sort((a, b) => b[1] - a[1])[0] ?? [0, 0];
    if (id && count >= 30) { for (const p of piece.pixels) owner[p] = id; regions[id - 1].multipart = true; }
  }

  // 3. Storey 8: the two penthouses in the wing are drawn as an interior plus roof terraces
  //    behind walls. Everything of one colour in the wing is one apartment.
  if (sheet === 8) {
    for (const colour of [GREEN, BLUE]) {
      const [keep, ...rest] = regions.filter((r) => r.colour === colour && r.x > 38);
      for (const extra of rest) {
        for (let i = 0; i < N; i++) if (owner[i] === extra.id) owner[i] = keep.id;
        extra.dropped = true;
        keep.multipart = true;
      }
    }
  }
  const fillOwner = Int32Array.from(owner); // coloured pixels only, before furniture is added

  // 4. Furniture is drawn white. A small white patch belongs to an apartment when what
  //    surrounds it is that apartment's fill and walls — not corridor white, which keeps the
  //    door-swing wedges drawn in corridors out.
  const patchOf = new Int32Array(N);
  const patchIsLarge = [false];
  const patches = [];
  components(Uint8Array.from(kind, (k, i) => (k === WHITE && !owner[i] ? 1 : 0)), W, H, (pixels) => {
    const id = patchIsLarge.length;
    for (const p of pixels) patchOf[p] = id;
    patchIsLarge.push(pixels.length > FIXTURE_MAX);
    if (pixels.length <= FIXTURE_MAX && pixels.length >= 6) patches.push({ id, pixels });
  });
  const wall = open(Uint8Array.from(kind, (k) => (k === DARK ? 1 : 0)), W, H, 1); // thick lines only
  const AROUND = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  // Repeated until nothing changes: a bed is drawn as several white pieces, and the
  // nightstand between the mattress and the wall only touches the apartment through the
  // mattress, which has to be attached first.
  let pending = patches;
  for (let attached = true; attached; ) {
    attached = false;
    const still = [];
    for (const patch of pending) {
      const votes = new Map();
      let ownHits = 0, wallHits = 0, corridorHits = 0;
      for (const p of patch.pixels) {
        const x = p % W, y = (p - x) / W;
        for (const [dx, dy] of AROUND) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H || patchOf[ny * W + nx] === patch.id) continue;
          let dark = 0;
          for (let d = 1; d <= 6; d++) {
            const xx = x + dx * d, yy = y + dy * d;
            if (xx < 0 || yy < 0 || xx >= W || yy >= H) break;
            const q = yy * W + xx;
            const id = owner[q]; // an apartment's fill, or furniture already attached to it
            if (id) { ownHits++; votes.set(id, (votes.get(id) ?? 0) + 1); break; }
            const other = patchOf[q];
            if (other) { if (other !== patch.id && patchIsLarge[other]) corridorHits++; break; }
            if (wall[q] && ++dark >= 3) { wallHits++; break; }
          }
        }
      }
      const [id, count] = [...votes].sort((a, b) => b[1] - a[1])[0] ?? [0, 0];
      const decisive = ownHits + wallHits + corridorHits;
      if (ownHits >= 8 && count / ownHits >= 0.85 && corridorHits <= 0.15 * decisive && ownHits >= 0.3 * decisive) {
        for (const p of patch.pixels) owner[p] = id;
        attached = true;
      } else {
        still.push(patch);
      }
    }
    pending = still;
  }

  // 5. Per apartment: close the remaining gaps (interior walls, text, thin lines), fill
  //    furniture-sized holes, keep large ones (a public core the apartment wraps around),
  //    trace, simplify.
  const live = regions.filter((r) => !r.dropped);
  const box = new Map(live.map((r) => [r.id, [W, H, 0, 0]]));
  for (let i = 0; i < N; i++) {
    const b = box.get(owner[i]);
    if (!b) continue;
    const x = i % W, y = (i - x) / W;
    if (x < b[0]) b[0] = x;
    if (y < b[1]) b[1] = y;
    if (x > b[2]) b[2] = x;
    if (y > b[3]) b[3] = y;
  }
  for (const region of live) {
    const pad = 14;
    const [bx0, by0, bx1, by1] = box.get(region.id);
    const x0 = Math.max(0, bx0 - pad), y0 = Math.max(0, by0 - pad);
    const w = Math.min(W - 1, bx1 + pad) - x0 + 1, h = Math.min(H - 1, by1 + pad) - y0 + 1;
    let mask = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (owner[(y + y0) * W + x + x0] === region.id) mask[y * w + x] = 1;
    mask = close(mask, w, h, region.multipart ? 7 : 4);

    // Everything not reachable from the edge of the box is a hole.
    const outside = new Uint8Array(w * h);
    let top = 0;
    const reach = (p) => { if (!mask[p] && !outside[p]) { outside[p] = 1; stack[top++] = p; } };
    for (let x = 0; x < w; x++) { reach(x); reach((h - 1) * w + x); }
    for (let y = 0; y < h; y++) { reach(y * w); reach(y * w + w - 1); }
    while (top) {
      const p = stack[--top];
      const x = p % w;
      if (x > 0) reach(p - 1);
      if (x < w - 1) reach(p + 1);
      if (p >= w) reach(p - w);
      if (p < w * h - w) reach(p + w);
    }
    const holes = [];
    components(Uint8Array.from(mask, (m, i) => (!m && !outside[i] ? 1 : 0)), w, h, (pixels) => {
      if (pixels.length >= HOLE_MIN) holes.push(pixels);
      else for (const p of pixels) mask[p] = 1;
    });

    // Outer outline: the solid shape (holes filled in), minus hair-thin spikes.
    let solid = Uint8Array.from(mask);
    for (const hole of holes) for (const p of hole) solid[p] = 1;
    solid = open(solid, w, h, 1);
    let largest = [];
    components(solid, w, h, (pixels) => { if (pixels.length > largest.length) largest = pixels; });
    const outer = new Uint8Array(w * h);
    for (const p of largest) outer[p] = 1;

    const toSheet = (ring) => dropNeedles(simplify(ring, 2)).map(([x, y]) => [x + x0, y + y0]);
    region.rings = [toSheet(trace(outer, w, h))];
    for (const hole of holes) {
      const holeMask = new Uint8Array(w * h);
      for (const p of hole) holeMask[p] = 1;
      region.rings.push(toSheet(trace(holeMask, w, h)));
    }
    let sx = 0, sy = 0, count = 0;
    fill(region.rings, (x, y) => { sx += x; sy += y; count++; });
    region.centre = [(100 * sx) / count / W, (100 * sy) / count / H];
  }

  // 6. Name every outline with the apartment number printed next to it.
  const table = UNITS[sheet];
  const taken = new Set();
  for (const region of live) {
    const [x, y, number] = [...table].sort(
      (a, b) => Math.hypot(a[0] - region.centre[0], a[1] - region.centre[1]) - Math.hypot(b[0] - region.centre[0], b[1] - region.centre[1]),
    )[0];
    const distance = Math.hypot(x - region.centre[0], y - region.centre[1]);
    if (distance > 3.5 || taken.has(number)) throw new Error(`sheet ${sheet}: cannot name the outline at ${region.centre.map((v) => v.toFixed(1))} %`);
    taken.add(number);
    region.number = number;
  }
  if (taken.size !== table.length) throw new Error(`sheet ${sheet}: found ${taken.size} apartments, expected ${table.length}`);

  // What the gate needs from this sheet: which apartment's fill each pixel is, and where
  // the corridors are.
  const numberOf = new Map(live.map((r) => [r.id, r.number]));
  const fillNumber = Int16Array.from(fillOwner, (id) => numberOf.get(id) ?? 0);
  const corridor = Uint8Array.from(patchOf, (id) => (id && patchIsLarge[id] ? 1 : 0));
  return {
    rgb,
    fillNumber,
    corridor,
    shapes: live.map((r) => ({ number: r.number, rings: r.rings })).sort((a, b) => a.number - b.number),
  };
}

// ---------------------------------------------------------------------------------------
// Checks that must hold for the shapes that ship, on every sheet they are used for

function gate(sheet, shapes, { fillNumber, corridor }) {
  const problems = [];
  const fail = (text) => problems.push(`sheet ${sheet}: ${text}`);
  const table = UNITS[sheet];

  if (shapes.length !== table.length) fail(`${shapes.length} outlines for ${table.length} apartments`);

  const fillTotal = new Map();
  for (let i = 0; i < N; i++) if (fillNumber[i]) fillTotal.set(fillNumber[i], (fillTotal.get(fillNumber[i]) ?? 0) + 1);

  const painted = new Int16Array(N);
  let overlap = 0;
  for (const shape of shapes) {
    let pixels = 0, own = 0, foreign = 0, publicWhite = 0;
    fill(shape.rings, (x, y) => {
      const i = y * W + x;
      pixels++;
      if (painted[i] && painted[i] !== shape.number) overlap++;
      painted[i] = shape.number;
      if (fillNumber[i] === shape.number) own++;
      else if (fillNumber[i]) foreign++;
      if (corridor[i]) publicWhite++;
    });
    const covered = own / (fillTotal.get(shape.number) ?? 1);
    if (covered < 0.99) fail(`apartment ${shape.number}: only ${(100 * covered).toFixed(1)} % of its fill is inside its outline`);
    if (foreign > 0) fail(`apartment ${shape.number}: ${foreign} px of its outline are a neighbour's fill`);
    if (publicWhite / pixels > 0.005) fail(`apartment ${shape.number}: ${(100 * publicWhite / pixels).toFixed(2)} % of its outline is corridor`);
    if (shape.rings.length > 1 && shape.number !== 122) fail(`apartment ${shape.number}: unexpected hole`);
    for (const ring of shape.rings) {
      for (let i = 0; i < ring.length; i++) if (isNeedle(ring, i)) fail(`apartment ${shape.number}: spike at ${ring[i].map((v) => v * SCALE)}`);
    }
  }
  if (overlap > 0) fail(`outlines overlap by ${overlap} px`);

  const hits = (xPct, yPct) => shapes.filter((s) => contains(s.rings, (xPct / 100) * W, (yPct / 100) * H)).map((s) => s.number);
  for (const [x, y, number] of table) {
    const found = hits(x, y);
    if (found.length !== 1 || found[0] !== number) fail(`point (${x}, ${y}) should be apartment ${number}, got [${found}]`);
  }
  for (const [x, y] of PUBLIC[sheet]) {
    const found = hits(x, y);
    if (found.length) fail(`corridor point (${x}, ${y}) lies inside apartment ${found}`);
  }

  // Gross-error check on the numbering: an outline's area must fit the m² printed on the
  // label of the number it was given (flats on one sheet range from 40 to 93 m²).
  const m2 = new Map(table.map(([, , number, area]) => [number, area]));
  const ratios = shapes.map((s) => (shapeArea(s.rings) * SCALE * SCALE) / m2.get(s.number));
  const typical = median(ratios);
  shapes.forEach((s, i) => {
    const deviation = ratios[i] / typical - 1;
    if (Math.abs(deviation) > (AREA_TOLERANCE[sheet] ?? DEFAULT_AREA_TOLERANCE)) fail(`apartment ${s.number}: area is ${(100 * deviation).toFixed(1)} % off its printed m²`);
  });
  if (Math.abs(typical / REFERENCE_SCALE[sheet] - 1) > 0.03) fail(`drawing scale ${typical.toFixed(0)} px²/m² differs from the reviewed ${REFERENCE_SCALE[sheet]}`);

  const areas = shapes.map((s, i) => `${s.number}: ${(100 * (ratios[i] / typical - 1)).toFixed(1)} %`).join(", ");
  return { problems, scale: typical, areas };
}

// ---------------------------------------------------------------------------------------
// Output

const pathData = (rings) =>
  rings.map((ring) => "M" + ring.map(([x, y]) => `${Math.round(x * SCALE)} ${Math.round(y * SCALE)}`).join(" ") + "Z").join("");

function render(sets) {
  const block = (name, doc, shapes) =>
    `/** ${doc} */\nexport const ${name}: PlanRegion[] = [\n` +
    shapes.map((s) => `  { number: ${s.number}, path: "${pathData(s.rings)}" },\n`).join("") +
    "];\n";
  return [
    "// GENERATED by scripts/floor-plans/extract-regions.mjs — do not edit by hand.",
    "// Regenerate: node scripts/floor-plans/extract-regions.mjs --src <folder with the floor sheets>",
    "//",
    "// Apartment outlines traced from the architect's floor sheets (5032×3579 px).",
    "",
    "export interface PlanRegion {",
    "  /** Apartment number exactly as printed on the sheet. */",
    "  number: number;",
    "  /** SVG path data in sheet pixels; a hole is an extra sub-path (fill-rule evenodd). */",
    "  path: string;",
    "}",
    "",
    `export const SHEET_WIDTH = ${SHEET_W};`,
    `export const SHEET_HEIGHT = ${SHEET_H};`,
    "",
    block("groundRegions", "Storey 1: apartments 1–13.", sets.ground),
    block("typicalRegions", "Storeys 2–7 share one drawing. Numbered as on storey 2 (14–30); +17 per storey above.", sets.typical),
    block("towerRegions", "Tower part of storeys 8 and 9. Numbered as on storey 8 (116–121); +8 on storey 9.", sets.tower),
    block("penthouseRegions", "Wing part of storey 8: penthouses 122 and 123. 122 wraps the public lift and stair, kept as a hole.", sets.penthouse),
    block("tenthRegions", "Storey 10: apartments 130–135.", sets.tenth),
    block("eleventhRegions", "Storey 11: apartments 136–139.", sets.eleventh),
  ].join("\n");
}

function overlay(file, rgb, shapes) {
  const image = Buffer.from(rgb);
  const tints = [[255, 0, 255], [255, 160, 0], [0, 200, 255], [255, 255, 0]];
  shapes.forEach((shape, index) => {
    const tint = tints[index % tints.length];
    fill(shape.rings, (x, y) => {
      const i = 3 * (y * W + x);
      for (let c = 0; c < 3; c++) image[i + c] = image[i + c] * 0.6 + tint[c] * 0.4;
    });
    for (const ring of shape.rings) {
      for (let i = 0; i < ring.length; i++) {
        const [x1, y1] = ring[i], [x2, y2] = ring[(i + 1) % ring.length];
        const steps = Math.ceil(Math.hypot(x2 - x1, y2 - y1)) || 1;
        for (let s = 0; s <= steps; s++) {
          const x = Math.round(x1 + ((x2 - x1) * s) / steps), y = Math.round(y1 + ((y2 - y1) * s) / steps);
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx, yy = y + dy;
            if (xx >= 0 && yy >= 0 && xx < W && yy < H) { const j = 3 * (yy * W + xx); image[j] = 220; image[j + 1] = 0; image[j + 2] = 0; }
          }
        }
      }
    }
  });
  const result = spawnSync("ffmpeg", ["-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", `${W}x${H}`, "-i", "-", "-q:v", "3", file], { input: image, maxBuffer: 1 << 28 });
  if (result.status !== 0) throw new Error(`could not write ${file}: ${result.stderr}`);
}

// ---------------------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);
  const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
  const src = option("--src");
  const debug = option("--debug");
  if (!src) {
    console.error("usage: node scripts/floor-plans/extract-regions.mjs --src <folder with the floor sheets> [--debug <folder>]");
    process.exit(2);
  }
  const files = new Map();
  for (const name of readdirSync(src)) {
    const match = /^(\d+)\s.*\.jpe?g$/i.exec(name);
    if (match) files.set(Number(match[1]), path.join(src, name));
  }
  const sheets = {};
  for (let sheet = 1; sheet <= 11; sheet++) {
    if (!files.has(sheet)) throw new Error(`no sheet for storey ${sheet} in ${src}`);
    process.stdout.write(`storey ${sheet}: tracing … `);
    sheets[sheet] = extract(sheet, files.get(sheet));
    console.log(`${sheets[sheet].shapes.length} apartments`);
  }

  // What ships. Storeys 2–7 use sheet 2's outlines; the tower outlines of storeys 8 and 9
  // come from sheet 9 (sheet 8 has a white blotch inside apartment 119).
  const renumber = (shapes, by) => shapes.map((s) => ({ ...s, number: s.number + by }));
  const sets = {
    ground: sheets[1].shapes,
    typical: sheets[2].shapes,
    tower: renumber(sheets[9].shapes, -8),
    penthouse: sheets[8].shapes.filter((s) => s.number >= 122),
    tenth: sheets[10].shapes,
    eleventh: sheets[11].shapes,
  };
  const shipped = {
    1: sets.ground,
    8: [...sets.tower, ...sets.penthouse],
    9: renumber(sets.tower, 8),
    10: sets.tenth,
    11: sets.eleventh,
  };
  for (let storey = 2; storey <= 7; storey++) shipped[storey] = renumber(sets.typical, 17 * (storey - 2));

  const problems = [];
  const numbers = [];
  for (let sheet = 1; sheet <= 11; sheet++) {
    const result = gate(sheet, shipped[sheet], sheets[sheet]);
    problems.push(...result.problems);
    numbers.push(...shipped[sheet].map((s) => s.number));
    console.log(`storey ${sheet}: ${result.problems.length ? "FAILED" : "ok"} (${shipped[sheet].length} outlines, ${result.scale.toFixed(0)} px²/m²)`);
    if (debug) {
      console.log(`  area against printed m², relative to the sheet median — ${result.areas}`);
      mkdirSync(debug, { recursive: true });
      overlay(path.join(debug, `storey-${sheet}.jpg`), sheets[sheet].rgb, shipped[sheet]);
    }
  }
  const sorted = [...numbers].sort((a, b) => a - b);
  if (sorted.length !== 139 || sorted.some((n, i) => n !== i + 1)) problems.push("apartment numbers are not exactly 1…139");
  const holes = Object.values(sets).flat().filter((s) => s.rings.length > 1);
  if (holes.length !== 1 || holes[0].number !== 122) problems.push("expected exactly one hole (the public core inside 122)");

  if (problems.length) {
    console.error("\nNot writing the data file:\n  " + problems.join("\n  "));
    process.exit(1);
  }
  const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src/data/floorPlanRegions.ts");
  writeFileSync(out, render(sets));
  const vertices = Object.values(sets).flat().reduce((sum, s) => sum + s.rings.reduce((n, r) => n + r.length, 0), 0);
  console.log(`\nwrote ${path.relative(process.cwd(), out)}: ${Object.values(sets).flat().length} outlines, ${vertices} vertices`);
}

main();
