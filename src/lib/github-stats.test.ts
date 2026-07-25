import { describe, expect, it } from "vitest";
import { computeGithubGrade } from "@/lib/github-stats";

describe("computeGithubGrade", () => {
  it("returns E for an empty profile", () => {
    expect(
      computeGithubGrade({
        contributions: 0,
        stars: 0,
        followers: 0,
        repositories: 0,
      }),
    ).toEqual({ grade: "E", gradeScore: 0 });
  });

  it("treats null contributions as zero", () => {
    const withNull = computeGithubGrade({
      contributions: null,
      stars: 0,
      followers: 0,
      repositories: 0,
    });
    const withZero = computeGithubGrade({
      contributions: 0,
      stars: 0,
      followers: 0,
      repositories: 0,
    });
    expect(withNull).toEqual(withZero);
  });

  it("scores a modest student profile around mid grades", () => {
    const result = computeGithubGrade({
      contributions: 48,
      stars: 13,
      followers: 19,
      repositories: 12,
    });
    expect(result.gradeScore).toBeGreaterThanOrEqual(40);
    expect(result.gradeScore).toBeLessThan(90);
    expect(["C", "C+", "B", "B+", "A"]).toContain(result.grade);
  });

  it("gives a stronger grade for a richer profile", () => {
    const modest = computeGithubGrade({
      contributions: 20,
      stars: 2,
      followers: 3,
      repositories: 5,
    });
    const strong = computeGithubGrade({
      contributions: 500,
      stars: 80,
      followers: 60,
      repositories: 40,
    });
    expect(strong.gradeScore).toBeGreaterThan(modest.gradeScore);
  });

  it("never exceeds score bounds", () => {
    const result = computeGithubGrade({
      contributions: 100_000,
      stars: 100_000,
      followers: 100_000,
      repositories: 100_000,
    });
    expect(result.gradeScore).toBeLessThanOrEqual(100);
    expect(result.gradeScore).toBeGreaterThanOrEqual(0);
    expect(result.grade).toBe("A+");
  });
});
