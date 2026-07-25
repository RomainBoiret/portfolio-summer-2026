export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
};

export type BlogPost = BlogPostMeta & {
  html: string;
};
