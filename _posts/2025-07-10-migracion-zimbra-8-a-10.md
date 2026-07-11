---
layout: post
title: "Migración Zimbra 8→10: Zero-Downtime en Producción"
description: "Guía práctica de la migración de Zimbra Collaboration Suite de la versión 8 a 10 sin tiempo de inactividad para 200+ usuarios."
date: 2025-07-10
categories: [infraestructura, correo, zimbra]
tags: [zimbra, migration, zero-downtime, linux]
---

## El desafío

Migrar un servidor de correo con 200+ usuarios activos sin que nadie note que pasó algo. Ese fue el objetivo: Zimbra 8 → Zimbra 10, zero-downtime, sin licencias propietarias, sin perder un solo correo.

## Preparación

Antes de tocar producción, el plan tuvo tres fases:

1. **Auditoría** — Inventario completo de dominios, cuentas, listas de distribución, reglas de filtro, y reglas de carpetas compartidas.
2. **Entorno de staging** — Clon exacto de producción en un servidor separado. Mismas versiones de O/S, mismos paquetes.
3. **Backup completo** — Borg creando snapshot del volumen completo antes de cada paso.

```bash
borg create --compression lz4 \
  /mnt/backup/zimbra-pre-migration::{hostname}-{now:%Y-%m-%dT%H:%M} \
  /opt/zimbra
```

## La migración

### Paso 1: Preparar el nuevo servidor

```bash
# Instalar dependencias en Debian 12
apt install -y netcat-openbsd sudo libpam-pwquality

# Descargar Zimbra 10
wget https://files.zimbra.com/10.0.9/zcs-10.0.9_GA_4644.DEBIAN12_64.tgz
tar xzf zcs-*.tgz
cd zcs-*/
./install.sh --platform-override
```

### Paso 2: Migrar datos

Usamos `rsync` para sincronizar el directorio `/opt/zimbra` entre servidores durante la ventana de bajo tráfico:

```bash
rsync -avz --delete \
  /opt/zimbra/ \
  user@nuevo-server:/opt/zimbra/
```

### Paso 3: DNS cutover

El truco está en el TTL. Lo bajamos a 60 segundos 48 horas antes:

```bash
# En el DNS, TTL = 60s (48h antes del cutover)
# En el momento del switch:
# 1. Actualizar MX records
# 2. Esperar propagación (máximo 60s)
# 3. Verificar con dig
dig MX larazon.bo +short
```

### Paso 4: Verificación

```bash
# Test de conectividad SMTP
nc -zv mail.larazon.bo 25

# Test de IMAPS
openssl s_client -connect mail.larazon.bo:993

# Verificar cola de correo
su - zimbra -c "zmmailq -l"
```

## Resultados

| Métrica | Antes | Después |
|---------|-------|---------|
| Versión | 8.8.15 | 10.0.9 |
| Tiempo de inactividad | — | 0 |
| Licencias propietarias | 3 | 0 |
| Usuarios afectados | — | 0 |
| Costo anual | $12K | $0 |

## Lecciones aprendidas

1. **El TTL es tu amigo** — Bajalo con anticipación.
2. **El staging no es opcional** — Ahí descubrimos incompatibilidades con un plugin custom.
3. **Borg te salva** — Tres veces tuvimos que hacer rollback parcial.
4. **Documenta cada paso** — Al día siguiente, el runbook se convirtió en el documento oficial.

---

*Publicado el 10 de julio de 2025*
