// Cross-repo half of the delivery-engine gate: asserts this package's compile
// engine equals the CONSUMER's locked tailwindcss. Deliberately NOT chained into
// build/prepublishOnly - that would couple this repo's build to a sibling
// checkout that CI and fresh clones do not have. Run it where the consumer
// lockfile definitionally exists (the consumer's CI, or locally):
//
//   pnpm run check:consumer -- <path-to-consumer-pnpm-lock.yaml>
//   CONSUMER_LOCKFILE=<path> pnpm run check:consumer
//
// Fails loudly when the lockfile is missing or unparseable - no assumptions.
import { readFileSync, existsSync, realpathSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"
import path from "node:path"

const pkgDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const lockPath = process.argv[2] || process.env.CONSUMER_LOCKFILE
if (!lockPath) {
  console.error("CONSUMER-ENGINE FAIL: no lockfile given. Usage: node scripts/check-consumer-engine.mjs <path-to-consumer-pnpm-lock.yaml> (or CONSUMER_LOCKFILE=<path>).")
  process.exit(1)
}
if (!existsSync(lockPath)) {
  console.error(`CONSUMER-ENGINE FAIL: consumer lockfile not found at ${lockPath}`)
  process.exit(1)
}
const lockMatch = readFileSync(lockPath, "utf8").match(/\n {6}tailwindcss:\n {8}specifier: [^\n]*\n {8}version: ([0-9][^\s(]*)/)
if (!lockMatch) {
  console.error(`CONSUMER-ENGINE FAIL: cannot parse the tailwindcss locked version out of ${lockPath}`)
  process.exit(1)
}
const consumerCore = lockMatch[1]

let compileCore
try {
  const cliDir = realpathSync(path.join(pkgDir, "node_modules", "@tailwindcss", "cli"))
  let compileCoreDir
  try {
    compileCoreDir = path.dirname(createRequire(path.join(cliDir, "package.json")).resolve("tailwindcss/package.json"))
  } catch {
    compileCoreDir = path.join(cliDir, "..", "..", "tailwindcss")
  }
  compileCore = JSON.parse(readFileSync(path.join(compileCoreDir, "package.json"), "utf8")).version
} catch (e) {
  console.error(`CONSUMER-ENGINE FAIL: cannot resolve the compile engine from the CLI's own context: ${e.message}`)
  process.exit(1)
}

if (compileCore !== consumerCore) {
  console.error(`CONSUMER-ENGINE FAIL: this package compiles under tailwindcss ${compileCore} but the consumer lock pins ${consumerCore}. Align pkg/design/package.json pins to the consumer and rebuild.`)
  process.exit(1)
}
console.log(`consumer-engine check OK: compile core ${compileCore} == consumer locked ${consumerCore} (${path.basename(path.dirname(lockPath))})`)
