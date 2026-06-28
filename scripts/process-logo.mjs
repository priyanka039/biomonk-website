import sharp from "sharp";

// Source: the high-res logo on a white background.
const SRC =
  "C:/Users/priya/.cursor/projects/c-Users-priya-OneDrive-Desktop-biomonk-website/assets/c__Users_priya_AppData_Roaming_Cursor_User_workspaceStorage_72126c096f1e4884d6b5bf9bbf9df273_images_image-a10af2eb-c42e-4c28-8e30-a49917ab7788.png";

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

const isNearWhite = (i) => {
  const o = i * channels;
  return data[o] > 235 && data[o + 1] > 235 && data[o + 2] > 235;
};

// Flood-fill the OUTER white background to transparent, starting from every
// edge pixel. Interior white (the "B" knockout) is enclosed by purple, so it
// is never reached and stays opaque — keeping the logo's detail intact.
const visited = new Uint8Array(width * height);
const stack = [];

for (let x = 0; x < width; x++) {
  stack.push(x); // top row
  stack.push((height - 1) * width + x); // bottom row
}
for (let y = 0; y < height; y++) {
  stack.push(y * width); // left col
  stack.push(y * width + (width - 1)); // right col
}

while (stack.length) {
  const i = stack.pop();
  if (i < 0 || i >= width * height || visited[i]) continue;
  visited[i] = 1;
  if (!isNearWhite(i)) continue;

  out[i * channels + 3] = 0; // transparent

  const x = i % width;
  const y = (i / width) | 0;
  if (x > 0) stack.push(i - 1);
  if (x < width - 1) stack.push(i + 1);
  if (y > 0) stack.push(i - width);
  if (y < height - 1) stack.push(i + width);
}

await sharp(out, { raw: { width, height, channels } })
  .png()
  .trim()
  .toFile("public/logo.png");

const meta = await sharp("public/logo.png").metadata();
console.log(
  JSON.stringify({ srcW: width, srcH: height, outW: meta.width, outH: meta.height })
);
