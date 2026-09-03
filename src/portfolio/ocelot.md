---
title: "Ocelot: A CLI for making forms"
description: "A CLI tool for building and validating Case Report Forms (CRFs)."
layout: item.njk
tags: ["portfolio", "Software"]
pinned: false
featured_stack: ["Python", "Click", "Pydantic"]
other_stack: ["XLSForm", "YAML", "HTML", "OpenClinica", "OpenRosa", "pyYAML", "pandas", "openpyxl"]
image: /images/ocelot.png
---

## The Problem

Case Report Forms (CRFs) are used to collect data in clinical trials. We used OpenClinica (OC), an open-source clinical data management system, to collect data in our clinical trials. It's great, but a huge downside is that the CRFs must be designed in Excel (because it uses XLSForms). This means that there is no version control, no linting, and no way to validate the forms before deploying them. It also means that we can't use git to track changes to the forms, which makes it difficult to collaborate with other teams.

The lack of validation meant a reliance on manual User Acceptance Testing (UAT) to catch errors. This was time consuming and error prone and required careful version control of the Excel files.

## My Solution

[Ocelot - Github](https://github.com/andrewmcloughlin/ocelot)

I wanted to build CRFs in code from my IDE and store them in git. I built a CLI tool called Ocelot (because it takes a lot of pain out of OC). This let's users write CRFs in YAML and have them automatically validated, tested, converted to XLSForm and demo'd as a live HTML form in the browser.

## Results

Because stakeholders could now preview functional versions of the forms in the browser, complete with validation and skip logic, before the files were uploaded to OpenClinica, it massively reduced the time it took to get forms approved.

On a personal level, this took a lot of the headache out of clinical data management and gave me much more confidence in the quality of the data we were collecting.