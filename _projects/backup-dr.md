---
layout: project
title: "Backup/DR — Borg + Runbooks"
slug: backup-dr
terminal_title: backup-dr
icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6"></path><polyline points="23 7 12 16 1 7"></polyline><line x1="22" y1="21" x2="22" y2="16"></line></svg>'
metrics:
  - value: "5.2TB"
    label: "logical"
  - value: "1.8TB"
    label: "physical"
  - value: "65%"
    label: "dedup"
  - value: "RTO"
    label: "< 4h"
description: "Estrategia de backup empresarial para La Razón (200+ usuarios, 5TB+). Borg con compresión LZ4, deduplicación cross-machine, retención 90d/12m/7y. Runbooks con 5 escenarios de restore probados. Failover a cloud validado trimestralmente."
tags:
  - Borg
  - LZ4
  - Synology
  - DRP
  - RTO/RPO
docs_url: "https://github.com/terorero/devinconde-portfolio/tree/main/backup-dr"
repo_url: "https://github.com/terorero"
---
