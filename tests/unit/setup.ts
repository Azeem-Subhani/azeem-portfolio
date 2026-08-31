import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement matchMedia or IntersectionObserver. The reveal
// hook and theme toggle both depend on them, so provide minimal stand-ins.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}

if (!("IntersectionObserver" in window)) {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  // @ts-expect-error jsdom has no built-in IntersectionObserver
  window.IntersectionObserver = MockIntersectionObserver;
}
