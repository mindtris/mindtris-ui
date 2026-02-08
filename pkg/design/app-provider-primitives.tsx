/**
 * Re-export AppProvider from a root-level file
 * so consuming bundlers (Next/Turbopack) can resolve from node_modules.
 */
export { default as AppProvider, useAppProvider } from './contexts/app-provider'
