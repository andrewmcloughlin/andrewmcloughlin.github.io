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
I designed and built a data warehouse for clinical, laboratory and financial data, which significantly improved the time and effort required to generate reports and insights. It also allowed us to provide self-service analytics to our stakeholders, which reduced the time and effort required to generate reports and insights.

## What is the Data Warehouse?

The Data Warehouse is a centralised repository for all of the company's data. It is used to store and analyse data from various sources, including clinical trials, laboratory results, and financial records.

## What problems does it solve?

Before the data warehouse, the company's data was stored in various silos, making it difficult to access and analyse. The data warehouse solved this problem by providing a centralised repository for all of the company's data. It also allowed us to provide self-service analytics to our stakeholders, which reduced the time and effort required to generate reports and insights.

## Key Challenges

One of the biggest challenges was the variety of data sources we had to deal with. We had clinical data from various sources, laboratory data from various sources, and financial data from various sources. Each source had its own format and structure, making it difficult to integrate the data into a single repository. 


## Design Philosophy

Fast, graceful failures. When a pipeline fails, we favour outdated data over no data. I used Teams webhooks to notify us of failed jobs.


## My Solution

I serendipitously discovered [Metabase](https://www.metabase.com), an open source BI tool that allowed us to provide self-service analytics to our stakeholders. This was a game changer for the company, as it allowed us to get insights from our data quickly and easily. Prior to this we were using Looker Studio, which was less intuitive and required more technical expertise to use effectively.

We also used [Airbyte](https://airbyte.com), which has prebuilt connectors for a tonne of common sources. This meant that we didn't have to write custom connectors for each data source, which saved us a lot of time and effort. We hooked Airflow up to Teams to notify us of failed jobs, which meant that we could react quickly to any issues.

We used [Airflow](https://airflow.apache.org/) to orchestrate the data pipelines, and dbt to transform the data according to Kimball methodology.

## Impact

The data warehouse has been a valuable asset to the company. It has allowed us to provide self-service analytics to our stakeholders, which has reduced the time and effort required to generate reports and insights. It has also allowed us to identify trends and patterns in the data that would have been difficult to identify otherwise.

