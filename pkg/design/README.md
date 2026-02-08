# @mindtris/design-system

```bash
# -----------------------------------------------------------------------------
# @mindtris/design-system — single-source docs (keep it here)
# -----------------------------------------------------------------------------

# install (GitHub Packages)
pnpm add @mindtris/design-system

# install via file link (local dev, e.g. dash)
# In the app: pnpm add file:../mindtris-design/pkg/design
# After any change in pkg/design, run `pnpm install` again in the app so node_modules sees new/updated files.
# The main entry (index.ts) uses root-level re-exports (e.g. layout-primitives.tsx) with explicit .tsx/.ts extensions so Next/Turbopack can resolve them from node_modules. Long-term: build this package (tsup/unbuild) and consume the built output for reliable resolution.

# auth (required for GitHub Packages)
# - create a GitHub PAT with: read:packages (+ repo if private)
# - set it as NODE_AUTH_TOKEN
# PowerShell:
$env:NODE_AUTH_TOKEN="YOUR_TOKEN"
# bash/zsh:
export NODE_AUTH_TOKEN="YOUR_TOKEN"

# .npmrc (project root)
registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}


# -----------------------------------------------------------------------------
# tokens (CSS) — MUST import once in app root CSS
# -----------------------------------------------------------------------------
# app/globals.css (or app/css/style.css):
#   @import '@mindtris/design-system/tokens';
#
# then use semantic token classes:
#   bg-background text-foreground border-border bg-card text-muted-foreground
#   bg-primary text-primary-foreground bg-destructive text-destructive-foreground


# -----------------------------------------------------------------------------
# react usage (UI + theme engine)
# -----------------------------------------------------------------------------
# import what you need:
#   import { Button, Input, Label, DatePicker, DatePickerRange, Calendar, ThemeCustomizer, useThemeManager } from '@mindtris/design-system'
#
# theme apply (runtime; sets CSS vars on <html>):
#   const { applyTheme, applyImportedTheme, applyRadius, isDarkMode } = useThemeManager()
#   applyTheme('mosaic', isDarkMode)


# -----------------------------------------------------------------------------
# package rules (CONTRIBUTING.md summary)
# -----------------------------------------------------------------------------
# scope:
#   - UI-only primitives + tokens + theme engine
#   - MUST be usable in >= 2 apps without renaming meaning
#
# must NOT exist in pkg/design:
#   - API calls / data fetching
#   - domain terms (Invoice, User, KYC, Transaction, ...)
#   - app routing/nav/permissions/workflows
#
# styling:
#   - token-only colors (NO tailwind palette like bg-gray-900, NO hex in components)
#   - prefer semantic classes: bg-card, text-foreground, border-border, ...
#
# labels and copy:
#   - sentence case: capitalize only the first letter (e.g. "Full name", not "Full Name")
#   - exception: proper nouns, acronyms (e.g. "API key", "URL")
#
# layouts:
#   - components like Sidebar/Header are chrome/slots only; apps provide routes + items


# -----------------------------------------------------------------------------
# dev checks (in this repo)
# -----------------------------------------------------------------------------
cd pkg/design
pnpm tsc --noEmit -p tsconfig.json
```
