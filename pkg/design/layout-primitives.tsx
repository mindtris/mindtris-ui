/**
 * Re-export layout primitives from a single root-level file
 * so consuming bundlers (Next/Turbopack) can resolve from node_modules.
 */
export {
  Container,
  Page,
  Section,
  Grid,
  Stack,
} from './components/layouts/container'
export type {
  ContainerProps,
  PageProps,
  SectionProps,
  GridProps,
  StackProps,
} from './components/layouts/container'
