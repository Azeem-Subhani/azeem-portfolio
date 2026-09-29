import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { afterRouteScroll } from "@/lib/reveal-visibility";

describe("afterRouteScroll", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("waits a frame before running the setup", () => {
    const setup = vi.fn();
    afterRouteScroll(setup);

    expect(setup).not.toHaveBeenCalled();
    vi.advanceTimersToNextFrame();
    expect(setup).toHaveBeenCalledOnce();
  });

  it("runs the setup's own cleanup", () => {
    const teardown = vi.fn();
    const cleanup = afterRouteScroll(() => teardown);

    vi.advanceTimersToNextFrame();
    cleanup();
    expect(teardown).toHaveBeenCalledOnce();
  });

  it("never runs the setup when cleaned up before the frame", () => {
    const setup = vi.fn();
    const cleanup = afterRouteScroll(setup);

    cleanup();
    vi.advanceTimersToNextFrame();
    expect(setup).not.toHaveBeenCalled();
  });
});
