/* ============================================================
   smartJobs Rwanda — Complete Animation System v4.0
   Features: Scroll animations, hover effects, particle system,
   custom cursor, number counters, page transitions, confetti
   ============================================================ */

(function() {
    'use strict';

    // ============================================================
    // CONFIGURATION
    // ============================================================
    const config = {
        // Scroll reveal
        scrollThreshold: 0.1,
        scrollOffset: 100,
        
        // Animation durations
        animationDuration: 600,
        staggerDelay: 80,
        
        // Particle system
        particleCount: 80,
        particleColor: 'rgba(59, 47, 201, 0.3)',
        
        // Custom cursor
        cursorEnabled: !window.matchMedia('(max-width: 768px)').matches,
        cursorDotSize: 8,
        cursorRingSize: 36,
        
        // Number counter
        counterDuration: 1500,
        
        // Confetti
        confettiCount: 80,
    };

    // ============================================================
    // INITIALIZATION
    // ============================================================
    function init() {
        initScrollReveal();
        initStaggerAnimations();
        initHoverEffects();
        initNumberCounters();
        initParticleBackground();
        initCustomCursor();
        initButtonRipple();
        initImageLazyLoad();
        initParallaxEffects();
        initTypingEffect();
        initNavScrollEffect();
        initBackToTop();
        initConfettiOnSuccess();
        
        // Add animation classes to body
        document.body.classList.add('animations-enabled');
    }

    // ============================================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================================
    function initScrollReveal() {
        const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-on-scroll-left, .reveal-on-scroll-right, .reveal-scale');
        
        if (elements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: config.scrollThreshold,
            rootMargin: `${config.scrollOffset}px`
        });
        
        elements.forEach(el => observer.observe(el));
    }

    // ============================================================
    // STAGGER CHILDREN ANIMATIONS
    // ============================================================
    function initStaggerAnimations() {
        const containers = document.querySelectorAll('.stagger-children');
        
        containers.forEach(container => {
            const children = container.children;
            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * 0.05}s`;
            });
        });
    }

    // ============================================================
    // HOVER EFFECTS
    // ============================================================
    function initHoverEffects() {
        // Card hover effects
        const cards = document.querySelectorAll('.job-card, .salary-card, .industry-card, .feature-card');
        cards.forEach(card => {
            card.classList.add('hover-lift');
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('.btn, button');
        buttons.forEach(btn => {
            if (!btn.classList.contains('no-hover')) {
                btn.classList.add('hover-brightness');
            }
        });
        
        // Link hover effects
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (!link.classList.contains('no-hover')) {
                link.style.transition = 'color 0.2s ease';
            }
        });
    }

    // ============================================================
    // NUMBER COUNTER ANIMATION
    // ============================================================
    function initNumberCounters() {
        const counters = document.querySelectorAll('.counter, .stat-number, [data-count]');
        
        if (counters.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count') || el.textContent.replace(/[^0-9]/g, ''));
                    
                    if (isNaN(target)) return;
                    
                    animateNumber(el, target);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    function animateNumber(element, target) {
        let current = 0;
        const increment = target / (config.counterDuration / 16);
        const suffix = element.getAttribute('data-suffix') || '';
        
        function updateNumber() {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target + suffix;
            }
        }
        
        updateNumber();
    }

    // ============================================================
    // PARTICLE BACKGROUND SYSTEM
    // ============================================================
    function initParticleBackground() {
        const container = document.getElementById('particle-bg') || createParticleContainer();
        if (!container) return;
        
        for (let i = 0; i < config.particleCount; i++) {
            createParticle(container);
        }
    }
    
    function createParticleContainer() {
        const container = document.createElement('div');
        container.id = 'particle-bg';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        document.body.insertBefore(container, document.body.firstChild);
        return container;
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${config.particleColor};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: floatParticle ${duration}s linear infinite;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
    }
    
    // Add keyframe for particles if not exists
    if (!document.querySelector('#particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% { opacity: 0.5; }
                90% { opacity: 0.3; }
                100% {
                    transform: translateY(-20vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // CUSTOM CURSOR
    // ============================================================
    function initCustomCursor() {
        if (!config.cursorEnabled) return;
        
        const cursorDot = document.createElement('div');
        const cursorRing = document.createElement('div');
        
        cursorDot.className = 'custom-cursor-dot';
        cursorRing.className = 'custom-cursor-ring';
        
        cursorDot.style.cssText = `
            position: fixed;
            width: ${config.cursorDotSize}px;
            height: ${config.cursorDotSize}px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s;
        `;
        
        cursorRing.style.cssText = `
            position: fixed;
            width: ${config.cursorRingSize}px;
            height: ${config.cursorRingSize}px;
            border: 2px solid rgba(59, 47, 201, 0.4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border-color 0.2s;
        `;
        
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
        
        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .job-card, .salary-card, .btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.width = `${config.cursorDotSize * 1.8}px`;
                cursorDot.style.height = `${config.cursorDotSize * 1.8}px`;
                cursorRing.style.width = `${config.cursorRingSize * 1.5}px`;
                cursorRing.style.height = `${config.cursorRingSize * 1.5}px`;
                cursorRing.style.borderColor = 'rgba(16, 185, 129, 0.6)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.width = `${config.cursorDotSize}px`;
                cursorDot.style.height = `${config.cursorDotSize}px`;
                cursorRing.style.width = `${config.cursorRingSize}px`;
                cursorRing.style.height = `${config.cursorRingSize}px`;
                cursorRing.style.borderColor = 'rgba(59, 47, 201, 0.4)';
            });
        });
        
        // Hide default cursor
        const style = document.createElement('style');
        style.textContent = `
            @media (min-width: 769px) {
                html, body, a, button, .job-card, .btn {
                    cursor: none;
                }
            }
            @media (max-width: 768px) {
                .custom-cursor-dot, .custom-cursor-ring {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // BUTTON RIPPLE EFFECT
    // ============================================================
    function initButtonRipple() {
        const buttons = document.querySelectorAll('.btn-ripple, .btn, .nav-btn-primary');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.cssText = `
                    position: absolute;
                    top: ${y}px;
                    left: ${x}px;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    transform: translate(-50%, -50%);
                    animation: ripple 0.5s ease-out forwards;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 500);
            });
        });
        
        // Add ripple keyframe
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes ripple {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 0.5;
                    }
                    100% {
                        width: 300px;
                        height: 300px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ============================================================
    // IMAGE LAZY LOAD WITH FADE
    // ============================================================
    function initImageLazyLoad() {
        const images = document.querySelectorAll('img[data-src], img.lazy');
        
        if (images.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.5s ease';
                        img.onload = () => {
                            img.style.opacity = '1';
                        };
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, { threshold: 0.1 });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ============================================================
    // PARALLAX EFFECTS
    // ============================================================
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = el.getAttribute('data-speed') || 0.5;
                const offset = scrolled * speed;
                el.style.transform = `translateY(${offset}px)`;
            });
        });
    }

    // ============================================================
    // TYPING EFFECT
    // ============================================================
    function initTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(el => {
            const texts = el.getAttribute('data-typing').split(',');
            let index = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            function type() {
                const currentText = texts[index];
                if (isDeleting) {
                    el.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    el.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                if (!isDeleting && charIndex === currentText.length) {
                    setTimeout(() => isDeleting = true, 2000);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    index = (index + 1) % texts.length;
                }
                
                setTimeout(type, isDeleting ? 50 : 100);
            }
            
            type();
        });
    }

    // ============================================================
    // NAV SCROLL EFFECT
    // ============================================================
    function initNavScrollEffect() {
        const nav = document.querySelector('.navbar, .top-nav');
        if (!nav) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ============================================================
    // BACK TO TOP BUTTON
    // ============================================================
    function initBackToTop() {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(59, 47, 201, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
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

    // ============================================================
    // CONFETTI ON SUCCESS
    // ============================================================
    function initConfettiOnSuccess() {
        window.launchConfetti = function() {
            const colors = ['#3b2fc9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
            
            for (let i = 0; i < config.confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 10 + 5;
                const left = Math.random() * 100;
                const duration = Math.random() * 2 + 1;
                const delay = Math.random() * 0.5;
                
                confetti.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    left: ${left}%;
                    top: -20px;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                    transform: rotate(${Math.random() * 360}deg);
                    animation: confettiFall ${duration}s linear forwards;
                    animation-delay: ${delay}s;
                    z-index: 10000;
                    pointer-events: none;
                `;
                
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), duration * 1000 + 500);
            }
        };
        
        // Add confetti keyframe
        if (!document.querySelector('#confetti-keyframes')) {
            const style = document.createElement('style');
            style.id = 'confetti-keyframes';
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(-20px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ============================================================
    // PAGE TRANSITION
    // ============================================================
    function initPageTransition() {
        // Add fade in effect on page load
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
    }

    // ============================================================
    // FORM INPUT ANIMATIONS
    // ============================================================
    function initFormAnimations() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // ============================================================
    // START ANIMATIONS
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Re-run animations on dynamic content
    const observer = new MutationObserver(() => {
        initScrollReveal();
        initStaggerAnimations();
        initNumberCounters();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();