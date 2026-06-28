import sharp from "sharp";

// Build a clean transparent cutout of the mentor from the warm beige studio
// background. Pipeline:
//   1. crop the thin strip at the bottom
//   2. loose color key + border flood-fill (removes bg, may leak into forearm)
//   3. restore warm skin highlights that leaked
//   4. fill enclosed interior holes
//   5. keep only the largest opaque component (despeckle stray beige dots)
//   6. feather the alpha edge + sharpen the RGB for crispness

const meta = await sharp("public/vicky-src.png").metadata();
const cropH = meta.height - 60;

const { data, info } = await sharp("public/vicky-src.png")
  .extract({ left: 0, top: 0, width: meta.width, height: cropH })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const N = width * height;
const out = Buffer.from(data);
const idxA = (i) => i * channels + 3;

const isBg = (i) => {
  const o = i * channels;
  const r = data[o];
  const g = data[o + 1];
  const b = data[o + 2];
  return r > 198 && g > 184 && b > 158 && r - b > 4 && r - b < 85;
};

const neighbors = (i) => {
  const x = i % width;
  const y = (i / width) | 0;
  const out4 = [];
  if (x > 0) out4.push(i - 1);
  if (x < width - 1) out4.push(i + 1);
  if (y > 0) out4.push(i - width);
  if (y < height - 1) out4.push(i + width);
  return out4;
};

// --- 2. border flood-fill over the loose key ---
const visited = new Uint8Array(N);
let stack = [];
for (let x = 0; x < width; x++) {
  stack.push(x, (height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  stack.push(y * width, y * width + (width - 1));
}
while (stack.length) {
  const i = stack.pop();
  if (i < 0 || i >= N || visited[i]) continue;
  visited[i] = 1;
  if (!isBg(i)) continue;
  out[idxA(i)] = 0;
  for (const n of neighbors(i)) stack.push(n);
}

// --- 3. restore warm skin highlights (skin is redder than the flat beige) ---
for (let i = 0; i < N; i++) {
  if (out[idxA(i)] !== 0) continue;
  const o = i * channels;
  const r = data[o];
  const g = data[o + 1];
  const b = data[o + 2];
  const max = Math.max(r, g, b);
  if (r > 170 && r - b >= 44 && b < 212 && max >= 120 && max <= 252) {
    out[idxA(i)] = 255;
  }
}

// --- 4. fill enclosed interior holes (transparent but not border-reachable) ---
const reach = new Uint8Array(N);
stack = [];
for (let x = 0; x < width; x++) {
  stack.push(x, (height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  stack.push(y * width, y * width + (width - 1));
}
while (stack.length) {
  const i = stack.pop();
  if (i < 0 || i >= N || reach[i]) continue;
  if (out[idxA(i)] !== 0) continue;
  reach[i] = 1;
  for (const n of neighbors(i)) stack.push(n);
}
for (let i = 0; i < N; i++) {
  if (out[idxA(i)] === 0 && !reach[i]) out[idxA(i)] = 255; // enclosed hole
}

// --- 5. keep only the largest opaque connected component ---
const label = new Int32Array(N).fill(-1);
let best = -1;
let bestSize = 0;
let cur = 0;
for (let s = 0; s < N; s++) {
  if (out[idxA(s)] === 0 || label[s] !== -1) continue;
  let size = 0;
  stack = [s];
  label[s] = cur;
  while (stack.length) {
    const i = stack.pop();
    size++;
    for (const n of neighbors(i)) {
      if (out[idxA(n)] !== 0 && label[n] === -1) {
        label[n] = cur;
        stack.push(n);
      }
    }
  }
  if (size > bestSize) {
    bestSize = size;
    best = cur;
  }
  cur++;
}
for (let i = 0; i < N; i++) {
  if (out[idxA(i)] !== 0 && label[i] !== best) out[idxA(i)] = 0;
}

// --- 6. sharpen RGB for crispness (keep alpha intact) ---
await sharp(out, { raw: { width, height, channels } })
  .sharpen({ sigma: 0.7 })
  .png()
  .trim()
  .toFile("public/vicky.png");

const m = await sharp("public/vicky.png").metadata();
console.log(JSON.stringify({ outW: m.width, outH: m.height }));
