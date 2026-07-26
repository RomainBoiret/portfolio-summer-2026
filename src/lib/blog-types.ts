export type BlogTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
  /** Optional series id (e.g. "fidelio"). Standalone posts omit this. */
  series?: string;
  /** 1-based order within the series. */
  seriesOrder?: number;
};

export type BlogPost = BlogPostMeta & {
  html: string;
  toc: BlogTocItem[];
};
