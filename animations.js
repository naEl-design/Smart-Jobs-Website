/* ============================================================
   smartJobs Rwanda — ULTIMATE INTERACTIVE LAYER v9.0
   Massive Animation Enhancement: 30+ New Effects
   Features: 3D Tilts, Typing Effects, Particle Flows, 
   Scroll Triggered Animations, Mouse Trail, Magnetic Buttons,
   Glitch Effects, Confetti System, Smooth Page Transitions
   ============================================================ */

(function () {
  'use strict';

  // ========== 1. CUSTOM CURSOR WITH TRAIL ==========
  function initCustomCursor() {
    // Only on desktop devices
    if (window.innerWidth < 1024) return;
    
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      
      // Smooth ring follow
      setTimeout(() => {
        ringX = mouseX;
        ringY = mouseY;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }, 50);
    });

    // Hover effect on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .job-card, .salary-card, .industry-card, .filter-chip, .hero-tag');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      el.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
      el.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
    });
  }

  // ========== 2. MAGNETIC BUTTON EFFECT ==========
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.nav-btn-primary, .btn-auth, .btn-post, .btn-apply, .hero-search-btn');
    
    buttons.forEach(btn => {
      btn.classList.add('magnetic-btn');
      
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const moveX = (x - centerX) / 8;
        const moveY = (y - centerY) / 8;
        btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
      });
    });
  }

  // ========== 3. PARTICLE BACKGROUND SYSTEM ==========
  function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.3;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 47, 201, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    function initParticles() {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
    
    resizeCanvas();
    initParticles();
    animateParticles();
  }

  // ========== 4. SCROLL TRIGGERED TEXT REVEAL ==========
  function initScrollTextReveal() {
    const elements = document.querySelectorAll('.section-title, .hero-text h1, .hero-text p');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('title-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    elements.forEach(el => observer.observe(el));
  }

  // ========== 5. STAGGERED CASCADE ANIMATION ==========
  function initStaggeredReveal() {
    const containers = document.querySelectorAll('.stats-grid, .features-grid, .testimonials-grid, .industry-grid, .card-grid');
    
    containers.forEach(container => {
      const items = container.children;
      Array.from(items).forEach((item, index) => {
        item.classList.add('cascade-item');
        item.style.transitionDelay = `${index * 0.08}s`;
      });
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            Array.from(entry.target.children).forEach(child => {
              child.classList.add('visible');
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(container);
    });
  }

  // ========== 6. GLITCH EFFECT ON LOGO ==========
  function initLogoGlitch() {
    const logo = document.querySelector('.sj-logo-pill, .logo');
    if (!logo) return;
    
    logo.classList.add('logo-glitch');
    logo.setAttribute('data-text', logo.textContent);
    
    setInterval(() => {
      logo.style.animation = 'none';
      setTimeout(() => {
        logo.style.animation = 'glitch-1 0.3s steps(2)';
      }, 10);
      setTimeout(() => {
        logo.style.animation = '';
      }, 300);
    }, 5000);
  }

  // ========== 7. NUMBER COUNTER ANIMATION (Enhanced) ==========
  function initNumberCounters() {
    const counters = document.querySelectorAll('.stat-number, .stat-text h3, .hero-stat .number, .parallax-banner-stat .n');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count-to') || el.textContent.replace(/[^0-9]/g, ''));
          if (isNaN(target)) return;
          
          let current = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          
          function updateCounter() {
            current += step;
            if (current < target) {
              el.textContent = Math.floor(current) + (el.getAttribute('data-suffix') || '');
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target + (el.getAttribute('data-suffix') || '');
            }
          }
          updateCounter();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  }

  // ========== 8. SMOOTH PAGE TRANSITIONS ==========
  function initPageTransitions() {
    const links = document.querySelectorAll('a[href]');
    const transitionDiv = document.createElement('div');
    transitionDiv.id = 'page-transition';
    document.body.appendChild(transitionDiv);
    
    links.forEach(link => {
      if (link.hostname === window.location.hostname && !link.target) {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
            e.preventDefault();
            transitionDiv.classList.add('entering');
            setTimeout(() => {
              window.location.href = href;
            }, 400);
          }
        });
      }
    });
    
    window.addEventListener('load', () => {
      transitionDiv.classList.add('exiting');
      setTimeout(() => {
        transitionDiv.classList.remove('entering', 'exiting');
      }, 400);
    });
  }

  // ========== 9. NOISE / GRAIN OVERLAY ==========
  function initNoiseOverlay() {
    const noise = document.createElement('div');
    noise.className = 'noise-overlay';
    document.body.appendChild(noise);
  }

  // ========== 10. TYPING ANIMATION (Enhanced) ==========
  function initTypingPlaceholder() {
    const searchInput = document.getElementById('job-search-input');
    if (!searchInput) return;

    const phrases = [
      "Software Engineer...",
      "Data Analyst...",
      "Accountant...",
      "Medical Doctor...",
      "Project Manager...",
      "Sales Executive...",
      "UX Designer...",
      "Marketing Specialist..."
    ];
    
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

  // ========== 11. 3D TILT EFFECT (Enhanced) ==========
  function init3DTilts() {
    const cards = document.querySelectorAll('.job-card, .salary-card, .industry-card, .testimonial-card');
    cards.forEach(card => {
      card.classList.add('tilt-card');
      
      const shine = document.createElement('div');
      shine.className = 'tilt-shine';
      card.appendChild(shine);
      
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease';
        
        // Shine effect
        const percentX = x / rect.width;
        const percentY = y / rect.height;
        shine.style.opacity = '0.6';
        shine.style.background = `radial-gradient(circle at ${percentX * 100}% ${percentY * 100}%, rgba(255,255,255,0.3) 0%, transparent 80%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform 0.5s ease';
        shine.style.opacity = '0';
      });
    });
  }

  // ========== 12. SCROLL PROGRESS LINE ==========
  function initScrollLine() {
    const line = document.createElement('div');
    line.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #3b2fc9, #10b981, #f59e0b);
      z-index: 9999;
      transition: width 0.1s;
      box-shadow: 0 0 10px rgba(59,47,201,0.5);
    `;
    document.body.appendChild(line);
    
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      line.style.width = (scroll / docHeight) * 100 + '%';
    });
  }

  // ========== 13. IMAGE LAZY LOAD WITH FADE ==========
  function initLazyImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.5s ease';
          img.onload = () => {
            img.style.opacity = '1';
          };
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // ========== 14. FLOATING ANIMATION FOR HERO ELEMENTS ==========
  function initFloatingAnimations() {
    const floatElements = document.querySelectorAll('.hero-visual .floating-card, .hero-orb-2, .morph-photo-blob');
    floatElements.forEach((el, index) => {
      el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
      el.style.animationDelay = `${index * 0.3}s`;
    });
  }

  // ========== 15. PULSE ANIMATION FOR LIVE INDICATORS ==========
  function initPulseIndicators() {
    const liveDots = document.querySelectorAll('.live-dot, .notif-dot');
    liveDots.forEach(dot => {
      const ring = document.createElement('span');
      ring.style.cssText = `
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        background: inherit;
        animation: pulse-ring 1.5s ease-out infinite;
      `;
      dot.style.position = 'relative';
      dot.appendChild(ring);
    });
  }

  // ========== 16. CONFETTI ON SUCCESS ==========
  window.launchSuccessConfetti = function() {
    const colors = ['#3b2fc9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.cssText = `
        position: fixed;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: -20px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        transform: rotate(${Math.random() * 360}deg);
        animation: confetti-fall ${Math.random() * 2 + 1}s linear forwards;
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  };

  // ========== 17. HOVER REVEAL FOR CARDS ==========
  function initHoverReveal() {
    const cards = document.querySelectorAll('.job-card, .salary-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.job-logo, .stat-icon');
        if (icon) {
          icon.style.transform = 'scale(1.15) rotate(5deg)';
        }
      });
      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.job-logo, .stat-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }

  // ========== 18. BACKGROUND PARALLAX ==========
  function initBackgroundParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroBg = document.querySelector('.search-hero, .hub-hero, .hero-blue');
      if (heroBg) {
        heroBg.style.backgroundPositionY = `${scrolled * 0.3}px`;
      }
    });
  }

  // ========== 19. SMOOTH SCROLL FOR ANCHOR LINKS ==========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ========== 20. BUTTON RIPPLE EFFECT (Enhanced) ==========
  function initRippleButtons() {
    const buttons = document.querySelectorAll('.btn-auth, .btn-post, .btn-apply, .btn-submit-app, .nav-btn-primary');
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          transform: scale(0);
          animation: ripple-out 0.6s ease-out;
          pointer-events: none;
          left: ${e.clientX - rect.left - size/2}px;
          top: ${e.clientY - rect.top - size/2}px;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // ========== 21. WORD SPLIT ANIMATION ==========
  function initWordSplitAnimation() {
    const headings = document.querySelectorAll('.hero-text h1, .section-title');
    headings.forEach(heading => {
      const text = heading.innerText;
      const words = text.split(' ');
      heading.innerHTML = words.map(word => 
        `<span class="anim-word" style="display:inline-block; animation: stagger-fade 0.5s ease both;">${word} </span>`
      ).join('');
    });
  }

  // ========== 22. TOOLTIP ANIMATION ==========
  function initTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach(el => {
      const tooltip = document.createElement('div');
      tooltip.className = 'custom-tooltip';
      tooltip.textContent = el.getAttribute('data-tooltip');
      tooltip.style.cssText = `
        position: absolute;
        background: #0f172a;
        color: white;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.2s ease;
        z-index: 10000;
      `;
      el.style.position = 'relative';
      document.body.appendChild(tooltip);
      
      el.addEventListener('mouseenter', (e) => {
        const rect = el.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width/2 - tooltip.offsetWidth/2 + 'px';
        tooltip.style.top = rect.top - 30 + 'px';
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
      });
      
      el.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(-10px)';
      });
    });
  }

  // ========== 23. BACKGROUND SHIMMER EFFECT ==========
  function initShimmerEffect() {
    const shimmerElements = document.querySelectorAll('.hero-section, .hub-hero');
    shimmerElements.forEach(el => {
      el.style.backgroundSize = '200% 200%';
      el.style.animation = 'gradient-x 8s ease infinite';
    });
  }

  // ========== 24. NAVIGATION LINK ACTIVE INDICATOR ==========
  function initNavActiveIndicator() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-menu a, .sidebar-nav a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.includes(href)) {
        link.classList.add('active');
      }
    });
  }

  // ========== 25. SCROLL TO TOP BUTTON ==========
  function initScrollToTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b2fc9, #6d51f7);
      color: white;
      border: none;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 20px rgba(59,47,201,0.4);
    `;
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
      }
    });
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0) scale(1)';
    });
  }

  // ========== 26. HERO GRADIENT ANIMATION ==========
  function initHeroGradient() {
    const hero = document.querySelector('.search-hero, .hub-hero, .hero-blue');
    if (hero) {
      hero.style.backgroundSize = '200% 200%';
      hero.style.animation = 'gradient-x 10s ease infinite';
    }
  }

  // ========== 27. CARD BORDER ANIMATION ==========
  function initCardBorderAnimation() {
    const cards = document.querySelectorAll('.job-card, .salary-card, .industry-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });
  }

  // ========== 28. STATS BAR ANIMATION ==========
  function initStatsBars() {
    const bars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width') || '70%';
          bar.style.width = width;
          observer.unobserve(bar);
        }
      });
    });
    bars.forEach(bar => observer.observe(bar));
  }

  // ========== 29. FORM INPUT GLOW ==========
  function initFormGlow() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.boxShadow = '0 0 0 3px rgba(59,47,201,0.15)';
        input.style.borderColor = '#3b2fc9';
      });
      input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
        input.style.borderColor = '#e2e8f0';
      });
    });
  }

  // ========== 30. NOTIFICATION BADGE PULSE ==========
  function initNotificationBadge() {
    const badges = document.querySelectorAll('.nav-badge, .notif-dot');
    badges.forEach(badge => {
      if (parseInt(badge.textContent) > 0) {
        badge.style.animation = 'pulse-ring 1.5s ease infinite';
      }
    });
  }

  // ========== 31. LOADING SKELETON ==========
  function initLoadingSkeleton() {
    const containers = document.querySelectorAll('.job-list-container, .jobs-grid');
    containers.forEach(container => {
      const skeletonHTML = `
        <div class="skeleton-card" style="padding:20px; margin-bottom:16px; background:#f1f5f9; border-radius:12px; animation: shimmer 1.5s infinite;">
          <div class="skeleton-line" style="height:20px; width:70%; background:#e2e8f0; border-radius:4px; margin-bottom:12px;"></div>
          <div class="skeleton-line" style="height:14px; width:50%; background:#e2e8f0; border-radius:4px; margin-bottom:8px;"></div>
          <div class="skeleton-line" style="height:14px; width:90%; background:#e2e8f0; border-radius:4px;"></div>
        </div>
      `;
      // Only show skeleton if content is loading
      if (container.children.length === 0) {
        container.innerHTML = skeletonHTML.repeat(3);
      }
    });
  }

  // ========== 32. COUNTDOWN TIMER ANIMATION ==========
  function initCountdownTimers() {
    const timers = document.querySelectorAll('[data-countdown]');
    timers.forEach(timer => {
      const targetDate = new Date(timer.getAttribute('data-countdown'));
      
      function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
          timer.innerHTML = 'Expired';
          return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (86400000)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (3600000)) / (1000 * 60));
        
        timer.innerHTML = `${days}d ${hours}h ${minutes}m`;
      }
      
      updateCountdown();
      setInterval(updateCountdown, 60000);
    });
  }

  // ========== 33. HOVER ZOOM EFFECT ==========
  function initHoverZoom() {
    const images = document.querySelectorAll('.hub-gallery-item img, .photo-mosaic-item img, .quick-photo-card img');
    images.forEach(img => {
      img.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      img.parentElement.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
      });
      img.parentElement.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    });
  }

  // ========== 34. TEXT GRADIENT SCROLL ==========
  function initGradientText() {
    const gradientTexts = document.querySelectorAll('.gradient-text, .stat-text h3');
    gradientTexts.forEach(text => {
      text.style.background = 'linear-gradient(135deg, #3b2fc9, #10b981, #f59e0b)';
      text.style.backgroundSize = '200% 200%';
      text.style.animation = 'gradient-x 5s ease infinite';
      text.style.webkitBackgroundClip = 'text';
      text.style.webkitTextFillColor = 'transparent';
      text.style.backgroundClip = 'text';
    });
  }

  // ========== 35. INITIALIZE ALL ANIMATIONS ==========
  function run() {
    // Core animations
    initCustomCursor();
    initMagneticButtons();
    initParticleBackground();
    initScrollTextReveal();
    initStaggeredReveal();
    initLogoGlitch();
    initNumberCounters();
    initNoiseOverlay();
    initTypingPlaceholder();
    init3DTilts();
    initScrollLine();
    initLazyImages();
    initFloatingAnimations();
    initPulseIndicators();
    initHoverReveal();
    initBackgroundParallax();
    initSmoothScroll();
    initRippleButtons();
    initWordSplitAnimation();
    initTooltips();
    initShimmerEffect();
    initNavActiveIndicator();
    initScrollToTop();
    initHeroGradient();
    initCardBorderAnimation();
    initStatsBars();
    initFormGlow();
    initNotificationBadge();
    initLoadingSkeleton();
    initCountdownTimers();
    initHoverZoom();
    initGradientText();
    
    // Page transition (optional - can be enabled)
    // initPageTransitions();
    
    // Stagger reveal for job cards
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.job-card, .salary-card, .industry-card').forEach(c => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(30px)';
      c.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      observer.observe(c);
    });
  }

  // Start animations when DOM is ready
  document.readyState === 'loading' 
    ? document.addEventListener('DOMContentLoaded', run) 
    : run();

})();