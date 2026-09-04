---
title: "VOC Atlas: The Periodic Table of Breath"
description: "An interactive web application for exploring the world of Volatile Organic Compounds (VOCs)."
layout: item.njk
tags: ["portfolio", "Product", "Software", "Data"]
pinned: true
order: 1
featured_stack: ["Python", "Django", "HTMX", "htpy", "Bootstrap", "RDKit"]
other_stack: ["Kubernetes", "Docker", "PostgreSQL", "Elicit API", "CrossRef API", "Figma", "Excalidraw", "Google Analytics", "Umami", "SMILES.drawer"]
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

## Definition of Success

Owlstone's USP is thaqt our breatjomics data are validated and quantified. No other company (and few academic groups) can claim this at a scale of hundreds of VOCs. The best way to demonstrate this is to make our data available to the wider breath research community to allow them to see the quality of our data and in doing so stregthen our Breath Biopsy brand and encourage partnerships.

The definition of success is therefor two-fold:

1. Establish the Breath Biopsy brand as the go-to platform for breath research
2. Encourage collaboration and data sharing within the breath research community

Success can be quantified by tracking:
- the number of active users,
- the number of citations,
- the number of collaborations brought in as a result of the platform.

The VOC Atlas has nearly 3000 users, >500 user submissions and has been cited in 10 research papers in the 3 years since launch. It has also been used as a platform for several collaborations between Owlstone and academic groups, although this is harder to quantify.

## Competitive Analysis

Atlas is a unique product, to date no other platform exists that allows for the collaborative sharing of breath data, because no other company can replicate our platform. So, from the software standpoint we have no threats from a competitive standpoint. That doesn't mean that we can't learn from other platforms. I performed a competitive analysis of other chemical and biological data sharing platforms to understand what they do well and what they do poorly. I explored platforms such as PubChem, ChEMBL, DrugBank, the Human Metabolome Database, and the Human Protein Atlas. Many competitors were academic platforms that did not have professional software development teams, and it showed. They were often slow, difficult to navigate and lacked modern interfaces; this was an area in which we could easily differentiate ourselves and acheive our goal of establishing the Breath Biopsy brand as the go-to platform for breath research. I looked at how data are presented, what filtering and search capabilities they offer and how they handle data provenance and versioning. This competitor analysis prevented us from re-inventing the wheel and allowed us to discover and take advantage of ChEBI's API to pull in chemical structure information.

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

## Writing Tickets

I wrote all tickets for the project in Jira using Gherkion syntax to ensure that the requirements were clear and unambiguous. Every tickets was linked back to User Personas and had clean acceptance criteria. This meant that there was no ambiguity for the developers and we could move quickly.

## Backlog Management

As AGILE development team we wanted to get an MVP out as quickly as possible. As the product was initally internal, we prioritised shipping features and quick iterations over perfecting them. While this did mean occassionally refactoring and even reversing decisions, it kept up momentum and excitement as stakeholders could see their ideas being realised every 2 weeks. During this phase of the project we used MoSCOW to prioritise features.

As the product matured and gained buy-in we demo'ed the product to the Gates Foundation and selected key opinion leaders in the field. On the basis of their feedback we deicded to deploy the Atlas as a public platform. This meant that we had to be more considered in our approach to feature development and we switched to using RICE to prioritise features going forwards.

## Reporting Slide Decks

![Reporting Slide Decks](/images/article/atlas_slides.png)

Part of this role involved presenting updates to the Gates Foundation every month. This included updates on roadmap progress, user feedback, user adoption and new features.



# Data Engineering

## Design Philosophy

I was keen for Atlas to have an immutable database, so that we could always trace the provenance of the data. I designed the data models to be append-only with no risk of losing data. The only instance in which data might need to be amended is if a user withdraws consent for their data to be used or if PII is discovered in the dataset.

## Architecture Decisions

### Backend
We were a small team of developers (3-4) building the full-stack on multiple internal projects, so our main considerations were familiarity, speed and ease of maintenance. With that in mind we elected to use a familiar stack, which had served us well on previous projects: Python, Django, PostgreSQL and Bootstrap.

As Atlas was ingesting large GCMS datasets, we used S3 to store the raw data, and PostgreSQL to store the metadata and processed data, with async Celery workers to process the data.

Initially Atlas was intended to be an internal tool, so it was built as a Django app of an existing project. This allowed us to get it into the hands of internal users within 1 month. However, as the product matured and gained buy-in we deicded to deploy the Atlas as a public platform, which became as issue as it was built ontop of an internal LIMS which could not be publicly exposed. We spent 3 months refactoring the application to be a standalone Django project.

### Frontend
As Owlstone's first public application, we had to learn a lot about deploying and maintaining a public facing web application, including security, scalability and accessibility. We opted to use AllAuth for authentication and recognising that we needed to improve the UI/UX of the application for an external audience, we used AlpineJS to make more dynamic user-friendly components. We also recognised that we needed to start testing our templates as the risk of breaking the UI for external users was now a real concern, so we used htpy to generate components in python and test them in isolation.


## Key Challenges


### Modelling Biochemistry

![Entity Relationship Diagram](/images/article/atlas_erd.png)

Chemistry is complex and biology is messy. Trying to model the subtleties of chemistry (especially the limits of our detection capabilities) and trying to model the ontology of human diseases proved to be a significant challenge. We opted to explicitly model the ambiguity of chemical structures inherent in the data, which saved a lot of questions downstream about our capabilities.

## Automating Manual Data Entry

We found scientists using the Atlas were spending a lot of time manually entering data about literature. This was a time consuming and error prone process. I decided to use the [CrossRef API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/) to automate this process, such that literature details (title, authors, journal, abstract etc.) could be populated from just the DOI of the paper. However, as CrossRef occassionally returns malformed data, we presented the retrieved data in a form that the user could edit before saving, which allowed them to correct any errors. This process saved internal scientists hours of tedious work per week.

Following internal restructuring, we had to find ways to fully automate this process. I used [Elicit's API](https://docs.elicit.com/) to extract the relevant information from the papers and populate the database. This was a significant improvement over the previous process.

### User Interface

As Owlstone's first public facing product, I was keen to ensure that the application was accessible and easy to use. This led to the decision to use HTMX and Bootstrap to create a modern and responsive user interface. This was a significant departure from the internal tools I had built previously, which were primarily internal tools for data scientists and clinicians.


### Legal

Legal Team required that users accept the latest T&Cs and Privacy Policies before accessing the site. To do this I created a modular legal django app, which stored the legal docs as markdown  files in the database and used [markdownify](https://pypi.org/project/markdownify/) to render them to HTML. This allowed the legal team to update the T&Cs and Privacy Policies without requiring a code change.

### Chemistry

All compounds are stores as InChI strings in the database. The cool thing about InChi strings is that they encode the entire chemical structure, so you can use a package like [rdkit](https://www.rdkit.org/) and [smiles-drawer](https://reymond-group.github.io/smilesDrawer/) to generate 2D and 3D representations of the molecules in JavaScript. Not only that but you can also interrogate the compound structure to determine properties of the molecule, such as molecular weight, logP, etc. I chose to  have `rdkit` generate these properties on compound creation and store them in the database, so we could easily query compounds based on these properties. This was a significant performance improvement over generating these properties on the fly.

### Biology

Biology is messy. Originally we planned for Atlas to compare compounds across diseases, but we discovered that many of studies we used weren't using disease categories, but were comparing symptoms or healthy populations or biological processes, rather than diseases. This meant whatever system we used to classify these comparative groups had to flexible enough to accommodate this. Fortunately this is where [SNOMED-CT](https://termbrowser.nhs.uk/) comes in. It is a comprehensive clinical terminology that includes a wide range of medical concepts, including diseases, symptoms, and biological processes. More about that in the [CRF Library](/portfolio/crfs/) section.

## Privacy

We were contractually obliged by the [Gates Foundation](https://www.gatesfoundation.org/) to share our findings publicly using FAIR data principles ([Findable, Accessible, Interoperable, and Reusable](https://www.go-fair.org/fair-principles/)), but we also had to ensure that the data was anonymised and GDPR compliant. This meant that we couldn't store any personal data in the database. We stored PII (Personally Identifiable Information) in a separate internal database and built an irreversible anonymisation step into the data ingestion pipeline. Thereby ensuring that the public facing database could never be linked to any individual.


# Impact

The VOC Atlas has been cited in over 10 publications to date and is used frequently by over 500 researchers worldwide. As a free resource, it has been a valuable tool for the research community and has helped to advance the field of breath research.
