import "@testing-library/jest-dom/vitest";

// jsdom lacks these browser APIs used by motion and embla.
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver ??= IO as unknown as typeof IntersectionObserver;
globalThis.ResizeObserver ??= IO as unknown as typeof ResizeObserver;
window.matchMedia ??= (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
})) as unknown as typeof window.matchMedia;
