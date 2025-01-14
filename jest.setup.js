import "@testing-library/jest-dom";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
}));

process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID = "mock-space-id";
process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN = "mock-delivery-token";
process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN = "mock-preview-token";
process.env.NEXT_PUBLIC_LOCAL_DEV = "true";
