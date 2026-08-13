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
import { mkdirSync, writeFileSync, rmSync, readFileSync, existsSync, realpathSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"
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
  // pins the leading-digit escape path in esc()
  "2xl:w-64",
]

const extra = process.env.CHECK_EXTRA_SENTINEL
const candidates = extra ? [...SENTINELS, extra] : SENTINELS

// 1. Version agreement, EXACT. Three engines must be one engine:
//    compileCore   - the tailwindcss the CLI actually imports (the CLI does NOT
//                    dedupe: @tailwindcss/cli@X carries an exact nested core X,
//                    so resolve from the CLI's own require context, never from
//                    the root node_modules)
//    consumerCore  - the FE's LOCKED resolution from its pnpm-lock (a ^ specifier
//                    is not a version; the lockfile is)
//    rootCore      - this package's own tailwindcss, kept coherent
// The gate FAILS if it cannot determine any of them. No assumptions.
// Filesystem realpaths, not require.resolve: the CLI is bin-only (no exports
// main, resolve throws ERR_PACKAGE_PATH_NOT_EXPORTED). realpath follows the
// pnpm symlink into .pnpm/<pkg>@<v>/node_modules/<pkg>, where the CLI's own
// core dependency sits as a sibling.
const readV = (dir) => JSON.parse(readFileSync(path.join(dir, "package.json"), "utf8")).version
const cliDir = realpathSync(path.join(pkgDir, "node_modules", "@tailwindcss", "cli"))
const cliV = readV(cliDir)
let compileCoreDir
try {
  compileCoreDir = path.dirname(createRequire(path.join(cliDir, "package.json")).resolve("tailwindcss/package.json"))
} catch {
  compileCoreDir = path.join(cliDir, "..", "..", "tailwindcss") // pnpm sibling layout fallback
}
const compileCore = readV(compileCoreDir)
const rootCore = readV(realpathSync(path.join(pkgDir, "node_modules", "tailwindcss")))

const feLock = path.resolve(pkgDir, "..", "..", "..", "simplifisign-frontend", "pnpm-lock.yaml")
if (!existsSync(feLock)) {
  console.error(`DELIVERY-ENGINE FAIL: cannot determine the consumer engine - FE lockfile not found at ${feLock}`)
  process.exit(1)
}
const lockText = readFileSync(feLock, "utf8")
const lockMatch = lockText.match(/\n {6}tailwindcss:\n {8}specifier: [^\n]*\n {8}version: ([0-9][^\s(]*)/)
if (!lockMatch) {
  console.error(`DELIVERY-ENGINE FAIL: cannot parse the tailwindcss locked version out of ${feLock}`)
  process.exit(1)
}
const consumerCore = lockMatch[1]

if (compileCore !== consumerCore || compileCore !== rootCore) {
  console.error(`DELIVERY-ENGINE FAIL: engine mismatch - compile core ${compileCore} (via cli ${cliV}), consumer locked ${consumerCore}, package core ${rootCore}. Align package.json pins to the consumer.`)
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
  // Tailwind escapes these characters in emitted selectors; a leading digit is
  // escaped as hex + terminating space (`2xl:` -> `\32 xl\:`).
  const esc = (cls) => {
    let out = cls.replace(/[:[\]()%.=\/#,'"!*+~^$@&{}|`?<>]/g, (c) => "\\" + c)
    if (/^[0-9]/.test(out)) out = "\\3" + out[0] + " " + out.slice(1)
    return out
  }
  // Boundary after the selector ([\s{,]) so `.gap-2` cannot match inside `.gap-2\.5`.
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const emitted = (cls) => new RegExp(reEsc("." + esc(cls)) + "[\\s{,]").test(css)
  const missing = candidates.filter((cls) => !emitted(cls))
  if (missing.length > 0) {
    console.error(`DELIVERY-ENGINE FAIL: ${missing.length} class(es) emit no rule under tailwindcss ${compileCore}:`)
    for (const m of missing) console.error(`  - ${m}`)
    // process.exit() would skip the finally cleanup - set exitCode and fall through.
    process.exitCode = 1
  } else {
    console.log(`delivery-engine check OK: ${candidates.length} sentinel(s) compile under tailwindcss ${compileCore} (== consumer locked ${consumerCore}, cli ${cliV})`)
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
