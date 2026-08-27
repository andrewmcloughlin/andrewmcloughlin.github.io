---
title: "Clinician's Web Portal"
description: "A web portal for clinicians to manage their patients, patient pathways, order tests, view results and record diagnoses."
layout: item.njk
tags: ["portfolio", "Software", "UI"]
pinned: true
featured_stack: ["Python", "Django", "django-ninja", "HTMX", "Bootstrap"]
other_stack: ["Kubernetes", "Docker", "PostgreSQL", "Stripe", "Salesforce", "GDPR", "django-local-flavor"]
image: "/images/macha.png"
---

## Overview

We needed a public interface for partner clinicians to order tests, view results and record diagnoses on behalf of their patients. This required integration with Stripe and Salesforce, as well as a robust authentication system.

We used Bootstrap and HTMX to create a responsive and professional interface. I designed custom components, icons and illustrations in Figma to create a cohesive and modern look and feel.

## Key Challenges

### Modularisation

The same application was used by exterrnal and internal clinicians, internal fulfillments staff and support staff, each with different requirements and permissions. We separated each use case into its own Django app, with its own models, views and templates and exclusively used services to move objects between apps. This ensured that we could maintain a clean separation of concerns and that we could easily add new use cases in the future.


### Internationalisation

As the company expanded into the US market, we needed to support multiple currencies, address formats, date formats and timezones. GDPR required that US data be stored in the US, while UK data be stored in the UK, so we would need separate instances of the application. We used `django-local-flavor` to handle the different address formats and set the region based on the subdomain.