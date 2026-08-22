---
title: "VOC Atlas: The Periodic Table of Breath"
description: "An interactive web application for exploring the world of Volatile Organic Compounds (VOCs)."
layout: item.njk
tags: ["portfolio", "UI", "Software"]
pinned: true
stack: ["Kubernetes", "Docker", "Python", "Django", "HTMX", "PostgreSQL", "Bootstrap", "RDKit"]
image: /images/atlas.png
---
As the Product Owner and Lead Developer on this project, I was responsible for the entire lifecycle of the application, from conception to deployment and maintenance.



# What is the VOC Atlas?

A django-based web application for exploring the world of Volatile Organic Compounds (VOCs). It consists of a public-facing read only interface and a private interface for Owlstone employees to upload and manage data.


# What problems does it solve?

You may have heard stories of dogs that can smell cancer or the nurse who could smell Alzheimer's disease. There is good biological prior to suggest that signals for diseases are present in the air we exhale and this theory is why Owlstone Medical was founded. The challenge however is that breath is full of noise from the food we eat, the environment we live in and the medications we take. The VOC Atlas is a collaborative tool to allow the breath research community to contribute breath data to attempt to find correlations between signals on breath and diseases.



# Key Challenges

Chemistry is messy, biology is even messier. Trying to model the chemistry of compounds proved to be a significant challenge but was achievable using RDKit. However there is a real lack of good ontologies for diseases and populations.

As my first public facing product, I was keen to ensure that the application was accessible and easy to use. This led to the decision to use HTMX and Bootstrap to create a modern and responsive user interface.


# Impact

The VOC Atlas has been cited in over 10 publications to date and is used frequently by over 500 researchers worldwide. As a free resource, it has been a valuable tool for the research community and has helped to advance the field of VOC research.