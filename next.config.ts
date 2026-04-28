import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'wow.zamimg.com' },
      { protocol: 'https', hostname: 'render.worldofwarcraft.com' },
    ],
  },
}

export default withNextIntl(nextConfig)
