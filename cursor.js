/* ============================================================
   smartJobs Rwanda — Premium Custom Cursor System
   Version: 3.0
   Works on ALL pages automatically
   Features: Smooth follow, trail effect, particle emitter, hover animations
   ============================================================ */

(function() {
    'use strict';

    // ========== CONFIGURATION ==========
    const config = {
        dotSize: 8,
        ringSize: 42,
        ringHoverSize: 72,
        dotHoverSize: 14,
        trailLength: 10,
        emitterParticles: 8,
        primaryColor: '#3b2fc9',
        secondaryColor: '#10b981',
        accentColor: '#f59e0b',
        ringBorderWidth: 2,
        followSpeed: 0.12,
    };

    // Check if cursor should be enabled (not on mobile)
    function isCursorEnabled() {
        return !window.matchMedia('(max-width: 768px)').matches;
    }

    // ========== CREATE CURSOR ELEMENTS ==========
    function createCursorElements() {
        // Remove existing elements if any
        const existingIds = ['sj-cursor-dot', 'sj-cursor-ring', 'sj-cursor-trail'];
        existingIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });

        // Main cursor dot
        const dot = document.createElement('div');
        dot.id = 'sj-cursor-dot';
        dot.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${config.dotSize}px;
            height: ${config.dotSize}px;
            background: radial-gradient(circle, ${config.primaryColor}, ${config.secondaryColor});
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%);
            transition: width 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), 
                        height 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                        background 0.2s ease;
            will-change: transform;
            box-shadow: 0 0 10px rgba(59,47,201,0.5);
        `;

        // Cursor ring
        const ring = document.createElement('div');
        ring.id = 'sj-cursor-ring';
        ring.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${config.ringSize}px;
            height: ${config.ringSize}px;
            border: ${config.ringBorderWidth}px solid rgba(59,47,201,0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            transform: translate(-50%, -50%);
            transition: width 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                        height 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                        border-color 0.2s ease,
                        background 0.2s ease;
            will-change: transform;
            backdrop-filter: blur(2px);
            box-shadow: 0 0 20px rgba(59,47,201,0.15);
        `;

        // Trail particles container
        const trailContainer = document.createElement('div');
        trailContainer.id = 'sj-cursor-trail';
        trailContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99997;
            overflow: visible;
        `;

        document.body.appendChild(dot);
        document.body.appendChild(ring);
        document.body.appendChild(trailContainer);

        return { dot, ring, trailContainer };
    }

    // ========== TRAIL PARTICLE SYSTEM ==========
    let trailPositions = [];
    let trailElements = [];

    function initTrailSystem(trailContainer, length) {
        trailElements.forEach(el => el.remove());
        trailPositions = [];
        trailElements = [];

        for (let i = 0; i < length; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                background: radial-gradient(circle, ${config.primaryColor}, transparent);
                border-radius: 50%;
                pointer-events: none;
                opacity: ${0.8 - (i / length) * 0.6};
                transform: translate(-50%, -50%);
                transition: opacity 0.1s ease;
                will-change: transform;
            `;
            trailContainer.appendChild(particle);
            trailElements.push(particle);
            trailPositions.push({ x: 0, y: 0 });
        }
    }

    function updateTrail(mouseX, mouseY) {
        for (let i = trailPositions.length - 1; i > 0; i--) {
            trailPositions[i] = { ...trailPositions[i - 1] };
        }
        trailPositions[0] = { x: mouseX, y: mouseY };

        for (let i = 0; i < trailElements.length; i++) {
            const pos = trailPositions[i];
            if (trailElements[i]) {
                trailElements[i].style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
            }
        }
    }

    // ========== PARTICLE EMITTER (on click) ==========
    let activeParticles = [];

    function emitParticles(x, y, count) {
        const container = document.getElementById('sj-cursor-trail');
        if (!container) return;

        const colors = [config.primaryColor, config.secondaryColor, config.accentColor];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 10 + 4;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const size = Math.random() * 7 + 3;
            const life = 120;
            const color = colors[Math.floor(Math.random() * colors.length)];

            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
                pointer-events: none;
                z-index: 99996;
                opacity: 0.9;
                will-change: transform, opacity;
                box-shadow: 0 0 8px ${color};
            `;
            container.appendChild(particle);

            activeParticles.push({
                element: particle,
                x, y,
                vx, vy,
                life,
                maxLife: life,
                size
            });
        }

        function animateParticles() {
            let anyAlive = false;
            for (let i = activeParticles.length - 1; i >= 0; i--) {
                const p = activeParticles[i];
                p.life--;
                if (p.life <= 0) {
                    p.element.remove();
                    activeParticles.splice(i, 1);
                    continue;
                }
                anyAlive = true;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.25;
                p.vx *= 0.98;
                p.vy *= 0.98;
                
                const progress = 1 - (p.life / p.maxLife);
                const opacity = 0.9 * (1 - progress);
                const scale = 1 - progress * 0.6;
                
                p.element.style.transform = `translate(${p.x}px, ${p.y}px) scale(${scale})`;
                p.element.style.opacity = opacity;
            }
            if (anyAlive) {
                requestAnimationFrame(animateParticles);
            }
        }
        requestAnimationFrame(animateParticles);
    }

    // ========== CURSOR MOVEMENT ==========
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafActive = false;

    function initCursorMovement(dot, ring) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            updateTrail(mouseX, mouseY);
            
            if (!rafActive) {
                rafActive = true;
                function animateRing() {
                    ringX += (mouseX - ringX) * config.followSpeed;
                    ringY += (mouseY - ringY) * config.followSpeed;
                    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
                    
                    if (Math.abs(mouseX - ringX) > 0.5 || Math.abs(mouseY - ringY) > 0.5) {
                        requestAnimationFrame(animateRing);
                    } else {
                        rafActive = false;
                    }
                }
                animateRing();
            }
        });
    }

    // ========== HOVER EFFECTS ON INTERACTIVE ELEMENTS ==========
    function setupHoverEffects() {
        const interactiveSelectors = [
            'a', 'button', '.job-card', '.salary-card', '.industry-card', 
            '.filter-chip', '.hero-tag', '.nav-btn-primary', '.btn-apply',
            '.btn-save', '.btn-submit-app', '.btn-auth', '.btn-post',
            '.search-btn', '.hero-search-btn', '.nav-btn-ghost', '.role-tab',
            '.tbl-btn', '.read-more', '.btn-white', '.btn-plan', '.footer-col a',
            '.social-icons i', '.blog-card', '.value-card', '.team-card',
            '.stat-card', '.detail-chip', '.apply-modal-close', '.apply-modal-cta',
            '.quick-photo-card', '.hub-photo-card', '.mosaic-cell', '.hub-gallery-item',
            '.sj-logo-pill', '.logo', '.pricing-card', '.testimonial-card',
            '.job-card', '.job-list .job-card', '[onclick]', '[role="button"]'
        ];
        
        const elements = document.querySelectorAll(interactiveSelectors.join(','));
        const dot = document.getElementById('sj-cursor-dot');
        const ring = document.getElementById('sj-cursor-ring');
        
        if (!dot || !ring) return;
        
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                dot.style.width = `${config.dotHoverSize}px`;
                dot.style.height = `${config.dotHoverSize}px`;
                dot.style.background = `radial-gradient(circle, ${config.secondaryColor}, ${config.primaryColor})`;
                dot.style.boxShadow = `0 0 18px ${config.secondaryColor}`;
                
                ring.style.width = `${config.ringHoverSize}px`;
                ring.style.height = `${config.ringHoverSize}px`;
                ring.style.borderColor = `rgba(16,185,129,0.7)`;
                ring.style.background = `radial-gradient(circle, rgba(16,185,129,0.1), transparent)`;
                ring.style.backdropFilter = 'blur(3px)';
            });
            
            el.addEventListener('mouseleave', () => {
                dot.style.width = `${config.dotSize}px`;
                dot.style.height = `${config.dotSize}px`;
                dot.style.background = `radial-gradient(circle, ${config.primaryColor}, ${config.secondaryColor})`;
                dot.style.boxShadow = `0 0 10px rgba(59,47,201,0.5)`;
                
                ring.style.width = `${config.ringSize}px`;
                ring.style.height = `${config.ringSize}px`;
                ring.style.borderColor = `rgba(59,47,201,0.5)`;
                ring.style.background = '';
                ring.style.backdropFilter = 'blur(2px)';
            });
        });
    }

    // ========== CLICK EFFECT ==========
    let lastClick = 0;

    function setupClickEffect() {
        document.addEventListener('click', (e) => {
            const now = Date.now();
            if (now - lastClick < 100) return;
            lastClick = now;
            
            emitParticles(e.clientX, e.clientY, config.emitterParticles);
            
            const ring = document.getElementById('sj-cursor-ring');
            if (ring) {
                ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1.35)`;
                ring.style.borderColor = config.accentColor;
                setTimeout(() => {
                    if (ring) {
                        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1)`;
                        ring.style.borderColor = `rgba(59,47,201,0.5)`;
                    }
                }, 200);
            }
            
            const dot = document.getElementById('sj-cursor-dot');
            if (dot) {
                dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(0.4)`;
                setTimeout(() => {
                    if (dot) {
                        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
                    }
                }, 150);
            }
        });
    }

    // ========== HIDE DEFAULT CURSOR ==========
    function hideDefaultCursor() {
        let style = document.getElementById('sj-cursor-style');
        if (style) style.remove();
        
        style = document.createElement('style');
        style.id = 'sj-cursor-style';
        style.textContent = `
            @media (min-width: 769px) {
                html, body, a, button, input, textarea, select, 
                [role="button"], .job-card, .salary-card, .industry-card,
                .btn, .card, [onclick] {
                    cursor: none !important;
                }
            }
            @media (max-width: 768px) {
                #sj-cursor-dot, #sj-cursor-ring, #sj-cursor-trail {
                    display: none !important;
                }
                html, body, a, button {
                    cursor: auto !important;
                }
            }
            input, textarea, select {
                cursor: text !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ========== HANDLE INPUT FIELDS ==========
    function handleInputFields() {
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', () => {
                const dot = document.getElementById('sj-cursor-dot');
                const ring = document.getElementById('sj-cursor-ring');
                if (dot) dot.style.opacity = '0.2';
                if (ring) ring.style.opacity = '0.2';
            });
            input.addEventListener('blur', () => {
                const dot = document.getElementById('sj-cursor-dot');
                const ring = document.getElementById('sj-cursor-ring');
                if (dot) dot.style.opacity = '1';
                if (ring) ring.style.opacity = '1';
            });
        });
    }

    // ========== OBSERVE DYNAMIC CONTENT ==========
    function observeDOMChanges() {
        const observer = new MutationObserver(() => {
            setTimeout(() => {
                setupHoverEffects();
                handleInputFields();
            }, 100);
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setTimeout(() => {
                    setupHoverEffects();
                    handleInputFields();
                }, 200);
            }
        });
    }

    // ========== HANDLE RESIZE ==========
    function handleResize() {
        window.addEventListener('resize', () => {
            if (!isCursorEnabled()) {
                const dot = document.getElementById('sj-cursor-dot');
                const ring = document.getElementById('sj-cursor-ring');
                const trail = document.getElementById('sj-cursor-trail');
                if (dot) dot.style.display = 'none';
                if (ring) ring.style.display = 'none';
                if (trail) trail.style.display = 'none';
            } else {
                const dot = document.getElementById('sj-cursor-dot');
                const ring = document.getElementById('sj-cursor-ring');
                const trail = document.getElementById('sj-cursor-trail');
                if (dot) dot.style.display = '';
                if (ring) ring.style.display = '';
                if (trail) trail.style.display = '';
            }
        });
    }

    // ========== INITIALIZE ==========
    function init() {
        if (!isCursorEnabled()) return;
        
        const { dot, ring, trailContainer } = createCursorElements();
        initTrailSystem(trailContainer, config.trailLength);
        initCursorMovement(dot, ring);
        hideDefaultCursor();
        setupHoverEffects();
        setupClickEffect();
        handleInputFields();
        observeDOMChanges();
        handleResize();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();