/* ============================================================
   smartJobs Rwanda — ULTIMATE INTERACTIVE LAYER v8.0
   Optimized: 3D Tilts, Typing Effects, and Particle Flows.
   ============================================================ */

(function () {
  'use strict';

  // ── 1. 3D TILT EFFECT ───────────────────────────────────
  // Makes cards lean toward the cursor for a 3D feel
  function init3DTilts() {
    const cards = document.querySelectorAll('.job-card, .salary-card, .industry-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform 0.5s ease';
      });
    });
  }

  // ── 2. DYNAMIC SEARCH TYPING ─────────────────────────────
  // Animates the placeholder to suggest job titles
  function initTypingPlaceholder() {
    const searchInput = document.getElementById('job-search-input');
    if (!searchInput) return;

    const phrases = ["Software Engineer...", "Agronomist...", "Data Analyst...", "Accountant...", "Healthcare Specialist..."];
    let i = 0, j = 0, current = "", isDeleting = false;

    function type() {
      current = phrases[i];
      searchInput.placeholder = isDeleting 
        ? current.substring(0, j--) 
        : current.substring(0, j++);

      if (!isDeleting && j === current.length + 1) {
        setTimeout(() => isDeleting = true, 2000);
      } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
      }
      setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
  }

  // ── 3. HERO PARTICLES ────────────────────────────────────
  function initParticles() {
    const hero = document.querySelector('.search-hero');
    if (!hero) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.3;';
    hero.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let pts = [];
    const resize = () => { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; };
    window.addEventListener('resize', resize); resize();

    class Pt {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5;
        this.s = Math.random() * 2;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI*2); ctx.fill();
      }
    }
    for(let i=0; i<60; i++) pts.push(new Pt());
    const anim = () => {
      ctx.clearRect(0,0,canvas.width, canvas.height);
      pts.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(anim);
    };
    anim();
  }

  // ── 4. SCROLL PROGRESS LINE ──────────────────────────────
  function initScrollLine() {
    const line = document.createElement('div');
    line.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:#10b981;z-index:9999;transition:width 0.1s;';
    document.body.appendChild(line);
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      line.style.width = (scroll / docHeight) * 100 + '%';
    });
  }

  // ── INITIALIZE ──────────────────────────────────────────
  function run() {
    initParticles();
    init3DTilts();
    initTypingPlaceholder();
    initScrollLine();
    
    // Stagger reveal of job cards
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    });
    document.querySelectorAll('.job-card').forEach(c => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(20px)';
      c.style.transition = 'all 0.6s ease-out';
      observer.observe(c);
    });
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', run) : run();
})();