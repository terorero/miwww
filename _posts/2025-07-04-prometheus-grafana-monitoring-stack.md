---
layout: post
title: "Prometheus + Grafana: Monitoring Stack Completo"
description: "Cómo montamos un stack de observabilidad con 10 servicios, 15+ scrape configs, 50+ alert rules, y exporters custom Go para Zimbra y FortiGate."
date: 2025-07-04
categories: [infraestructura, observabilidad, monitoring]
tags: [prometheus, grafana, alertmanager, docker-swarm, go]
---

## Por qué monitoring

Si no puedes medirlo, no puedes administrarlo. Y si no sabes que se rompió hasta que alguien se queja, tienes un problema.

## Stack desplegado

```
┌─────────────┐     ┌───────────────┐     ┌──────────────┐
│  Exporters  │────▶│  Prometheus   │────▶│   Grafana    │
│  (15+ jobs) │     │  (scrape)     │     │  (dashboards)│
└─────────────┘     └───────┬───────┘     └──────────────┘
                            │
                     ┌──────▼──────┐
                     │ Alertmanager│──▶ Telegram/Email
                     └─────────────┘
```

### Servicios monitoreados

| Servicio | Exporter | Métricas clave |
|----------|----------|----------------|
| Node | node_exporter | CPU, RAM, disco, red |
| Docker | cAdvisor | Contenedores, uso de recursos |
| PostgreSQL | postgres-exporter | Conexiones, queries, lag |
| Zimbra | zimbra-exporter (custom) | Colas, usuarios, almacenamiento |
| FortiGate | fortigate-exporter (custom) | CPU, sesiones VPN, HA |
| HTTP | blackbox-http | Response time, status code |
| SSH | blackbox-ssh | Connect time, availability |
| Alertmanager | alertmanager | Silences, inhibitions |
| Prometheus | prometheus | Scrape duration, targets |

## Exporters custom en Go

### Zimbra Exporter

```go
package main

import (
    "database/sql"
    "github.com/prometheus/client_golang/prometheus"
    _ "github.com/lib/pq"
)

var (
    mailboxCount = prometheus.NewGauge(
        prometheus.GaugeOpts{
            Name: "zimbra_mailbox_count",
            Help: "Total number of mailboxes",
        },
    )
    queueSize = prometheus.NewGaugeVec(
        prometheus.GaugeOpts{
            Name: "zimbra_queue_size",
            Help: "Queue size by type",
        },
        []string{"queue_type"},
    )
)

func init() {
    prometheus.MustRegister(mailboxCount)
    prometheus.MustRegister(queueSize)
}

func main() {
    // Connect to Zimbra's PostgreSQL
    db, _ := sql.Open("postgres", 
        "host=localhost port=7331 dbname=zimbra user=zimbra sslmode=disable")
    
    // Scrape mailbox count
    var count int
    db.QueryRow("SELECT COUNT(*) FROM mailbox WHERE deleted=0").Scan(&count)
    mailboxCount.Set(float64(count))
    
    // Scrape queue sizes
    rows, _ := db.Query("SELECT queue, COUNT(*) FROM mail_queue GROUP BY queue")
    for rows.Next() {
        var queue string
        var size int
        rows.Scan(&queue, &size)
        queueSize.WithLabelValues(queue).Set(float64(size))
    }
    
    // Expose metrics
    http.Handle("/metrics", promhttp.Handler())
    http.ListenAndServe(":9102", nil)
}
```

### FortiGate Exporter

```go
package main

import (
    "crypto/tls"
    "encoding/json"
    "net/http"
    "github.com/prometheus/client_golang/prometheus"
)

var (
    cpuUsage = prometheus.NewGauge(
        prometheus.GaugeOpts{
            Name: "fortigate_cpu_usage_percent",
            Help: "CPU usage percentage",
        },
    )
    vpnSessions = prometheus.NewGaugeVec(
        prometheus.GaugeOpts{
            Name: "fortigate_vpn_sessions",
            Help: "Active VPN sessions",
        },
        []string{"vdom", "type"},
    )
    haStatus = prometheus.NewGauge(
        prometheus.GaugeOpts{
            Name: "fortigate_ha_status",
            Help: "HA status (1=master, 0=slave)",
        },
    )
)

func scrapeFortiGate(host, token string) {
    client := &http.Client{
        Transport: &http.Transport{
            TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
        },
    }
    
    // System resources
    resp, _ := client.Get(
        "https://" + host + "/api/v2/monitor/system/resource/usage?access_token=" + token)
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    
    if data, ok := result["results"].(map[string]interface{}); ok {
        if cpu, ok := data["cpu"].(float64); ok {
            cpuUsage.Set(cpu)
        }
    }
}
```

## Dashboards

### Dashboard 1: Infra Overview

- Estado de todos los nodos
- Uso de CPU/RAM/disco por host
- Top 5 procesos por consumo
- Alertas activas

### Dashboard 2: Mail

- Colas de Zimbra por tipo
- Usuarios activos vs concurrentes
- Almacenamiento por mailbox
- Throughput de correo (msg/min)

### Dashboard 3: Security

- Intentos de login fallidos
- Cambios de configuración
- Tráfico anómalo por IP
- Estado HA de FortiGate

## Alertas (ejemplos)

```yaml
groups:
  - name: infrastructure
    rules:
      - alert: HighCPU
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU on {{ $labels.instance }}"
          description: "CPU usage is above 85% for 5 minutes"
      
      - alert: DiskSpaceLow
        expr: (node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}) * 100 < 15
        for: 10m
        labels:
          severity: critical
        annotations:
          summary: "Low disk space on {{ $labels.instance }}"
          description: "Only {{ $value }}% free space remaining"
      
      - alert: ZimbraQueueBacklog
        expr: zimbra_queue_size{queue_type="deferred"} > 500
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "Zimbra deferred queue backlog"
          description: "{{ $value }} messages in deferred queue"
```

## Resultados

| Métrica | Resultado |
|---------|-----------|
| Servicios monitoreados | 10 |
| Scrape configs | 15+ |
| Alert rules | 50+ |
| Dashboards | 3 |
| MTTR promedio | De 2h a 15min |
| Falsos positivos | < 5% |

---

*Publicado el 4 de julio de 2025*
