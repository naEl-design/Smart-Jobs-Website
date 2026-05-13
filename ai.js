/* ============================================================
   smartJobs Rwanda — AI Features Pack v4.0
   ─────────────────────────────────────────────────────────────
   Features:
   1.  🌙  Dark Mode  (system-aware, persisted)
   2.  🤖  AI Chat Assistant  (multi-persona, conversation memory)
   3.  ✍️  AI Cover Letter Generator  (4 tones, copy + export)
   4.  📊  AI Salary Predictor  (Rwanda market data)
   5.  📝  AI Resume Analyzer  (score + suggestions)
   6.  🎯  AI Skill Gap Analyzer  (visualised bars)
   7.  📧  AI Interview Email Generator
   8.  🔍  AI Job Description Enhancer
   9.  📈  AI Career Path Recommender
   10. ⚡  AI Job Fit Scorer  (NEW — badge on job cards)
   ─────────────────────────────────────────────────────────────
   Usage: <script src="ai.js"></script>
   Config: window.SJ_AI_CONFIG = { apiKey: 'sk-ant-...' }
   (set BEFORE loading this script, or use a proxy URL)
   ============================================================ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     CONFIG  — override via window.SJ_AI_CONFIG before load
  ══════════════════════════════════════════════════════════ */
  const CFG = Object.assign({
    apiKey:     '',                                       // your Anthropic key
    proxyUrl:   '',                                       // optional backend proxy URL
    model:      'claude-sonnet-4-20250514',
    maxTokens:  1000,
    rateLimit:  4000,                                     // ms between AI calls
    historyMax: 12,                                       // max message pairs kept
  }, window.SJ_AI_CONFIG || {});

  const API_URL = CFG.proxyUrl || 'https://api.anthropic.com/v1/messages';

  /* ══════════════════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════════════════ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const esc = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  let _lastCall = 0;
  function rateLimited() {
    const now = Date.now();
    if (now - _lastCall < CFG.rateLimit) {
      showToast('⏳ Please wait a moment before sending another request.', 'warn');
      return true;
    }
    _lastCall = now;
    return false;
  }

  async function callAI({ system, messages, maxTokens }) {
    const headers = { 'Content-Type': 'application/json', 'anthropic-dangerous-direct-browser-access': 'true' };
    if (CFG.apiKey) headers['x-api-key'] = CFG.apiKey;
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: CFG.model,
        max_tokens: maxTokens || CFG.maxTokens,
        system,
        messages,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.content?.[0]?.text || '';
  }

  function safeParseJSON(str, fallback) {
    try {
      const match = str.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      return JSON.parse(match ? match[0] : str);
    } catch { return fallback; }
  }

  function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    });
  }

  /* Global toast */
  let _toastTimer;
  function showToast(msg, type = 'info') {
    let el = document.getElementById('sj-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'sj-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.className = 'sj-toast-show ' + type;
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => { el.className = ''; }, 3200);
  }

  /* Inject a <style> block once */
  function injectStyle(id, css) {
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════════════════
     GLOBAL ANIMATIONS + TOAST CSS
  ══════════════════════════════════════════════════════════ */
  injectStyle('sj-base-styles', `
    @keyframes sj-fadeUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes sj-bounce   { 0%,100% { transform:scale(0); } 40% { transform:scale(1); } }
    @keyframes sj-spin     { to { transform:rotate(360deg); } }
    @keyframes sj-pulse    { 0%,100% { box-shadow:0 6px 24px rgba(59,47,201,.45); } 50% { box-shadow:0 6px 44px rgba(59,47,201,.75); } }
    @keyframes sj-ping     { 0% { transform:scale(1); opacity:1; } 75%,100% { transform:scale(2); opacity:0; } }

    .sj-spinner { display:inline-block; width:14px; height:14px; border:2px solid rgba(255,255,255,.3); border-top-color:white; border-radius:50%; animation:sj-spin .7s linear infinite; vertical-align:middle; margin-right:6px; }

    #sj-toast { position:fixed; bottom:20px; left:50%; transform:translateX(-50%) translateY(80px); background:#0f172a; color:white; padding:11px 22px; border-radius:40px; font-size:.82rem; font-weight:700; font-family:'Plus Jakarta Sans',sans-serif; z-index:99999; opacity:0; transition:all .35s cubic-bezier(.34,1.56,.64,1); pointer-events:none; white-space:nowrap; }
    #sj-toast.sj-toast-show { opacity:1; transform:translateX(-50%) translateY(0); }
    #sj-toast.warn   { background:#92400e; }
    #sj-toast.error  { background:#991b1b; }
    #sj-toast.success{ background:#065f46; }

    .sj-copy-btn { display:inline-flex; align-items:center; gap:5px; padding:5px 13px; border-radius:8px; border:1.5px solid #e2e8f0; background:white; font-size:.75rem; font-weight:700; cursor:pointer; font-family:inherit; transition:all .2s; }
    .sj-copy-btn:hover { border-color:#3b2fc9; color:#3b2fc9; }
    body.dark-mode .sj-copy-btn { background:#1e293b; border-color:#334155; color:#f1f5f9; }
  `);

  /* ══════════════════════════════════════════════════════════
     1. DARK MODE
  ══════════════════════════════════════════════════════════ */
  function initDarkMode() {
    injectStyle('sj-dark-styles', `
      body.dark-mode {
        --indigo:#7c6ff7; --indigo-dark:#6257e0; --indigo-mid:#8b7ff8;
        --indigo-light:#1e1a4a; --emerald:#34d399; --emerald-dark:#10b981;
        --emerald-light:#022c22; --text:#f1f5f9; --muted:#94a3b8;
        --border:#1e293b; --bg:#020617; --white:#0f172a;
        background:#020617; color:#f1f5f9;
      }
      body, body * { transition: background-color .22s ease, color .22s ease, border-color .22s ease !important; }
      body img, body svg, body .ai-msg, body .sj-spinner { transition:none !important; }

      body.dark-mode .top-nav            { background:rgba(2,6,23,.94)!important; border-bottom-color:#1e293b!important; }
      body.dark-mode .job-card, body.dark-mode .salary-card, body.dark-mode .section-card,
      body.dark-mode .stat-card, body.dark-mode .auth-card, body.dark-mode .sidebar,
      body.dark-mode .editor-side, body.dark-mode .card { background:#0f172a!important; border-color:#1e293b!important; color:#f1f5f9!important; }
      body.dark-mode input, body.dark-mode textarea, body.dark-mode select { background:#1e293b!important; border-color:#334155!important; color:#f1f5f9!important; }
      body.dark-mode .main-menu a        { color:#94a3b8!important; }
      body.dark-mode .main-menu a:hover, body.dark-mode .main-menu a.active { color:var(--indigo)!important; }
      body.dark-mode .search-hero, body.dark-mode .hero-blue { background:linear-gradient(135deg,#0a0520,#1a1060)!important; }
      body.dark-mode .main-footer        { background:#020617!important; border-top-color:#1e293b!important; }
      body.dark-mode .cv-paper           { background:#0f172a!important; }
      body.dark-mode .industry-card      { background:#0f172a!important; border-color:#1e293b!important; color:#f1f5f9!important; }
      body.dark-mode .industry-card:hover{ background:#1e1a4a!important; }
      body.dark-mode hr                  { border-color:#1e293b!important; }
      body.dark-mode .filter-btn         { background:#1e293b!important; color:#94a3b8!important; border-color:#334155!important; }
      body.dark-mode .filter-btn.active  { background:var(--indigo)!important; color:white!important; }
      body.dark-mode .modal-overlay      { background:rgba(2,6,23,.88)!important; }
      body.dark-mode .modal-box, body.dark-mode .modal { background:#0f172a!important; border-color:#1e293b!important; }
      body.dark-mode .jobs-table th, body.dark-mode .jobs-table td { border-color:#1e293b!important; color:#f1f5f9!important; }
      body.dark-mode .jobs-table tr:hover td { background:#1e293b!important; }
      body.dark-mode .faq-q              { background:#0f172a!important; color:#f1f5f9!important; }
      body.dark-mode .faq-a              { background:#1e293b!important; color:#cbd5e1!important; }
      body.dark-mode .contact-card       { background:#0f172a!important; border-color:#1e293b!important; }
      body.dark-mode .footer-col a       { color:#94a3b8!important; }
      body.dark-mode .footer-col a:hover { color:#10b981!important; }
      body.dark-mode .footer-bottom      { color:#64748b!important; border-color:#1e293b!important; }
      body.dark-mode .social-icons i     { color:#64748b!important; }
      body.dark-mode .social-icons i:hover{ color:#7c6ff7!important; }
    `);

    /* Toggle button */
    const btn = document.createElement('button');
    btn.id = 'sj-dark-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = `<span class="dm-icon">🌙</span><span class="dm-text"> Dark</span>`;
    btn.style.cssText = `
      position:fixed; bottom:28px; left:28px; padding:9px 17px; border-radius:40px;
      background:linear-gradient(135deg,#1e293b,#0f172a); border:2px solid #334155;
      color:white; font-size:.88rem; cursor:pointer; z-index:9990;
      display:flex; align-items:center; gap:6px; box-shadow:0 4px 20px rgba(0,0,0,.32);
      transition:transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
      font-weight:700; font-family:'Plus Jakarta Sans',sans-serif;`;

    btn.onmouseenter = () => { btn.style.transform = 'scale(1.06) translateY(-2px)'; btn.style.boxShadow = '0 8px 28px rgba(0,0,0,.44)'; };
    btn.onmouseleave = () => { btn.style.transform = ''; btn.style.boxShadow = '0 4px 20px rgba(0,0,0,.32)'; };

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('sj-dark');
    const isDark = saved !== null ? saved === 'true' : prefersDark;

    function applyDark(dark) {
      document.body.classList.toggle('dark-mode', dark);
      btn.querySelector('.dm-icon').textContent = dark ? '☀️' : '🌙';
      btn.querySelector('.dm-text').textContent  = dark ? ' Light' : ' Dark';
      localStorage.setItem('sj-dark', dark);
    }

    applyDark(isDark);

    btn.onclick = () => {
      const now = !document.body.classList.contains('dark-mode');
      applyDark(now);
      btn.style.transform = 'scale(0.82)';
      setTimeout(() => { btn.style.transform = ''; }, 160);
    };

    // Keyboard shortcut: Shift + D
    document.addEventListener('keydown', e => {
      if (e.shiftKey && e.key === 'D' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
        btn.click();
      }
    });

    document.body.appendChild(btn);
  }

  /* ══════════════════════════════════════════════════════════
     2. AI CHAT ASSISTANT
  ══════════════════════════════════════════════════════════ */
  function initAIChat() {
    injectStyle('sj-chat-styles', `
      #sj-bubble {
        position:fixed; bottom:28px; right:28px; width:58px; height:58px;
        border-radius:50%; background:linear-gradient(135deg,#3b2fc9,#6d51f7);
        border:none; color:white; font-size:1.5rem; cursor:pointer; z-index:9990;
        display:flex; align-items:center; justify-content:center;
        box-shadow:0 6px 24px rgba(59,47,201,.45);
        transition:transform .3s cubic-bezier(.34,1.56,.64,1); animation:sj-pulse 3s ease infinite;
      }
      #sj-bubble:hover { transform:scale(1.1) translateY(-3px); }
      #sj-bubble-badge {
        position:absolute; top:-3px; right:-3px; width:16px; height:16px;
        background:#10b981; border-radius:50%; border:2px solid white; animation:sj-ping 2s ease infinite;
      }

      #sj-panel {
        position:fixed; bottom:98px; right:28px; width:420px; max-height:608px;
        background:white; border-radius:22px; border:1px solid #e2e8f0;
        box-shadow:0 20px 64px rgba(59,47,201,.22); display:flex; flex-direction:column;
        z-index:9989; transform:scale(.86) translateY(18px); opacity:0; pointer-events:none;
        transition:all .32s cubic-bezier(.34,1.56,.64,1); overflow:hidden;
      }
      body.dark-mode #sj-panel { background:#0f172a!important; border-color:#1e293b!important; }
      #sj-panel.open { transform:scale(1) translateY(0); opacity:1; pointer-events:all; }

      .sj-ph { background:linear-gradient(135deg,#3b2fc9,#6d51f7); padding:15px 18px; display:flex; align-items:center; gap:11px; color:white; flex-shrink:0; }
      .sj-ph-avatar { width:40px; height:40px; background:rgba(255,255,255,.2); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0; }
      .sj-ph-title { font-weight:800; font-size:.95rem; font-family:'Sora',sans-serif; }
      .sj-ph-sub   { font-size:.68rem; opacity:.75; margin-top:1px; }
      .sj-ph-actions { margin-left:auto; display:flex; gap:4px; }
      .sj-ph-btn { background:none; border:none; color:rgba(255,255,255,.65); cursor:pointer; font-size:.88rem; padding:5px 7px; border-radius:7px; transition:all .2s; }
      .sj-ph-btn:hover { color:white; background:rgba(255,255,255,.15); }

      .sj-personas { padding:9px 14px; background:#f8fafc; border-bottom:1px solid #e2e8f0; display:flex; gap:7px; flex-wrap:wrap; flex-shrink:0; }
      body.dark-mode .sj-personas { background:#1e293b!important; border-color:#334155!important; }
      .sj-pb { padding:4px 11px; border-radius:20px; border:1.5px solid #c7d2fe; background:white; font-size:.73rem; font-weight:700; cursor:pointer; transition:all .2s; color:#3b2fc9; font-family:inherit; }
      body.dark-mode .sj-pb { background:#0f172a; border-color:#4338ca; color:#7c6ff7; }
      .sj-pb.active { background:linear-gradient(135deg,#3b2fc9,#6d51f7); color:white; border-color:transparent; }
      .sj-pb:hover { transform:translateY(-1px); }

      .sj-msgs { flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:10px; min-height:260px; max-height:300px; }
      .sj-msgs::-webkit-scrollbar { width:4px; }
      .sj-msgs::-webkit-scrollbar-thumb { background:#3b2fc9; border-radius:4px; }

      .sj-msg { max-width:86%; padding:11px 15px; border-radius:16px; font-size:.84rem; line-height:1.55; animation:sj-fadeUp .28s ease; }
      .sj-msg.bot { background:#f1f5f9; border-bottom-left-radius:4px; align-self:flex-start; color:#0f172a; }
      body.dark-mode .sj-msg.bot { background:#1e293b!important; color:#f1f5f9!important; }
      .sj-msg.user { background:linear-gradient(135deg,#3b2fc9,#6d51f7); color:white; border-bottom-right-radius:4px; align-self:flex-end; }
      .sj-msg.typing span { display:inline-block; width:7px; height:7px; background:#94a3b8; border-radius:50%; margin:0 2px; animation:sj-bounce .9s ease infinite; }
      .sj-msg.typing span:nth-child(2) { animation-delay:.15s; }
      .sj-msg.typing span:nth-child(3) { animation-delay:.3s; }

      .sj-chips { display:flex; flex-wrap:wrap; gap:6px; padding:0 14px 10px; flex-shrink:0; }
      .sj-chip { padding:5px 11px; background:#ede9ff; color:#3b2fc9; border:none; border-radius:20px; font-size:.72rem; font-weight:700; cursor:pointer; transition:all .2s; font-family:inherit; }
      body.dark-mode .sj-chip { background:#1e1a4a!important; color:#7c6ff7!important; }
      .sj-chip:hover { background:#3b2fc9; color:white; transform:translateY(-1px); }

      .sj-input-row { padding:11px 14px; border-top:1px solid #e2e8f0; display:flex; gap:7px; align-items:center; flex-shrink:0; }
      body.dark-mode .sj-input-row { border-color:#1e293b!important; }
      .sj-input-row input { flex:1; padding:9px 13px; border:1.5px solid #e2e8f0; border-radius:11px; font-size:.84rem; outline:none; font-family:inherit; background:#f8fafc; color:#0f172a; transition:border-color .2s; }
      body.dark-mode .sj-input-row input { background:#1e293b!important; border-color:#334155!important; color:#f1f5f9!important; }
      .sj-input-row input:focus { border-color:#3b2fc9; background:white; }
      body.dark-mode .sj-input-row input:focus { background:#1e293b!important; }
      .sj-send { width:37px; height:37px; background:linear-gradient(135deg,#3b2fc9,#6d51f7); border:none; border-radius:10px; color:white; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:transform .2s, box-shadow .2s; }
      .sj-send:hover { transform:scale(1.08); box-shadow:0 4px 14px rgba(59,47,201,.42); }
      .sj-send:disabled { opacity:.5; cursor:default; transform:none; }

      @media (max-width:480px) { #sj-panel { width:calc(100vw - 26px); right:13px; } }
    `);

    /* Conversation memory (persisted per-session) */
    const HIST_KEY = 'sj-chat-hist';
    let history = [];
    try { history = JSON.parse(sessionStorage.getItem(HIST_KEY) || '[]'); } catch {}

    let currentPersona = 'career';
    let sending = false;

    const personas = {
      career:    { label:'💼 Career Coach',    icon:'💼', greeting:'💼 Career Coach mode! Ask me about job hunting, career growth, or opportunities in Rwanda.' },
      salary:    { label:'💰 Salary Expert',   icon:'💰', greeting:'💰 Salary Expert mode! Ask me about pay ranges for any role in Rwanda — I\'ll give you real numbers.' },
      cv:        { label:'📄 CV Advisor',      icon:'📄', greeting:'📄 CV Advisor mode! Share your background and I\'ll help you craft a standout resume.' },
      interview: { label:'🎯 Interview Prep',  icon:'🎯', greeting:'🎯 Interview Prep mode! Tell me the role you\'re interviewing for and we\'ll practise together.' },
    };

    const systemPrompts = {
      career:    'You are SmartMatch AI, a career coach for smartJobs Rwanda. Help users find ideal career paths and job opportunities specific to Rwanda\'s market. Be encouraging, practical, and concise. Use Kinyarwanda greetings occasionally ("Muraho!"). Under 130 words per reply.',
      salary:    'You are a salary intelligence expert for the Rwandan job market (2026). Key benchmarks: Software Engineers (1.2M–2.5M RWF), Accountants (600K–1.2M RWF), Doctors (1.5M–3.5M RWF), Data Analysts (800K–1.5M RWF), Project Managers (1M–2M RWF), Teachers (300K–700K RWF), Nurses (400K–800K RWF), Digital Marketers (500K–1.2M RWF). Be specific with numbers and give negotiation advice. Under 130 words.',
      cv:        'You are a CV writing expert for the Rwandan job market. Give actionable, specific resume tips. Mention that bilingual skills (Kinyarwanda + English/French) are valued by Rwandan employers. Under 130 words.',
      interview: 'You are an interview preparation coach for jobs in Rwanda. Provide common questions, STAR-method frameworks, and cultural tips for Rwandan workplaces. Help users practise and feel confident. Under 130 words.',
    };

    /* Build DOM */
    const bubble = document.createElement('button');
    bubble.id = 'sj-bubble';
    bubble.setAttribute('aria-label', 'Open AI assistant');
    bubble.innerHTML = `🤖<span id="sj-bubble-badge"></span>`;

    const panel = document.createElement('div');
    panel.id = 'sj-panel';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `
      <div class="sj-ph">
        <div class="sj-ph-avatar">🤖</div>
        <div>
          <div class="sj-ph-title">SmartMatch AI</div>
          <div class="sj-ph-sub" id="sj-status">● Online · Career Assistant</div>
        </div>
        <div class="sj-ph-actions">
          <button class="sj-ph-btn" id="sj-clear" title="Clear conversation (Ctrl+L)"><i class="fas fa-trash-alt"></i></button>
          <button class="sj-ph-btn" id="sj-close" title="Close"><i class="fas fa-times"></i></button>
        </div>
      </div>
      <div class="sj-personas" id="sj-personas">
        ${Object.entries(personas).map(([k, p]) =>
          `<button class="sj-pb${k === 'career' ? ' active' : ''}" data-persona="${k}">${p.label}</button>`
        ).join('')}
      </div>
      <div class="sj-msgs" id="sj-msgs">
        <div class="sj-msg bot">👋 Muraho! I'm SmartMatch AI. Pick a persona above or ask me anything about jobs in Rwanda!</div>
      </div>
      <div class="sj-chips" id="sj-chips">
        <button class="sj-chip" data-q="What are the best tech jobs in Kigali right now?">💻 Tech Jobs</button>
        <button class="sj-chip" data-q="What is the average salary for a Software Engineer in Rwanda?">💰 Salaries</button>
        <button class="sj-chip" data-q="How can I make my CV stand out to Rwandan employers?">📄 CV Tips</button>
        <button class="sj-chip" data-q="What are common interview questions in Rwanda?">🎯 Interview Prep</button>
        <button class="sj-chip" data-q="Which are the top companies hiring in Rwanda in 2026?">🏢 Top Companies</button>
      </div>
      <div class="sj-input-row">
        <input id="sj-input" type="text" placeholder="Ask about jobs, salaries, your career…" autocomplete="off" />
        <button class="sj-send" id="sj-send"><i class="fas fa-paper-plane"></i></button>
      </div>`;

    document.body.appendChild(bubble);
    document.body.appendChild(panel);

    const msgs    = () => document.getElementById('sj-msgs');
    const input   = () => document.getElementById('sj-input');
    const sendBtn = () => document.getElementById('sj-send');

    /* Restore history into UI */
    history.slice(-CFG.historyMax * 2).forEach(m => appendMsg(m.content, m.role === 'user' ? 'user' : 'bot', false));

    /* Persona switcher */
    $$('.sj-pb', panel).forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.sj-pb', panel).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPersona = btn.dataset.persona;
        history = [];
        sessionStorage.removeItem(HIST_KEY);
        appendMsg(personas[currentPersona].greeting, 'bot');
      });
    });

    /* Quick chips */
    $$('.sj-chip', panel).forEach(chip => {
      chip.addEventListener('click', () => { input().value = chip.dataset.q; send(); });
    });

    /* Open/close */
    bubble.addEventListener('click', () => {
      panel.classList.toggle('open');
      document.getElementById('sj-bubble-badge').style.display = 'none';
      if (panel.classList.contains('open')) setTimeout(() => input()?.focus(), 300);
    });
    document.getElementById('sj-close').addEventListener('click', () => panel.classList.remove('open'));

    /* Clear */
    document.getElementById('sj-clear').addEventListener('click', () => {
      history = [];
      sessionStorage.removeItem(HIST_KEY);
      const m = msgs();
      while (m.children.length > 1) m.removeChild(m.lastChild);
      showToast('Conversation cleared', 'success');
    });

    /* Keyboard shortcut: Ctrl/Cmd + / */
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') { bubble.click(); e.preventDefault(); }
      if (e.ctrlKey && e.key === 'l' && panel.classList.contains('open')) document.getElementById('sj-clear').click();
    });

    /* Input events */
    document.getElementById('sj-send').addEventListener('click', send);
    panel.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target === input()) send(); });

    function appendMsg(text, side, animate = true) {
      const d = document.createElement('div');
      d.className = `sj-msg ${side}${animate ? '' : ' no-anim'}`;
      d.innerHTML = text.replace(/\n/g, '<br>');
      msgs().appendChild(d);
      msgs().scrollTop = msgs().scrollHeight;
      return d;
    }

    async function send() {
      const text = input()?.value.trim();
      if (!text || sending) return;
      if (rateLimited()) return;

      sending = true;
      input().value = '';
      sendBtn().disabled = true;
      document.getElementById('sj-status').textContent = '● Thinking…';

      appendMsg(text, 'user');
      history.push({ role: 'user', content: text });

      /* Typing indicator */
      const typing = document.createElement('div');
      typing.className = 'sj-msg bot typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      msgs().appendChild(typing);
      msgs().scrollTop = msgs().scrollHeight;

      try {
        const botText = await callAI({
          system: systemPrompts[currentPersona],
          messages: history.slice(-CFG.historyMax * 2),
        });
        typing.remove();
        appendMsg(botText, 'bot');
        history.push({ role: 'assistant', content: botText });
        if (history.length > CFG.historyMax * 2) history = history.slice(-CFG.historyMax * 2);
        sessionStorage.setItem(HIST_KEY, JSON.stringify(history));
      } catch (err) {
        typing.remove();
        appendMsg('⚠️ Could not reach AI. Check your connection or API key and try again.', 'bot');
        console.error('[SJ AI]', err);
      }

      sending = false;
      sendBtn().disabled = false;
      document.getElementById('sj-status').textContent = '● Online · ' + personas[currentPersona].label.replace(/\p{Emoji}/u, '').trim();
    }

    window.sjChatSend = send;
  }

  /* ══════════════════════════════════════════════════════════
     3. AI COVER LETTER GENERATOR
  ══════════════════════════════════════════════════════════ */
  function initCoverLetter() {
    injectStyle('sj-cover-styles', `
      .sj-cover-box { border:2px dashed #c7d2fe; border-radius:16px; padding:18px; margin-top:14px; background:linear-gradient(135deg,#f8f7ff,#faf9ff); transition:border-color .3s; }
      body.dark-mode .sj-cover-box { background:#1e1a4a!important; border-color:#4338ca!important; }
      .sj-cover-box:hover { border-color:#3b2fc9; }
      .sj-cover-head { display:flex; align-items:center; gap:7px; font-weight:800; font-size:.84rem; color:#3b2fc9; margin-bottom:11px; font-family:'Sora',sans-serif; }
      .sj-tones { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:12px; }
      .sj-tone { padding:5px 13px; border-radius:20px; border:1.5px solid #c7d2fe; background:white; font-size:.75rem; font-weight:700; cursor:pointer; transition:all .2s; color:#3b2fc9; font-family:inherit; }
      body.dark-mode .sj-tone { background:#0f172a; border-color:#4338ca; color:#7c6ff7; }
      .sj-tone.active { background:linear-gradient(135deg,#3b2fc9,#6d51f7); color:white; border-color:transparent; }
      .sj-tone:hover { transform:translateY(-1px); }
      .sj-gen-btn { width:100%; padding:10px; border-radius:10px; background:linear-gradient(135deg,#3b2fc9,#6d51f7); color:white; border:none; font-weight:800; font-size:.85rem; cursor:pointer; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:6px; transition:opacity .2s; margin-bottom:10px; }
      .sj-gen-btn:disabled { opacity:.6; cursor:default; }
      .sj-cover-output { width:100%; min-height:160px; border:1.5px solid #e2e8f0; border-radius:10px; padding:12px; font-size:.84rem; font-family:inherit; resize:vertical; display:none; line-height:1.6; background:white; color:#0f172a; }
      body.dark-mode .sj-cover-output { background:#1e293b!important; border-color:#334155!important; color:#f1f5f9!important; }
      .sj-cover-output:focus { border-color:#3b2fc9; outline:none; }
      .sj-cover-actions { display:none; flex-direction:column; gap:8px; margin-top:8px; }
      .sj-cover-row { display:flex; gap:8px; }
      .sj-cover-hint { font-size:.72rem; color:#94a3b8; margin-top:4px; }
    `);

    function tryInject() {
      const textarea = document.getElementById('apply-message') || $('textarea', document.getElementById('apply-modal'));
      if (!textarea || document.getElementById('sj-cover-injected')) return;

      const jobTitle = ($('#apply-job-title') || $('.modal-job-title') || $('.detail-title'))?.textContent?.trim() || 'this position';
      const box = document.createElement('div');
      box.className = 'sj-cover-box';
      box.id = 'sj-cover-injected';
      box.innerHTML = `
        <div class="sj-cover-head">✨ AI Cover Letter <span style="margin-left:auto;font-size:.68rem;opacity:.7;">Powered by Claude</span></div>
        <div class="sj-tones">
          <button class="sj-tone active" data-tone="professional">Professional</button>
          <button class="sj-tone" data-tone="enthusiastic">Enthusiastic</button>
          <button class="sj-tone" data-tone="concise">Concise</button>
          <button class="sj-tone" data-tone="creative">Creative</button>
        </div>
        <button class="sj-gen-btn" id="sj-gen-cover"><i class="fas fa-magic"></i> Generate Cover Letter</button>
        <textarea class="sj-cover-output" id="sj-cover-out" placeholder="Your AI-generated cover letter will appear here…"></textarea>
        <div class="sj-cover-actions" id="sj-cover-actions">
          <div class="sj-cover-row">
            <button class="sj-copy-btn" id="sj-cover-copy"><i class="fas fa-copy"></i> Copy</button>
            <button class="sj-copy-btn" id="sj-cover-use" style="background:#3b2fc9;color:white;border-color:#3b2fc9;"><i class="fas fa-check"></i> Use in Application</button>
          </div>
          <div class="sj-cover-hint">✅ Edit freely, then click "Use in Application" or Submit directly.</div>
        </div>`;

      textarea.parentNode.insertBefore(box, textarea);

      let tone = 'professional';
      $$('.sj-tone', box).forEach(b => b.addEventListener('click', () => {
        $$('.sj-tone', box).forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        tone = b.dataset.tone;
      }));

      const toneDesc = {
        professional: 'Formal, confident, standard business language.',
        enthusiastic: 'Energetic, passionate, showing genuine excitement.',
        concise:      'Brief and direct — under 120 words, pure value.',
        creative:     'Story-driven, memorable, showing strong personality.',
      };

      document.getElementById('sj-gen-cover').addEventListener('click', async () => {
        if (rateLimited()) return;
        const btn = document.getElementById('sj-gen-cover');
        const out = document.getElementById('sj-cover-out');
        const actions = document.getElementById('sj-cover-actions');
        const user = (() => { try { return JSON.parse(localStorage.getItem('currentUser') || '{}'); } catch { return {}; } })();
        const company = ($('.apply-modal-header-company')?.textContent?.split('•')[0]?.trim()) || 'the company';

        btn.disabled = true;
        btn.innerHTML = `<span class="sj-spinner"></span> Generating ${tone} letter…`;

        try {
          const text = await callAI({
            system: `You are an expert cover letter writer for the Rwandan job market. ${toneDesc[tone]} Write in first person. Start directly — no "Dear Hiring Manager" salutation needed. No sign-off. Applicant name: ${user.name || 'a qualified professional'}. Company: ${company}. Keep under 220 words.`,
            messages: [{ role: 'user', content: `Write a cover letter for the role: ${jobTitle}. Tailor it to Rwanda's job market and make it compelling.` }],
            maxTokens: 700,
          });
          out.value = text;
          out.style.display = 'block';
          out.style.animation = 'sj-fadeUp .4s ease';
          actions.style.display = 'flex';
          btn.innerHTML = `<i class="fas fa-sync-alt"></i> Regenerate (${tone})`;

          document.getElementById('sj-cover-copy').onclick = () => copyToClipboard(out.value, document.getElementById('sj-cover-copy'));
          document.getElementById('sj-cover-use').onclick  = () => { textarea.value = out.value; showToast('Cover letter added to your application ✓', 'success'); };

          out.addEventListener('input', () => { textarea.value = out.value; });

        } catch (err) {
          out.style.display = 'block';
          out.value = '⚠️ Could not connect to AI. Please write your cover letter manually, or check your API key.';
          btn.innerHTML = `<i class="fas fa-magic"></i> Try Again`;
          console.error('[SJ Cover Letter]', err);
        }

        btn.disabled = false;
      });
    }

    /* Patch openApplyModal or observe DOM */
    const orig = window.openApplyModal;
    if (typeof orig === 'function') {
      window.openApplyModal = function (...a) { orig(...a); setTimeout(tryInject, 120); };
    } else {
      const obs = new MutationObserver(() => {
        const m = document.querySelector('#apply-modal');
        if (m && !m.classList.contains('hidden') && !document.getElementById('sj-cover-injected')) tryInject();
      });
      obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
    }
  }

  /* ══════════════════════════════════════════════════════════
     4. AI SALARY PREDICTOR
  ══════════════════════════════════════════════════════════ */
  const SALARY_DB = {
    'software engineer':  { min:1200000, max:2500000, avg:1800000 },
    'data analyst':       { min:800000,  max:1500000, avg:1100000 },
    'data scientist':     { min:1000000, max:2000000, avg:1500000 },
    'accountant':         { min:600000,  max:1200000, avg:850000  },
    'project manager':    { min:1000000, max:2000000, avg:1500000 },
    'product manager':    { min:1200000, max:2200000, avg:1700000 },
    'marketing manager':  { min:800000,  max:1800000, avg:1300000 },
    'digital marketer':   { min:500000,  max:1200000, avg:850000  },
    'sales executive':    { min:500000,  max:1200000, avg:800000  },
    'hr manager':         { min:700000,  max:1500000, avg:1100000 },
    'medical doctor':     { min:1500000, max:3500000, avg:2500000 },
    'nurse':              { min:400000,  max:800000,  avg:600000  },
    'teacher':            { min:300000,  max:700000,  avg:500000  },
    'agronomist':         { min:400000,  max:900000,  avg:650000  },
    'electrician':        { min:300000,  max:600000,  avg:450000  },
    'driver':             { min:200000,  max:400000,  avg:300000  },
    'chef':               { min:300000,  max:800000,  avg:550000  },
    'graphic designer':   { min:400000,  max:900000,  avg:650000  },
    'ux designer':        { min:600000,  max:1200000, avg:900000  },
    'customer service':   { min:250000,  max:500000,  avg:350000  },
    'administrator':      { min:300000,  max:600000,  avg:450000  },
    'devops engineer':    { min:1400000, max:2800000, avg:2000000 },
    'cybersecurity':      { min:1200000, max:2500000, avg:1800000 },
    'cloud architect':    { min:1500000, max:3000000, avg:2200000 },
    'business analyst':   { min:900000,  max:1800000, avg:1300000 },
    'lawyer':             { min:800000,  max:2000000, avg:1400000 },
    'pharmacist':         { min:600000,  max:1200000, avg:900000  },
    'civil engineer':     { min:700000,  max:1500000, avg:1100000 },
  };

  function initSalaryPredictor() {
    injectStyle('sj-salary-styles', `
      .sj-salary-widget { background:linear-gradient(135deg,#fef3c7,#fffbeb); border-radius:16px; padding:20px; margin:18px 0; border:1px solid #fde68a; }
      body.dark-mode .sj-salary-widget { background:#1e1a4a!important; border-color:#4338ca!important; }
      .sj-salary-title { font-size:.95rem; font-weight:800; margin-bottom:12px; display:flex; align-items:center; gap:7px; font-family:'Sora',sans-serif; }
      .sj-salary-field { width:100%; padding:10px 12px; border:1.5px solid #e2e8f0; border-radius:10px; margin-bottom:10px; font-family:inherit; font-size:.87rem; }
      body.dark-mode .sj-salary-field { background:#1e293b!important; border-color:#334155!important; color:#f1f5f9!important; }
      .sj-salary-result { background:white; border-radius:12px; padding:16px 18px; margin-top:12px; display:none; animation:sj-fadeUp .4s ease; }
      body.dark-mode .sj-salary-result { background:#0f172a!important; }
      .sj-salary-avg { font-size:1.6rem; font-weight:800; color:#10b981; font-family:'Sora',sans-serif; }
      .sj-salary-range { font-size:.82rem; color:#64748b; margin-top:4px; }
      .sj-salary-bar { height:8px; background:#e2e8f0; border-radius:20px; margin:10px 0 4px; overflow:hidden; }
      .sj-salary-bar-fill { height:100%; background:linear-gradient(90deg,#10b981,#34d399); border-radius:20px; transition:width 1s ease; }
      .sj-salary-labels { display:flex; justify-content:space-between; font-size:.7rem; color:#94a3b8; }
    `);

    const container = document.querySelector('.salary-predictor-container, #salary-predictor-container');
    if (!container) return;

    container.innerHTML = `
      <div class="sj-salary-widget">
        <div class="sj-salary-title"><i class="fas fa-chart-line" style="color:#f59e0b;"></i> AI Salary Predictor</div>
        <input type="text" id="sj-sal-input" class="sj-salary-field" placeholder="Enter job title (e.g. Software Engineer)">
        <select id="sj-sal-exp" class="sj-salary-field">
          <option value="1">Entry Level (0–2 yrs)</option>
          <option value="1.2" selected>Mid Level (3–5 yrs)</option>
          <option value="1.4">Senior Level (6–10 yrs)</option>
          <option value="1.6">Lead / Manager (10+ yrs)</option>
        </select>
        <button id="sj-sal-btn" class="sj-gen-btn"><i class="fas fa-search"></i> Predict Salary</button>
        <div class="sj-salary-result" id="sj-sal-result"></div>
      </div>`;

    function fmt(n) { return 'RWF ' + Math.round(n).toLocaleString(); }

    document.getElementById('sj-sal-btn').addEventListener('click', () => {
      const role   = document.getElementById('sj-sal-input').value.trim().toLowerCase();
      const mult   = parseFloat(document.getElementById('sj-sal-exp').value);
      const match  = Object.keys(SALARY_DB).find(k => role.includes(k) || k.includes(role));
      const base   = SALARY_DB[match] || { min:300000, max:800000, avg:550000 };
      const result = { min: base.min * mult, max: base.max * mult, avg: base.avg * mult };
      const fill   = Math.round(((result.avg - result.min) / (result.max - result.min)) * 100);
      const res    = document.getElementById('sj-sal-result');
      res.style.display = 'block';
      res.innerHTML = `
        <div class="sj-salary-avg">${fmt(result.avg)}<span style="font-size:.85rem;font-weight:600;color:#94a3b8;">/month</span></div>
        <div class="sj-salary-range">Range: ${fmt(result.min)} – ${fmt(result.max)}</div>
        <div class="sj-salary-bar"><div class="sj-salary-bar-fill" style="width:${fill}%"></div></div>
        <div class="sj-salary-labels"><span>${fmt(result.min)}</span><span>${fmt(result.max)}</span></div>
        <div style="margin-top:10px;font-size:.74rem;color:#94a3b8;">📊 Based on smartJobs Rwanda market data 2026${match ? '' : ' — role not found, showing general estimate'}</div>`;
    });

    document.getElementById('sj-sal-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('sj-sal-btn').click();
    });
  }

  /* ══════════════════════════════════════════════════════════
     5. AI RESUME ANALYZER
  ══════════════════════════════════════════════════════════ */
  function initResumeAnalyzer() {
    const container = document.getElementById('ai-resume-analyzer');
    if (!container) return;

    injectStyle('sj-resume-styles', `
      .sj-resume-widget { background:linear-gradient(135deg,#ede9ff,#f5f3ff); border-radius:16px; padding:20px; }
      body.dark-mode .sj-resume-widget { background:#1e1a4a!important; }
      .sj-score-ring { width:80px; height:80px; position:relative; margin:0 auto 12px; }
      .sj-score-ring svg { transform:rotate(-90deg); }
      .sj-score-val { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:1.2rem; font-weight:800; font-family:'Sora',sans-serif; }
      .sj-analysis-list { padding-left:18px; margin:6px 0; }
      .sj-analysis-list li { font-size:.83rem; margin-bottom:6px; line-height:1.5; }
    `);

    container.innerHTML = `
      <div class="sj-resume-widget">
        <div class="sj-salary-title"><i class="fas fa-file-alt" style="color:#7c6ff7;"></i> AI Resume Analyzer</div>
        <textarea id="sj-resume-text" class="sj-salary-field" rows="5" placeholder="Paste your CV / resume text here (at least 80 characters)…" style="resize:vertical;width:100%;"></textarea>
        <button id="sj-analyze-btn" class="sj-gen-btn"><i class="fas fa-microscope"></i> Analyze My Resume</button>
        <div id="sj-analysis-result" style="display:none;margin-top:14px;animation:sj-fadeUp .4s ease;"></div>
      </div>`;

    document.getElementById('sj-analyze-btn').addEventListener('click', async () => {
      const text = document.getElementById('sj-resume-text').value.trim();
      if (text.length < 80) { showToast('Paste at least 80 characters of your resume.', 'warn'); return; }
      if (rateLimited()) return;

      const btn = document.getElementById('sj-analyze-btn');
      btn.disabled = true;
      btn.innerHTML = '<span class="sj-spinner"></span> Analyzing…';

      try {
        const raw = await callAI({
          system: 'You are a professional resume reviewer for the Rwandan job market. Analyze the resume and respond ONLY with valid JSON: {"score":0-100,"strengths":["..."],"improvements":["..."]}. score reflects overall quality. 4-5 items each array.',
          messages: [{ role:'user', content:`Analyze this resume:\n\n${text.slice(0, 3500)}` }],
          maxTokens: 600,
        });
        const analysis = safeParseJSON(raw, { score:65, strengths:['Clear structure'], improvements:['Add quantifiable achievements'] });
        const color = analysis.score >= 80 ? '#10b981' : analysis.score >= 60 ? '#f59e0b' : '#ef4444';
        const circ  = Math.PI * 2 * 32;
        const offset = circ - (circ * analysis.score / 100);

        document.getElementById('sj-analysis-result').style.display = 'block';
        document.getElementById('sj-analysis-result').innerHTML = `
          <div class="sj-score-ring">
            <svg viewBox="0 0 80 80" width="80" height="80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#e2e8f0" stroke-width="8"/>
              <circle cx="40" cy="40" r="32" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"
                stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"
                style="transition:stroke-dashoffset 1s ease;"/>
            </svg>
            <div class="sj-score-val" style="color:${color}">${analysis.score}</div>
          </div>
          <div style="font-weight:800;margin-bottom:6px;font-family:'Sora',sans-serif;">✅ Strengths</div>
          <ul class="sj-analysis-list">${(analysis.strengths||[]).map(s=>`<li>✅ ${esc(s)}</li>`).join('')}</ul>
          <div style="font-weight:800;margin:10px 0 6px;font-family:'Sora',sans-serif;">💡 Improvements</div>
          <ul class="sj-analysis-list">${(analysis.improvements||[]).map(s=>`<li>📝 ${esc(s)}</li>`).join('')}</ul>
          <button class="sj-copy-btn" style="margin-top:8px;" onclick="navigator.clipboard.writeText(\`Score: ${analysis.score}/100\nStrengths:\n${(analysis.strengths||[]).join('\n')}\nImprovements:\n${(analysis.improvements||[]).join('\n')}\`)"><i class='fas fa-copy'></i> Copy Analysis</button>`;
      } catch (err) {
        document.getElementById('sj-analysis-result').style.display = 'block';
        document.getElementById('sj-analysis-result').innerHTML = '<p>⚠️ Analysis unavailable. Check your connection and try again.</p>';
        console.error('[SJ Resume]', err);
      }

      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-microscope"></i> Analyze Again';
    });
  }

  /* ══════════════════════════════════════════════════════════
     6. AI SKILL GAP ANALYZER
  ══════════════════════════════════════════════════════════ */
  function initSkillGapAnalyzer() {
    const container = document.getElementById('ai-skill-gap-analyzer');
    if (!container) return;

    injectStyle('sj-gap-styles', `
      .sj-gap-widget { background:linear-gradient(135deg,#d1fae5,#ecfdf5); border-radius:16px; padding:20px; }
      body.dark-mode .sj-gap-widget { background:#022c22!important; }
      .sj-gap-row { display:flex; align-items:center; gap:12px; padding:9px 0; border-bottom:1px solid rgba(0,0,0,.06); }
      .sj-gap-row:last-child { border:none; }
      .sj-gap-label { width:38%; font-size:.83rem; font-weight:700; }
      .sj-gap-bar { flex:1; height:7px; background:#e2e8f0; border-radius:10px; overflow:hidden; }
      .sj-gap-fill { height:100%; background:linear-gradient(90deg,#10b981,#34d399); border-radius:10px; width:0; transition:width 1s ease; }
      .sj-gap-pct { width:35px; text-align:right; font-size:.8rem; font-weight:700; color:#065f46; }
    `);

    container.innerHTML = `
      <div class="sj-gap-widget">
        <div class="sj-salary-title"><i class="fas fa-chart-bar" style="color:#10b981;"></i> AI Skill Gap Analyzer</div>
        <input type="text" id="sj-gap-role" class="sj-salary-field" placeholder="Target role (e.g. Data Analyst)">
        <button id="sj-gap-btn" class="sj-gen-btn"><i class="fas fa-bolt"></i> Analyze Skill Gap</button>
        <div id="sj-gap-result" style="display:none;margin-top:14px;"></div>
      </div>`;

    document.getElementById('sj-gap-btn').addEventListener('click', async () => {
      const role = document.getElementById('sj-gap-role').value.trim();
      if (!role) { showToast('Please enter a target job role.', 'warn'); return; }
      if (rateLimited()) return;

      const btn = document.getElementById('sj-gap-btn');
      btn.disabled = true;
      btn.innerHTML = '<span class="sj-spinner"></span> Analyzing…';

      try {
        const raw = await callAI({
          system: 'You are a career advisor for Rwanda. For a given job role, return ONLY valid JSON: {"skills":[{"name":"...","requiredLevel":0-100,"tip":"one short learning tip"}]} — exactly 6 skills.',
          messages: [{ role:'user', content:`Skills needed for: ${role} in Rwanda` }],
          maxTokens: 500,
        });
        const parsed = safeParseJSON(raw, { skills:[{ name:'Communication', requiredLevel:80, tip:'Practice public speaking' }] });
        const result = document.getElementById('sj-gap-result');
        result.style.display = 'block';
        result.innerHTML = `
          <div style="font-weight:800;margin-bottom:10px;font-family:'Sora',sans-serif;">📊 Skills needed for <em>${esc(role)}</em></div>
          ${parsed.skills.map(s => `
            <div class="sj-gap-row" title="${esc(s.tip || '')}">
              <div class="sj-gap-label">${esc(s.name)}</div>
              <div class="sj-gap-bar"><div class="sj-gap-fill" data-fill="${s.requiredLevel}"></div></div>
              <div class="sj-gap-pct">${s.requiredLevel}%</div>
            </div>`).join('')}
          <div style="margin-top:10px;padding:10px;background:rgba(16,185,129,.1);border-radius:8px;font-size:.78rem;">
            💡 Hover over each skill row for a quick learning tip.
          </div>`;
        /* Animate bars after paint */
        requestAnimationFrame(() => {
          result.querySelectorAll('.sj-gap-fill').forEach(b => { b.style.width = b.dataset.fill + '%'; });
        });
      } catch (err) {
        document.getElementById('sj-gap-result').style.display = 'block';
        document.getElementById('sj-gap-result').innerHTML = '<p>⚠️ Analysis unavailable. Please try again.</p>';
        console.error('[SJ Skill Gap]', err);
      }

      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-bolt"></i> Analyze Again';
    });
  }

  /* ══════════════════════════════════════════════════════════
     7. AI INTERVIEW EMAIL GENERATOR
  ══════════════════════════════════════════════════════════ */
  function initInterviewEmail() {
    window.generateInterviewEmail = async function () {
      if (rateLimited()) return;
      const btn = document.getElementById('generate-email-btn');
      if (btn) { btn.disabled = true; btn.innerHTML = '<span class="sj-spinner"></span> Generating…'; }

      const candidate = $('#candidate-name')?.value || 'Candidate';
      const position  = $('#position-name')?.value  || 'the position';
      const company   = $('#company-name')?.value   || 'our company';
      const date      = $('#interview-date')?.value || 'next week';
      const format    = $('select[name="interview-type"]')?.value || 'in-person';

      try {
        const text = await callAI({
          system: 'You are a professional HR manager in Rwanda. Write a polished interview invitation email. Include subject line, personalized greeting, date/time/format details, preparation tips, and a warm closing. Rwanda-specific cultural warmth.',
          messages: [{ role:'user', content:`Invite ${candidate} for a ${format} interview for ${position} at ${company} on ${date}.` }],
          maxTokens: 500,
        });
        const out = document.getElementById('email-output');
        if (out) {
          out.style.display = 'block';
          out.value = text;
          out.style.animation = 'sj-fadeUp .4s ease';
          showToast('Interview email generated ✓', 'success');
        }
      } catch (err) {
        const out = document.getElementById('email-output');
        if (out) { out.style.display = 'block'; out.value = '⚠️ Could not generate. Please try again.'; }
        console.error('[SJ Email]', err);
      }

      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-envelope"></i> Generate Email'; }
    };
  }

  /* ══════════════════════════════════════════════════════════
     8. AI JOB DESCRIPTION ENHANCER
  ══════════════════════════════════════════════════════════ */
  function initJDEnhancer() {
    window.enhanceJobDescription = async function () {
      const desc = $('#job-description-input')?.value?.trim();
      if (!desc || desc.length < 50) { showToast('Please enter at least 50 characters.', 'warn'); return; }
      if (rateLimited()) return;

      const btn = document.getElementById('enhance-jd-btn');
      if (btn) { btn.disabled = true; btn.innerHTML = '<span class="sj-spinner"></span> Enhancing…'; }

      try {
        const text = await callAI({
          system: 'You are a professional job description writer for Rwanda. Rewrite and enhance the description into clear sections: Role Summary, Key Responsibilities, Requirements, Nice-to-Have, Benefits. Make it inclusive, attractive to Rwandan job seekers, and ATS-optimised.',
          messages: [{ role:'user', content:`Enhance this job description:\n\n${desc}` }],
        });
        const out = document.getElementById('enhanced-description');
        if (out) {
          out.style.display = 'block';
          out.value = text;
          showToast('Job description enhanced ✓', 'success');
        }
      } catch (err) {
        const out = document.getElementById('enhanced-description');
        if (out) { out.style.display = 'block'; out.value = '⚠️ Enhancement unavailable. Try again.'; }
        console.error('[SJ JD]', err);
      }

      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-magic"></i> Enhance Description'; }
    };
  }

  /* ══════════════════════════════════════════════════════════
     9. AI CAREER PATH RECOMMENDER
  ══════════════════════════════════════════════════════════ */
  function initCareerPath() {
    injectStyle('sj-career-styles', `
      .sj-career-widget { background:linear-gradient(135deg,#f3e8ff,#faf5ff); border-radius:16px; padding:20px; }
      body.dark-mode .sj-career-widget { background:#2e1065!important; }
      .sj-path-step { display:flex; gap:14px; padding:10px 0; border-bottom:1px solid rgba(0,0,0,.06); align-items:flex-start; }
      .sj-path-step:last-child { border:none; }
      .sj-path-num { width:28px; height:28px; border-radius:50%; background:linear-gradient(135deg,#3b2fc9,#6d51f7); color:white; font-weight:800; font-size:.75rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; }
      .sj-path-info h4 { font-size:.87rem; font-weight:800; margin-bottom:2px; }
      .sj-path-info p { font-size:.77rem; color:#64748b; line-height:1.5; }
    `);

    window.recommendCareerPath = async function () {
      const currentRole = $('#current-role')?.value?.trim();
      if (!currentRole) { showToast('Please enter your current role.', 'warn'); return; }
      if (rateLimited()) return;

      const interests  = $('#career-interests')?.value?.trim() || 'general growth';
      const experience = $('#years-experience')?.value || '3';
      const btn        = document.getElementById('recommend-btn');
      if (btn) { btn.disabled = true; btn.innerHTML = '<span class="sj-spinner"></span> Analyzing…'; }

      try {
        const raw = await callAI({
          system: 'You are a career path advisor for Rwanda\'s job market. Return ONLY valid JSON: {"paths":[{"title":"...","timeline":"e.g. 1-2 years","skills":["..."],"salaryIncrease":"e.g. +30%","reason":"one sentence why"}]} — 4 paths.',
          messages: [{ role:'user', content:`Current role: ${currentRole}. Experience: ${experience} years. Interests: ${interests}. Recommend career paths in Rwanda.` }],
          maxTokens: 700,
        });
        const parsed = safeParseJSON(raw, { paths:[{ title:'Senior ' + currentRole, timeline:'2 years', skills:['Leadership'], salaryIncrease:'+25%', reason:'Natural progression' }] });
        const out = document.getElementById('career-recommendations');
        if (out) {
          out.style.display = 'block';
          out.innerHTML = `
            <div style="font-weight:800;margin-bottom:12px;font-family:'Sora',sans-serif;">🗺 Career Paths from <em>${esc(currentRole)}</em></div>
            ${parsed.paths.map((p, i) => `
              <div class="sj-path-step">
                <div class="sj-path-num">${i + 1}</div>
                <div class="sj-path-info">
                  <h4>${esc(p.title)} <span style="font-weight:600;font-size:.75rem;color:#10b981;">${esc(p.salaryIncrease)}</span></h4>
                  <p>⏱ ${esc(p.timeline)} · Skills: ${p.skills.map(esc).join(', ')}</p>
                  <p>${esc(p.reason)}</p>
                </div>
              </div>`).join('')}`;
        }
      } catch (err) {
        const out = document.getElementById('career-recommendations');
        if (out) { out.style.display = 'block'; out.innerHTML = '<p>⚠️ Recommendations unavailable. Try again.</p>'; }
        console.error('[SJ Career]', err);
      }

      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-chart-line"></i> Get Recommendations'; }
    };
  }

  /* ══════════════════════════════════════════════════════════
     10. AI JOB FIT SCORER  (NEW)
         Adds a "% Match" badge to any .job-card on the page
         Uses the user's stored skills + job card text.
  ══════════════════════════════════════════════════════════ */
  function initJobFitScorer() {
    injectStyle('sj-fit-styles', `
      .sj-fit-badge {
        display:inline-flex; align-items:center; gap:4px; padding:3px 9px;
        border-radius:20px; font-size:.7rem; font-weight:800; cursor:help;
        font-family:'Plus Jakarta Sans',sans-serif;
      }
      .sj-fit-high   { background:#d1fae5; color:#065f46; }
      .sj-fit-medium { background:#fef3c7; color:#92400e; }
      .sj-fit-low    { background:#fee2e2; color:#991b1b; }
      .sj-fit-loading { background:#e2e8f0; color:#94a3b8; }
    `);

    const userProfile = (() => {
      try {
        const u = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const skills = (u.skills || []).join(', ') || 'general professional skills';
        const title  = u.title || u.jobTitle || '';
        return `Job seeker profile — Title: ${title || 'not specified'}. Skills: ${skills}.`;
      } catch { return 'general professional'; }
    })();

    let scoredCards = 0;
    const MAX_AUTO_SCORE = 6;

    function scoreCard(card) {
      if (card.querySelector('.sj-fit-badge')) return;
      const title   = card.querySelector('h3,h4,.job-title,.app-title')?.textContent?.trim() || '';
      const company = card.querySelector('.job-company,.app-company-name,p')?.textContent?.trim() || '';
      const tags    = [...card.querySelectorAll('.job-tag,small')].map(t => t.textContent).join(', ');
      if (!title) return;

      const badge = document.createElement('span');
      badge.className = 'sj-fit-badge sj-fit-loading';
      badge.textContent = '… matching';
      const footer = card.querySelector('.job-card-footer, .cv-card-footer') || card;
      footer.prepend(badge);

      if (rateLimited()) {
        badge.className = 'sj-fit-badge sj-fit-medium';
        badge.textContent = '⚡ Match';
        return;
      }

      callAI({
        system: `You are a job fit scorer. Given a job seeker profile and a job listing, respond with ONLY a JSON object: {"score":0-100,"label":"High Match"|"Good Match"|"Fair Match"|"Low Match"}. Be concise.`,
        messages: [{ role:'user', content:`Profile: ${userProfile}\n\nJob: ${title} at ${company}. Skills/Tags: ${tags}` }],
        maxTokens: 60,
      }).then(raw => {
        const data = safeParseJSON(raw, { score:70, label:'Good Match' });
        const score = Math.min(100, Math.max(0, data.score));
        const cls   = score >= 80 ? 'sj-fit-high' : score >= 55 ? 'sj-fit-medium' : 'sj-fit-low';
        badge.className = `sj-fit-badge ${cls}`;
        badge.textContent = `⚡ ${score}% ${data.label}`;
        badge.title = `AI Job Fit Score: ${score}/100`;
      }).catch(() => {
        badge.remove();
      });
    }

    /* Score visible job cards on page */
    function scoreVisibleCards() {
      const cards = $$('.job-card, .recommended-card');
      cards.slice(0, MAX_AUTO_SCORE).forEach(c => {
        if (scoredCards >= MAX_AUTO_SCORE) return;
        scoredCards++;
        setTimeout(() => scoreCard(c), scoredCards * 500);
      });
    }

    /* Run after a short delay and also watch for new cards */
    setTimeout(scoreVisibleCards, 1800);
    const obs = new MutationObserver(() => {
      if (scoredCards < MAX_AUTO_SCORE) scoreVisibleCards();
    });
    obs.observe(document.body, { childList:true, subtree:true });

    /* Public API for manual scoring */
    window.sjScoreJobCard = scoreCard;
  }

  /* ══════════════════════════════════════════════════════════
     FOOTER LINKS  (auto-fix placeholder hrefs)
  ══════════════════════════════════════════════════════════ */
  function fixFooterLinks() {
    const MAP = { 'Help Center':'help.html', 'Privacy Policy':'privacy.html', 'Terms of Use':'terms.html', 'Hiring Solutions':'employer-hub.html' };
    $$('.main-footer a, footer a').forEach(a => {
      const key = a.textContent.trim();
      if (a.getAttribute('href') === '#' && MAP[key]) a.href = MAP[key];
    });
  }

  /* ══════════════════════════════════════════════════════════
     BOOTSTRAP — init all features
  ══════════════════════════════════════════════════════════ */
  function run() {
    initDarkMode();
    initAIChat();
    initCoverLetter();
    initSalaryPredictor();
    initResumeAnalyzer();
    initSkillGapAnalyzer();
    initInterviewEmail();
    initJDEnhancer();
    initCareerPath();
    initJobFitScorer();
    fixFooterLinks();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', run)
    : run();

})();
