import { createClient } from "contentful";

export const createClient = jest.fn(() => ({
  getEntries: jest.fn(() => Promise.resolve({ items: [] })),
  getEntry: jest.fn(() => Promise.resolve({})),
}));
