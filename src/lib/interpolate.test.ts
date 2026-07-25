import { describe, expect, it } from "vitest";
import { interpolate } from "@/lib/interpolate";

describe("interpolate", () => {
  it("replaces named placeholders", () => {
    expect(
      interpolate("Hello {name}, you have {count} messages", {
        name: "Romain",
        count: 3,
      }),
    ).toBe("Hello Romain, you have 3 messages");
  });

  it("replaces every occurrence of the same key", () => {
    expect(interpolate("{x} + {x} = {sum}", { x: 2, sum: 4 })).toBe(
      "2 + 2 = 4",
    );
  });

  it("leaves unknown placeholders untouched", () => {
    expect(interpolate("Hi {name}", { other: "x" })).toBe("Hi {name}");
  });

  it("stringifies numeric values", () => {
    expect(interpolate("score {score}", { score: 0 })).toBe("score 0");
  });
});
