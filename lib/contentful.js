import { createClient } from "contentful";

// If you want to change between the CDA and CPA, please adjust the true value in .env.local to false so the domains switch as well as keys

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_LOCAL_DEV === "true"
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
  host: process.env.NEXT_PUBLIC_LOCAL_DEV === "true"
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ADDRESS
    : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_ADDRESS,
});

console.log(
  "Which host is being used? ",
  process.env.NEXT_PUBLIC_LOCAL_DEV === "true"
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ADDRESS
    : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_ADDRESS
);
console.log("Local?", process.env.NEXT_PUBLIC_LOCAL_DEV);
console.log("Prod?", process.env.NEXT_PUBLIC_LOCAL_DEV);
console.log("Equivalent?", process.env.NEXT_PUBLIC_LOCAL_DEV === "false")