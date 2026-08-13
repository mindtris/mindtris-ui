// Delivery-engine check: proves the utility classes this package ships actually
// compile under the SAME Tailwind engine version the consumer (simplifisign-frontend)
// renders with. A class string present in dist/index.mjs is only potential CSS -
// the FE generates the real rule by @source-scanning the dist with ITS engine, so
// a newer-syntax class here ships as a silent no-op with green builds on both sides.
//
// Self-contained assertions (no other repo touched; cross-repo consumer
// agreement lives in check-consumer-engine.mjs, run where the consumer
// lockfile exists):
//   1. One engine everywhere, EXACT: the core the CLI actually imports ==
//      this package's own core == the exact versions pinned in package.json.
//   2. Every SENTINEL class emits its exact escaped selector when compiled.
//      Extend SENTINELS with each design change that adds new utility syntax -
//      this is the survived-content discipline, mechanized.
//   3. dist/styles.css keeps its @layer properties @supports fallback block.
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

// 1. Version agreement, EXACT and fully self-contained (no other repo touched -
// build and publish must work on a fresh clone and in this repo's own CI; the
// cross-repo consumer assertion lives in check-consumer-engine.mjs, run where
// the consumer lockfile exists):
//    compileCore - the tailwindcss the CLI actually imports (the CLI does NOT
//                  dedupe: @tailwindcss/cli@X carries an exact nested core X,
//                  so resolve from the CLI's own context, never the root)
//    rootCore    - this package's own tailwindcss
//    pins        - the EXACT versions declared in package.json (no ranges)
// A resolution failure is LOUD - never substitute a version read from
// somewhere plausible; reporting an unmeasured engine as fact was the
// original bug.
const readV = (dir) => JSON.parse(readFileSync(path.join(dir, "package.json"), "utf8")).version
let cliV, compileCore, rootCore
try {
  const cliDir = realpathSync(path.join(pkgDir, "node_modules", "@tailwindcss", "cli"))
  cliV = readV(cliDir)
  let compileCoreDir
  try {
    compileCoreDir = path.dirname(createRequire(path.join(cliDir, "package.json")).resolve("tailwindcss/package.json"))
  } catch {
    compileCoreDir = path.join(cliDir, "..", "..", "tailwindcss") // pnpm sibling layout fallback
  }
  compileCore = readV(compileCoreDir)
  rootCore = readV(realpathSync(path.join(pkgDir, "node_modules", "tailwindcss")))
} catch (e) {
  console.error(`DELIVERY-ENGINE FAIL: cannot resolve the compile engine from the CLI's own context: ${e.message}`)
  process.exit(1)
}

const pkgJson = JSON.parse(readFileSync(path.join(pkgDir, "package.json"), "utf8"))
const pinCli = pkgJson.devDependencies?.["@tailwindcss/cli"]
const pinCore = pkgJson.devDependencies?.["tailwindcss"]
const exact = (s) => /^[0-9]/.test(s ?? "")
if (!exact(pinCli) || !exact(pinCore)) {
  console.error(`DELIVERY-ENGINE FAIL: tailwind pins must be exact versions, got @tailwindcss/cli "${pinCli}" / tailwindcss "${pinCore}".`)
  process.exit(1)
}
if (compileCore !== rootCore || compileCore !== pinCore || cliV !== pinCli) {
  console.error(`DELIVERY-ENGINE FAIL: engine mismatch - compile core ${compileCore} (via cli ${cliV}), package core ${rootCore}, pins cli ${pinCli} / core ${pinCore}. One engine, everywhere.`)
  process.exit(1)
}

// 2. The @property fallback block must survive rebuilds (presence, not a count -
// registration counts move across versions; the regression class is the block
// vanishing, as it did under the 4.0.17 build).
const stylesPath = path.join(pkgDir, "dist", "styles.css")
if (existsSync(stylesPath) && !readFileSync(stylesPath, "utf8").includes("@layer properties")) {
  console.error("DELIVERY-ENGINE FAIL: dist/styles.css lost its @layer properties @supports fallback block.")
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
    console.log(`delivery-engine check OK: ${candidates.length} sentinel(s) compile under tailwindcss ${compileCore} (cli ${cliV}, pins exact; consumer agreement via check:consumer)`)
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
