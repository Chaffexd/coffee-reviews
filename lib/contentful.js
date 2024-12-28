import { createClient } from "contentful";

// If you want to change between the CDA and CPA, please adjust the true value in .env.local to false so the domains switch as well as keys

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_LOCAL_DEV ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
  host: process.env.NEXT_PUBLIC_LOCAL_DEV ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ADDRESS : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_ADDRESS,
});

console.log("KEY", process.env.NEXT_PUBLIC_LOCAL_DEV)