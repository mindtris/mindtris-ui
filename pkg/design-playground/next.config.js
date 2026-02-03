/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages (static): emit `out/` with HTML/CSS/JS only.
  output: 'export',
  // `next/image` requires a server; disable optimization for static hosting.
  images: { unoptimized: true },
}

module.exports = nextConfig

