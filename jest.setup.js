import "@testing-library/jest-dom";
import dotenv from "dotenv";

dotenv.config({
  path: "/Users/shane.chaffe/Documents/Code/coffee-reviews/.env.local",
});

// next.config.mjs fetches this from Contentful and inlines it at build time.
// Tests get a fixed subset instead, so they don't depend on the space.
process.env.CONTENTFUL_LOCALES = JSON.stringify([
  { code: "en-GB", name: "English (United Kingdom)", default: true },
  { code: "en-US", name: "English (United States)", default: false },
  { code: "zh-Hant-TW", name: "Chinese (Traditional, Taiwan)", default: false },
  { code: "de-DE", name: "German (Germany)", default: false },
]);

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
}), { virtual: true });

