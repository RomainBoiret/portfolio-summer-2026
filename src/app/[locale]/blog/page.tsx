import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/blog-index";
import { BlogPrefetch } from "@/components/blog/blog-prefetch";
import { getAllBlogPosts } from "@/lib/blog";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const posts = getAllBlogPosts(locale);

  return (
    <>
      <BlogPrefetch
        locale={locale}
        slugs={posts.map((post) => post.slug)}
      />
      <BlogIndex
        locale={locale}
        posts={posts}
        copy={{
          title: dictionary.blog.title,
          blurb: dictionary.blog.blurb,
          empty: dictionary.blog.empty,
          readingTime: dictionary.blog.readingTime,
          allTags: dictionary.blog.allTags,
          clearFilter: dictionary.blog.clearFilter,
          noPostsForTag: dictionary.blog.noPostsForTag,
          filterByTag: dictionary.blog.filterByTag,
          seriesLabel: dictionary.blog.seriesLabel,
          allPosts: dictionary.blog.allPosts,
          searchPlaceholder: dictionary.blog.searchPlaceholder,
        }}
      />
    </>
  );
}
