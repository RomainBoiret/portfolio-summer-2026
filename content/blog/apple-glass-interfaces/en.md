---
title: "The Web Through Apple: Why Glass Is Everywhere"
description: Transparency, depth, and blur - what the return of glass-like interfaces reveals about our desire to make digital surfaces feel material, and where the metaphor fails accessibility.
date: 2026-07-10
series: web-through
seriesOrder: 1
tags:
  - apple
  - glass
  - ui
  - accessibility
---

Last June I watched the WWDC keynote on a weeknight, half-intending to do something else at the same time. Then Control Center showed up on screen, and I stopped doing the something else. A settings panel had just settled on top of the wallpaper, and instead of flatly covering it, the panel bent it, refracted it slightly at the edges, let its color bleed through while keeping every button perfectly legible. It wasn't a static blur pasted over a background. It moved with the light, it reacted as the demo scrolled the wallpaper behind it. I rewound twice to make sure I'd actually seen what I thought I'd seen. Apple called it Liquid Glass. And the question that stayed with me long after I'd closed the tab was this: why do we keep giving physical matter to interfaces that have none?

## Glass as a metaphor, not a material

Worth being clear about one thing before going further: there is no glass in an iPhone screen in any literal sense. There are pixels, gaussian blur calculations, stacked rendering layers computed by a graphics engine. The "glass" we're talking about is a metaphor, in the same family as the desktop trash can or the file folder. What's interesting is that this particular metaphor doesn't try to represent a familiar object so you understand its function - unlike the floppy disk icon that still means "save" even though nobody has touched a floppy disk in decades. Glass, instead, tries to represent a physical property: the way light passes through a material while being partially held back by it. The user isn't asked to recognize an object, they're asked to feel a thickness. It's a metaphor of texture, not of function, and that distinction matters a lot when judging whether it actually works.

## Separation without disappearance

What transparency allows, when it's thought through, is distinguishing two layers without making the one underneath vanish. A fully opaque control panel severs the visual link with whatever it covers: the user loses track of where they were before opening it. A translucent panel, on the other hand, keeps a trace of that context - a color, a blurred shape, a light intensity - while still clearly signaling that a new functional layer has just opened above it. It's a compromise between two needs that normally contradict each other: hierarchy ("this sits above that") and continuity ("you haven't left where you were"). Background blur, slight desaturation, a diffuse drop shadow: these are depth cues standing in for what the eye would naturally do with real, physically stacked layers. You could say the interface simulates a perspective it doesn't actually have, to give the eye the landmarks it expects from three-dimensional space, even though everything is really happening on a single flat plane.

## A history that starts long before Cupertino

What surprised me digging into this a bit is discovering how little of it is genuinely new. Translucent glass in interfaces has a long history, and Apple is neither its inventor nor its only practitioner. Windows Vista, back in 2006, already shipped with Aero Glass: translucent window borders that let you glimpse what was behind them, with blur and highlights meant to evoke a glassy material. At the time the effect was resource-hungry and widely mocked as a gimmick. Then the pendulum swung the other way with early-2010s flat design: iOS 7, in 2013, wiped out skeuomorphism and its leather textures and crumpled-paper effects in favor of matte surfaces and flat colors. Transparency crept back gradually after that, through iOS's Control Center and the translucent menu bars of macOS Yosemite, then more assertively with the "vibrancy" materials of macOS Big Sur. This back-and-forth between simulated matter and flat surface isn't unique to one company; it's a recurring aesthetic pendulum throughout the history of interface design, swinging between the urge to make digital things feel tangible and the urge to strip them down to their simplest form.

## Liquid Glass, or glass that reacts

So what Apple presented in 2025 isn't the invention of transparency, but a technically far more sophisticated version of it. According to the official announcement on Apple Newsroom, Liquid Glass is a material that "reflects and refracts its surroundings," rendered in real time, and that dynamically reacts to movement with specular highlights - the digital equivalent of a point of light sliding across a polished surface as you tilt it. Alan Dye, Apple's vice president of Human Interface Design, describes it this way: the material "combines the optical qualities of glass with a fluidity only Apple can achieve, as it transforms depending on your content or context." What sets this iteration apart from earlier ones isn't the underlying principle - translucency already existed - but the ambition to make it vary continuously, to make it responsive to whatever is underneath rather than applying a generic, static blur.

## Glassmorphism, the web's version

On the web, this same visual vocabulary has had its own name since 2020: glassmorphism. The term was popularized by designer Michał Malewicz, who was looking for a shared word to group effects that different teams had been calling "acrylic" at Microsoft, "vibrancy" at Apple, or simply "glass effect" depending on who you asked. Technically, it relies on very little: a semi-transparent background color, a blur filter applied to whatever sits behind the element, and often a thin light border to suggest a glass edge catching light. I'm not going to walk through how to write that CSS property here - that's not the point of this piece - but what's worth observing is how widely this technique got adopted on dashboard cards, floating navigation bars, and modal windows, wherever a designer wanted a sensation of lightness and layering rather than a stack of opaque blocks.

## Decorative or functional, the real question

This is, to my mind, where the real line sits between good and bad uses of digital glass. Used functionally, it helps distinguish layers, signals that an element floats above the rest, and directs the eye toward whatever is active. Used purely decoratively, it becomes an aesthetic filter slapped on after the fact, disconnected from the structure of the information - a translucent card carries no more meaning than an opaque one if its transparency doesn't communicate anything about its position or role. A lot of sites that jumped on the glassmorphism trend in 2021 fell into that second category: blur everywhere, no clear hierarchy, applied simply because the effect was fashionable. You could almost argue that glass, as a metaphor, only deserves to be invoked when there's actually something to separate without hiding it. Otherwise it's just an Instagram filter slapped over an interface.

## When transparency becomes a legibility problem

There is, however, a real point of friction here, and it would be dishonest not to sit with it: transparency seriously complicates text accessibility. The W3C's minimum contrast criteria call for a ratio of at least 4.5:1 between text and its background for most body text. That calculation assumes a stable background whose luminance is known in advance. A translucent panel, by definition, doesn't have a stable background: its perceived color depends on whatever is behind it at any given moment, which could be a dark wallpaper, a very bright photo, or a saturated color image. White text that's perfectly readable over a dark background blur can become illegible seconds later if the user scrolls a lighter piece of content behind it. That's a problem classic skeuomorphic design never had to deal with, since its opacity guaranteed a predictable, measurable contrast once and for all. There's actually an interesting compensating mechanism on the browser side: the `prefers-reduced-transparency` media query, which lets a user signal that they prefer more opaque interfaces, often for low-vision or visual-sensitivity reasons. Few sites implement it today, which says quite a lot about the fact that this trend was designed first for its aesthetics, and only afterward - if at all - for its accessibility.

## The limits of the analogy

I want to be honest about what this comparison doesn't capture. Real glass follows strict physical properties: it obeys the laws of optics, its refraction depends on its thickness and refractive index, it's fragile, it has weight. None of that applies to digital "glass," which is nothing more than a visual convention chosen because it evokes a sense of matter without carrying any of its constraints. You could push the metaphor further - talk about tinted glass, frosted glass, tempered glass - but that would be artificial: the digital material isn't constrained by physics, it's constrained by legibility and rendering performance. It would be an overstatement to say Liquid Glass or glassmorphism "replicate" glass. They borrow its visual vocabulary to communicate an idea of depth and lightness, nothing more, and that's fine as long as you don't lose sight of the fact that the reference stays an image, not a physical rule to honor to the letter.

## What's left once the blur settles

Looking back at that Control Center demo, I think what fascinates me isn't the effect itself so much as what it reveals about our relationship with digital things: fifteen years after the first touchscreens, we're still trying to give weight and matter to surfaces that have neither. It's not an aesthetic coincidence repeated out of flat-design fatigue. It's a continuing attempt to make the abstract feel more intuitive, to give the eye depth cues it's already known how to read since childhood. But that attempt has a cost, and the cost is often paid in legibility, by the users who most need stable contrast. I don't think transparency should be abandoned - it genuinely makes some interfaces nicer to inhabit - but I do think it deserves to be treated as a choice with a cost, not as a free coat of varnish applied because it's what Apple is doing this year.

## Sources and further reading

- [Apple Newsroom - Apple introduces a delightful and elegant new software design](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [W3C - Understanding Success Criterion 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [MDN - backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [MDN - prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency)
- [Hype4 Academy - Glassmorphism in 2021, by Michał Malewicz](https://hype4.academy/articles/design/glassmorphism-in-2021)
- [Nielsen Norman Group - Glassmorphism: Definition and Best Practices](https://www.nngroup.com/articles/glassmorphism/)
- [Wikipedia - Windows Aero](https://en.wikipedia.org/wiki/Windows_Aero)
