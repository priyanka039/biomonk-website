/**
 * Create admin user in Supabase Auth.
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *
 * Usage:
 *   node scripts/create-admin.mjs YOUR_PASSWORD
 */
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
      const key = t.slice(0, i).trim();
      const val = t.slice(i + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* .env.local optional if vars exported */
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email =
  process.env.ADMIN_EMAILS?.split(",")[0]?.trim() ||
  "biomonkclasses@gmail.com";
const password = process.argv[2];

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

if (!password || password.length < 6) {
  console.error("Usage: node scripts/create-admin.mjs YOUR_PASSWORD (min 6 chars)");
  process.exit(1);
}

const res = await fetch(`${url}/auth/v1/admin/users`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${serviceKey}`,
    apikey: serviceKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
    email_confirm: true,
  }),
});

const body = await res.json();

if (!res.ok) {
  console.error("Failed:", body.msg || body.error_description || body);
  process.exit(1);
}

console.log("Admin user created:", email);
console.log("Log in at http://localhost:3000/admin/login");
