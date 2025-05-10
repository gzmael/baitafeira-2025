import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const jiti = createJiti(fileURLToPath(import.meta.url))
await jiti.import('./src/env')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useCache: true,
    dynamicIO: true,
    cacheLife: {
      threeMinutes: 3 * 60 * 1000,
      fiveMinutes: 60 * 1000,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
