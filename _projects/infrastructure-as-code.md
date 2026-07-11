---
layout: project
title: "IaC — Ansible + Terraform Híbrido"
slug: infrastructure-as-code
terminal_title: infrastructure-as-code
icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'
metrics:
  - value: "12"
    label: "plays"
  - value: "8+"
    label: "roles"
  - value: "AWS/DO"
    label: "modules"
  - value: "GitOps"
    label: "ready"
description: "Automatización completa: aprovisionamiento (Terraform AWS/DO: VPC, Bastion, AD, Zimbra, FortiGate, VPN, Monitoring) + configuración (Ansible: common, zimbra, fortigate, k8s, monitoring, hardening, backup). Idempotente, multi-cloud, probado en CI."
tags:
  - Ansible
  - Terraform
  - AWS
  - DigitalOcean
  - GitLab CI
  - Vault
docs_url: "https://github.com/terorero/devinconde-portfolio/tree/main/infrastructure-as-code"
repo_url: "https://github.com/terorero"
---
