<p align="center">
  <img src="pkg/design/assets/logos/mindtris-logo.svg" alt="Mindtris" height="64" />
</p>

## Mindtris Design

This repository is the single source of truth for Mindtris UI: tokens, themes, and reusable React components published as `@mindtris/design-system`.

### Quick links

- `pkg/design/README.md` (package usage notes)
- `pkg/design/CONTRIBUTING.md` (component and token rules)

## What lives here

- `pkg/design/tokens`: semantic tokens and theme presets (CSS variables)
- `pkg/design/theme`: theme engine for applying presets and imported themes at runtime
- `pkg/design/components`: UI primitives and composable building blocks
- `pkg/design/components/theme-customizer`: Theme Customizer UI (create/import themes)
- `pkg/design-playground`: local Next.js playground app that consumes `@mindtris/design-system`
- `references`: reference material and experiments (not published)

## Packages

- `@mindtris/design-system` (published): `pkg/design`
- `@mindtris/design-playground` (workspace app): `pkg/design-playground`

## Install in consumer apps (GitHub Packages)

`@mindtris/design-system` publishes to GitHub Packages. You must authenticate to install.

1) Add a project `.npmrc`:

```ini
@mindtris:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

2) Provide a GitHub Personal Access Token:

- Required scopes: `read:packages` (and `repo` if the package is private)
- Environment variable: `NODE_AUTH_TOKEN`

PowerShell:

```powershell
$env:NODE_AUTH_TOKEN="YOUR_TOKEN"
```

bash/zsh:

```bash
export NODE_AUTH_TOKEN="YOUR_TOKEN"
```

3) Install:

```bash
pnpm add @mindtris/design-system
```

## Use tokens (required)

Import the token entrypoint once in your app’s root CSS:

```css
@import '@mindtris/design-system/tokens';
```

Use semantic utilities and variables (no component-level hex colors):

- `bg-background text-foreground`
- `bg-card text-card-foreground border-border`
- `bg-primary text-primary-foreground`
- `text-muted-foreground`

## Use components

```tsx
import { Button, Card, CardContent, Input } from '@mindtris/design-system'

export function Example() {
  return (
    <Card>
      <CardContent>
        <Input placeholder="Email" />
        <Button>Continue</Button>
      </CardContent>
    </Card>
  )
}
```

## Theming

Themes are applied by setting token variables on the root element (typically `document.documentElement`). The design system includes:

- Presets (built-in themes)
- Imported theme artifacts (from Theme Customizer exports)
- Radius and layout overrides

```tsx
import { applyThemePreset, useThemeManager } from '@mindtris/design-system'

export function ThemeBootstrap() {
  const { isDarkMode } = useThemeManager()
  applyThemePreset('mosaic', isDarkMode)
  return null
}
```

For interactive theme editing and imports:

```tsx
import { ThemeCustomizer } from '@mindtris/design-system'

export function ThemeSettings() {
  return <ThemeCustomizer />
}
```

## Repo development

Install dependencies at the repo root:

```bash
pnpm install
```

Run the playground:

```bash
pnpm -C pkg/design-playground dev
```

Type-check the package:

```bash
pnpm -C pkg/design tsc --noEmit -p tsconfig.json
```

## Publishing

Publishing is automated via `.github/workflows/publish-design-package.yml`.

- Auto publish: pushes to `main` that change `pkg/design/**`
- Manual publish: workflow dispatch supports `patch`, `minor`, `major` version bumps

