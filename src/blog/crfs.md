---
title: "(Almost) Infinite Flexibility in a Rigid Framework"
description: "Standardising Messy Clinical Data with CDISC and SNOMED"
layout: item.njk
tags: ["blog", "Data"]
pinned: false
order: 1
# image: /images/crfs.png
---

Every clinical study (almost by definition) tries to answer a different question, so it seems like an impossible task to create a library of reusable Case Report Forms (CRFs are essentially electronic clinical questionairres). If one study asks "Has the participant ever had asthma?" and another asks "Has the participant had COPD in the last 12 months?" it seems impossible that they could use the same CRF and that the data could be stored in the same table. This was my initial reaction to trying to standardise clinical data, but then I learnt about CDISC and SNOMED-CT.

CDISC is a set of international standards for clinical data collection and defines standard ways to break up questions into standards constituent parts, and it works beautifully with SNOMED-CT, a clinical terminology for standardising vocabulary.


## CDISC - Modularising Clinical Questions

The key is to break down each question into its constituent parts. In the case of most most medical history questions, they share this format: a subject, a disease, a time frame and a response.

Subject (`USUBJID`) | (system defined) study subject ID eg "SUBJECT123"
Term (`TERM`) | (hardcoded) SNOMED-CT code eg "Asthma" or "COPD"
Duration (`DUR`) | (hardcoded) eg "ever" or "in the last 12 months"
Response (`RESP`) | (user entered) eg "Yes" or "No"

By putting the above 4 fields into a repeating group and setting different hard-coded values for `TERM` and `DUR`, you can create a medical history CRF that is immensely flexible.

That covers medical history and CDISC has a set of 20 commonly asked CRFs (Demography, Adverse Events, Lab Findings etc.), for each one an international team of experts has asked what sort of questions clinical studies ask about each and identified the common threads, which have been converted into CDISC terms, each with either a standardised set of responses or using a SNOMED term for more flexibility.

## SNOMED - A Code for Everything

If you are wondering what a SNOMED-CT term is. SNOMED Controlled Terminology is an ontology used by the NHS and internationally to describe pretty much everything: every disease, every operation, every species or molecule or material or common household object; there are SNOMED terms for each. Not only that but SNOMED is a hierarchial, so it "knows" that `asthma` is a type of `respiratory disease`. In fact SNOMED is poly-hierarchial, so `asthma` is a child of both `respiratory disease` and `inflammation`. You can browse SNOMED terms [here](https://termbrowser.nhs.uk/) and I challenge to find a concept that's not encoded.

Just to demostrate how incredibly flexible this approach is (expecially when combined with CDISC), let's imagine you have to encode the following somewhat fanciful medical history question:

`Is your unusual appearance the result of falling from a hot air balloon that was shot down by an enemy death-ray?`

That would be encoded as 3 Medical History records:
- `MHTERM`: `80670004` | Bizarre personal appearance (finding) 
- `MHTERM`: `242208006` | Injury caused by falling from a hot air balloon
- `MHTERM`: `219427009` | War injury due to lasers (disorder)

linked together with a `RELID` field containing the same sequential ID to indicate the 3 findings are associated. Here is where CDSIC lets us down somewhat because there is no standard way to encode _how_ these findings are related even though SNOMED does have specific terms for types of relationships.


## Summary

CDISC gives you the structured filing cabinet, while SNOMED gives you the hyper-specific contents.

While I hope I never actually need to process a trial cohort of unfortunate interplanetary balloonists, understanding how these standards interact has transformed how I look at data capture. By decomposing free-text clinical prose into modular entities, atomic responses, and post-coordinated relationships, I've stopped building rigid forms for single studies and started building systems that can handle whatever bizarre reality a clinical trial throws at me.
