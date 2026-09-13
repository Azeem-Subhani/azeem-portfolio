import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useScrolled } from "@/hooks/use-scrolled";

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value,
  });
  window.dispatchEvent(new Event("scroll"));
}

describe("useScrolled", () => {
  afterEach(() => {
    setScrollY(0);
  });

  it("starts compact only after the page is scrolled past the threshold", () => {
    setScrollY(0);
    const { result } = renderHook(() => useScrolled(24));

    expect(result.current).toBe(false);

    act(() => {
      setScrollY(25);
    });
    expect(result.current).toBe(true);

    act(() => {
      setScrollY(0);
    });
    expect(result.current).toBe(false);
  });

  it("reads the current scroll position on mount", () => {
    setScrollY(80);
    const { result } = renderHook(() => useScrolled(24));

    expect(result.current).toBe(true);
  });
});
