---
title: "Laboratory Information Management System"
description: "Maintenance and continuous development of a LIMS system critical to the everyday running of the company."
layout: item.njk
tags: ["portfolio", "Software"]
pinned: false
featured_stack: ["Python", "Django", "HTMX", "PostgreSQL"]
other_stack: ["Kubernetes", "Docker", "Bootstrap"]
image: /images/tyto.png
---
The LIMS is an evolving monolithic django app with a very complex data model and a large user base of internal users. Our team inherited a large amount of tech debt and managed to modularise and modernise the codebase significantly, while quickly adapting it to support the company's evolving needs.


## The Challenges of Brownfield Development

Most django apps have a life-span of a few years, but this LIMS had been running and actively developed for over a decade, preceding anyone on the team and even the company itself. It had grown organically and the company's business processes had evolved significantly. As ever-more previously-experimental processes became embedded in the company's operations, a common task was to run migrations to backfill data in the database. This required idempotent migrations that could be run multiple times without causing data corruption.

We also commonly ran data scripts to correct historical errors. An important pattern was asserting the state of the database both before and after the script and ensuring the correct number of records had been amended. These data scripts were stored in a separate git repo and uploaded to the app database via admin to be run with an async job.
