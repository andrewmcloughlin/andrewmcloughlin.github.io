---
title: "Making Complex Clinical Forms Easier to Build & Validate"
description: "Designing a declarative, reusable approach to generating & validating structured clinical forms."
layout: item.njk
tags: ["blog", "Software"]
pinned: false
index: 8
# featured_stack: ["Python", "Click", "Pydantic"]
# other_stack: ["XLSForm", "YAML", "HTML", "OpenClinica", "OpenRosa", "pyYAML", "pandas", "openpyxl"]
# image: /images/ocelot.png
---

Improved compliance by making study configurations easily source controllable and sped up the time to study initiation from weeks to days.

## The Problem

Case Report Forms (CRFs) are used to collect data in clinical trial, they are configured in software in Electronic Data Capture systems like OpenClinica and RedCap. They are great systems, but a huge downside is that the CRFs must be designed in Excel. This means:
- there is no version control,
- no linting,
- no way to validate the forms before uploading them to the system
- even after uploading cross-form validation is not checked by OpenClinica
- xlsx files can't take advantage of git to track changes, which makes it difficult to collaborate with other teams
- OpenClinica gives you absolutely no indication of what has changed when pushing updates, relying entirely on your own memory and processes

The lack of validation meant a reliance on manual User Acceptance Testing (UAT) to catch errors. This was time consuming and error prone and required careful version control of the Excel files.


## My Role

I was the Clinical Data Manager and therefore responsible for creating the CRFs and running UAT. I wanted something that would make being compliant easier. I wrote the code, deployed it, validated it, used it in production and open-sourced it.


## My Solution

Ocelot is a python package that lets you write OpenClinica-compatible CRF configurations in YAML (instead of xlsx).
[Ocelot - Github](https://github.com/andrewmcloughlin/ocelot)

### IDE > Excel
I wanted to build CRFs in code from my IDE and get all the goodness an IDE can offer.


### Git compliant audit logs
Because the configuration files can be written in YAML instead of xlsx, they can be easily diff'd to identify changes. Storing your configs in git also greatly improves compliance.

### Immediate validation means quicker iterations
A single command validates your CRF configuration, not only against the schema, but against all other CRFs in the study to check cross-form validation. Another command lets you generate an interactive preview in the browser, so you quickly identify and fix errors _before_ uploading to OpenClinica.

## Impact

- Validating a single CRF went from 35s of navigating the interface and uploading a file and waiting for processing, to a single command (0.5s)
- Validating an entire study's logic went from around 45 minutes of tiresome and error-prone manual dummy data entry to under two seconds.
- Understanding what had changed between any 2 configurations
- Improved 21 CFR Part 11 compliance
- A huge reduction in this Data Manager's blood pressure when clicking 'publish', because I could say with certainty exactly what had changed between versions
