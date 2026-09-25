import { describe, expect, it } from "vitest";

import { parseCount } from "@/components/why/why-motion";

describe("parseCount", () => {
  it("counts higher-is-better figures up from zero", () => {
    const format = parseCount("99.95%")!;
    expect(format(0)).toBe("0.00%");
    expect(format(1)).toBe("99.95%");
  });

  it("counts lower-is-better figures down to the target", () => {
    const format = parseCount("3–4 weeks", true)!;
    expect(format(0)).toBe("9–12 weeks");
    expect(format(0.5)).toBe("6–8 weeks");
    expect(format(1)).toBe("3–4 weeks");
  });

  it("counts down from an explicit start when one is given", () => {
    const format = parseCount("3–4 weeks", true, "8–12 weeks")!;
    expect(format(0)).toBe("8–12 weeks");
    expect(format(1)).toBe("3–4 weeks");
  });

  it("falls back to the multiple when the start has a different shape", () => {
    expect(parseCount("3–4 weeks", true, "10 weeks")!(0)).toBe("9–12 weeks");
  });

  it("returns null for word figures", () => {
    expect(parseCount("Custom", true)).toBeNull();
  });
});
