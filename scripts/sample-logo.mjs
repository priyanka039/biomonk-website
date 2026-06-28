import sharp from "sharp";

const { data, info } = await sharp("public/logo.png")
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

let darkest = { lum: 999, hex: "" }; // deep wordmark purple
let lightestViolet = { lum: -1, hex: "" }; // bright gradient violet
const sat = [];

const toHex = (r, g, b) =>
  "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

for (let i = 0; i < width * height; i++) {
  const o = i * channels;
  const a = channels === 4 ? data[o + 3] : 255;
  if (a < 200) continue;
  const r = data[o];
  const g = data[o + 1];
  const b = data[o + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const s = max === 0 ? 0 : (max - min) / max;
  // violet => blue dominant, red present, green lowest
  if (b > g && r > g && s > 0.25) {
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum < darkest.lum) darkest = { lum, hex: toHex(r, g, b), r, g, b };
    if (lum > lightestViolet.lum)
      lightestViolet = { lum, hex: toHex(r, g, b), r, g, b };
    sat.push({ r, g, b, s, lum });
  }
}

// average of the top-saturation violets => core brand violet
sat.sort((a, b) => b.s - a.s);
const top = sat.slice(0, Math.floor(sat.length * 0.15));
const avg = top.reduce(
  (acc, p) => ({ r: acc.r + p.r, g: acc.g + p.g, b: acc.b + p.b }),
  { r: 0, g: 0, b: 0 }
);
const n = top.length;
const core = toHex(
  Math.round(avg.r / n),
  Math.round(avg.g / n),
  Math.round(avg.b / n)
);

console.log(
  JSON.stringify(
    {
      deepWordmark: darkest.hex,
      brightViolet: lightestViolet.hex,
      coreBrandViolet: core,
      violetPixelCount: sat.length,
    },
    null,
    2
  )
);
