---
layout: default
title: "Devin R. Conde Mancilla — Analista de Infraestructura y Seguridad"
description: "Senior SysAdmin | Infrastructure Engineer | Security Specialist | 25+ años | Bolivia. Especialista en migraciones zero-downtime, alta disponibilidad y soberanía de datos."
---

<!-- Hero -->
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__content animate-in">
    <span class="hero__eyebrow">Portfolio de Infraestructura</span>
    <h1 id="hero-title" class="hero__name">Devin R. Conde Mancilla</h1>
    <p class="hero__title">Senior SysAdmin • Infrastructure Engineer • Security Specialist</p>
    <p class="hero__value-prop">25+ años diseñando, operando y asegurando infraestructura crítica. 200+ usuarios, 5TB+ bajo gestión, 0 licencias propietarias en correo. Especialista en migraciones zero-downtime, alta disponibilidad y soberanía de datos.</p>
    <div class="hero__ctas">
      <a href="{{ '/projects/' | relative_url }}" class="btn btn--primary btn--lg">Ver Proyectos</a>
      <a href="{{ '/contact/' | relative_url }}" class="btn btn--ghost btn--lg">Contactar</a>
    </div>
    <div class="hero__stats">
      <div class="hero__stat">
        <span class="hero__stat-value">25+</span>
        <span class="hero__stat-label">Años Experiencia</span>
      </div>
      <div class="hero__stat">
        <span class="hero__stat-value">200+</span>
        <span class="hero__stat-label">Usuarios 24/7</span>
      </div>
      <div class="hero__stat">
        <span class="hero__stat-value">5.2TB</span>
        <span class="hero__stat-label">Borg Backup</span>
      </div>
      <div class="hero__stat">
        <span class="hero__stat-value">$0</span>
        <span class="hero__stat-label">CapEx Immich</span>
      </div>
    </div>
  </div>
</section>

<!-- Summary -->
<section class="section" aria-labelledby="summary-title">
  <header class="section__header animate-in">
    <span class="section__eyebrow">Resumen</span>
    <h2 id="summary-title" class="section__title">Tres pilares, una carrera</h2>
  </header>
  <div class="summary animate-in delay-1">
    <ul class="summary__list">
      <li class="summary__item">
        <div class="summary__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
        </div>
        <p class="summary__text"><strong>Infraestructura como código real:</strong> Ansible (12 plays, 8+ roles) + Terraform (AWS/DO modules) para reproducibilidad total. GitOps ready.</p>
      </li>
      <li class="summary__item">
        <div class="summary__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M8 21h8M12 17v4"></path></svg>
        </div>
        <p class="summary__text"><strong>Observabilidad completa:</strong> Stack Prometheus/Grafana/Alertmanager (10 servicios, 15+ scrapes, 50+ alertas). Exporters custom Go para Zimbra y FortiGate.</p>
      </li>
      <li class="summary__item">
        <div class="summary__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5"></path><polyline points="17 11 12 6 7 11"></polyline><line x1="12" y1="2" x2="12" y2="9"></line></svg>
        </div>
        <p class="summary__text"><strong>Backup/DR probado:</strong> Borg + runbooks con RTO/RPO definidos. 5 escenarios de restore testeados. Failover a cloud validado.</p>
      </li>
    </ul>
  </div>
</section>

<!-- Projects -->
<section class="section section--alt" id="proyectos" aria-labelledby="projects-title">
  <header class="section__header animate-in">
    <span class="section__eyebrow">Proyectos Destacados</span>
    <h2 id="projects-title" class="section__title">Servicios en producción</h2>
  </header>
  <div class="projects">
    <!-- Project 1: Immich -->
    <article class="project card animate-in delay-1">
      <div class="project__terminal terminal">
        <div class="terminal__header">
          <div class="terminal__dots">
            <span class="terminal__dot terminal__dot--close" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--minimize" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--maximize" aria-hidden="true"></span>
          </div>
          <span class="terminal__title">immich-la-razon</span>
        </div>
        <pre class="terminal__body"><code class="terminal__command" data-prompt="$ ">docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
<span class="terminal__output">[+] Running 10/10
 ✔ Network immich_net       Created
 ✔ Volume postgres_data     Created
 ✔ Volume redis_data        Created
 ✔ Volume upload            Created
 ✔ Container immich_postgres   Started
 ✔ Container immich_redis      Started
 ✔ Container immich_server     Started
 ✔ Container immich_ml         Started
 ✔ Container immich_nginx      Started
 ✔ Container borg-backup       Started</span>
<span class="terminal__success">Immich 1.105.0 running — dual-stack, TLS, 0 CapEx</span></code></pre>
      </div>
      <div class="project__body">
        <header class="project__header">
          <div class="project__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"></rect><path d="M8 12h8M12 8v8"></path></svg>
          </div>
          <h3 class="project__title">Immich La Razón — Fotos/Videos Privados</h3>
        </header>
        <div class="project__meta">
          <span class="project__meta-item"><span class="project__meta-value">8 días</span> deploy</span>
          <span class="project__meta-item"><span class="project__meta-value">$0</span> CapEx (RD630 reuse)</span>
          <span class="project__meta-item"><span class="project__meta-value">$5-10K/año</span> SaaS eliminated</span>
          <span class="project__meta-item"><span class="project__meta-value">sub-sec</span> recovery</span>
        </div>
        <p class="project__description">Migración de Google Photos a Immich self-hosted para redacción. PostgreSQL + pgvector + Redis + ML inference. Backup Borg a Synology. Dual-stack IPv4/IPv6, TLS終端, 100% soberanía de datos.</p>
        <div class="project__stack">
          <span class="badge badge--primary">Docker</span>
          <span class="badge badge--primary">PostgreSQL</span>
          <span class="badge badge--primary">pgvector</span>
          <span class="badge badge--primary">Redis</span>
          <span class="badge badge--primary">Borg</span>
          <span class="badge badge--primary">Synology</span>
          <span class="badge badge--primary">nginx</span>
        </div>
        <footer class="project__footer">
          <a href="https://github.com/terorero/devinconde-portfolio/tree/main/docs/immich-la-razon" class="btn btn--ghost btn--sm" target="_blank" rel="noopener">Ver Docs</a>
          <a href="https://github.com/terorero" class="btn btn--secondary btn--sm" target="_blank" rel="noopener">Código</a>
        </footer>
      </div>
    </article>

    <!-- Project 2: Monitoring Stack -->
    <article class="project card animate-in delay-2">
      <div class="project__terminal terminal">
        <div class="terminal__header">
          <div class="terminal__dots">
            <span class="terminal__dot terminal__dot--close" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--minimize" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--maximize" aria-hidden="true"></span>
          </div>
          <span class="terminal__title">monitoring-stack</span>
        </div>
        <pre class="terminal__body"><code class="terminal__command" data-prompt="$ ">promtool check rules rules/alerts.yml
<span class="terminal__success">Checking rules/alerts.yml
  SUCCESS: 52 rules valid</span>
<span class="terminal__prompt">$ </span>curl -s localhost:9090/api/v1/targets | jq '.data.activeTargets[] | select(.health=="up") | .labels.job'
<span class="terminal__output">"node-exporter"
"cadvisor"
"postgres-exporter"
"zimbra-exporter"
"fortigate-exporter"
"blackbox-http"
"blackbox-ssh"
"alertmanager"
"prometheus"
"grafana"</span></code></pre>
      </div>
      <div class="project__body">
        <header class="project__header">
          <div class="project__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
          </div>
          <h3 class="project__title">Monitoring Stack — Observabilidad Unificada</h3>
        </header>
        <div class="project__meta">
          <span class="project__meta-item"><span class="project__meta-value">10</span> servicios</span>
          <span class="project__meta-item"><span class="project__meta-value">15+</span> scrape configs</span>
          <span class="project__meta-item"><span class="project__meta-value">50+</span> alert rules</span>
          <span class="project__meta-item"><span class="project__meta-value">3</span> dashboards</span>
        </div>
        <p class="project__description">Stack completo Prometheus + Grafana + Alertmanager en Docker Swarm. Exporters custom Go para Zimbra (colas, almacenamiento, usuarios) y FortiGate (CPU, memoria, sesiones VPN, HA). 3 dashboards: Infra, Mail, Security. Alerting a Telegram/Email con deduplicación.</p>
        <div class="project__stack">
          <span class="badge badge--primary">Prometheus</span>
          <span class="badge badge--primary">Grafana</span>
          <span class="badge badge--primary">Alertmanager</span>
          <span class="badge badge--primary">Go</span>
          <span class="badge badge--primary">Docker Swarm</span>
          <span class="badge badge--primary">Zimbra</span>
          <span class="badge badge--primary">FortiGate</span>
        </div>
        <footer class="project__footer">
          <a href="https://github.com/terorero/devinconde-portfolio/tree/main/monitoring" class="btn btn--ghost btn--sm" target="_blank" rel="noopener">Ver Repo</a>
          <a href="https://github.com/terorero" class="btn btn--secondary btn--sm" target="_blank" rel="noopener">Código</a>
        </footer>
      </div>
    </article>

    <!-- Project 3: IaC -->
    <article class="project card animate-in delay-3">
      <div class="project__terminal terminal">
        <div class="terminal__header">
          <div class="terminal__dots">
            <span class="terminal__dot terminal__dot--close" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--minimize" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--maximize" aria-hidden="true"></span>
          </div>
          <span class="terminal__title">infrastructure-as-code</span>
        </div>
        <pre class="terminal__body"><code class="terminal__command" data-prompt="$ ">ansible-playbook -i inventory/prod site.yml --limit zimbra,fortigate,monitoring
<span class="terminal__output">PLAY [zimbra] ***********************************************************
TASK [zimbra : Install Zimbra 10.0.9] *************************************
changed: [mail.larazon.bo]

PLAY [fortigate] **********************************************************
TASK [fortigate : Configure HA cluster] ***********************************
changed: [fw01.larazon.bo]
changed: [fw02.larazon.bo]

PLAY [monitoring] *********************************************************
TASK [monitoring : Deploy Prometheus stack] *******************************
changed: [mon.larazon.bo]</span>
<span class="terminal__success">PLAY RECAP: 12 hosts, 147 tasks, 34 changed, 0 failed</span></code></pre>
      </div>
      <div class="project__body">
        <header class="project__header">
          <div class="project__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </div>
          <h3 class="project__title">IaC — Ansible + Terraform Híbrido</h3>
        </header>
        <div class="project__meta">
          <span class="project__meta-item"><span class="project__meta-value">12</span> plays</span>
          <span class="project__meta-item"><span class="project__meta-value">8+</span> roles</span>
          <span class="project__meta-item"><span class="project__meta-value">AWS/DO</span> modules</span>
          <span class="project__meta-item"><span class="project__meta-value">GitOps</span> ready</span>
        </div>
        <p class="project__description">Automatización completa: aprovisionamiento (Terraform AWS/DO: VPC, Bastion, AD, Zimbra, FortiGate, VPN, Monitoring) + configuración (Ansible: common, zimbra, fortigate, k8s, monitoring, hardening, backup). Idempotente, multi-cloud, probado en CI.</p>
        <div class="project__stack">
          <span class="badge badge--primary">Ansible</span>
          <span class="badge badge--primary">Terraform</span>
          <span class="badge badge--primary">AWS</span>
          <span class="badge badge--primary">DigitalOcean</span>
          <span class="badge badge--primary">GitLab CI</span>
          <span class="badge badge--primary">Vault</span>
        </div>
        <footer class="project__footer">
          <a href="https://github.com/terorero/devinconde-portfolio/tree/main/infrastructure-as-code" class="btn btn--ghost btn--sm" target="_blank" rel="noopener">Ver Repo</a>
          <a href="https://github.com/terorero" class="btn btn--secondary btn--sm" target="_blank" rel="noopener">Código</a>
        </footer>
      </div>
    </article>

    <!-- Project 4: Backup/DR -->
    <article class="project card animate-in delay-4">
      <div class="project__terminal terminal">
        <div class="terminal__header">
          <div class="terminal__dots">
            <span class="terminal__dot terminal__dot--close" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--minimize" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--maximize" aria-hidden="true"></span>
          </div>
          <span class="terminal__title">backup-dr</span>
        </div>
        <pre class="terminal__body"><code class="terminal__command" data-prompt="$ ">borg create --compression lz4 --stats --list \
  repo::{hostname}-{now:%Y-%m-%dT%H:%M:%S} \
  /opt/zimbra /var/lib/docker /etc
<span class="terminal__output">Archive name: mail-2025-07-11T02:14:33
Archive fingerprint: a1b2c3d4...
Compressed size: 2.1 GB
Deduplicated size: 450 MB
Files processed: 124,567</span>
<span class="terminal__success">Backup completed — 5.2TB logical, 1.8TB physical, dedup 65%</span></code></pre>
      </div>
      <div class="project__body">
        <header class="project__header">
          <div class="project__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6"></path><polyline points="23 7 12 16 1 7"></polyline><line x1="22" y1="21" x2="22" y2="16"></line></svg>
          </div>
          <h3 class="project__title">Backup/DR — Borg + Runbooks</h3>
        </header>
        <div class="project__meta">
          <span class="project__meta-item"><span class="project__meta-value">5.2TB</span> logical</span>
          <span class="project__meta-item"><span class="project__meta-value">1.8TB</span> physical</span>
          <span class="project__meta-item"><span class="project__meta-value">65%</span> dedup</span>
          <span class="project__meta-item"><span class="project__meta-value">RTO</span> < 4h</span>
        </div>
        <p class="project__description">Estrategia de backup empresarial para La Razón (200+ usuarios, 5TB+). Borg con compresión LZ4, deduplicación cross-machine, retención 90d/12m/7y. Runbooks con 5 escenarios de restore probados. Failover a cloud validado trimestralmente.</p>
        <div class="project__stack">
          <span class="badge badge--primary">Borg</span>
          <span class="badge badge--primary">LZ4</span>
          <span class="badge badge--primary">Synology</span>
          <span class="badge badge--primary">DRP</span>
          <span class="badge badge--primary">RTO/RPO</span>
        </div>
        <footer class="project__footer">
          <a href="https://github.com/terorero/devinconde-portfolio/tree/main/backup-dr" class="btn btn--ghost btn--sm" target="_blank" rel="noopener">Ver Runbooks</a>
          <a href="https://github.com/terorero" class="btn btn--secondary btn--sm" target="_blank" rel="noopener">Código</a>
        </footer>
      </div>
    </article>

    <!-- Project 5: Linux Hardening -->
    <article class="project card animate-in delay-5">
      <div class="project__terminal terminal">
        <div class="terminal__header">
          <div class="terminal__dots">
            <span class="terminal__dot terminal__dot--close" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--minimize" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--maximize" aria-hidden="true"></span>
          </div>
          <span class="terminal__title">linux-hardening</span>
        </div>
        <pre class="terminal__body"><code class="terminal__command" data-prompt="$ ">./linux-hardening.sh --profile cis-l2 --apply
<span class="terminal__output">[✓] SSH: Protocol 2, no root, keys only, 2FA
[✓] Kernel: sysctl hardening (IPv6, ICMP, TCP)
[✓] Filesystem: noexec, nodev, nosuid on /tmp, /var/tmp
[✓] Auditd: rules for privilege escalation, file access
[✓] PAM: password quality, lockout, FAIL2BAN
[✓] Systemd: service hardening, restrict namespaces
[✓] Network: nftables default-deny, fail2ban</span>
<span class="terminal__success">CIS L1/L2 applied — idempotent, multi-distro (Debian/RHEL/Alpine)</span></code></pre>
      </div>
      <div class="project__body">
        <header class="project__header">
          <div class="project__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"></rect><line x1="12" y1="22" x2="12" y2="18"></line><line x1="22" y1="12" x2="18" y2="12"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="12" y1="2" x2="12" y2="6"></line></svg>
          </div>
          <h3 class="project__title">Linux Hardening — CIS L1/L2 Automatizado</h3>
        </header>
        <div class="project__meta">
          <span class="project__meta-item"><span class="project__meta-value">1,200+</span> líneas</span>
          <span class="project__meta-item"><span class="project__meta-value">multi-distro</span></span>
          <span class="project__meta-item"><span class="project__meta-value">idempotente</span></span>
          <span class="project__meta-item"><span class="project__meta-value">auditd</span> ready</span>
        </div>
        <p class="project__description">Script de hardening Bash 1,200 líneas aplicando CIS Benchmarks Level 1/2. SSH, kernel params, filesystem mounts, auditd rules, PAM, systemd service hardening, nftables default-deny. Idempotente, probado en Debian, RHEL, Alpine. Integración con Ansible role.</p>
        <div class="project__stack">
          <span class="badge badge--primary">Bash</span>
          <span class="badge badge--primary">CIS</span>
          <span class="badge badge--primary">auditd</span>
          <span class="badge badge--primary">nftables</span>
          <span class="badge badge--primary">systemd</span>
          <span class="badge badge--primary">Ansible</span>
        </div>
        <footer class="project__footer">
          <a href="https://github.com/terorero/devinconde-portfolio/tree/main/hardening" class="btn btn--ghost btn--sm" target="_blank" rel="noopener">Ver Script</a>
          <a href="https://github.com/terorero" class="btn btn--secondary btn--sm" target="_blank" rel="noopener">Código</a>
        </footer>
      </div>
    </article>
  </div>
</section>

<!-- Skills -->
<section class="section" id="habilidades" aria-labelledby="skills-title">
  <header class="section__header animate-in">
    <span class="section__eyebrow">Habilidades</span>
    <h2 id="skills-title" class="section__title">Stack técnico verificado</h2>
  </header>
  <div class="grid animate-in delay-1" style="max-width: 72ch;">
    <div class="card">
      <h3 class="card__title">Sistemas & Cloud</h3>
      <div class="card__stack cluster">
        <span class="badge badge--primary">Linux (Debian/RHEL/Alpine)</span>
        <span class="badge badge--primary">Windows Server</span>
        <span class="badge badge--primary">Proxmox VE</span>
        <span class="badge badge--primary">Docker / Swarm</span>
        <span class="badge badge--primary">Kubernetes (k3s)</span>
        <span class="badge badge--primary">AWS (VPC, EC2, RDS, S3)</span>
        <span class="badge badge--primary">DigitalOcean</span>
        <span class="badge badge--primary">GCP / Azure (básico)</span>
      </div>
    </div>
    <div class="card">
      <h3 class="card__title">Automatización & IaC</h3>
      <div class="card__stack cluster">
        <span class="badge badge--primary">Ansible (12 plays, 8 roles)</span>
        <span class="badge badge--primary">Terraform (modules)</span>
        <span class="badge badge--primary">GitLab CI / GitHub Actions</span>
        <span class="badge badge--primary">Bash / Python / Go</span>
        <span class="badge badge--primary">Vault (secrets)</span>
      </div>
    </div>
    <div class="card">
      <h3 class="card__title">Correo & Colaboración</h3>
      <div class="card__stack cluster">
        <span class="badge badge--primary">Zimbra (15 años, migración 8→10)</span>
        <span class="badge badge--primary">Exchange / O365</span>
        <span class="badge badge--primary">Postfix / Dovecot</span>
        <span class="badge badge--primary">LDAP / Active Directory</span>
      </div>
    </div>
    <div class="card">
      <h3 class="card__title">Redes & Seguridad</h3>
      <div class="card__stack cluster">
        <span class="badge badge--primary">FortiGate (HA, VPN, SD-WAN)</span>
        <span class="badge badge--primary">nftables / iptables</span>
        <span class="badge badge--primary">BGP / OSPF / VLAN</span>
        <span class="badge badge--primary">CIS Hardening L1/L2</span>
        <span class="badge badge--primary">ISO 27001 / ITIL</span>
      </div>
    </div>
    <div class="card">
      <h3 class="card__title">Observabilidad</h3>
      <div class="card__stack cluster">
        <span class="badge badge--primary">Prometheus / Grafana</span>
        <span class="badge badge--primary">Alertmanager</span>
        <span class="badge badge--primary">Loki / Tempo</span>
        <span class="badge badge--primary">Exporters custom (Go)</span>
        <span class="badge badge--primary">Blackbox probing</span>
      </div>
    </div>
    <div class="card">
      <h3 class="card__title">VoIP & Legacy</h3>
      <div class="card__stack cluster">
        <span class="badge badge--primary">Asterisk / FreePBX</span>
        <span class="badge badge--primary">Avaya (15 años)</span>
        <span class="badge badge--primary">SIP / PRI / E1</span>
        <span class="badge badge--primary">Synology / Blade servers</span>
      </div>
    </div>
  </div>
</section>

<!-- Experience -->
<section class="section section--alt" id="experiencia" aria-labelledby="experience-title">
  <header class="section__header animate-in">
    <span class="section__eyebrow">Experiencia</span>
    <h2 id="experience-title" class="section__title">25 años en la trinchera</h2>
  </header>
  <div class="experience animate-in delay-1">
    <article class="experience__item">
      <span class="experience__marker" aria-hidden="true"></span>
      <time class="experience__period" datetime="2020-01">2020 — Presente</time>
      <h3 class="experience__role">Responsable de Redes e Infraestructura</h3>
      <p class="experience__company">La Razón — Diario nacional, Bolivia</p>
      <ul class="experience__highlights">
        <li class="experience__highlight">Migración Zimbra 8→10 (200+ users, 0 licencias propietarias, zero-downtime)</li>
        <li class="experience__highlight">Deploy Immich self-hosted: $0 CapEx, $5-10K/año SaaS eliminado, soberanía 100%</li>
        <li class="experience__highlight">Monitoring stack Prometheus/Grafana: 10 servicios, 50+ alertas, exporters custom Go</li>
        <li class="experience__highlight">Backup Borg 5.2TB logical, 65% dedup, RTO <4h, runbooks 5 escenarios probados</li>
        <li class="experience__highlight">IaC Ansible+Terraform: 12 plays, 8 roles, multi-cloud (AWS/DO), GitOps ready</li>
        <li class="experience__highlight">Hardening CIS L1/L2 automatizado, FortiGate HA, VPN, SD-WAN</li>
      </ul>
    </article>
    <article class="experience__item">
      <span class="experience__marker" aria-hidden="true"></span>
      <time class="experience__period" datetime="2005-01">2005 — 2020</time>
      <h3 class="experience__role">Senior Systems Administrator</h3>
      <p class="experience__company">CSBP — 15 años</p>
      <ul class="experience__highlights">
        <li class="experience__highlight">Administración Avaya Communication Manager (SIP, H.323, 500+ extensiones)</li>
        <li class="experience__highlight">Zimbra Collaboration Suite: diseño, migración, operación 24/7</li>
        <li class="experience__highlight">Synology / Blade servers: storage, virtualización, DR</li>
        <li class="experience__highlight">SAP R/3 basis: instalaciones, upgrades, performance tuning</li>
      </ul>
    </article>
    <article class="experience__item">
      <span class="experience__marker" aria-hidden="true"></span>
      <time class="experience__period" datetime="1999-01">1999 — 2005</time>
      <h3 class="experience__role">SysAdmin / Network Engineer</h3>
      <p class="experience__company">Primeros años — Fundamentos</p>
      <ul class="experience__highlights">
        <li class="experience__highlight">Redes Novell NetWare, Windows NT 4.0, primeros Linux (Slackware/Red Hat)</li>
        <li class="experience__highlight">Cableado estructurado, switching, routing básico</li>
        <li class="experience__highlight">Soporte hardware: servidores Compaq/HP, estaciones de trabajo</li>
      </ul>
    </article>
  </div>
</section>

<!-- Contact -->
<section class="section" id="contacto" aria-labelledby="contact-title">
  <header class="section__header animate-in">
    <span class="section__eyebrow">Contacto</span>
    <h2 id="contact-title" class="section__title">Disponible para roles senior</h2>
  </header>
  <div class="summary animate-in delay-1" style="max-width: 56ch;">
    <ul class="summary__list">
      <li class="summary__item">
        <div class="summary__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </div>
        <p class="summary__text"><strong>Email:</strong> <a href="mailto:devin@devinconde.com" class="btn btn--ghost btn--sm" style="padding: var(--space-1) var(--space-2); font-size: var(--text-sm);">devin@devinconde.com</a></p>
      </li>
      <li class="summary__item">
        <div class="summary__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <p class="summary__text"><strong>Ubicación:</strong> La Paz, Bolivia — Remoto / Híbrido</p>
      </li>
      <li class="summary__item">
        <div class="summary__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        </div>
        <p class="summary__text"><strong>Perfiles:</strong>
          <a href="https://linkedin.com/in/devinconde" class="btn btn--ghost btn--sm" target="_blank" rel="noopener" style="padding: var(--space-1) var(--space-2); font-size: var(--text-sm);">LinkedIn</a>
          <a href="https://github.com/terorero" class="btn btn--ghost btn--sm" target="_blank" rel="noopener" style="padding: var(--space-1) var(--space-2); font-size: var(--text-sm); margin-left: var(--space-2);">GitHub</a>
          <a href="https://devinconde.com" class="btn btn--ghost btn--sm" target="_blank" rel="noopener" style="padding: var(--space-1) var(--space-2); font-size: var(--text-sm); margin-left: var(--space-2);">Web</a>
        </p>
      </li>
      <li class="summary__item">
        <div class="summary__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M8 21h8M12 17v4"></path></svg>
        </div>
        <p class="summary__text"><strong>Buscando:</strong> Senior Infra/Cloud/Security — Banca, Telco, Energía, Gobierno, Media, Consultoría — Bolivia (remoto/híbrido) o LATAM</p>
      </li>
    </ul>
  </div>
</section>