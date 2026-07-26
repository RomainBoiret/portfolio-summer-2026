---
title: Vue patterns I keep reusing
description: Composables, clear props, and a few habits that help small UI systems feel finished.
date: 2026-07-08
draft: true
tags:
  - learning
  - vue
---

I keep returning to the same Vue habits: small composables, straightforward prop names, and components that already look reasonable by default.

## Worth repeating

- Prefer **local state** until shared state becomes painful.
- Name events after what happened, not what the parent should do.
- Ship empty states early - they reveal the real product shape.

Small libraries get better when each component answers one question well.
