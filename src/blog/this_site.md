---
title: "Lessons Learn from Creating a Personal Site"
description: ""
layout: item.njk
tags: ["blog", "Software"]
pinned: false
# image: /images/actigraphy.png
---

## Dark Mode

I had not appreciated how much effort goes into good dark mode designs. Naievly I had assumed changing merely the CSS theme would be sufficient, but there is much more to consider:

 - light fonts on dark backgrounds need heavier weights to be equally legible
 - media with white backgrounds and media with light mode screenshots can feel blindingly bright
 - SVGs can be dynamically changed but you have in-line them first.

Creating both dark/light mode versions of every image used in the site is a huge overhead that I had not previously appreciated.
