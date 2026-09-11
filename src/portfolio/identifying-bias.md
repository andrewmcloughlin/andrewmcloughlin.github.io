---
title: "Automating Bias Detection"
description: "Pipeline to detect bias across study arms."
layout: item.njk
tags: ["portfolio", "Data"]
pinned: true
order: 1
featured_stack: ["Python", "SQL", "dbt"]
---

## The Issue

When running a clinical trial, it is imperative that the control arm accurately reflects the study group in every way but one. In practice of course you cannot ensure the control arm is entirely reflective unless you are doing twin studies, so you have to ensure they are at least not statistically different. During recruitment if you notice one study arm is starting to become significantly different from the other, so should start pro-actively recruiting the under-represented cohorts.

## Solution

We ran nightly python scripts on the anonymised clinical demographic data, looking for statistical differences. For continuous data we ran Student's T-tests (although we found age to be significantly skewed so we opted for a Mann-Whitney U-test) and for categorical variables, we used Chi-squared tests. In terms of implementation these were run from dbt on a nightly basis and the results output to a BI dashboard (Metabase), with automated notifications set to email study owners if and when bias was detected. As we were looking at a significant number of variables we used Bonferoni correction to ensure no false positives.

Fortunately for us, no bias was ever detected and no corrective action was required. In hindsight, perhaps the Bonferonni correction was unneccessary, as we would rather err on the side of senstivity.
