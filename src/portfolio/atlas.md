---
title: "VOC Atlas: The Periodic Table of Breath"
description: "An interactive web application for exploring the world of Volatile Organic Compounds (VOCs)."
layout: item.njk
tags: ["portfolio", "UI", "Software"]
pinned: true
featured_stack: ["Python", "Django", "HTMX", "htpy", "Bootstrap", "RDKit"]
other_stack: ["Kubernetes", "Docker", "PostgreSQL"]
image: /images/atlas.png
---



## What is the VOC Atlas?

[VOC Atlas](https://www.vocatlas.com)

A django-based web application for exploring the world of Volatile Organic Compounds (VOCs). It consists of a public-facing read only interface and a private interface for Owlstone employees to upload and manage data.


## What problems does it solve?

You may have heard stories of [dogs that can smell diseases](https://www.bbc.com/news/health-60636541) or [the nurse who could smell Alzheimer's disease](https://www.bbc.com/news/uk-scotland-68537913). There is good biological prior to suggest that signals for diseases are present in the air we exhale and this theory is why [Owlstone Medical](https://www.owlstonemedical.com) was founded. The challenge however is that breath is full of noise from the food we eat, the environment we live in and the medications we take. The [VOC Atlas](https://www.vocatlas.com) is a collaborative tool to allow the breath research community to contribute breath data to attempt to find correlations between signals on breath and diseases.

## Design Philosophy

I was keen for Atlas to have an immutable database, so that we could always trace the provenance of the data. I designed the data models to be append-only with no risk of losing data. The only instance in which data might need to be amended is if a user withdraws consent for their data to be used or if PII is discovered in the dataset.


## Key Challenges

Chemistry is complex and biology is messy. Trying to model the subtleties of chemistry (especially the limits of our detection capabilities) and trying to model the ontogology of human diseases proved to be a significant challenge.

As my first public facing product, I was keen to ensure that the application was accessible and easy to use. This led to the decision to use HTMX and Bootstrap to create a modern and responsive user interface.


### Legal

Legal Team required that users accept the latest T&Cs and Privacy Policies before accessing the site. To do this I created a modular legal django app, which stored the legal docs as markdown  files in the database and used [markdownify](https://pypi.org/project/markdownify/) to render them to HTML. This allowed the legal team to update the T&Cs and Privacy Policies without requiring a code change.

### Chemistry

All compounds are stores as InChI strings in the database. The cool thing about InChi strings is that they encode the entire chemical structure, so you can use a package like [rdkit](https://www.rdkit.org/) to generate 2D and 3D representations of the molecules in JavaScript. Not only that but you can also interrogate the compound structure to determine properties of the molecule, such as molecular weight, logP, etc. I chose to  have `rdkit` generate these properties on compound creation and store them in the database, so we could easily query compounds based on these properties. This was a significant performance improvement over generating these properties on the fly.

### Biology

Biology is messy. Originally we planned for Atlas to compare compounds across diseases, but we discovered that many of studies we used weren't using disease categories, but were comparing symptoms or healthy populations or biological processes, rather than diseases. This meant whatever system we used to classify these comparative groups had to flexible enough to accommodate this. Fortunately this is where ([SNOMED-CT](https://termbrowser.nhs.uk/)) comes in. It is a comprehensive clinical terminology that includes a wide range of medical concepts, including diseases, symptoms, and biological processes. More about that in the [CRF Library](/portfolio/crfs/) section.

## GDPR & Anonymisation

We were contractually obliged by the [Gates Foundation](https://www.gatesfoundation.org/) to share our findings publicly using FAIR data principles ([Findable, Accessible, Interoperable, and Reusable](https://www.go-fair.org/fair-principles/)), but we also had to ensure that the data was anonymised and GDPR compliant. This meant that we couldn't store any personal data in the database. We stored PII (Personally Identifiable Information) in a separate internal database and built an irreversible anonymisation step into the data ingestion pipeline. Thereby ensuring that the public facing database could never be linked to any individual.

## Impact

The VOC Atlas has been cited in over 10 publications to date and is used frequently by over 500 researchers worldwide. As a free resource, it has been a valuable tool for the research community and has helped to advance the field of VOC research.


## My Role

As the Product Owner and Lead Developer on this project, I was responsible for the entire lifecycle of the application, from conception to deployment and maintenance.


## User Personas

![User Personas](/images/article/atlas_user_personas.png)

## Low Fidelity Wireframes & User Flows

![Low Fidelity Wireframes](/images/article/atlas_lowfi.png)

## High Fidelity Mockups

![High Fidelity Mockups](/images/article/atlas_highfi.png)

## User Feedback

![User Feedback](/images/article/atlas_user_feedback.png)

## Reporting Slide Decks

![Reporting Slide Decks](/images/article/atlas_slides.png)