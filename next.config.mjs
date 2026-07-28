/** @type {import('next').NextConfig} */

const remotePatterns = [
  {
    protocol: "https",
    hostname: "*.r2.dev",
  },
  {
    protocol: "https",
    hostname: "*.r2.cloudflarestorage.com",
  },
]

if (process.env.R2_PUBLIC_URL) {
  try {
    const { hostname, protocol } = new URL(process.env.R2_PUBLIC_URL)
    remotePatterns.push({
      protocol: protocol.replace(":", ""),
      hostname,
    })
  } catch {
    // Ignore invalid R2_PUBLIC_URL values at build time.
  }
}

const nextConfig = {
  images: {
    remotePatterns,
  },
  experimental: {
    serverActions: {
      // Nuestro límite de imagen es 5MB (ver lib/actions/upload.ts); dejamos
      // margen extra para el overhead del multipart/form-data.
      bodySizeLimit: "6mb",
    },
  },
}

export default nextConfig
