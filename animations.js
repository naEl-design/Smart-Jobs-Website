/* ============================================================
   smartJobs Rwanda — Premium Animation Library v5.0
   High-Impact Animations: 3D transforms, advanced particles,
   morphing shapes, scroll-triggered explosions, dynamic cursors,
   immersive parallax, and cinematic effects
   ============================================================ */

(function() {
  'use strict';

  // ========== CONFIGURATION ==========
  const CONFIG = {
    particles: {
      count: 120,
      connectionDistance: 150,
      mouseRadius: 200,
      colors: ['#3b2fc9', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
    },
    animations: {
      staggerDelay: 0.08,
      duration: 0.6
    }
  };

  // ========== UTILITIES ==========
  const utils = {
    random: (min, max) => Math.random() * (max - min) + min,
    clamp: (value, min, max) => Math.min(max, Math.max(min, value)),
    lerp: (start, end, amount) => start + (end - start) * amount,
    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };

  // ========== PAGE TRANSITION (Cinematic) ==========
  function initCinematicTransitions() {
    const overlay = document.createElement('div');
    overlay.id = 'cinematic-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0f0a3a, #1a0f6e, #3b2fc9);
      z-index: 99999;
      transform: scaleY(0);
      transform-origin: top;
      transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
      pointer-events: none;
    `;
    document.body.appendChild(overlay);

    // Add secondary wipe
    const wipe = document.createElement('div');
    wipe.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(59,47,201,0.95);
      z-index: 99998;
      transform: translateX(-100%);
      transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1) 0.1s;
      pointer-events: none;
    `;
    document.body.appendChild(wipe);

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
      
      e.preventDefault();
      overlay.style.transform = 'scaleY(1)';
      wipe.style.transform = 'translateX(0)';
      
      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });

    window.addEventListener('pageshow', () => {
      overlay.style.transform = 'scaleY(0)';
      wipe.style.transform = 'translateX(-100%)';
    });
  }

  // ========== ADVANCED CUSTOM CURSOR ==========
  function initAdvancedCursor() {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    
    // Create multiple cursor layers
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    const cursorTrail = document.createElement('div');
    const cursorGlow = document.createElement('div');
    
    const cursorStyle = {
      dot: `
        position: fixed;
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s;
        box-shadow: 0 0 10px rgba(59,47,201,0.8);
      `,
      ring: `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(59,47,201,0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99998;
        transform: translate(-50%, -50%);
        transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
        backdrop-filter: blur(2px);
      `,
      trail: `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(16,185,129,0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99997;
        transform: translate(-50%, -50%);
        filter: blur(2px);
      `,
      glow: `
        position: fixed;
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, rgba(59,47,201,0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99996;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
      `
    };
    
    cursorDot.style.cssText = cursorStyle.dot;
    cursorRing.style.cssText = cursorStyle.ring;
    cursorTrail.style.cssText = cursorStyle.trail;
    cursorGlow.style.cssText = cursorStyle.glow;
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
    document.body.appendChild(cursorTrail);
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let trailPositions = [];
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      cursorGlow.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      
      // Trail effect
      trailPositions.unshift({ x: mouseX, y: mouseY });
      if (trailPositions.length > 10) trailPositions.pop();
      
      updateTrail();
    });
    
    function updateTrail() {
      cursorTrail.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }
    
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();
    
    // Hover effects on interactive elements
    const hoverElements = 'a, button, .job-card, .salary-card, .industry-card, .filter-chip, .hero-tag, input, select, textarea, .btn-apply, .btn-auth';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverElements)) {
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
        cursorDot.style.background = '#10b981';
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.borderColor = 'rgba(16,185,129,0.8)';
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1.2)`;
        cursorGlow.style.width = '120px';
        cursorGlow.style.height = '120px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)';
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverElements)) {
        cursorDot.style.width = '6px';
        cursorDot.style.height = '6px';
        cursorDot.style.background = 'white';
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'rgba(59,47,201,0.6)';
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1)`;
        cursorGlow.style.width = '80px';
        cursorGlow.style.height = '80px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(59,47,201,0.15) 0%, transparent 70%)';
      }
    });
    
    document.addEventListener('mousedown', () => {
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(0.5)`;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(0.8)`;
    });
    
    document.addEventListener('mouseup', () => {
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1)`;
    });
    
    document.body.style.cursor = 'none';
  }

  // ========== 3D PARTICLE FIELD ==========
  function init3DParticleField() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-field-3d';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouseX = 0, mouseY = 0;
    let time = 0;
    
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    
    class Particle3D {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 200;
        this.size = utils.random(1, 3);
        this.speedX = utils.random(-0.5, 0.5);
        this.speedY = utils.random(-0.5, 0.5);
        this.speedZ = utils.random(0.5, 1.5);
        this.color = CONFIG.particles.colors[Math.floor(Math.random() * CONFIG.particles.colors.length)];
        this.alpha = utils.random(0.2, 0.7);
        this.waveOffset = Math.random() * Math.PI * 2;
      }
      
      update() {
        // 3D movement with wave motion
        this.x += this.speedX + Math.sin(time * 0.002 + this.waveOffset) * 0.3;
        this.y += this.speedY + Math.cos(time * 0.003 + this.waveOffset) * 0.3;
        this.z -= this.speedZ;
        
        // Mouse attraction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - dist) / 150 * 2;
          this.x += Math.cos(angle) * force;
          this.y += Math.sin(angle) * force;
        }
        
        // Wrap around
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;
        if (this.z < 0) this.z = 200;
        if (this.z > 200) this.z = 0;
      }
      
      draw() {
        const scale = 1 - (this.z / 200) * 0.5;
        const size = this.size * scale;
        const alpha = this.alpha * (1 - this.z / 200);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
    }
    
    function initParticles() {
      particles = [];
      for (let i = 0; i < CONFIG.particles.count; i++) {
        particles.push(new Particle3D());
      }
    }
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.shadowBlur = 0;
      
      time++;
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONFIG.particles.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 0.08 * (1 - dist / CONFIG.particles.connectionDistance);
            ctx.strokeStyle = `rgba(59,47,201, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });
    
    resize();
    initParticles();
    animate();
  }

  // ========== MORPHING BACKGROUND ==========
  function initMorphingBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'morphing-bg';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.15;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;
    
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    
    function drawMorphingBlobs() {
      ctx.clearRect(0, 0, width, height);
      
      // Blob 1
      ctx.beginPath();
      const x1 = width * (0.5 + Math.sin(time * 0.0005) * 0.1);
      const y1 = height * (0.3 + Math.cos(time * 0.0007) * 0.1);
      const radius1 = 200 + Math.sin(time * 0.001) * 50;
      ctx.ellipse(x1, y1, radius1, radius1 * (1 + Math.sin(time * 0.0008) * 0.2), 0, 0, Math.PI * 2);
      ctx.fillStyle = '#3b2fc9';
      ctx.fill();
      
      // Blob 2
      ctx.beginPath();
      const x2 = width * (0.7 + Math.cos(time * 0.0006) * 0.15);
      const y2 = height * (0.6 + Math.sin(time * 0.0004) * 0.15);
      const radius2 = 180 + Math.cos(time * 0.0012) * 60;
      ctx.ellipse(x2, y2, radius2, radius2 * (1 + Math.cos(time * 0.0009) * 0.25), 0, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      
      // Blob 3
      ctx.beginPath();
      const x3 = width * (0.3 + Math.sin(time * 0.0009) * 0.12);
      const y3 = height * (0.7 + Math.cos(time * 0.0005) * 0.12);
      const radius3 = 150 + Math.sin(time * 0.0015) * 40;
      ctx.ellipse(x3, y3, radius3, radius3 * (1 + Math.sin(time * 0.0011) * 0.3), 0, 0, Math.PI * 2);
      ctx.fillStyle = '#8b5cf6';
      ctx.fill();
      
      requestAnimationFrame(drawMorphingBlobs);
    }
    
    window.addEventListener('resize', resize);
    resize();
    drawMorphingBlobs();
  }

  // ========== 3D TILT CARDS ==========
  function init3DTiltCards() {
    const cards = document.querySelectorAll('.job-card, .salary-card, .industry-card, .testimonial-card');
    
    cards.forEach(card => {
      let bounds = card.getBoundingClientRect();
      
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        const rotateZ = ((x - centerX) / centerX) * 2;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateY(-8px)`;
        
        // Add shine effect
        const shine = card.querySelector('.card-shine') || (() => {
          const s = document.createElement('div');
          s.className = 'card-shine';
          s.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
          `;
          card.style.position = 'relative';
          card.style.overflow = 'hidden';
          card.appendChild(s);
          return s;
        })();
        
        const shineX = (x / rect.width) * 100;
        const shineY = (y / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
        shine.style.opacity = '1';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        const shine = card.querySelector('.card-shine');
        if (shine) shine.style.opacity = '0';
      });
      
      window.addEventListener('resize', () => {
        bounds = card.getBoundingClientRect();
      });
    });
  }

  // ========== MAGNETIC BUTTONS ==========
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.nav-btn-primary, .btn-auth, .btn-post, .search-btn, .hero-search-btn, .btn-apply');
    
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const moveX = (x - centerX) * 0.4;
        const moveY = (y - centerY) * 0.4;
        
        btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.08)`;
        btn.style.transition = 'transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
      
      // Ripple effect
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.6);
          width: 20px;
          height: 20px;
          left: ${e.clientX - rect.left - 10}px;
          top: ${e.clientY - rect.top - 10}px;
          animation: rippleExpand 0.8s ease-out;
          pointer-events: none;
        `;
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
      });
    });
    
    // Add keyframes for ripple
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleExpand {
        0% {
          transform: scale(0);
          opacity: 0.8;
        }
        100% {
          transform: scale(30);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== SCROLL REVEAL WITH PARALLAX ==========
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.job-card, .salary-card, .industry-card, .testimonial-card, .trusted-logo-item, .footer-col, .stat-card, .hub-gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = index * 0.05;
          entry.target.style.animation = `revealUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });
    
    revealElements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
    
    // Add keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes revealUp {
        from {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== EXPLODING COUNTERS ==========
  function initExplodingCounters() {
    const counters = document.querySelectorAll('.stat-number, .parallax-banner-stat .n, .trusted-stat .stat-number, [data-count]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count') || el.textContent.replace(/[^0-9]/g, ''));
          if (isNaN(target)) return;
          
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          
          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(easeOutCubic * target);
            el.textContent = value.toLocaleString() + (el.getAttribute('data-suffix') || '');
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              // Add celebration effect
              el.style.animation = 'counterPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
              setTimeout(() => {
                el.style.animation = '';
              }, 500);
            }
          }
          
          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    // Add keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes counterPop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); color: #10b981; }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== TYPING TEXT WITH CURSOR ==========
  function initAdvancedTypingEffect() {
    const input = document.getElementById('job-search-input');
    if (!input) return;
    
    const phrases = [
      'Software Engineer...',
      'Data Analyst...',
      'Medical Doctor...',
      'Accountant...',
      'Marketing Manager...',
      'Project Manager...',
      'Sales Executive...'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isTypingPaused = false;
    
    function type() {
      if (isTypingPaused) {
        setTimeout(type, 100);
        return;
      }
      
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        input.placeholder = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          isTypingPaused = true;
          setTimeout(() => { isTypingPaused = false; type(); }, 500);
          return;
        }
      } else {
        input.placeholder = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          isTypingPaused = true;
          setTimeout(() => { isTypingPaused = false; type(); }, 2000);
          return;
        }
      }
      
      setTimeout(type, isDeleting ? 40 : 80);
    }
    
    setTimeout(type, 500);
    
    // Add animated cursor to input
    input.style.borderImage = 'none';
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
      #job-search-input::placeholder {
        color: #94a3b8;
        font-weight: 500;
      }
    `;
    document.head.appendChild(cursorStyle);
  }

  // ========== CINEMATIC PARALLAX ==========
  function initCinematicParallax() {
    const parallaxElements = document.querySelectorAll('.hero-photo-bg, .parallax-banner-img, .hub-hero-photo, .search-hero');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      
      parallaxElements.forEach(el => {
        const speed = el.classList.contains('search-hero') ? 0.2 : 0.3;
        const yOffset = scrolled * speed;
        el.style.transform = `translateY(${yOffset}px) scale(1.05)`;
      });
    });
  }

  // ========== CONFETTI EXPLOSION ==========
  function burstConfettiIntense(x, y) {
    const colors = ['#3b2fc9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
      const confetti = document.createElement('div');
      const size = utils.random(6, 14);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = utils.random(0, Math.PI * 2);
      const velocity = utils.random(5, 20);
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 8;
      const rotation = utils.random(0, 360);
      const rotationSpeed = utils.random(-10, 10);
      
      confetti.style.cssText = `
        position: fixed;
        left: ${x || window.innerWidth / 2}px;
        top: ${y || window.innerHeight / 2}px;
        width: ${size}px;
        height: ${size * 0.6}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 10000;
        opacity: 1;
      `;
      document.body.appendChild(confetti);
      
      let posX = x || window.innerWidth / 2;
      let posY = y || window.innerHeight / 2;
      let rot = rotation;
      let opacity = 1;
      
      function animateConfetti() {
        posX += vx;
        posY += vy;
        rot += rotationSpeed;
        opacity -= 0.008;
        
        confetti.style.transform = `translate(${posX}px, ${posY}px) rotate(${rot}deg)`;
        confetti.style.opacity = opacity;
        
        if (opacity > 0 && posY < window.innerHeight + 100) {
          requestAnimationFrame(animateConfetti);
        } else {
          confetti.remove();
        }
      }
      
      requestAnimationFrame(animateConfetti);
    }
  }
  
  window.burstConfetti = burstConfettiIntense;

  // ========== TEXT GLITCH EFFECT ==========
  function initTextGlitch() {
    const glitchElements = document.querySelectorAll('.logo, h1, .section-title');
    
    glitchElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        const originalText = el.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let iterations = 0;
        
        const interval = setInterval(() => {
          el.textContent = originalText.split('').map((char, index) => {
            if (index < iterations) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('');
          
          iterations += 1 / 3;
          if (iterations >= originalText.length) {
            clearInterval(interval);
            el.textContent = originalText;
          }
        }, 30);
      });
    });
  }

  // ========== FLOATING PARTICLES AROUND CARDS ==========
  function initFloatingParticles() {
    const cards = document.querySelectorAll('.job-card, .salary-card, .industry-card');
    
    cards.forEach(card => {
      const particleContainer = document.createElement('div');
      particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        border-radius: inherit;
      `;
      card.style.position = 'relative';
      card.appendChild(particleContainer);
      
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const size = utils.random(2, 5);
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: rgba(59,47,201,0.3);
          border-radius: 50%;
          left: ${utils.random(0, 100)}%;
          top: ${utils.random(0, 100)}%;
          animation: floatParticle ${utils.random(4, 8)}s ease-in-out infinite;
          animation-delay: ${utils.random(0, 5)}s;
        `;
        particleContainer.appendChild(particle);
      }
    });
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatParticle {
        0%, 100% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        25% {
          transform: translateY(-20px) translateX(-10px);
          opacity: 0.5;
        }
        50% {
          transform: translateY(-10px) translateX(10px);
          opacity: 0.3;
        }
        75% {
          transform: translateY(10px) translateX(-5px);
          opacity: 0.4;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== BUTTON RIPPLE ON CLICK ==========
  function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn-apply, .btn-auth, .filter-chip, .hero-tag, .search-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
          left: ${e.clientX - rect.left - size / 2}px;
          top: ${e.clientY - rect.top - size / 2}px;
          animation: rippleWave 0.6s ease-out;
          pointer-events: none;
          transform: scale(0);
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleWave {
        0% {
          transform: scale(0);
          opacity: 0.8;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== SCROLL PROGRESS WITH 3D EFFECT ==========
  function init3DScrollProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(59,47,201,0.1);
      z-index: 10001;
    `;
    
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #3b2fc9, #10b981, #f59e0b);
      transition: width 0.1s ease;
      box-shadow: 0 0 10px rgba(59,47,201,0.5);
    `;
    
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
      
      // Change color based on scroll position
      if (scrolled < 33) {
        progressBar.style.background = 'linear-gradient(90deg, #3b2fc9, #8b5cf6)';
      } else if (scrolled < 66) {
        progressBar.style.background = 'linear-gradient(90deg, #8b5cf6, #10b981)';
      } else {
        progressBar.style.background = 'linear-gradient(90deg, #10b981, #f59e0b)';
      }
    });
  }

  // ========== IMAGE ZOOM WITH OVERLAY ==========
  function initImageZoom() {
    const images = document.querySelectorAll('.hub-gallery-item img, .mosaic-cell img, .careers-photo-grid img, .testimonial-photo');
    
    images.forEach(img => {
      img.style.cursor = 'pointer';
      img.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s';
      
      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
        img.style.filter = 'brightness(1.05) contrast(1.1)';
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        img.style.filter = 'brightness(1) contrast(1)';
      });
      
      // Click to fullscreen zoom
      img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          z-index: 10002;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: fadeIn 0.3s ease;
        `;
        
        const clonedImg = img.cloneNode();
        clonedImg.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          border-radius: 12px;
          animation: zoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        
        overlay.appendChild(clonedImg);
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
          overlay.style.animation = 'fadeOut 0.3s ease';
          setTimeout(() => overlay.remove(), 300);
        });
      });
    });
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      @keyframes zoomIn {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== SMOOTH SCROLL TO TOP ==========
  function initSmoothScrollToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.id = 'scroll-top-btn';
    btn.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b2fc9, #6d51f7);
      color: white;
      border: none;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 999;
      box-shadow: 0 4px 20px rgba(59,47,201,0.4);
      font-size: 1.2rem;
    `;
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
        btn.style.transform = 'translateY(0) scale(1)';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
        btn.style.transform = 'translateY(20px) scale(0.8)';
      }
    });
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        animation: rippleOut 0.6s ease-out;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleOut {
        0% {
          transform: scale(0);
          opacity: 0.8;
        }
        100% {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== PRELOADER ==========
  function initPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0f0a3a, #1a0f6e);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.6s ease, visibility 0.6s ease;
    `;
    
    preloader.innerHTML = `
      <div class="preloader-content">
        <div class="preloader-logo">smart<span>Jobs</span></div>
        <div class="preloader-spinner"></div>
        <div class="preloader-text">Loading amazing opportunities...</div>
      </div>
    `;
    
    document.body.appendChild(preloader);
    
    const style = document.createElement('style');
    style.textContent = `
      .preloader-content {
        text-align: center;
      }
      .preloader-logo {
        font-family: 'Sora', sans-serif;
        font-size: 2.5rem;
        font-weight: 800;
        color: white;
        margin-bottom: 20px;
        animation: pulse 1.5s ease-in-out infinite;
      }
      .preloader-logo span {
        color: #10b981;
      }
      .preloader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,0.2);
        border-top-color: #10b981;
        border-radius: 50%;
        margin: 0 auto 20px;
        animation: spin 0.8s linear infinite;
      }
      .preloader-text {
        color: rgba(255,255,255,0.7);
        font-size: 0.9rem;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => preloader.remove(), 600);
      }, 800);
    });
  }

  // ========== INITIALIZE ALL ==========
  function initAllAnimations() {
    initPreloader();
    initCinematicTransitions();
    initAdvancedCursor();
    init3DParticleField();
    initMorphingBackground();
    init3DTiltCards();
    initMagneticButtons();
    initScrollReveal();
    initExplodingCounters();
    initAdvancedTypingEffect();
    initCinematicParallax();
    initTextGlitch();
    initFloatingParticles();
    initButtonRipples();
    init3DScrollProgress();
    initImageZoom();
    initSmoothScrollToTop();
    
    // Trigger confetti on job application
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn-apply, .btn-submit-app')) {
        setTimeout(() => {
          burstConfettiIntense();
        }, 100);
      }
    });
  }
  
  // Start when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
  } else {
    initAllAnimations();
  }
})();