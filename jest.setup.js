import "@testing-library/jest-dom";
import dotenv from "dotenv";

dotenv.config({
  path: "/Users/shane.chaffe/Documents/Code/coffee-reviews/.env.local",
});

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
}));

