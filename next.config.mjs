import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const jiti = createJiti(fileURLToPath(import.meta.url))
await jiti.import('./src/env')

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
