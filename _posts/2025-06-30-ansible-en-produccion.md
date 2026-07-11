---
layout: post
title: "Ansible en Producción: 12 Plays, 8 Roles, 0 Sorpresas"
description: "Lecciones de 4 años usando Ansible para automatizar Zimbra, FortiGate, monitoring, y hardening en producción."
date: 2025-06-30
categories: [infraestructura, automatizacion, iac]
tags: [ansible, terraform, automation, gitops]
---

## El principio

Si se hace más de dos veces, se scriptea. Si se deploya más de una vez, se IaC. Si falla una vez, se monitorea.

## Estructura del proyecto

```
infrastructure-as-code/
├── ansible/
│   ├── inventory/
│   │   ├── production/
│   │   │   ├── hosts.yml
│   │   │   └── group_vars/
│   │   │       ├── all.yml
│   │   │       ├── zimbra.yml
│   │   │       └── fortigate.yml
│   │   └── staging/
│   ├── roles/
│   │   ├── common/
│   │   ├── zimbra/
│   │   ├── fortigate/
│   │   ├── monitoring/
│   │   ├── k8s/
│   │   ├── hardening/
│   │   └── backup/
│   ├── playbooks/
│   │   ├── site.yml
│   │   ├── zimbra.yml
│   │   ├── monitoring.yml
│   │   └── security.yml
│   └── ansible.cfg
├── terraform/
│   ├── modules/
│   │   ├── vpc/
│   │   ├── bastion/
│   │   └── monitoring/
│   ├── environments/
│   │   ├── production/
│   │   └── staging/
│   └── main.tf
└── .gitlab-ci.yml
```

## Plays principales

### Play 1: Common (todos los servidores)

```yaml
---
- name: Common configuration
  hosts: all
  become: yes
  roles:
    - common
    - hardening
```

El role `common` hace:
- Configurar hostname, DNS, NTP
- Instalar paquetes base
- Configurar SSH (keys only, no root)
- Configurar unattended-upgrades
- Deployar monitoring agent

### Play 2: Zimbra

```yaml
---
- name: Zimbra deployment
  hosts: zimbra
  become: yes
  vars_files:
    - group_vars/zimbra.yml
  roles:
    - zimbra
  handlers:
    - name: restart zimbra
      command: su - zimbra -c "zmcontrol restart"
```

### Play 3: FortiGate (via API)

```yaml
---
- name: FortiGate configuration
  hosts: fortigate
  gather_facts: no
  roles:
    - fortigate
  vars:
    fortigate_api_host: "{{ vault_fortigate_host }}"
    fortigate_api_token: "{{ vault_fortigate_token }}"
```

## El role de hardening

```yaml
# roles/hardening/tasks/main.yml
---
- name: SSH hardening
  include_tasks: ssh.yml
  tags: [ssh]

- name: Kernel parameters
  include_tasks: kernel.yml
  tags: [kernel]

- name: Filesystem hardening
  include_tasks: filesystem.yml
  tags: [filesystem]

- name: Audit rules
  include_tasks: auditd.yml
  tags: [auditd]

- name: Firewall rules
  include_tasks: nftables.yml
  tags: [firewall]
```

### Ejemplo: SSH hardening

```yaml
# roles/hardening/tasks/ssh.yml
---
- name: Disable password authentication
  lineinfile:
    path: /etc/ssh/sshd_config
    regexp: '^#?PasswordAuthentication'
    line: 'PasswordAuthentication no'
  notify: restart sshd

- name: Disable root login
  lineinfile:
    path: /etc/ssh/sshd_config
    regexp: '^#?PermitRootLogin'
    line: 'PermitRootLogin no'
  notify: restart sshd

- name: Set SSH protocol 2
  lineinfile:
    path: /etc/ssh/sshd_config
    regexp: '^#?Protocol'
    line: 'Protocol 2'
  notify: restart sshd
```

## CI/CD con GitLab

```yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - deploy

lint:
  stage: lint
  script:
    - ansible-lint playbooks/
    - terraform validate terraform/

test:
  stage: test
  script:
    - ansible-playbook --syntax-check playbooks/site.yml
    - molecule test

deploy_production:
  stage: deploy
  script:
    - ansible-playbook -i inventory/production playbooks/site.yml
  only:
    - main
  when: manual
```

## Resultados

| Métrica | Antes | Después |
|---------|-------|---------|
| Deploy time | 4 horas | 35 minutos |
| Config drift | Frecuente | 0 |
| Rollback time | Horas | 5 minutos |
| Incidentes de config | ~2/mes | 0 |
| Documentación | Desactualizada | El código ES la doc |

## Lecciones aprendidas

1. **Vault no es opcional** — Las credenciales nunca en texto plano.
2. **Idempotencia es todo** — Si un play no es idempotente, no lo ejecutes dos veces.
3. **Molecule salva** — Testea tus roles antes de tocar producción.
4. **El código es la documentación** — Un playbook bien escrito vale más que un README.
5. **GitOps first** — Todo pasa por merge request, todo tiene review.

---

*Publicado el 30 de junio de 2025*
