import { createClient } from "contentful";

// If you want to change between the CDA and CPA, please adjust the true value in .env.local to false so the domains switch as well as keys
// Env vars are always strings, so compare against "true" rather than the boolean.
export const isPreview = process.env.NEXT_PUBLIC_LOCAL_DEV === "true";

// .withoutUnresolvableLinks strips links that cannot be resolved instead of
// leaving bare link objects behind. Personalization relies on this: an
// unpublished variant or image would otherwise reach components as a link and
// blow up on the first field access.
export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: isPreview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
  host: isPreview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ADDRESS
    : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_ADDRESS,
}).withoutUnresolvableLinks;