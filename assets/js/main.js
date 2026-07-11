// Main JavaScript — Devin R. Conde Mancilla Portfolio
// Vanilla JS, no dependencies, progressive enhancement

(() => {
  'use strict';

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const siteMenu = document.querySelector('.site-menu');

  function toggleMenu() {
    const isOpen = siteMenu.classList.toggle('site-menu--open');
    menuToggle?.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  }

  function closeMenu() {
    siteMenu?.classList.remove('site-menu--open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  menuToggle?.addEventListener('click', toggleMenu);

  // Close menu on nav link click (mobile)
  document.querySelectorAll('.site-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) closeMenu();
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || getSystemTheme();
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  themeToggle?.addEventListener('click', function() {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  // Listen for system theme changes (only applies when no explicit choice)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      // No explicit choice — let CSS fallback handle it
      document.documentElement.removeAttribute('data-theme');
    }
  });

  // --- Copy Terminal Code on Click ---
  document.querySelectorAll('pre code').forEach(block => {
    block.addEventListener('click', function() {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(this);
      selection.removeAllRanges();
      selection.addRange(range);

      const original = this.textContent;
      navigator.clipboard.writeText(original).then(() => {
        const toast = document.createElement('div');
        toast.textContent = 'Copiado';
        toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;padding:0.75rem 1.5rem;background:var(--color-fg-primary);color:var(--color-fg-inverse);border-radius:var(--radius-md);z-index:1000;animation:fade-in 0.2s';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      });
    });
  });

  // --- Scroll Reveal (IntersectionObserver) ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach(el =>
    revealObserver.observe(el)
  );

  // --- Current Year in Footer ---
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
        closeMenu();
      }
    });
  });

  // --- Active Nav Highlight on Scroll ---
  const navLinks = document.querySelectorAll('.site-menu a[href^="#"], .sidebar__nav-link[href^="#"]');
  const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.toggleAttribute('aria-current', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(section => scrollObserver.observe(section));

})();

// Fade-in animation for toast
const style = document.createElement('style');
style.textContent = '@keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }';
document.head.appendChild(style);