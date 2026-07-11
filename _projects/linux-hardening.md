---
layout: project
title: "Linux Hardening — CIS L1/L2 Automatizado"
slug: linux-hardening
terminal_title: linux-hardening
icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"></rect><line x1="12" y1="22" x2="12" y2="18"></line><line x1="22" y1="12" x2="18" y2="12"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="12" y1="2" x2="12" y2="6"></line></svg>'
metrics:
  - value: "1,200+"
    label: "líneas"
  - value: "multi-distro"
    label: ""
  - value: "idempotente"
    label: ""
  - value: "auditd"
    label: "ready"
description: "Script de hardening Bash 1,200 líneas aplicando CIS Benchmarks Level 1/2. SSH, kernel params, filesystem mounts, auditd rules, PAM, systemd service hardening, nftables default-deny. Idempotente, probado en Debian, RHEL, Alpine. Integración con Ansible role."
tags:
  - Bash
  - CIS
  - auditd
  - nftables
  - systemd
  - Ansible
docs_url: "https://github.com/terorero/devinconde-portfolio/tree/main/hardening"
repo_url: "https://github.com/terorero"
---
