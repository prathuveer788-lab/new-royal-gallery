# PERMISSIONS_NEEDED.md — Rights Verification & Formal Clearance Dossier

**Project:** The Royal Gallerys (theroyalgallerys.com)  
**Date:** 28 September 2026  
**Audience:** Editorial Bureau, Legal Counsel, Photo Syndicate

---

## 1. Executive Summary
This document registers photographs currently published under **editorial press fair dealing, press kit distribution, or pending institutional syndication**, where formal permanent commercial rights or written archival release should be requested for future print coffee-table editions or global syndication.

---

## 2. Priority Clearances

### 1. The Balmoral, Edinburgh
* **Contact:** Rocco Forte Hotels Global Press Office (`press@roccofortehotels.com`)
* **Current Status:** Digital press kit distribution license utilized for editorial feature.
* **Requested Scope:** Global syndication & print anthology rights for *The Royal Gallerys Annual Vol. I*.
* **Assets:** Complete 16-image hotel feature suite.

### 2. House of Kotwara — Sama Ali Portrait
* **Contact:** House of Kotwara Media Office (`contact@kotwara.com`)
* **Current Status:** High-resolution portrait provided for profile feature.
* **Requested Scope:** Worldwide digital magazine perpetuity and print reproduction rights.
* **Asset:** `public/images/sama-ali.jpeg`.

### 3. Taj Lake Palace, Udaipur & Umaid Bhawan Palace, Jodhpur (IHCL)
* **Contact:** Indian Hotels Company Limited (IHCL) Corporate Communications (`corpcomm@ihcltata.com`)
* **Current Status:** Exterior architecture documented under Creative Commons (CC BY-SA 4.0 by Jakub Hałun & Atman06).
* **Requested Scope:** Official access to IHCL high-resolution digital media vault for interior suites, private dining, and royal resident interviews.

### 4. City Palace Museum, Jaipur (MSMS II Museum Trust)
* **Contact:** Maharaja Sawai Man Singh II Museum Trust, City Palace, Jaipur
* **Current Status:** Exterior Chandra Mahal facade photographed by A.Savin under Free Art License (FAL).
* **Requested Scope:** Cultural cooperation agreement for digitizing royal library miniatures and private textile archives.

---

## 3. Protocol for Permission Verification
When formal permission is received:
1. File digital copy of the agreement in `legal/permissions/<brand-or-trust>/`.
2. Update licensing status in `content/image-credits.json` from `Editorial Permission / Pending` to `Authorized Permanent Syndicate`.
3. Re-run `npm run build` to update the public index at `/image-credits`.
