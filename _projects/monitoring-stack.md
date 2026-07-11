---
layout: project
title: "Monitoring Stack — Observabilidad Unificada"
slug: monitoring-stack
terminal_title: monitoring-stack
icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>'
metrics:
  - value: "10"
    label: "servicios"
  - value: "15+"
    label: "scrape configs"
  - value: "50+"
    label: "alert rules"
  - value: "3"
    label: "dashboards"
description: "Stack completo Prometheus + Grafana + Alertmanager en Docker Swarm. Exporters custom Go para Zimbra (colas, almacenamiento, usuarios) y FortiGate (CPU, memoria, sesiones VPN, HA). 3 dashboards: Infra, Mail, Security. Alerting a Telegram/Email con deduplicación."
tags:
  - Prometheus
  - Grafana
  - Alertmanager
  - Go
  - Docker Swarm
  - Zimbra
  - FortiGate
docs_url: "https://github.com/terorero/devinconde-portfolio/tree/main/monitoring"
repo_url: "https://github.com/terorero"
---