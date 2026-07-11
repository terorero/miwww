---
layout: default
title: "Proyectos — Devin R. Conde Mancilla"
description: "Proyectos de infraestructura en producción: Immich, Monitoring Stack, IaC, Backup/DR, Linux Hardening"
---

<section class="section" aria-labelledby="projects-title">
  <header class="section__header animate-in">
    <span class="section__eyebrow">Proyectos</span>
    <h1 id="projects-title" class="section__title">Servicios en producción</h1>
  </header>
  <div class="projects">
    {% for project in site.projects %}
    <article class="project card animate-in">
      <div class="project__terminal terminal">
        <div class="terminal__header">
          <div class="terminal__dots">
            <span class="terminal__dot terminal__dot--close" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--minimize" aria-hidden="true"></span>
            <span class="terminal__dot terminal__dot--maximize" aria-hidden="true"></span>
          </div>
          <span class="terminal__title">{{ project.terminal_title | default: project.slug }}</span>
        </div>
        <pre class="terminal__body"><code class="terminal__command" data-prompt="$ ">{{ project.terminal_content }}</code></pre>
      </div>
      <div class="project__body">
        <header class="project__header">
          <div class="project__icon" aria-hidden="true">
            {{ project.icon }}
          </div>
          <h3 class="project__title">{{ project.title }}</h3>
        </header>
        <div class="project__meta">
          {% for metric in project.metrics %}
          <span class="project__meta-item"><span class="project__meta-value">{{ metric.value }}</span> {{ metric.label }}</span>
          {% endfor %}
        </div>
        <p class="project__description">{{ project.description }}</p>
        <div class="project__stack">
          {% for tag in project.tags %}
          <span class="badge badge--primary">{{ tag }}</span>
          {% endfor %}
        </div>
        <footer class="project__footer">
          {% if project.docs_url %}
          <a href="{{ project.docs_url }}" class="btn btn--ghost btn--sm" target="_blank" rel="noopener">Ver Docs</a>
          {% endif %}
          {% if project.repo_url %}
          <a href="{{ project.repo_url }}" class="btn btn--secondary btn--sm" target="_blank" rel="noopener">Código</a>
          {% endif %}
        </footer>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<!-- If no projects collection, show fallback message -->
{% if site.projects.size == 0 %}
<div class="summary animate-in" style="max-width: 56ch; text-align: center;">
  <p class="summary__text">La colección de proyectos está vacía. Agrega archivos en la carpeta <code>_projects/</code> para que aparezcan aquí.</p>
</div>
{% endif %}