/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/**"
      }
    ]
  },
  i18n: {
    locales: ['default', 'en-US', 'en-GB', 'zh-TW'],
    defaultLocale: 'default',
    localeDetection: true
  },
  trailingSlash: true
};

export default nextConfig;
