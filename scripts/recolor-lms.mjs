import sharp from "sharp";

// Recolor the LMS screenshots from their original green/blue accents to the
// BioMonk brand violet, so the product shown on the marketing site matches the
// website palette. Green (wordmark, active nav, progress bars, %, checkmarks,
// links) and the blue stat icons are remapped onto a violet luminance ramp:
//   dark accent  -> deep violet  #5A009D
//   bright accent -> light lavender #C9A2FF
// Red (Error Book / live) and amber (rank / "coming soon") are intentionally
// preserved as semantic colors. The dark navy background is untouched.

const LOW = [90, 0, 157]; // #5A009D
const HIGH = [201, 162, 255]; // #C9A2FF

const lerp = (a, b, t) => Math.round(a + (b - a) * t);

function toViolet(r, g, b) {
  const L = 0.299 * r + 0.587 * g + 0.114 * b;
  const t = Math.max(0, Math.min(1, (L - 40) / 150));
  return [
    lerp(LOW[0], HIGH[0], t),
    lerp(LOW[1], HIGH[1], t),
    lerp(LOW[2], HIGH[2], t),
  ];
}

async function recolor(input, output) {
  const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const isGreen = g > r + 18 && g >= b + 3 && g > 60;
    const isBlue = b > r + 25 && b > g + 12 && b > 90;

    if (isGreen || isBlue) {
      const [nr, ng, nb] = toViolet(r, g, b);
      data[i] = nr;
      data[i + 1] = ng;
      data[i + 2] = nb;
    }
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: ch } })
    .png()
    .toFile(output);
  console.log(`${output}: ${info.width}x${info.height}`);
}

await recolor("public/lms-dashboard-src.png", "public/lms-dashboard.png");
await recolor("public/lms-schedule-src.png", "public/lms-schedule.png");
