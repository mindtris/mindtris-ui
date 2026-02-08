/**
 * Re-export layout primitives from root so internal imports (e.g. blocks) keep working.
 * The canonical implementation lives in ../../layout-primitives.tsx for bundler resolution from consumers.
 */
export {
  Container,
  Page,
  Section,
  Grid,
  Stack,
} from '../../layout-primitives'
export type {
  ContainerProps,
  PageProps,
  SectionProps,
  GridProps,
  StackProps,
} from '../../layout-primitives'
