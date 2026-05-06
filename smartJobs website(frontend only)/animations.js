/* ============================================================
   smartJobs Rwanda — animations.js v3
   Custom cursor, particles, tilt cards, magnetic buttons,
   page transitions, confetti, stagger reveals & more
   ============================================================ */

(function initAnimations() {
  /* ── NOISE OVERLAY ──────────────────────────────────────── */
  const noise = document.createElement('div');
  noise.className = 'noise-overlay';
  document.body.appendChild(noise);

  /* ── PAGE TRANSITION OVERLAY ────────────────────────────── */
  const overlay = document.createElement('div');
  overlay.id = 'page-transition';
  document.body.appendChild(overlay);

  // Intercept all internal page navigation links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
    // Internal link
    e.preventDefault();
    overlay.classList.add('entering');
    setTimeout(() => { window.location.href = href; }, 320);
  });

  // On page load, animate out
  overlay.classList.add('entering');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
      overlay.classList.remove('entering');
      overlay.classList.add('exiting');
      setTimeout(() => { overlay.classList.remove('exiting'); }, 420);
    });
  });

  /* ── CUSTOM CURSOR ──────────────────────────────────────── */
  // Only desktop
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot  = document.createElement('div'); dot.className  = 'cursor-dot';
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    });

    // Lag ring with rAF
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state on interactive elements
    const hoverEls = 'a, button, .job-card, .salary-card, .industry-card, .filter-chip, .hero-tag, .hub-photo-card, .mosaic-cell, input, textarea, select, .hub-gallery-item';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverEls)) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout',  (e) => {
      if (e.target.closest(hoverEls)) document.body.classList.remove('cursor-hover');
    });
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
    document.body.style.cursor = 'none';
  }

  /* ── PARTICLE CANVAS ────────────────────────────────────── */
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['rgba(59,47,201,VAL)', 'rgba(16,185,129,VAL)', 'rgba(245,158,11,VAL)', 'rgba(109,81,247,VAL)'];
  const particles = Array.from({ length: 38 }, () => createParticle());

  function createParticle() {
    return {
      x: Math.random() * (typeof W !== 'undefined' ? W : window.innerWidth),
      y: Math.random() * (typeof H !== 'undefined' ? H : window.innerHeight),
      r: Math.random() * 2.4 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.5 + 0.1,
    };
  }

  let mouseParticleX = -1000, mouseParticleY = -1000;
  document.addEventListener('mousemove', (e) => { mouseParticleX = e.clientX; mouseParticleY = e.clientY; });

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      // Drift toward mouse gently
      const dx = mouseParticleX - p.x, dy = mouseParticleY - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 160) {
        p.vx += dx * 0.00008;
        p.vy += dy * 0.00008;
      }
      p.vx *= 0.995; p.vy *= 0.995;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      const c = p.color.replace('VAL', p.opacity);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
    }

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59,47,201,${0.07 * (1 - d/100)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* ── TILT CARD EFFECT ───────────────────────────────────── */
  function initTiltCards() {
    const tiltEls = document.querySelectorAll('.salary-card, .testimonial-card, .company-card, .industry-card');
    tiltEls.forEach(el => {
      el.classList.add('tilt-card');
      const shine = document.createElement('div');
      shine.className = 'tilt-shine';
      el.style.position = 'relative';
      el.appendChild(shine);

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -10;
        const rotY = ((x - cx) / cx) * 10;
        el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,.18) 0%, transparent 65%)`;
        shine.style.opacity = '1';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        shine.style.opacity = '0';
      });
    });
  }

  /* ── MAGNETIC BUTTONS ───────────────────────────────────── */
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.nav-btn-primary, .btn-auth, .btn-post, .search-btn, .hero-search-btn');
    buttons.forEach(btn => {
      btn.classList.add('magnetic-btn');
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;
        btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── CASCADE STAGGER REVEAL ─────────────────────────────── */
  function initCascadeReveal() {
    const grids = [
      '.card-grid',
      '.company-results-grid',
      '.industry-grid',
      '.testimonials-grid',
    ];
    grids.forEach(sel => {
      const grid = document.querySelector(sel);
      if (!grid) return;
      Array.from(grid.children).forEach(child => child.classList.add('cascade-item'));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.cascade-item').forEach(el => observer.observe(el));
  }

  /* ── SECTION TITLE UNDERLINE ────────────────────────────── */
  function initTitleUnderlines() {
    const titles = document.querySelectorAll('.section-title');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('title-visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    titles.forEach(t => observer.observe(t));
  }

  /* ── HERO WORD WRAP ─────────────────────────────────────── */
  function wrapHeroWords() {
    const h1 = document.querySelector('.search-hero h1');
    if (!h1) return;
    const words = h1.innerHTML.split(/(\s+)/);
    h1.innerHTML = words.map((w, i) =>
      w.trim() ? `<span class="anim-word" style="animation-delay:${i * 0.06}s">${w}</span>` : w
    ).join('');
  }

  /* ── COUNTER ANIMATION ───────────────────────────────────── */
  function initSmartCounters() {
    const els = document.querySelectorAll('[data-count-to]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const end = parseInt(el.dataset.countTo, 10);
        const suffix = el.dataset.suffix || '';
        let startTime = null;
        const duration = 1400;
        function step(ts) {
          if (!startTime) startTime = ts;
          const prog = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - prog, 3);
          el.textContent = Math.floor(eased * end).toLocaleString() + suffix;
          if (prog < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(el => observer.observe(el));
  }

  /* ── CONFETTI ON APPLY ───────────────────────────────────── */
  window.burstConfetti = function(x, y) {
    const colors = ['#3b2fc9','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899'];
    for (let i = 0; i < 30; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.cssText = `
        left: ${x || window.innerWidth / 2}px;
        top:  ${y || window.innerHeight / 2}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        width:  ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation-duration: ${Math.random() * 1.5 + 1.2}s;
        animation-delay: ${Math.random() * 0.3}s;
        transform: translate(${(Math.random()-0.5)*200}px, 0);
      `;
      document.body.appendChild(piece);
      piece.addEventListener('animationend', () => piece.remove());
    }
  };

  /* ── JOB APPLY CONFETTI ─────────────────────────────────── */
  document.addEventListener('click', (e) => {
    const applyBtn = e.target.closest('.btn-apply-main, .btn-apply');
    if (applyBtn) {
      const rect = applyBtn.getBoundingClientRect();
      burstConfetti(rect.left + rect.width / 2, rect.top);
    }
  });

  /* ── SCROLL PARALLAX HERO ───────────────────────────────── */
  function initHeroParallax() {
    const heroBg = document.querySelector('.hero-photo-bg');
    const heroContent = document.querySelector('.search-hero .container');
    if (!heroBg && !heroContent) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (heroBg)     heroBg.style.transform = `translateY(${y * 0.35}px)`;
      if (heroContent) heroContent.style.transform = `translateY(${y * 0.12}px)`;
      if (heroContent) heroContent.style.opacity = Math.max(0, 1 - y / 500);
    }, { passive: true });
  }

  /* ── LIVE TYPING IN SEARCH ───────────────────────────────── */
  function initSearchTypingEffect() {
    const input = document.getElementById('job-search-input');
    if (!input || input.placeholder !== 'Job title, keywords, or company') return;
    const phrases = [
      'Software Engineer…',
      'Data Analyst…',
      'Medical Doctor…',
      'Bank Manager…',
      'Agronomist…',
      'Sales Manager…',
    ];
    let phraseIdx = 0, charIdx = 0, deleting = false;
    function type() {
      const phrase = phrases[phraseIdx];
      if (!deleting) {
        input.placeholder = phrase.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === phrase.length) { deleting = true; setTimeout(type, 1400); return; }
      } else {
        input.placeholder = phrase.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
      }
      setTimeout(type, deleting ? 45 : 90);
    }
    setTimeout(type, 1800);
  }

  /* ── FILTER CHIP RIPPLE ─────────────────────────────────── */
  function initChipRipples() {
    document.querySelectorAll('.filter-chip, .hero-tag, .role-tab').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const rect = chip.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.cssText = `
          position:absolute; width:${size}px; height:${size}px;
          border-radius:50%; background:rgba(255,255,255,.35);
          left:${e.clientX - rect.left - size/2}px;
          top:${e.clientY - rect.top - size/2}px;
          transform:scale(0); pointer-events:none;
          transition:transform .5s ease, opacity .5s ease;
        `;
        chip.style.position = 'relative';
        chip.style.overflow = 'hidden';
        chip.appendChild(ripple);
        requestAnimationFrame(() => { ripple.style.transform = 'scale(1)'; ripple.style.opacity = '0'; });
        setTimeout(() => ripple.remove(), 550);
      });
    });
  }

  /* ── HOVER FLOAT ANIMATION FOR JOB LOGOS ────────────────── */
  function initJobLogoFloat() {
    document.querySelectorAll('.job-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const logo = card.querySelector('.job-logo');
        if (logo) logo.style.animation = 'wobble .6s ease';
      });
      card.addEventListener('animationend', (e) => {
        if (e.target.classList.contains('job-logo'))
          e.target.style.animation = '';
      }, true);
    });
  }

  /* ── SCROLL PROGRESS CIRCLE ─────────────────────────────── */
  function initScrollProgressCircle() {
    const circle = document.createElement('div');
    circle.id = 'scroll-progress-circle';
    circle.style.cssText = `
      position: fixed; bottom: 32px; right: 32px;
      width: 44px; height: 44px;
      z-index: 1000;
      cursor: pointer;
      opacity: 0; transform: scale(0.7);
      transition: opacity .3s ease, transform .3s cubic-bezier(.34,1.56,.64,1);
    `;
    circle.innerHTML = `
      <svg width="44" height="44" style="transform:rotate(-90deg)">
        <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(59,47,201,.12)" stroke-width="3"/>
        <circle id="scroll-arc" cx="22" cy="22" r="18" fill="none" stroke="var(--indigo)" stroke-width="3"
          stroke-dasharray="113" stroke-dashoffset="113" stroke-linecap="round"
          style="transition:stroke-dashoffset .1s ease"/>
      </svg>
      <i class="fas fa-arrow-up" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--indigo);font-size:.75rem;"></i>
    `;
    document.body.appendChild(circle);

    const arc = document.getElementById('scroll-arc');
    window.addEventListener('scroll', () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (arc) arc.style.strokeDashoffset = 113 - (113 * progress);
      if (window.scrollY > 200) {
        circle.style.opacity = '1'; circle.style.transform = 'scale(1)';
      } else {
        circle.style.opacity = '0'; circle.style.transform = 'scale(0.7)';
      }
    }, { passive: true });

    circle.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── STAT COUNTER REVEAL ─────────────────────────────────── */
  function initStatReveal() {
    const stats = document.querySelectorAll('.parallax-banner-stat .n');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const text = el.textContent;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.]/g, '');
        if (!num) return;
        let start = 0, startTime = null;
        const duration = 1200;
        function step(ts) {
          if (!startTime) startTime = ts;
          const prog = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - prog, 3);
          el.textContent = (eased * num < 10 ? (eased * num).toFixed(1) : Math.round(eased * num)) + suffix;
          if (prog < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    stats.forEach(s => observer.observe(s));
  }

  /* ── HERO SEARCH BAR ANIMATE IN ─────────────────────────── */
  function animateHeroIn() {
    const items = [
      document.querySelector('.search-hero h1'),
      document.querySelector('.search-hero > .container > p'),
      document.querySelector('.search-bar'),
      document.querySelector('.hero-tags'),
      document.querySelector('.hero-social-proof'),
    ].filter(Boolean);
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity .7s ease ${i * 0.12}s, transform .7s cubic-bezier(.34,1.56,.64,1) ${i * 0.12}s`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.opacity = '';
        el.style.transform = '';
      }));
    });
  }

  /* ── FORM FIELD FOCUS GLOW ───────────────────────────────── */
  function initFormGlows() {
    document.querySelectorAll('.auth-input, .form-field input, .form-field select, .form-field textarea').forEach(el => {
      el.addEventListener('focus', () => {
        el.parentElement.style.position = 'relative';
      });
    });
  }

  /* ── INIT ALL ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initTiltCards();
    initMagneticButtons();
    initCascadeReveal();
    initTitleUnderlines();
    wrapHeroWords();
    initSmartCounters();
    initHeroParallax();
    initSearchTypingEffect();
    initChipRipples();
    initJobLogoFloat();
    initScrollProgressCircle();
    initStatReveal();
    animateHeroIn();
    initFormGlows();
  });

  // Re-init tilt on dynamic content updates
  const originalRenderJobCards = window.renderJobCards;
  if (typeof originalRenderJobCards === 'function') {
    window.renderJobCards = function(...args) {
      originalRenderJobCards.apply(this, args);
      setTimeout(() => { initTiltCards(); initJobLogoFloat(); }, 100);
    };
  }

})();
