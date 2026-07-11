---
layout: post
title: "CIS Hardening en Linux: De 0 a Producción"
description: "Cómo implementamos CIS Benchmarks Level 1/2 en Debian, RHEL, y Alpine con un script idempotente de 1,200 líneas."
date: 2025-06-25
categories: [seguridad, hardening, linux]
tags: [cis, hardening, security, auditd, nftables]
---

## Por qué CIS

Un servidor sin hardening es un servidor esperando ser comprometido. CIS Benchmarks son las bases: no inventamos la rueda, la seguimos.

## El script

1,200 líneas de Bash que aplican CIS Level 1 y Level 2 de forma idempotente. Si ya está aplicado, no hace nada. Si falta algo, lo corrige.

```bash
./linux-hardening.sh --profile cis-l2 --apply
```

## Qué cubre

### 1. SSH (CIS 5.2)

```bash
# Archivo: /etc/ssh/sshd_config
Protocol 2
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
AllowGroups ssh-users
```

### 2. Kernel parameters (CIS 3.2)

```bash
# /etc/sysctl.d/99-cis.conf
# IPv6 (deshabilitar si no se usa)
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1

# ICMP
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.icmp_ignore_bogus_error_responses = 1

# TCP hardening
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.all.log_martians = 1
net.ipv4.tcp_syncookies = 1
```

### 3. Filesystem (CIS 1.1)

```bash
# /etc/fstab — opciones de seguridad
/dev/sda1  /tmp  ext4  defaults,nosuid,nodev,noexec  0 0
/dev/sda2  /var  ext4  defaults,nosuid               0 0
/dev/sda3  /home ext4  defaults,nosuid,nodev          0 0
```

### 4. Auditd (CIS 4.1)

```bash
# /etc/audit/rules.d/cis.rules
# Monitoreo de privilege escalation
-a always,exit -F arch=b64 -S execve -C uid!=euid -F euid=0 -k privilege_escalation

# Monitoreo de acceso a archivos sensibles
-w /etc/passwd -p wa -k identity
-w /etc/group -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/sudoers -p wa -k sudoers
-w /etc/ssh/sshd_config -p wa -k sshd_config

# Monitoreo de comandos de auditoría
-w /sbin/auditctl -p x -k audit-tools
-w /sbin/auditd -p x -k audit-tools
```

### 5. PAM y passwords (CIS 5.3)

```bash
# /etc/security/pwquality.conf
minlen = 14
dcredit = -1
ucredit = -1
lcredit = -1
ocredit = -1
maxrepeat = 3

# /etc/pam.d/common-auth
auth    required    pam_tally2.so deny=5 unlock_time=900
auth    required    pam_faillock.so deny=5 unlock_time=900
```

### 6. nftables (CIS 3.5)

```bash
#!/usr/sbin/nft -f
flush ruleset

table inet filter {
    chain input {
        type filter hook input priority 0; policy drop;
        
        # Established/related
        ct state established,related accept
        
        # Loopback
        iif lo accept
        
        # ICMP (limitado)
        ip protocol icmp limit rate 4/second accept
        ip6 nexthdr icmpv6 limit rate 4/second accept
        
        # SSH
        tcp dport 22 ct state new limit rate 3/minute accept
        
        # HTTP/HTTPS
        tcp dport { 80, 443 } accept
        
        # Logging
        log prefix "nft-drop: " limit rate 5/minute
        drop
    }
    
    chain forward {
        type filter hook forward priority 0; policy drop;
    }
    
    chain output {
        type filter hook output priority 0; policy accept;
    }
}
```

### 7. Systemd service hardening (CIS 5.2)

```ini
# /etc/systemd/system/zimbra.service.d/hardening.conf
[Service]
ProtectSystem=strict
ProtectHome=true
NoNewPrivileges=true
PrivateTmp=true
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
RestrictNamespaces=true
RestrictRealtime=true
RestrictSUIDSGID=true
MemoryDenyWriteExecute=true
LockPersonality=true
```

## Verificación

```bash
# Auditar con el script
./linux-hardening.sh --profile cis-l2 --audit

# Output esperado:
# [✓] SSH: Protocol 2, no root, keys only
# [✓] Kernel: sysctl hardening applied
# [✓] Filesystem: noexec, nodev, nosuid
# [✓] Auditd: rules active
# [✓] PAM: password quality, lockout
# [✓] nftables: default-deny
# [✓] Systemd: service hardening
```

## Multi-distro

El script detecta la distribución y ajusta:

| Componente | Debian | RHEL | Alpine |
|------------|--------|------|--------|
| Package manager | apt | dnf | apk |
| Firewall | nftables | firewalld | iptables |
| Audit | auditd | auditd | auditd |
| SSH config | /etc/ssh | /etc/ssh | /etc/ssh |
| Sysctl | /etc/sysctl.d | /etc/sysctl.d | /etc/sysctl.d |

## Resultados

| Métrica | Antes | Después |
|---------|-------|---------|
| CIS Level | 0 | L1+L2 |
| Vulnerabilidades abiertas | 47 | 3 |
| Tiempo de auditoría | Manual (días) | Automático (min) |
| Incidentes de seguridad | ~1/trim | 0 |
| Compliance | No | ISO 27001 ready |

## Lecciones aprendidas

1. **Idempotencia es clave** — El script puede ejecutarse 100 veces con el mismo resultado.
2. **Prueba en staging primero** — Algunos hardenings rompen aplicaciones.
3. **noexec en /tmp rompe algunos instaladores** — Documenta las excepciones.
4. **auditd genera logs enormes** — Configura rotación y filtrado.
5. **El hardening no reemplaza la vigilancia** — Es una capa más, no la única.

---

*Publicado el 25 de junio de 2025*
