---
title: "Actigraphy Algorithms"
description: "Development of algorithms to learn actigraphy from actimetry data."
layout: item.njk
tags: ["portfolio", "Software"]
pinned: false
featured_stack: ["Matlab"]
image: /images/actigraphy.png
---
My first Master's thesis was to work on the Texas Instrument's hackable (MSP430 MCU)[https://www.itopen.it/the-hackable-watch-a-wearable-msp430-mcu/] watch to develop algorithms to learn activity (eg. walking, running, sleeping) from the accelerometer data.

I researched and developeda algorithms (written in Matlab) for processing actigraphy data to quantify human activity for clinical and health-monitoring applications comparing the effectiveness of 3 different methods.

### Preprocessing Pipeline

**Signal Differential**: I take the first-order differential of the raw $x, y, z$ accelerometry signal to eliminate the static gravitational pull (DC bias) and isolate kinetic force.

**Root Mean Square (RMS)**: I combine the tri-axial differential signals into a single scalar value by taking the RMS across axes.

**Gap Identification & Interpolation**: My algorithm intelligently identifies data gaps or unrealistically static signals (when the device is unworn) and interpolates non-uniform sampling to maximal resolution.

**Bandpass Filtering**: I filter the signal to retain energy frequencies associated with conscious human movement while attenuating irrelevant noise.

### Quantification Methods

**Method 1 (Fourier Analysis)**: Using Welch's method of averaged periodograms over a sliding window, I track frequency changes over time to filter specific frequencies of interest and identify distinct activities.

**Method 2 (Repulsive Thresholding)**: I designed an autonomous threshold that pushes away signals approaching it from either side, enabling fast and simple binary classification of high versus low activity status.

**Method 3 (Linear Regression Analysis)**: By comparing statistics from an 11-minute sliding window against a database of baseline sleep/wake stats, I assign a sleep probability score to classify sleep, low activity, and high activity.

<a href="/files/actigraphy-poster.pdf" class="btn btn-primary" download>
  <i class="fa-solid fa-file-arrow-down me-2"></i>Download poster
</a>