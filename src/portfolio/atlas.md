---
title: "VOC Atlas: The Periodic Table of Breath"
description: "An interactive web application for exploring the world of Volatile Organic Compounds (VOCs)."
layout: item.njk
tags: ["portfolio", "Product", "Software", "Data"]
pinned: true
featured_stack: ["Python", "Django", "HTMX", "htpy", "Bootstrap", "RDKit"]
other_stack: ["Kubernetes", "Docker", "PostgreSQL"]
image: /images/atlas.png
---



## What is the VOC Atlas?

<div class="text-center mb-4">
  <a href="https://www.vocatlas.com" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
    <i class="fa-solid fa-arrow-up-right-from-square me-2"></i>Live application: VOC Atlas
  </a>
</div>

A django-based web application for exploring the world of Volatile Organic Compounds (VOCs). It consists of a public-facing read only interface and an internal interface for Owlstone employees to upload and manage data.

As both **Product Owner** and **Lead Developer**, I led the product lifecycle from initial conception and clinical stakeholder engagement through to data architecture, front-end development, and deployment.

## What problems does it solve?

You may have heard stories of [dogs that can smell diseases](https://www.bbc.com/news/health-60636541) or [the nurse who could smell Alzheimer's disease](https://www.bbc.com/news/uk-scotland-68537913). There is good biological prior to suggest that signals for diseases are present in the air we exhale and this theory is why [Owlstone Medical](https://www.owlstonemedical.com) was founded. The challenge however is that breath is full of noise from the food we eat, the environment we live in and the medications we take. The [VOC Atlas](https://www.vocatlas.com) is a collaborative tool to allow the breath research community to contribute breath data to attempt to find correlations between signals on breath (patterns of VOC expression) and diseases.


# Product Ownership

## User Personas

![User Personas](/images/article/atlas_user_personas.png)

I started by interviewing potential users to understand their needs and requirements. This involved speaking to clinicians, researchers, and data scientists to understand their workflows and pain points.

## User Flows -> High Fidelity Mockups

![Low Fidelity Wireframes](/images/article/atlas_lowfi.png)

I moved iteratively from whiteboard scribbles to low-fidelity mockups, to quick interactive prototypes in Figma and finally to high-fidelity mockups.

![High Fidelity Mockups](/images/article/atlas_highfi.png)

## User Feedback

![User Feedback](/images/article/atlas_user_feedback.png)

I kept relevant stakeholders in the loop at every round, integrating their feedback with technical limitations and opportunities.

## Reporting Slide Decks

![Reporting Slide Decks](/images/article/atlas_slides.png)

Part of this role involved presenting updates to the Gates Foundation every month. This included updates on roadmap progress, user feedback, user adoption and new features.


# Data Engineering

## Design Philosophy

I was keen for Atlas to have an immutable database, so that we could always trace the provenance of the data. I designed the data models to be append-only with no risk of losing data. The only instance in which data might need to be amended is if a user withdraws consent for their data to be used or if PII is discovered in the dataset.


## Key Challenges


### Modelling Biochemistry

![Entity Relationship Diagram](/images/article/atlas_erd.png)

Chemistry is complex and biology is messy. Trying to model the subtleties of chemistry (especially the limits of our detection capabilities) and trying to model the ontology of human diseases proved to be a significant challenge. We opted to explicitly model the ambiguity of chemical structures inherent in the data, which saved a lot of questions downstream about our capabilities.

## Automating Manual Data Entry

We found scientists using the Atlas were spending a lot of time manually entering data about literature. This was a time consuming and error prone process. I decided to use the [CrossRef API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/) to automate this process. This was a significant improvement in terms of user experience and data quality, as users only needed to enter the DOI of the paper and the rest of the data was automatically populated. However, as CrossRef occassionally returned malformed data, we presented the retrieved data in a form that the user could edit before saving, which allowed them to correct any errors.

### User Interface

As Owlstone's first public facing product, I was keen to ensure that the application was accessible and easy to use. This led to the decision to use HTMX and Bootstrap to create a modern and responsive user interface. This was a significant departure from the internal tools I had built previously, which were primarily internal tools for data scientists and clinicians.


### Legal

Legal Team required that users accept the latest T&Cs and Privacy Policies before accessing the site. To do this I created a modular legal django app, which stored the legal docs as markdown  files in the database and used [markdownify](https://pypi.org/project/markdownify/) to render them to HTML. This allowed the legal team to update the T&Cs and Privacy Policies without requiring a code change.

### Chemistry

All compounds are stores as InChI strings in the database. The cool thing about InChi strings is that they encode the entire chemical structure, so you can use a package like [rdkit](https://www.rdkit.org/) to generate 2D and 3D representations of the molecules in JavaScript. Not only that but you can also interrogate the compound structure to determine properties of the molecule, such as molecular weight, logP, etc. I chose to  have `rdkit` generate these properties on compound creation and store them in the database, so we could easily query compounds based on these properties. This was a significant performance improvement over generating these properties on the fly.

### Biology

Biology is messy. Originally we planned for Atlas to compare compounds across diseases, but we discovered that many of studies we used weren't using disease categories, but were comparing symptoms or healthy populations or biological processes, rather than diseases. This meant whatever system we used to classify these comparative groups had to flexible enough to accommodate this. Fortunately this is where ([SNOMED-CT](https://termbrowser.nhs.uk/)) comes in. It is a comprehensive clinical terminology that includes a wide range of medical concepts, including diseases, symptoms, and biological processes. More about that in the [CRF Library](/portfolio/crfs/) section.

## Privacy

We were contractually obliged by the [Gates Foundation](https://www.gatesfoundation.org/) to share our findings publicly using FAIR data principles ([Findable, Accessible, Interoperable, and Reusable](https://www.go-fair.org/fair-principles/)), but we also had to ensure that the data was anonymised and GDPR compliant. This meant that we couldn't store any personal data in the database. We stored PII (Personally Identifiable Information) in a separate internal database and built an irreversible anonymisation step into the data ingestion pipeline. Thereby ensuring that the public facing database could never be linked to any individual.


# Impact

The VOC Atlas has been cited in over 10 publications to date and is used frequently by over 500 researchers worldwide. As a free resource, it has been a valuable tool for the research community and has helped to advance the field of breath research.
