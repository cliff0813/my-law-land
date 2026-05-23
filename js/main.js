(function () {
  'use strict';

  /* ── Navbar scroll shadow ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ── Hamburger toggle ── */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  /* ── Close menu on nav link click ── */
  document.querySelectorAll('#nav-menu a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── IntersectionObserver fade-in ── */
  const fadeEls = document.querySelectorAll(
    '.team-card, .service-card, .knowledge-card, .about-grid, #fees .fees-table-wrap'
  );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach(function (el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  } else {
    /* Fallback for old browsers */
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
