---
layout: default
title: "Blog — Devin R. Conde Mancilla"
description: "Artículos sobre infraestructura, seguridad, monitoring, automatización y operaciones de TI."
permalink: /blog/
---

<section class="hero" aria-labelledby="blog-title">
  <div class="hero__content animate-in">
    <span class="hero__eyebrow">Blog</span>
    <h1 id="blog-title" class="hero__name" style="font-size: var(--text-4xl);">Artículos</h1>
    <p class="hero__title">Notas sobre infraestructura, seguridad y operaciones de TI en producción.</p>
  </div>
</section>

<section class="section" aria-label="Lista de artículos">
  <div class="stack stack--lg">
    {% for post in site.posts %}
    <article class="card animate-in" style="max-width: 72ch;">
      <header class="project__header">
        <h2 class="project__title" style="font-size: var(--text-xl);">
          <a href="{{ post.url | relative_url }}" style="color: inherit; text-decoration: none;">{{ post.title }}</a>
        </h2>
      </header>
      <div class="project__meta" style="margin-bottom: var(--space-3);">
        <span class="project__meta-item">
          <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: '%-d de %B de %Y' }}</time>
        </span>
        {% if post.tags %}
        <span class="project__meta-item">
          <div class="cluster" style="gap: var(--space-1);">
            {% for tag in post.tags %}
            <span class="badge badge--primary">{{ tag }}</span>
            {% endfor %}
          </div>
        </span>
        {% endif %}
      </div>
      <p class="project__description">{{ post.description }}</p>
      <footer class="project__footer">
        <a href="{{ post.url | relative_url }}" class="btn btn--ghost btn--sm">Leer artículo</a>
      </footer>
    </article>
    {% endfor %}
  </div>

  {% if site.posts.size == 0 %}
  <div class="summary animate-in" style="max-width: 56ch; text-align: center; margin-top: var(--space-8);">
    <p class="summary__text">Próximamente publicaré artículos sobre infraestructura y seguridad.</p>
  </div>
  {% endif %}
</section>
