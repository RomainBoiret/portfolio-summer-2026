---
title: Shipping a fast portfolio without the usual weight
description: What actually improved this site’s Lighthouse score - and which performance advice turned out to be noise.
date: 2026-07-22
series: portfolio-notes
seriesOrder: 3
tags:
  - performance
  - nextjs
  - portfolio
---

I spent a few days improving performance on this portfolio. Some advice helped. A lot of it measured the wrong thing.

## Development is not production

The Network tab in `next dev` looks alarming: megabytes of `main-app.js`, a live Webpack HMR socket, unminified chunks. None of that reaches visitors. Measure with:

```bash
npm run preview
```

Then audit `/en` in a private window. That habit alone kept me from “optimizing” problems that did not exist.

## What actually helped

- **Keep blog code off the homepage.** Posts live on their own routes and only load when opened.
- **Do not hide the LCP element.** Animating the hero name from `opacity: 0` delayed paint for no good reason.
- **Defer decoration.** The geometric field waits for idle time so it never competes with first paint.
- **Trust modern browsers.** Removing legacy polyfills cut weight without changing the experience.

## What I ignore now

Chrome extensions inside Lighthouse. Grammarly alone can invent “unused JavaScript” that has nothing to do with the site.

Performance work is more useful when the score reflects what readers actually download - not what an editor injects.
