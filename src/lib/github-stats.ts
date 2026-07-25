import { siteConfig } from "@/data/site";

export type GithubGrade = "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "E";

export type GithubStats = {
  username: string;
  profileUrl: string;
  contributions: number | null;
  repositories: number;
  stars: number;
  followers: number;
  grade: GithubGrade;
  /** 0–100 score used to derive the letter grade. */
  gradeScore: number;
};

function githubUsernameFromConfig(): string {
  const href = siteConfig.social.find((item) => item.icon === "github")?.href;
  if (!href) return "RomainBoiret";
  try {
    const path = new URL(href).pathname.replace(/^\/+|\/+$/g, "");
    return path.split("/")[0] || "RomainBoiret";
  } catch {
    return "RomainBoiret";
  }
}

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "romainboiret-portfolio",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/** Soft-cap log curve → 0–100 so early portfolios still get fair grades. */
function metricScore(value: number, softCap: number): number {
  if (value <= 0) return 0;
  return Math.min(100, (Math.log1p(value) / Math.log1p(softCap)) * 100);
}

export function computeGithubGrade(input: {
  contributions: number | null;
  stars: number;
  followers: number;
  repositories: number;
}): { grade: GithubGrade; gradeScore: number } {
  const contributions = input.contributions ?? 0;
  const weighted =
    metricScore(contributions, 400) * 0.35 +
    metricScore(input.stars, 40) * 0.25 +
    metricScore(input.followers, 40) * 0.2 +
    metricScore(input.repositories, 25) * 0.2;

  const gradeScore = Math.round(Math.min(100, Math.max(0, weighted)));

  let grade: GithubGrade;
  if (gradeScore >= 90) grade = "A+";
  else if (gradeScore >= 80) grade = "A";
  else if (gradeScore >= 70) grade = "B+";
  else if (gradeScore >= 60) grade = "B";
  else if (gradeScore >= 50) grade = "C+";
  else if (gradeScore >= 40) grade = "C";
  else if (gradeScore >= 25) grade = "D";
  else grade = "E";

  return { grade, gradeScore };
}

function withGrade(
  base: Omit<GithubStats, "grade" | "gradeScore">,
): GithubStats {
  const { grade, gradeScore } = computeGithubGrade(base);
  return { ...base, grade, gradeScore };
}

type GraphqlUser = {
  followers: { totalCount: number };
  contributionsCollection: {
    contributionCalendar: { totalContributions: number };
  };
  repositories: {
    totalCount: number;
    nodes: Array<{ stargazerCount: number }>;
  };
};

async function fetchViaGraphql(
  username: string,
): Promise<GithubStats | null> {
  const query = `
    query ($login: String!) {
      user(login: $login) {
        followers { totalCount }
        contributionsCollection {
          contributionCalendar { totalContributions }
        }
        repositories(
          first: 100
          ownerAffiliations: OWNER
          isFork: false
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          totalCount
          nodes { stargazerCount }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const json = (await res.json()) as {
    data?: { user: GraphqlUser | null };
  };
  const user = json.data?.user;
  if (!user) return null;

  const stars = user.repositories.nodes.reduce(
    (sum, node) => sum + (node.stargazerCount ?? 0),
    0,
  );

  return withGrade({
    username,
    profileUrl: `https://github.com/${username}`,
    contributions: user.contributionsCollection.contributionCalendar
      .totalContributions,
    repositories: user.repositories.totalCount,
    stars,
    followers: user.followers.totalCount,
  });
}

async function fetchViaRest(username: string): Promise<GithubStats | null> {
  const headers = authHeaders();

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    }),
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
      { headers, next: { revalidate: 3600 } },
    ),
  ]);

  if (!userRes.ok || !reposRes.ok) return null;

  const user = (await userRes.json()) as {
    public_repos?: number;
    followers?: number;
  };
  const repos = (await reposRes.json()) as Array<{
    fork?: boolean;
    stargazers_count?: number;
  }>;

  const owned = repos.filter((repo) => !repo.fork);
  const stars = owned.reduce(
    (sum, repo) => sum + (repo.stargazers_count ?? 0),
    0,
  );

  return withGrade({
    username,
    profileUrl: `https://github.com/${username}`,
    contributions: null,
    repositories: user.public_repos ?? owned.length,
    stars,
    followers: user.followers ?? 0,
  });
}

/** Public GitHub activity for the portfolio strip. Cached ~1h. */
export async function getGithubStats(): Promise<GithubStats | null> {
  const username = githubUsernameFromConfig();

  try {
    if (process.env.GITHUB_TOKEN) {
      const viaGraphql = await fetchViaGraphql(username);
      if (viaGraphql) return viaGraphql;
    }
    return await fetchViaRest(username);
  } catch {
    return null;
  }
}
