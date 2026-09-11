---
title: "Data Warehouse"
description: "Designed, built and maintained a data warehouse for clinical, laboratory and financial data."
layout: item.njk
tags: ["portfolio", "Data"]
pinned: true
order: 2
featured_stack: ["Airflow", "dbt", "Airbyte", "Metabase", "GCP", "SQL"]
other_stack: ["PostgreSQL", "Google Looker Studio"]
image: "/images/metabase.png"
---
I designed and built a data warehouse for clinical, laboratory and financial data, which significantly improved the time and effort required to generate reports and insights.

## What is the Data Warehouse?

The Data Warehouse is a centralised repository for all of the company's data. It is used to store and analyse data from various sources, including clinical trials, laboratory results, and financial records.

## What problems does it solve?

Before the data warehouse, the company's data was stored in various silos, making it difficult to access and analyse. The data warehouse solved this problem by providing a centralised repository for all of the company's data.

## Key Challenges

One of the biggest challenges was the variety of data sources we had to deal with. We had:

- clinical trial data (exported from OpenClinica's API) which included Subject Visits, Demography and Adverse Events
- laboratory data (coming from 2 separate in house LIMS)
- operations data (about requests, shipments and analyses)
- commercial data (sales, projections and customer support)
- chemical data (pulled from the VOC Atlas and ChEBI)
- publication records (pulled via the CrossRef API)
- common dimensional elements (such as date and time of day)


## Design Philosophy

Fast, graceful failures. When a pipeline fails, we favour outdated data over no data. I used Teams webhooks to notify us of failed jobs.
Used dbt incremental runs and snapshot models to efficiently manage high-volume telemetry and historical state changes without full-table re-scans.
We implemented automated schema tests (such as unique, not_null, relationships), and freshness checks to catch silent anomalies before downstream dashboards break or incorrect clinical reports were generated.


## My Solution

We use [Metabase](https://www.metabase.com), an open source and incredibly easy-to-use BI tool. Prior to this we were using Looker Studio, which was less intuitive and required more technical expertise to use effectively.

We also used [Airbyte](https://airbyte.com), which has prebuilt connectors for a tonne of common sources. This meant that we didn't have to write custom connectors for each data source, which saved us a lot of time and effort. We hooked Airflow up to Teams to notify us of failed jobs, which meant that we could react quickly to any issues.

We used [Airflow](https://airflow.apache.org/) to orchestrate the data pipelines, and dbt to transform the data according to Kimball methodology.

We enforced strict data contracts: explicit schemas (data types, ranges, nullability constraints, regular expressions) enforced in dbt. Early on we agreed on terminolgies with other teams (does a "sample" refer to the contents of a single tube following a breath collection, or all of them, and is the content of a tube prior to a beath sample also a "sample"?). These were the questions we had to get on the same page about, in order for teams to be able to speak to each other, let alone share data. We also wrote Service Layer Agreements tied to KPIs about data freshness and versioning rules for breaking schema changes.

## Impact

The data warehouse has been a valuable asset to the company. It has allowed us to provide self-service analytics to our stakeholders, which has reduced the time and effort required to generate reports and insights. It has also allowed us to identify trends and patterns in the data that would have been difficult to identify otherwise.

