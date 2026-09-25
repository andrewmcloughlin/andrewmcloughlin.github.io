---
title: "Brownfield Development for a Laboratory Information Management System"
description: "Maintenance and continuous development of a LIMS system critical to the everyday running of the company."
layout: item.njk
tags: ["blog", "Software"]
pinned: false
featured_stack: ["Python", "Django", "PostgreSQL"]
other_stack: ["Kubernetes", "Docker", "Bootstrap", "HTMX"]
# image: /images/tyto.png
---

# The Project

Tyto is a Laboratory Management Information System (LIMS) which records lab operations and tracks lab supplies. Although it was initially intended as a temporary solution Tyto is now over 11 years old and still in active development. It has evolved very organically to the changing needs of the company (in fact the app pre-dates Owlstone Medical). This long-standing organic evolution meant we inherited a lot of undocumented tech debt. Our job was to identify and pay off this debt and build new features in a way that didn't build upon the already extensive debt.

# What We Did

<ul>
    <li>Tyto was a monolithic <a href="https://www.geeksforgeeks.org/system-design/big-ball-of-mud-anti-pattern/" target="_blank">big ball of mud</a> with a single app under the django project.</li>
    <li>We introduced new apps for new features where appropriate.</li>
    <li>We did extensive renaming of legacy names to reduce cognitive load on developers.</li>
    <li>We added analytics, so we could track whether certain pages were actually being used and dediced to remove legacy features.</li>
    <li>We identified data quality issues and ran a series of on-off data fix scripts.</li>
</ul>

# My Contributions

I was responsible for:
<ul>
    <li>introducing a number of new django apps and enforced that all cross-app imports be restricted to services, making it much more modular</li>
    <li>Writing and running idempotent data scripts. An important pattern was asserting the state of the database both before and after the script and ensuring the correct number of records had been amended. These data scripts were stored in a separate git repo and uploaded to the app database via admin to be run with an async job.
</li>
</ul>
