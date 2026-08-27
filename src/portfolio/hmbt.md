---
title: "Fulfillments Application"
description: "A web application for managing the fulfillment of orders."
layout: item.njk
tags: ["portfolio", "Software"]
pinned: false
featured_stack: ["Python", "Django", "HTMX", "PostgreSQL", "Bootstrap"]
other_stack: ["Docker", "Kubernetes", "Metabase", "RabbitMQ", "Celery"]
image: /images/hmbt.png
---

## The Problem

Fulfillments used to be recorded on huge spreadsheets (think tens of thousands of rows), which was time consuming, error prone, painfully slow to open and a nightmare to search. 

## My Solution

I shadowed the fulfillment team for 2 days to understand their workflow and identify pain points. I then designed low fidelity mockups in Figma with user-flows and iterated on them with the team until we had a design that everyone was happy with.

The system worked like a self-checkout: operations users would import today's file and would be presented with a summary of the number of each type of kit to pack. They would then scan the barcode on each kit, which would confirm the kit type was correct and the system would print a Royal Mail shipping label. As users were shipping nearly 100 kits per day, the UI was gamified to make the process more engaging.

This was a very quick greenfield project, built in django, htmx and postgres. To save time we embedded live Metabase dashboards to provide real-time insights into the fulfillment process.



## Challenges

### Integration with third party order management system

The main challenge was integration with the third party order management system, which had no APIs and only offered XLSX exports with lots of freetext fields being used for categorical data. I build an idempotent importer which rigorously checked the schema. We used fuzzy matching of freetext against categories to guess what the user intended and if a perfect match was not obtained we presented the original free-text alongside our best-guess to the opeartions user to either confirm or correct.


### Data Quality

Importing the historical data was a challenge. There was no validation on the spreadsheets, so we had to do a lot of data cleaning and transformation to get the data into a usable format. I identified an average of 5% of rows had some form of data quality issue, after the app, we tracked the number of issues over a 2 year period and not a single data quality issue was identified.



## Results

Despite being a very short project, set up in a couple of weeks, it was often quoted by leadership as an example of how Data Engineering can add value to the business. The embedded dashboards allowed the fulfillment team to see their KPIs in real-time, which helped them to identify and resolve issues quickly.