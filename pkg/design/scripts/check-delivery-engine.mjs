// Delivery-engine check: proves the utility classes this package ships actually
// compile under the SAME Tailwind engine version the consumer (simplifisign-frontend)
// renders with. A class string present in dist/index.mjs is only potential CSS -
// the FE generates the real rule by @source-scanning the dist with ITS engine, so
// a newer-syntax class here ships as a silent no-op with green builds on both sides.
//
// Two assertions:
//   1. Version agreement: @tailwindcss/cli and tailwindcss resolve to the same
//      major.minor, so the compile below runs the delivery engine, not a newer one.
//   2. Every SENTINEL class emits its exact escaped selector when compiled.
//      Extend SENTINELS with each design change that adds new utility syntax -
//      this is the survived-content discipline, mechanized.
//
// Both-directions proof: CHECK_EXTRA_SENTINEL=<class> injects one more candidate;
// an invalid class fails the run naming itself.
import { execSync } from "node:child_process"
import { mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const pkgDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const SENTINELS = [
  // W0 mobile primitives (2026-08)
  "max-w-[calc(100%-2rem)]",
  "max-h-[calc(100dvh-2rem)]",
  "max-lg:bottom-0",
  "lg:w-64",
  "max-sm:group-data-[variant=line]:min-h-11",
  "max-sm:group-data-[variant=underline]:min-h-11",
  "max-sm:group-data-[variant=simple]:min-h-11",
  "translate-y-[calc(-50%_-_2px)]",
  "rounded-[2px]",
  "size-2.5",
  "sm:h-12",
  "gap-2",
]

const extra = process.env.CHECK_EXTRA_SENTINEL
const candidates = extra ? [...SENTINELS, extra] : SENTINELS

// 1. Version agreement (major.minor) between the CLI that compiles here and the
// core the consumer renders with (both pinned ^4.0.x; FE pins tailwindcss ^4.0.3).
const v = (p) => JSON.parse(readFileSync(path.join(pkgDir, "node_modules", p, "package.json"), "utf8")).version
const cliV = v("@tailwindcss/cli")
const coreV = v("tailwindcss")
const minor = (s) => s.split(".").slice(0, 2).join(".")
if (minor(cliV) !== minor(coreV)) {
  console.error(`DELIVERY-ENGINE FAIL: @tailwindcss/cli ${cliV} vs tailwindcss ${coreV} - engines drifted; align package.json pins.`)
  process.exit(1)
}

// 2. Compile the candidates under this (aligned) engine and assert exact selectors.
const tmp = path.join(pkgDir, ".delivery-check-tmp")
rmSync(tmp, { recursive: true, force: true })
mkdirSync(tmp, { recursive: true })
try {
  writeFileSync(path.join(tmp, "candidates.html"), `<div class="${candidates.join(" ")}"></div>\n`)
  writeFileSync(path.join(tmp, "probe.css"), `@import "tailwindcss" source(none);\n@source "./candidates.html";\n`)
  execSync(`pnpm exec tailwindcss -i "${path.join(tmp, "probe.css")}" -o "${path.join(tmp, "out.css")}"`, {
    cwd: pkgDir,
    stdio: ["ignore", "pipe", "pipe"],
  })
  const css = readFileSync(path.join(tmp, "out.css"), "utf8")
  // Tailwind escapes these characters in emitted selectors.
  const esc = (cls) => cls.replace(/[:[\]()%.=\/#,'"!*+~^$@&{}|`?<>]/g, (c) => "\\" + c)
  const missing = candidates.filter((cls) => !css.includes("." + esc(cls)))
  if (missing.length > 0) {
    console.error(`DELIVERY-ENGINE FAIL: ${missing.length} class(es) emit no rule under tailwindcss ${coreV}:`)
    for (const m of missing) console.error(`  - ${m}`)
    process.exit(1)
  }
  console.log(`delivery-engine check OK: ${candidates.length} sentinel(s) compile under tailwindcss ${coreV} (cli ${cliV})`)
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
