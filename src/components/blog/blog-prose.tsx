"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconCheck, IconCopy } from "@/components/ui/icons";

export function BlogProse({
  html,
  copyLabel,
  copiedLabel,
}: {
  html: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [buttons, setButtons] = useState<
    { pre: HTMLPreElement; key: number }[]
  >([]);
  const [copiedKey, setCopiedKey] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const found = Array.from(root.querySelectorAll("pre")).map((pre, key) => ({
      pre,
      key,
    }));
    setButtons(found);

    for (const heading of root.querySelectorAll<HTMLElement>("h2[id], h3[id]")) {
      if (heading.querySelector(".blog-heading-anchor")) continue;
      const anchor = document.createElement("a");
      anchor.href = `#${heading.id}`;
      anchor.className = "blog-heading-anchor";
      anchor.setAttribute("aria-label", heading.textContent?.trim() ?? "Link");
      anchor.textContent = "#";
      heading.appendChild(anchor);
    }
  }, [html]);

  useEffect(() => {
    if (copiedKey === null) return;
    const timer = window.setTimeout(() => setCopiedKey(null), 1600);
    return () => window.clearTimeout(timer);
  }, [copiedKey]);

  return (
    <>
      <div
        ref={rootRef}
        id="blog-article-body"
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {buttons.map(({ pre, key }) => (
        <CodeCopyPortal
          key={key}
          pre={pre}
          label={copiedKey === key ? copiedLabel : copyLabel}
          copied={copiedKey === key}
          onCopy={async () => {
            const text = pre.textContent ?? "";
            try {
              await navigator.clipboard.writeText(text);
              setCopiedKey(key);
            } catch {
              /* ignore */
            }
          }}
        />
      ))}
    </>
  );
}

function CodeCopyPortal({
  pre,
  label,
  copied,
  onCopy,
}: {
  pre: HTMLPreElement;
  label: string;
  copied: boolean;
  onCopy: () => void;
}) {
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const wrap = pre.closest(".blog-code");
    if (!(wrap instanceof HTMLElement)) return;
    setHost(wrap);
  }, [pre]);

  if (!host) return null;

  return createPortal(
    <button
      type="button"
      className="blog-code-copy"
      aria-label={label}
      onClick={onCopy}
    >
      {copied ? <IconCheck /> : <IconCopy />}
      <span>{label}</span>
    </button>,
    host,
  );
}
