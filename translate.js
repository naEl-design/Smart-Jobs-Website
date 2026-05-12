/* ============================================================
   smartJobs Rwanda — Language & Translation Module v1.0
   Supports: English, French, Kinyarwanda, Swahili, Arabic,
             Chinese, German, Spanish, Portuguese, Japanese
   Uses Google Translate widget + custom UI overlay
   ============================================================ */

(function () {
  'use strict';

  const LANGUAGES = [
    { code: 'en',    label: 'English',      flag: '🇬🇧', native: 'English' },
    { code: 'fr',    label: 'French',       flag: '🇫🇷', native: 'Français' },
    { code: 'rw',    label: 'Kinyarwanda',  flag: '🇷🇼', native: 'Ikinyarwanda' },
    { code: 'sw',    label: 'Swahili',      flag: '🇰🇪', native: 'Kiswahili' },
    { code: 'ar',    label: 'Arabic',       flag: '🇸🇦', native: 'العربية' },
    { code: 'zh-CN', label: 'Chinese',      flag: '🇨🇳', native: '中文' },
    { code: 'de',    label: 'German',       flag: '🇩🇪', native: 'Deutsch' },
    { code: 'es',    label: 'Spanish',      flag: '🇪🇸', native: 'Español' },
    { code: 'pt',    label: 'Portuguese',   flag: '🇵🇹', native: 'Português' },
    { code: 'ja',    label: 'Japanese',     flag: '🇯🇵', native: '日本語' },
  ];

  // ── 1. Inject Google Translate script (hidden) ────────────
  function loadGoogleTranslate() {
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google-translate-hidden'
      );
    };
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Hidden container for Google's widget (we drive it via our custom UI)
    const hidden = document.createElement('div');
    hidden.id = 'google-translate-hidden';
    hidden.style.cssText = 'display:none !important; visibility:hidden; height:0; overflow:hidden;';
    document.body.appendChild(hidden);
  }

  // ── 2. Apply language via Google Translate cookie trick ───
  function applyLanguage(langCode) {
    // Google Translate uses /translate_c cookie
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `googtrans=/en/${langCode}; expires=${expires}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; expires=${expires}; path=/; domain=.${location.hostname}`;
    localStorage.setItem('sj-lang', langCode);
    location.reload();
  }

  function resetLanguage() {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${location.hostname}`;
    localStorage.removeItem('sj-lang');
    location.reload();
  }

  function getCurrentLang() {
    const saved = localStorage.getItem('sj-lang');
    // Also check cookie
    const cookieMatch = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    return saved || (cookieMatch && cookieMatch[1]) || 'en';
  }

  // ── 3. Build the language selector UI ─────────────────────
  function buildUI() {
    const currentCode = getCurrentLang();
    const current = LANGUAGES.find(l => l.code === currentCode) || LANGUAGES[0];

    const style = document.createElement('style');
    style.textContent = `
      /* ── Language Selector ── */
      #sj-lang-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 12px;
        background: var(--indigo-light, #ede9ff);
        border: 1.5px solid var(--border, #e2e8f0);
        border-radius: 10px;
        cursor: pointer;
        font-size: 0.82rem;
        font-weight: 700;
        color: var(--indigo, #3b2fc9);
        transition: all 0.2s;
        white-space: nowrap;
        font-family: 'Plus Jakarta Sans', sans-serif;
        position: relative;
        z-index: 200;
      }
      body.dark-mode #sj-lang-btn {
        background: #1e1a4a !important;
        border-color: #4338ca !important;
        color: #7c6ff7 !important;
      }
      #sj-lang-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(59,47,201,.2); }
      #sj-lang-btn .lang-flag { font-size: 1.1rem; line-height: 1; }

      #sj-lang-dropdown {
        position: fixed;
        top: 70px;
        right: 16px;
        width: 300px;
        background: white;
        border: 1px solid var(--border, #e2e8f0);
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(59,47,201,0.2);
        z-index: 99999;
        overflow: hidden;
        animation: fadeSlideDown 0.25s cubic-bezier(.34,1.56,.64,1);
        display: none;
      }
      body.dark-mode #sj-lang-dropdown {
        background: #0f172a !important;
        border-color: #1e293b !important;
      }
      #sj-lang-dropdown.open { display: block; }

      .lang-dropdown-header {
        padding: 14px 16px;
        background: linear-gradient(135deg, #3b2fc9, #6d51f7);
        color: white;
        font-size: 0.85rem;
        font-weight: 800;
        font-family: 'Sora', sans-serif;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .lang-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        padding: 12px;
      }
      .lang-option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 10px;
        cursor: pointer;
        border: 1.5px solid transparent;
        transition: all 0.18s;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--text, #0f172a);
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      body.dark-mode .lang-option { color: #f1f5f9 !important; }
      .lang-option:hover {
        background: var(--indigo-light, #ede9ff);
        border-color: #c7d2fe;
        transform: translateY(-1px);
      }
      body.dark-mode .lang-option:hover { background: #1e1a4a !important; }
      .lang-option.active {
        background: linear-gradient(135deg, #3b2fc9, #6d51f7);
        color: white !important;
        border-color: transparent;
      }
      .lang-option .flag { font-size: 1.2rem; line-height: 1; }
      .lang-option .names { display: flex; flex-direction: column; }
      .lang-option .names .eng { font-size: 0.75rem; opacity: 0.75; }

      .lang-dropdown-footer {
        padding: 10px 12px;
        border-top: 1px solid var(--border, #e2e8f0);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.72rem;
        color: var(--muted, #64748b);
      }
      body.dark-mode .lang-dropdown-footer { border-color: #1e293b !important; }
      .lang-reset-btn {
        background: none;
        border: none;
        color: #3b2fc9;
        font-size: 0.75rem;
        font-weight: 700;
        cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      body.dark-mode .lang-reset-btn { color: #7c6ff7 !important; }
      .lang-reset-btn:hover { text-decoration: underline; }

      /* Hide Google's banner */
      .goog-te-banner-frame, .goog-te-ftab-float, #goog-gt-tt { display: none !important; }
      body { top: 0 !important; }
      .skiptranslate { display: none !important; }

      @keyframes fadeSlideDown {
        from { opacity: 0; transform: translateY(-10px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;
    document.head.appendChild(style);

    // Build button
    const btn = document.createElement('button');
    btn.id = 'sj-lang-btn';
    btn.setAttribute('aria-label', 'Change language');
    btn.innerHTML = `<span class="lang-flag">${current.flag}</span><span>${current.native}</span><i class="fas fa-chevron-down" style="font-size:0.65rem; opacity:0.7;"></i>`;

    // Build dropdown
    const dropdown = document.createElement('div');
    dropdown.id = 'sj-lang-dropdown';
    dropdown.innerHTML = `
      <div class="lang-dropdown-header">
        🌍 Select your language
      </div>
      <div class="lang-grid">
        ${LANGUAGES.map(lang => `
          <div class="lang-option ${lang.code === currentCode ? 'active' : ''}" data-code="${lang.code}" title="${lang.label}">
            <span class="flag">${lang.flag}</span>
            <div class="names">
              <span>${lang.native}</span>
              <span class="eng">${lang.label}</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="lang-dropdown-footer">
        <span>Powered by Google Translate</span>
        ${currentCode !== 'en' ? `<button class="lang-reset-btn" id="lang-reset">↩ Reset to English</button>` : ''}
      </div>
    `;

    // Inject into navbar's nav-right area
    const navRight = document.getElementById('dynamic-auth') || document.querySelector('.nav-right');
    if (navRight) {
      const wrapper = document.createElement('span');
      wrapper.style.cssText = 'margin-right: 8px; display: inline-flex; align-items: center;';
      wrapper.appendChild(btn);
      navRight.insertBefore(wrapper, navRight.firstChild);
    } else {
      // Fallback: fixed position
      btn.style.cssText += 'position:fixed; top:14px; right:180px; z-index:9998;';
      document.body.appendChild(btn);
    }
    document.body.appendChild(dropdown);

    // Toggle dropdown
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', () => dropdown.classList.remove('open'));
    dropdown.addEventListener('click', (e) => e.stopPropagation());

    // Language selection
    dropdown.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const code = opt.dataset.code;
        if (code === 'en') { resetLanguage(); return; }
        applyLanguage(code);
      });
    });

    // Reset button
    dropdown.querySelector('#lang-reset')?.addEventListener('click', resetLanguage);
  }

  // ── 4. Auto-show welcome banner for new non-English visitors ─
  function showTranslationHint() {
    const dismissed = sessionStorage.getItem('sj-translate-dismissed');
    const currentLang = getCurrentLang();
    if (dismissed || currentLang !== 'en') return;

    // Detect browser language
    const browserLang = navigator.language?.split('-')[0];
    const supported = LANGUAGES.find(l => l.code === browserLang || l.code.startsWith(browserLang));
    if (!supported || supported.code === 'en') return;

    const banner = document.createElement('div');
    banner.id = 'sj-translate-hint';
    banner.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #3b2fc9, #6d51f7);
      color: white;
      padding: 14px 20px;
      border-radius: 14px;
      font-size: 0.85rem;
      font-weight: 600;
      z-index: 99997;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 8px 30px rgba(59,47,201,0.4);
      animation: fadeSlideUp 0.4s ease;
      font-family: 'Plus Jakarta Sans', sans-serif;
      max-width: 420px;
      white-space: nowrap;
    `;
    banner.innerHTML = `
      <span style="font-size:1.3rem;">${supported.flag}</span>
      <span>This site is available in <strong>${supported.native}</strong>!</span>
      <button onclick="(function(){
        document.cookie='googtrans=/en/${supported.code}; path=/';
        localStorage.setItem('sj-lang','${supported.code}');
        location.reload();
      })()" style="background:white; color:#3b2fc9; border:none; padding:5px 12px; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.78rem; flex-shrink:0;">Translate</button>
      <button onclick="this.parentElement.remove(); sessionStorage.setItem('sj-translate-dismissed','1');" style="background:none; border:none; color:rgba(255,255,255,.7); cursor:pointer; font-size:1rem; padding:0; flex-shrink:0;">&times;</button>
    `;
    document.body.appendChild(banner);
  }

  // ── 5. Bootstrap ──────────────────────────────────────────
  function init() {
    loadGoogleTranslate();
    buildUI();
    setTimeout(showTranslationHint, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();