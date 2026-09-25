---
title: "Lessons Learn from Creating a Personal Site"
description: ""
layout: item.njk
tags: ["blog", "Software"]
pinned: false
# image: /images/actigraphy.png
---


# Lessons Learnt from Building a Personal Portfolio


## Dark Mode

I had not appreciated how mucg effort goes into good dark mode designs. Naievly I had assumed changing merely the CSS theme would be sufficient, but my site uses a lot of light-mode screenshots of software which come out blindingly bright. So I have to go back to hostorical software and recreate the screenshots in both light and dark mode and display the appropraite one accordingly. On the CV page I also display logos, which I have as SVGs, so I can dynamically change the colours in CSS.

Creating both dark/light mode versions of every image used in the site is a huge overhead that I had not previously appreciated.


## 