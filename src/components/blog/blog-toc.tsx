"use client";

import { useEffect, useState } from "react";
import type { BlogTocItem } from "@/lib/blog-types";
import { cn } from "@/lib/utils";

function TocList({
  items,
  activeId,
  onSelect,
}: {
  items: BlogTocItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ol className="blog-toc-list">
      {items.map((item) => (
        <li key={item.id} className={cn(item.level === 3 && "is-h3")}>
          <a
            href={`#${item.id}`}
            className={cn("blog-toc-link", activeId === item.id && "is-active")}
            onClick={() => onSelect(item.id)}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function BlogToc({
  items,
  title,
}: {
  items: BlogTocItem[];
  title: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <>
      <details className="blog-toc-mobile">
        <summary>{title}</summary>
        <TocList items={items} activeId={activeId} onSelect={setActiveId} />
      </details>

      <nav className="blog-toc" aria-label={title}>
        <p className="blog-toc-title">{title}</p>
        <TocList items={items} activeId={activeId} onSelect={setActiveId} />
      </nav>
    </>
  );
}
