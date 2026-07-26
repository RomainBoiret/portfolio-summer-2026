---
title: View Transitions for project filters
description: How a small progressive enhancement makes the projects grid feel smoother when categories change.
date: 2026-06-18
draft: true
tags:
  - cool-finds
  - css
---

I wrapped project filter updates in `document.startViewTransition` when the browser supports it.

No library. No animation framework. Just a softer rearrange when categories change - and an instant swap when reduced motion is preferred.

Progressive enhancement still earns its place.
