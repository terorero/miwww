---
layout: post
title: "Borg Backup: Estrategia Enterprise para 5TB+"
description: "Cómo implementamos Borg con deduplicación cross-machine, retención 90d/12m/7y, y runbooks de restore probados para 200+ usuarios."
date: 2025-07-07
categories: [infraestructura, backup, disaster-recovery]
tags: [borg, backup, dedup, dr, synology]
---

## El problema

5TB de datos, 200+ usuarios, cero margen de error. Un backup que no se puede restore no es un backup.

## Arquitectura

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Servidor   │────▶│   Synology   │────▶│   Cloud     │
│  Producción │ Borg│   NAS (local)│ Rclone│  (offsite)  │
└─────────────┘     └──────────────┘     └─────────────┘
```

**Tres copias**: producción → Synology (local) → Cloud (offsite).

## Configuración

### Inicialización del repositorio

```bash
# En el servidor de producción
borg init --encryption=repokey-blake2 \
  --compression=lz4 \
  /mnt/synology/borg-repo

# En el Synology (como repo remoto)
borg init --encryption=repokey-blake2 \
  /volume1/backup/zimbra-borg
```

### Script de backup

```bash
#!/usr/bin/env bash
set -euo pipefail

REPO="/mnt/synology/borg-repo"
DATE=$(date +%Y-%m-%dT%H:%M:%S)
HOSTNAME=$(hostname -s)

export BORG_REPO="$REPO"
export BORG_PASSPHRASE="..."  # Mejor: BORG_PASSCOMMAND

echo "=== Backup started: $DATE ==="

borg create \
  --verbose \
  --stats \
  --compression lz4 \
  --exclude '*.log' \
  --exclude '/opt/zimbra/data/log/*' \
  "$REPO::{hostname}-${DATE}" \
  /opt/zimbra \
  /var/lib/docker \
  /etc \
  /root/scripts

echo "=== Pruning ==="
borg prune \
  --verbose \
  --keep-daily 90 \
  --keep-monthly 12 \
  --keep-yearly 7

echo "=== Verification ==="
borg check --verify-data "$REPO"

echo "=== Backup completed ==="
```

### Cron job

```bash
# /etc/cron.d/borg-backup
0 2 * * * root /root/scripts/borg-backup.sh >> /var/log/borg-backup.log 2>&1
```

## Métricas reales

| Métrica | Valor |
|---------|-------|
| Datos lógicos | 5.2 TB |
| Datos físicos | 1.8 TB |
| Deduplicación | 65% |
| Tiempo promedio | 45 min |
| Retención | 90d / 12m / 7y |
| Restore testado | 5 escenarios |

## Runbooks de restore

### Escenario 1: Restore completo

```bash
borg extract /mnt/synology/borg-repo::mail-2025-07-07T02:00:00
```

### Escenario 2: Restore de una sola mailbox

```bash
# Extraer solo el directorio de un usuario
borg extract /mnt/synology/borg-repo::mail-2025-07-07T02:00:00 \
  opt/zimbra/store/0/1/msg/0/
```

### Escenario 3: Restore de configuración

```bash
borg extract /mnt/synology/borg-repo::mail-2025-07-07T02:00:00 \
  etc/
```

### Escenario 4: Restore a cloud (DR)

```bash
# Desde la instancia cloud
borg extract ssh://user@synology/volume1/backup/zimbra-borg::mail-latest
```

### Escenario 5: Verificar integridad

```bash
borg check --verify-data /mnt/synology/borg-repo
borg info /mnt/synology/borg-repo::mail-2025-07-07T02:00:00
```

## Lecciones aprendidas

1. **LZ4 es el mejor balance** — Compresión rápida, buen ratio.
2. **Los tests de restore son obligatorios** — Si no lo has restoreado, no tienes backup.
3. **La retención debe cubrir auditorías** — 7 años no es exagerado en Bolivia.
4. **El offsite no es opcional** — Un incendio en el datacenter no puede borrar tus backups.

---

*Publicado el 7 de julio de 2025*
