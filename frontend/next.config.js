import withNextIntl from 'next-intl/plugin';

// Chỉ định đúng đường dẫn đến file i18n.ts
const withNextIntlConfig = withNextIntl('./i18n.ts');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["paddy.vn", "cdn.shopify.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntlConfig(nextConfig);