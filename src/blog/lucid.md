---
title: "Detecting Cancer Signals on Breath"
description: "Designing Electronic Data Capture for Clinical Trials to Detect Cancer Signals on Breath."
layout: item.njk
tags: ["blog", "Software"]
pinned: false
featured_stack: ["OpenClinica"]
# other_stack: ["Kubernetes", "Docker", "Bootstrap", "HTMX"]
# image: /images/tyto.png
---

## The Project

LuCID was an international multi-centre prospective study designed to evaluate the diagnostic accuracy (sensitivity and specificity) of a breath test for lung cancer. We recruited over two thousant participants from 17 sites across Europe, each providing multiple breath samples. Volatiles from breath were collected onto sorbent material in tubes and analysed via GC-MS in Owltone's Breath Biopsy Laboratory.


## What We Did

<ul>
    <li>Code as Documentation: I wrote scripts to automatically generate documentation about the Electronic Data Capture (EDC) configuration, to ensure the documentation always accurately described the EDC.</li>
    <li>Test Driven Development: I wrote User Acceptance Test (UAT) scripts for mid-study changes prior to implementing the changes, to validate that the test script accurately targetted the error</li>
    <li>I logged EDC specifications in Git for gold-standard source control and to ensure changes between multiple branches could be tracked and reconciled</li>
</ul>

## My Contributions

I was responsible for clinical data management:
<ul>
    <li>the design of the Electronic Data Capture (EDC), including 25 Case Report Forms configured in OpenClinica</li>
    <li>configuration of bespoke off-line Electronic Data Capture with integration with the Breath Collection Software</li>
    <li>design and implementaton of data flows to ensure robust reconciliation of data across systems (2 EDCs + lab samples)</li>
    <li>data validation of data entered in EDCs</li>
    <li>ran and recorded User Acceptance Testing</li>
    <li>reconcilliation of data discrepancies</li>
    <li>thorough documentation of the study design</li>
    <li>reporting on recruitment progress</li>
    <li>data extraction for interim and final analyses</li>
    <li>database lock</li>
    <li>dataset archiving</li>
    <li>ensuring full compliane with GxP, GDPR, 21 CFR Part-11</li>
</ul>
