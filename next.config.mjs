// Locales come from Contentful rather than a hardcoded list. A locale only
// reaches the Delivery API once "Enable this locale in response" is ticked, so
// one that exists in the space but isn't live stays out of production. Preview
// builds use the Preview API, the same as lib/contentful.js.
async function fetchContentfulLocales() {
  const isPreview = process.env.NEXT_PUBLIC_LOCAL_DEV === "true";
  const host = isPreview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ADDRESS
    : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_ADDRESS;
  const token = isPreview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN;

  const res = await fetch(
    `https://${host}/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/locales`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) {
    throw new Error(
      `Could not fetch locales from Contentful: ${res.status} ${res.statusText}`,
    );
  }

  const { items } = await res.json();
  return items.map(({ code, name, default: isDefault }) => ({
    code,
    name,
    default: isDefault,
  }));
}

/** @type {() => Promise<import('next').NextConfig>} */
export default async function nextConfig() {
  const locales = await fetchContentfulLocales();

  return {
    reactStrictMode: true,
    // Inlined at build time and read by lib/locales.js.
    env: {
      CONTENTFUL_LOCALES: JSON.stringify(locales),
    },
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
      // "default" is a routing-only locale: it lets the middleware tell an
      // unprefixed URL apart and redirect it to a real one.
      locales: ['default', ...locales.map((l) => l.code)],
      defaultLocale: 'default',
      // if this is false, the middleware will fall back to a locale that is either in the headers of the browser or cookies and defined in the accepted list above
      localeDetection: true
    },
    trailingSlash: false
  };
}
