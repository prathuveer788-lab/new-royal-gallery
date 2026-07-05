/* THE ROYAL GALLERY — interactions */
(function () {
  'use strict';
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ---- nav scrolled state + progress bar ---- */
  const nav = $('.nav');
  const progress = $('.progress');
  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  const burger = $('.burger');
  if (burger) {
    burger.addEventListener('click', () => document.body.classList.toggle('menu-open'));
    $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
  }

  /* ---- reveal on scroll ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---- animated counters ---- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const dec = el.dataset.dec ? parseInt(el.dataset.dec) : 0;
    const dur = 1700;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = prefix + (dec ? val.toFixed(dec) : Math.round(val).toLocaleString()) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + (dec ? target.toFixed(dec) : target.toLocaleString()) + suffix;
    }
    requestAnimationFrame(tick);
  }
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); } });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* ---- why-now words light up sequentially ---- */
  const whyWrap = $('.whynow-words');
  if (whyWrap) {
    const words = $$('span', whyWrap);
    const wIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          words.forEach((w, i) => setTimeout(() => w.classList.add('lit'), i * 130));
          wIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    wIO.observe(whyWrap);
  }

  /* ---- hero parallax + mouse drift ---- */
  const heroArt = $('.hero__art');
  const heroInner = $('.hero__inner');
  let mx = 0, my = 0, cx = 0, cy = 0;
  if (heroArt) {
    window.addEventListener('mousemove', (ev) => {
      mx = (ev.clientX / window.innerWidth - 0.5);
      my = (ev.clientY / window.innerHeight - 0.5);
    });
    function drift() {
      cx += (mx - cx) * 0.06; cy += (my - cy) * 0.06;
      heroArt.style.transform = `translate(${cx * 24}px, ${cy * 18}px) scale(1.06)`;
      requestAnimationFrame(drift);
    }
    drift();
  }
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroInner && y < window.innerHeight) heroInner.style.transform = `translateY(${y * 0.18}px)`;
    if (heroArt && y < window.innerHeight) heroArt.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.9)));
  }, { passive: true });

  /* ---- phases active on scroll ---- */
  const phases = $$('.phase');
  if (phases.length) {
    const pIO = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.6 });
    phases.forEach(p => pIO.observe(p));
  }

  /* ---- year ---- */
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
})();
