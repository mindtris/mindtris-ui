import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  // Single bundle = no relative path resolution issues when consumed from node_modules
  bundle: true,
  splitting: false,
  // Peer deps stay external so the app supplies them
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'next/link',
    'next/image',
    'next-themes',
    '@headlessui/react',
    /^@radix-ui\//,
    'lucide-react',
    'clsx',
    'tailwind-merge',
    'class-variance-authority',
    'cmdk',
    'vaul',
    'input-otp',
    'react-day-picker',
    'react-hook-form',
    'recharts',
    'embla-carousel-react',
    /^@tiptap\//,
  ],
  esbuildOptions(options) {
    options.keepNames = true
    // Use automatic JSX runtime so output uses jsx() from react/jsx-runtime, not React.createElement
    options.jsx = 'automatic'
  },
  // CSS and tokens stay in place; package exports point to ./tokens/*.css
  esbuildPlugins: [],
})
