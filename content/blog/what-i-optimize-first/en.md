---
title: What I optimize first
description: A practical order of attack when a page feels slow: measure correctly, protect LCP, reduce JavaScript, then refine.
date: 2026-06-12
tags:
  - performance
  - frontend
  - learning
---

When a page felt slow, I used to open DevTools and change settings at random. Now I follow a simple order. Simple is faster.

## 1. Measure the right build

Local `next dev` misleads. Extensions mislead. Measure a production preview in a private window first. If the score is already strong, stop optimizing ghosts.

## 2. Protect LCP

Whatever paints as the largest element should not start invisible. Hero text that fades in from `opacity: 0` is a common mistake. Keep the LCP node readable on first paint, then animate the rest.

## 3. Cut JavaScript you do not need on first load

Route splitting helps. Keeping blog tooling off the homepage helps more. Ask whether the code needs to run before the visitor cares.

## 4. Defer decoration

Atmosphere - shapes, soft parallax, idle illustrations - can wait for `requestIdleCallback`. Users forgive missing decoration. They notice a late headline.

## 5. Only then chase smaller wins

Font fallbacks, image sizes, cache headers. Useful, but rarely the first bottleneck on a content site.

Performance is a product decision: what deserves attention in the first second, and what can arrive once trust is earned.
