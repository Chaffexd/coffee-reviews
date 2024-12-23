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
    locales: ['default', 'en-GB', 'en-US', 'zh-TW'],
    defaultLocale: 'default',
    // if this is false, the middleware will fall back to a locale that is either in the headers of the browser or cookies
    localeDetection: true
  },
  trailingSlash: true
};

export default nextConfig;
