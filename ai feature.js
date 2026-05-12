/* ============================================================
   smartJobs Rwanda — AI Features Pack v3.0 (Enhanced)
   Includes:
   1. 🌙 Dark Mode Toggle (persisted)
   2. 🤖 AI Job Match Assistant (floating chat bubble)
   3. ✍️ AI Cover Letter Generator (in apply modal)
   4. 📊 AI Salary Predictor (new)
   5. 📝 AI Resume Analyzer (new)
   6. 🎯 AI Skill Gap Analyzer (new)
   7. 📧 AI Interview Email Generator (new)
   8. 🔍 AI Job Description Enhancer (new)
   9. 💬 AI Chatbot with Multiple Personas (new)
   10. 📈 AI Career Path Recommender (new)
   ============================================================ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     1. DARK MODE (Enhanced with system preference detection)
  ══════════════════════════════════════════════════════════ */
  function initDarkMode() {
    // Inject dark mode CSS variables
    const darkStyle = document.createElement('style');
    darkStyle.id = 'dark-mode-styles';
    darkStyle.textContent = `
      body.dark-mode {
        --indigo:        #7c6ff7;
        --indigo-dark:   #6257e0;
        --indigo-mid:    #8b7ff8;
        --indigo-light:  #1e1a4a;
        --indigo-glow:   rgba(124,111,247,.25);
        --emerald:       #34d399;
        --emerald-dark:  #10b981;
        --emerald-light: #022c22;
        --text:          #f1f5f9;
        --text-2:        #cbd5e1;
        --muted:         #94a3b8;
        --border:        #1e293b;
        --border-focus:  #4338ca;
        --surface:       #0f172a;
        --bg:            #020617;
        --bg-2:          #0f172a;
        background: #020617;
        color: #f1f5f9;
      }
      body.dark-mode .top-nav {
        background: rgba(2,6,23,.92) !important;
        border-bottom-color: #1e293b !important;
      }
      body.dark-mode .job-card,
      body.dark-mode .salary-card,
      body.dark-mode .section-card,
      body.dark-mode .stat-card,
      body.dark-mode .auth-card,
      body.dark-mode .sidebar,
      body.dark-mode .editor-side {
        background: #0f172a !important;
        border-color: #1e293b !important;
        color: #f1f5f9 !important;
      }
      body.dark-mode .auth-input,
      body.dark-mode input,
      body.dark-mode textarea,
      body.dark-mode select {
        background: #1e293b !important;
        border-color: #334155 !important;
        color: #f1f5f9 !important;
      }
      body.dark-mode .main-menu a { color: #94a3b8 !important; }
      body.dark-mode .main-menu a:hover,
      body.dark-mode .main-menu a.active { color: var(--indigo) !important; }
      body.dark-mode .search-hero,
      body.dark-mode .hero-blue { background: linear-gradient(135deg, #0a0520 0%, #1a1060 100%) !important; }
      body.dark-mode .hub-hero { filter: brightness(0.7); }
      body.dark-mode .main-footer { background: #020617 !important; border-top-color: #1e293b !important; }
      body.dark-mode .cv-paper { background: #0f172a !important; box-shadow: 0 16px 48px rgba(0,0,0,.6) !important; }
      body.dark-mode .application-item { background: #1e293b !important; }
      body.dark-mode .industry-card { background: #0f172a !important; border-color: #1e293b !important; color: #f1f5f9 !important; }
      body.dark-mode .industry-card:hover { background: #1e1a4a !important; }
      body.dark-mode hr { border-color: #1e293b !important; }
      body.dark-mode p, body.dark-mode span, body.dark-mode h1, body.dark-mode h2, body.dark-mode h3, body.dark-mode h4 { color: inherit; }
      body.dark-mode .sj-logo-pill { box-shadow: 0 3px 14px rgba(124,111,247,.4) !important; }
      body.dark-mode .filter-btn { background: #1e293b !important; color: #94a3b8 !important; border-color: #334155 !important; }
      body.dark-mode .filter-btn.active { background: var(--indigo) !important; color: white !important; }
      body.dark-mode .nav-btn-ghost { color: #94a3b8 !important; }
      body.dark-mode .nav-btn-ghost:hover { background: #1e293b !important; color: #f1f5f9 !important; }
      body.dark-mode .modal-overlay { background: rgba(2,6,23,.85) !important; }
      body.dark-mode .modal-box { background: #0f172a !important; border-color: #1e293b !important; }
      body.dark-mode .jobs-table th, body.dark-mode .jobs-table td { border-color: #1e293b !important; color: #f1f5f9 !important; }
      body.dark-mode .jobs-table tr:hover td { background: #1e293b !important; }
      body.dark-mode .section-header { border-color: #1e293b !important; }
      body.dark-mode .parallax-banner-overlay { background: rgba(2,6,23,.7) !important; }
    `;
    document.head.appendChild(darkStyle);

    // Create dark mode toggle button with animation
    const toggle = document.createElement('button');
    toggle.id = 'dark-mode-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = `<span class="dm-icon">🌙</span><span class="dm-text">Dark</span>`;
    toggle.style.cssText = `
      position: fixed;
      bottom: 28px;
      left: 28px;
      padding: 10px 18px;
      border-radius: 40px;
      background: linear-gradient(135deg, #1e293b, #0f172a);
      border: 2px solid #334155;
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
      z-index: 9990;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
      font-weight: 600;
      font-family: 'Plus Jakarta Sans', sans-serif;
    `;
    
    toggle.addEventListener('mouseenter', () => {
      toggle.style.transform = 'scale(1.05) translateY(-2px)';
      toggle.style.boxShadow = '0 8px 28px rgba(0,0,0,0.4)';
    });
    toggle.addEventListener('mouseleave', () => {
      toggle.style.transform = 'scale(1) translateY(0)';
      toggle.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    });

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDark = localStorage.getItem('sj-dark-mode');
    const isDark = savedDark !== null ? savedDark === 'true' : prefersDark;
    
    if (isDark) {
      document.body.classList.add('dark-mode');
      toggle.querySelector('.dm-icon').textContent = '☀️';
      toggle.querySelector('.dm-text').textContent = 'Light';
    }

    toggle.addEventListener('click', () => {
      const isNowDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('sj-dark-mode', isNowDark);
      toggle.querySelector('.dm-icon').textContent = isNowDark ? '☀️' : '🌙';
      toggle.querySelector('.dm-text').textContent = isNowDark ? 'Light' : 'Dark';
      // Bounce animation
      toggle.style.transform = 'scale(0.85)';
      setTimeout(() => { toggle.style.transform = 'scale(1)'; }, 150);
    });

    document.body.appendChild(toggle);
  }

  /* ══════════════════════════════════════════════════════════
     2. AI JOB MATCH ASSISTANT (Enhanced with Personas)
  ══════════════════════════════════════════════════════════ */
  function initAIAssistant() {
    const style = document.createElement('style');
    style.textContent = `
      #ai-bubble-btn {
        position: fixed;
        bottom: 28px;
        right: 28px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b2fc9, #6d51f7);
        border: none;
        color: white;
        font-size: 1.6rem;
        cursor: pointer;
        z-index: 9990;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 24px rgba(59,47,201,.45);
        transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s;
        animation: ai-pulse 3s ease infinite;
      }
      @keyframes ai-pulse {
        0%, 100% { box-shadow: 0 6px 24px rgba(59,47,201,.45); }
        50% { box-shadow: 0 6px 40px rgba(59,47,201,.7); }
      }
      #ai-bubble-btn:hover { transform: scale(1.1) translateY(-3px); }
      #ai-bubble-badge {
        position: absolute;
        top: -4px; right: -4px;
        width: 18px; height: 18px;
        background: #10b981;
        border-radius: 50%;
        border: 2px solid white;
        animation: notif-ping 2s ease infinite;
        font-size: 0;
      }
      #ai-chat-panel {
        position: fixed;
        bottom: 100px;
        right: 28px;
        width: 420px;
        max-height: 600px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(59,47,201,.25);
        border: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        z-index: 9989;
        transform: scale(0.85) translateY(20px);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(.34,1.56,.64,1);
        overflow: hidden;
      }
      body.dark-mode #ai-chat-panel { background: #0f172a !important; border-color: #1e293b !important; }
      #ai-chat-panel.open {
        transform: scale(1) translateY(0);
        opacity: 1;
        pointer-events: all;
      }
      .ai-chat-header {
        background: linear-gradient(135deg, #3b2fc9, #6d51f7);
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: white;
      }
      .ai-chat-avatar {
        width: 42px; height: 42px;
        background: rgba(255,255,255,.2);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.3rem;
        flex-shrink: 0;
      }
      .ai-chat-title { font-weight: 800; font-size: 1rem; font-family: 'Sora', sans-serif; }
      .ai-chat-sub { font-size: .7rem; opacity: .8; }
      .ai-close-btn { margin-left: auto; background: none; border: none; color: white; cursor: pointer; font-size: 1.1rem; opacity: .8; transition: opacity .2s; }
      .ai-close-btn:hover { opacity: 1; }
      .ai-persona-selector {
        padding: 10px 16px;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      body.dark-mode .ai-persona-selector { background: #1e293b; border-color: #334155; }
      .ai-persona-btn {
        padding: 5px 12px;
        border-radius: 20px;
        border: 1.5px solid #c7d2fe;
        background: white;
        font-size: .75rem;
        font-weight: 600;
        cursor: pointer;
        transition: all .2s;
        color: #3b2fc9;
      }
      body.dark-mode .ai-persona-btn { background: #0f172a; border-color: #4338ca; color: #7c6ff7; }
      .ai-persona-btn.active {
        background: linear-gradient(135deg, #3b2fc9, #6d51f7);
        color: white;
        border-color: transparent;
      }
      .ai-persona-btn:hover { transform: translateY(-1px); }
      .ai-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-height: 320px;
        min-height: 300px;
      }
      .ai-messages::-webkit-scrollbar { width: 4px; }
      .ai-messages::-webkit-scrollbar-track { background: #f1f5f9; }
      .ai-messages::-webkit-scrollbar-thumb { background: #3b2fc9; border-radius: 4px; }
      .ai-msg {
        max-width: 85%;
        padding: 12px 16px;
        border-radius: 16px;
        font-size: .85rem;
        line-height: 1.5;
        animation: fadeSlideUp .3s ease;
      }
      .ai-msg.bot {
        background: #f1f5f9;
        border-bottom-left-radius: 4px;
        align-self: flex-start;
        color: #0f172a;
      }
      body.dark-mode .ai-msg.bot { background: #1e293b !important; color: #f1f5f9 !important; }
      .ai-msg.user {
        background: linear-gradient(135deg, #3b2fc9, #6d51f7);
        color: white;
        border-bottom-right-radius: 4px;
        align-self: flex-end;
      }
      .ai-msg.typing span {
        display: inline-block;
        width: 7px; height: 7px;
        background: #94a3b8;
        border-radius: 50%;
        margin: 0 2px;
        animation: dot-bounce .9s ease infinite;
      }
      .ai-msg.typing span:nth-child(2) { animation-delay: .15s; }
      .ai-msg.typing span:nth-child(3) { animation-delay: .3s; }
      .ai-input-row {
        padding: 12px 16px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      body.dark-mode .ai-input-row { border-color: #1e293b !important; }
      .ai-input-row input {
        flex: 1;
        padding: 10px 14px;
        border: 1.5px solid #e2e8f0;
        border-radius: 12px;
        font-size: .85rem;
        outline: none;
        font-family: 'Plus Jakarta Sans', sans-serif;
        background: #f8fafc;
        color: #0f172a;
        transition: border-color .2s;
      }
      body.dark-mode .ai-input-row input { background: #1e293b !important; border-color: #334155 !important; color: #f1f5f9 !important; }
      .ai-input-row input:focus { border-color: #3b2fc9; background: white; }
      .ai-send-btn {
        width: 38px; height: 38px;
        background: linear-gradient(135deg, #3b2fc9, #6d51f7);
        border: none;
        border-radius: 10px;
        color: white;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: transform .2s, box-shadow .2s;
        flex-shrink: 0;
      }
      .ai-send-btn:hover { transform: scale(1.08); box-shadow: 0 4px 12px rgba(59,47,201,.4); }
      .ai-quick-chips {
        display: flex; flex-wrap: wrap; gap: 6px; padding: 0 16px 12px;
      }
      .ai-chip {
        padding: 5px 12px;
        background: #ede9ff;
        color: #3b2fc9;
        border: none;
        border-radius: 20px;
        font-size: .73rem;
        font-weight: 600;
        cursor: pointer;
        transition: all .2s;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      body.dark-mode .ai-chip { background: #1e1a4a !important; color: #7c6ff7 !important; }
      .ai-chip:hover { background: #3b2fc9; color: white; transform: translateY(-1px); }
      @media (max-width: 480px) {
        #ai-chat-panel { width: calc(100vw - 32px); right: 16px; bottom: 90px; }
      }
    `;
    document.head.appendChild(style);

    // Build the UI
    const bubbleBtn = document.createElement('button');
    bubbleBtn.id = 'ai-bubble-btn';
    bubbleBtn.innerHTML = `🤖<span id="ai-bubble-badge"></span>`;

    const panel = document.createElement('div');
    panel.id = 'ai-chat-panel';
    panel.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-chat-avatar">🤖</div>
        <div>
          <div class="ai-chat-title">SmartMatch AI</div>
          <div class="ai-chat-sub">● Online — Career Assistant</div>
        </div>
        <button class="ai-close-btn" id="ai-close">✕</button>
      </div>
      <div class="ai-persona-selector" id="ai-persona-selector">
        <button class="ai-persona-btn active" data-persona="career">💼 Career Coach</button>
        <button class="ai-persona-btn" data-persona="salary">💰 Salary Expert</button>
        <button class="ai-persona-btn" data-persona="cv">📄 CV Advisor</button>
        <button class="ai-persona-btn" data-persona="interview">🎯 Interview Prep</button>
      </div>
      <div class="ai-messages" id="ai-messages">
        <div class="ai-msg bot">👋 Hi! I'm SmartMatch AI. Choose a persona above or ask me anything about jobs in Rwanda!</div>
      </div>
      <div class="ai-quick-chips" id="ai-chips">
        <button class="ai-chip" data-chip="tech">💻 Tech jobs in Kigali</button>
        <button class="ai-chip" data-chip="cv">📄 CV writing tips</button>
        <button class="ai-chip" data-chip="salary">💰 Salary expectations</button>
        <button class="ai-chip" data-chip="interview">🎯 Interview questions</button>
        <button class="ai-chip" data-chip="companies">🏢 Top employers</button>
      </div>
      <div class="ai-input-row">
        <input type="text" id="ai-user-input" placeholder="Ask me anything about your career..." />
        <button class="ai-send-btn" id="ai-send-btn"><i class="fas fa-paper-plane"></i></button>
      </div>
    `;

    document.body.appendChild(bubbleBtn);
    document.body.appendChild(panel);

    let currentPersona = 'career';

    // Persona system prompts
    const personaPrompts = {
      career: "You are a career coach for smartJobs Rwanda. Help users find their ideal career path, suggest job opportunities, and provide career development advice. Be encouraging and practical. Keep responses under 120 words.",
      salary: "You are a salary expert for the Rwandan job market. Provide accurate salary ranges for different roles in Rwanda. Use data: Software Engineers (1.2M-2M RWF), Accountants (600K-1M RWF), Doctors (1.5M-3M RWF), Data Analysts (800K-1.5M RWF), Project Managers (1M-1.8M RWF). Be specific and helpful.",
      cv: "You are a CV writing expert. Help users improve their resumes with specific tips for the Rwandan job market. Suggest formats, keywords, and strategies to stand out. Give actionable advice.",
      interview: "You are an interview preparation expert. Help users prepare for job interviews in Rwanda. Provide common questions, answer frameworks, and tips for success in Rwandan companies."
    };

    // Update persona buttons
    document.querySelectorAll('.ai-persona-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ai-persona-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPersona = btn.dataset.persona;
        const welcomeMsgs = {
          career: "💼 I'm now your Career Coach! Need help finding your dream job or planning your career path?",
          salary: "💰 I'm your Salary Expert! Ask me about salary ranges for any role in Rwanda.",
          cv: "📄 I'm your CV Advisor! Let me help you create a standout resume.",
          interview: "🎯 I'm your Interview Prep Coach! Ready to practice interview questions?"
        };
        addAIMessage(welcomeMsgs[currentPersona] || "How can I help you today?", 'bot');
      });
    });

    bubbleBtn.addEventListener('click', () => {
      panel.classList.toggle('open');
      document.getElementById('ai-bubble-badge').style.display = 'none';
      if (panel.classList.contains('open')) {
        setTimeout(() => document.getElementById('ai-user-input')?.focus(), 300);
      }
    });
    document.getElementById('ai-close').addEventListener('click', () => panel.classList.remove('open'));

    // Chip clicks
    document.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const chipText = chip.dataset.chip;
        const messages = {
          tech: "What are the best tech jobs in Kigali right now?",
          cv: "How can I make my CV stand out to employers in Rwanda?",
          salary: "What is the average salary for different roles in Rwanda?",
          interview: "What are common interview questions in Rwanda?",
          companies: "Which are the top companies hiring in Rwanda?"
        };
        document.getElementById('ai-user-input').value = messages[chipText] || chip.textContent;
        sendAIMessage();
      });
    });

    // Enter key to send
    document.getElementById('ai-user-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendAIMessage();
    });
    document.getElementById('ai-send-btn').addEventListener('click', () => sendAIMessage());

    function addAIMessage(text, sender) {
      const msgs = document.getElementById('ai-messages');
      const msgDiv = document.createElement('div');
      msgDiv.className = `ai-msg ${sender}`;
      msgDiv.textContent = text;
      msgs.appendChild(msgDiv);
      msgs.scrollTop = msgs.scrollHeight;
    }

    window.sendAIMessage = async function() {
      const input = document.getElementById('ai-user-input');
      const text = input.value.trim();
      if (!text) return;

      const msgs = document.getElementById('ai-messages');
      input.value = '';

      // Add user message
      addAIMessage(text, 'user');

      // Typing indicator
      const typing = document.createElement('div');
      typing.className = 'ai-msg bot typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(typing);
      msgs.scrollTop = msgs.scrollHeight;

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: personaPrompts[currentPersona] + " Be concise, friendly, and Rwanda-specific. Use emojis occasionally. Keep responses under 120 words.",
            messages: [{ role: 'user', content: text }]
          })
        });
        const data = await response.json();
        typing.remove();

        const botText = data.content?.[0]?.text || 'Sorry, I couldn\'t get a response. Please try again!';
        addAIMessage(botText, 'bot');
      } catch {
        typing.remove();
        addAIMessage('⚠️ Connection issue. Please check your network and try again.', 'bot');
      }
    };
  }

  /* ══════════════════════════════════════════════════════════
     3. AI COVER LETTER GENERATOR (Enhanced)
  ══════════════════════════════════════════════════════════ */
  function initAICoverLetter() {
    const style = document.createElement('style');
    style.textContent = `
      .ai-cover-section {
        border: 2px dashed #c7d2fe;
        border-radius: 16px;
        padding: 20px;
        margin-top: 16px;
        background: linear-gradient(135deg, #f8f7ff, #faf9ff);
        transition: all .3s;
      }
      body.dark-mode .ai-cover-section { background: #1e1a4a !important; border-color: #4338ca !important; }
      .ai-cover-section:hover { border-color: #3b2fc9; transform: translateY(-2px); }
      .ai-cover-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 800;
        font-size: .85rem;
        color: #3b2fc9;
        margin-bottom: 12px;
        font-family: 'Sora', sans-serif;
      }
      .ai-cover-label .ai-spark { animation: spin-slow 4s linear infinite; display: inline-block; }
      .ai-gen-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(135deg, #3b2fc9, #6d51f7);
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 10px;
        font-size: .82rem;
        font-weight: 700;
        cursor: pointer;
        transition: all .2s;
        width: 100%;
        justify-content: center;
      }
      .ai-gen-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 24px rgba(59,47,201,.35); }
      .ai-gen-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
      .ai-gen-btn .btn-spinner {
        width: 14px; height: 14px;
        border: 2px solid rgba(255,255,255,.4);
        border-top-color: white;
        border-radius: 50%;
        animation: spin-slow .7s linear infinite;
      }
      .ai-cover-tone {
        display: flex;
        gap: 10px;
        margin: 10px 0;
      }
      .tone-btn {
        padding: 4px 12px;
        border-radius: 20px;
        border: 1px solid #c7d2fe;
        background: white;
        font-size: .7rem;
        font-weight: 600;
        cursor: pointer;
        transition: all .2s;
      }
      .tone-btn.active {
        background: #3b2fc9;
        color: white;
        border-color: #3b2fc9;
      }
      body.dark-mode .tone-btn { background: #1e293b; border-color: #4338ca; color: #cbd5e1; }
      #ai-cover-output {
        width: 100%;
        min-height: 140px;
        margin-top: 12px;
        padding: 12px;
        border: 1.5px solid #c7d2fe;
        border-radius: 10px;
        font-size: .83rem;
        line-height: 1.6;
        font-family: 'Plus Jakarta Sans', sans-serif;
        resize: vertical;
        display: none;
        background: white;
        color: #0f172a;
        transition: all .2s;
      }
      body.dark-mode #ai-cover-output { background: #1e293b !important; color: #f1f5f9 !important; border-color: #334155 !important; }
      #ai-cover-output:focus { border-color: #3b2fc9; outline: none; }
      .ai-cover-hint {
        font-size: .73rem;
        color: #94a3b8;
        margin-top: 6px;
        display: none;
      }
    `;
    document.head.appendChild(style);

    // Patch the existing openApplyModal to add AI section
    const origOpen = window.openApplyModal;
    if (typeof origOpen === 'function') {
      window.openApplyModal = function(jobId) {
        origOpen(jobId);
        setTimeout(() => injectAICoverSection(jobId), 100);
      };
    } else {
      const observer = new MutationObserver(() => {
        const modal = document.querySelector('.modal-overlay, #apply-modal');
        if (modal && !modal.classList.contains('hidden') && !document.getElementById('ai-cover-section-injected')) {
          injectAICoverSection(null);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }
  }

  function injectAICoverSection(jobId) {
    const msgArea = document.getElementById('apply-message') || document.querySelector('#apply-modal textarea');
    if (!msgArea || document.getElementById('ai-cover-section-injected')) return;

    const jobTitle = document.getElementById('apply-job-title')?.textContent ||
                     document.querySelector('.modal-job-title')?.textContent || 
                     document.querySelector('.detail-title')?.textContent ||
                     'this position';

    const section = document.createElement('div');
    section.className = 'ai-cover-section';
    section.id = 'ai-cover-section-injected';
    section.innerHTML = `
      <div class="ai-cover-label">
        <span class="ai-spark">✨</span> AI Cover Letter Generator
        <span style="margin-left:auto; font-size:.7rem;">Powered by Claude AI</span>
      </div>
      <div class="ai-cover-tone">
        <button class="tone-btn active" data-tone="professional">Professional</button>
        <button class="tone-btn" data-tone="enthusiastic">Enthusiastic</button>
        <button class="tone-btn" data-tone="concise">Concise</button>
        <button class="tone-btn" data-tone="creative">Creative</button>
      </div>
      <button class="ai-gen-btn" id="ai-gen-cover-btn">
        <i class="fas fa-magic"></i> Generate Cover Letter
      </button>
      <textarea id="ai-cover-output" placeholder="Your AI-generated cover letter will appear here..."></textarea>
      <p class="ai-cover-hint" id="ai-cover-hint">✅ Edit freely above, then click "Submit Application" to send it.</p>
    `;

    msgArea.parentNode.insertBefore(section, msgArea);

    let currentTone = 'professional';

    document.querySelectorAll('.tone-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTone = btn.dataset.tone;
      });
    });

    document.getElementById('ai-cover-output').addEventListener('input', (e) => {
      msgArea.value = e.target.value;
    });

    window.generateAICoverLetter = async function(jobTitleParam) {
      const btn = document.getElementById('ai-gen-cover-btn');
      const output = document.getElementById('ai-cover-output');
      const hint = document.getElementById('ai-cover-hint');
      const msgAreaTarget = document.getElementById('apply-message') || document.querySelector('#apply-modal textarea');

      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const userName = user.name || 'a qualified professional';
      const company = document.querySelector('.apply-modal-header-company')?.textContent?.split('•')[0]?.trim() || 'the company';

      const toneInstructions = {
        professional: "Write a professional, formal cover letter. Use standard business language, highlight qualifications, and maintain a respectful tone.",
        enthusiastic: "Write an energetic, passionate cover letter. Show excitement about the role and company. Use positive, engaging language.",
        concise: "Write a brief, to-the-point cover letter. Focus only on key qualifications and direct value proposition. Keep it under 120 words.",
        creative: "Write a creative, memorable cover letter. Use storytelling elements, show personality, and stand out from typical applications."
      };

      btn.disabled = true;
      btn.innerHTML = `<div class="btn-spinner"></div> Generating ${currentTone} letter...`;

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: `You are an expert cover letter writer for the Rwandan job market. ${toneInstructions[currentTone]} Write in first person. Start directly with enthusiasm. No "Dear Hiring Manager" salutation. No sign-off needed. Use the applicant's name: ${userName}. Target company: ${company}.`,
            messages: [{
              role: 'user',
              content: `Write a cover letter for a job application. The job role is: ${jobTitleParam || jobTitle}. Make it persuasive and tailored to the Rwandan job market.`
            }]
          })
        });
        const data = await response.json();
        const text = data.content?.[0]?.text || 'Could not generate. Please write your cover letter manually.';

        output.style.display = 'block';
        output.value = text;
        if (msgAreaTarget) msgAreaTarget.value = text;
        if (hint) hint.style.display = 'block';

        output.style.opacity = '0';
        output.style.transform = 'translateY(10px)';
        output.style.transition = 'all .4s ease';
        setTimeout(() => { output.style.opacity = '1'; output.style.transform = 'translateY(0)'; }, 50);

      } catch {
        output.style.display = 'block';
        output.value = '⚠️ Could not connect to AI. Please write your cover letter manually.';
      }

      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-sync-alt"></i> Regenerate (${currentTone})`;
    };
  }

  /* ══════════════════════════════════════════════════════════
     4. AI SALARY PREDICTOR (New)
  ══════════════════════════════════════════════════════════ */
  function initAISalaryPredictor() {
    const salaryData = {
      'Software Engineer': { min: 1200000, max: 2500000, avg: 1800000 },
      'Data Analyst': { min: 800000, max: 1500000, avg: 1100000 },
      'Accountant': { min: 600000, max: 1200000, avg: 850000 },
      'Project Manager': { min: 1000000, max: 2000000, avg: 1500000 },
      'Marketing Manager': { min: 800000, max: 1800000, avg: 1300000 },
      'Sales Executive': { min: 500000, max: 1200000, avg: 800000 },
      'HR Manager': { min: 700000, max: 1500000, avg: 1100000 },
      'Medical Doctor': { min: 1500000, max: 3500000, avg: 2500000 },
      'Nurse': { min: 400000, max: 800000, avg: 600000 },
      'Teacher': { min: 300000, max: 700000, avg: 500000 },
      'Agronomist': { min: 400000, max: 900000, avg: 650000 },
      'Electrician': { min: 300000, max: 600000, avg: 450000 },
      'Driver': { min: 200000, max: 400000, avg: 300000 },
      'Chef': { min: 300000, max: 800000, avg: 550000 },
      'Graphic Designer': { min: 400000, max: 900000, avg: 650000 },
      'Digital Marketer': { min: 500000, max: 1200000, avg: 850000 },
      'Customer Service': { min: 250000, max: 500000, avg: 350000 },
      'Administrator': { min: 300000, max: 600000, avg: 450000 }
    };

    const style = document.createElement('style');
    style.textContent = `
      .ai-salary-predictor {
        background: linear-gradient(135deg, #fef3c7, #fffbeb);
        border-radius: 16px;
        padding: 20px;
        margin: 20px 0;
        border: 1px solid #fde68a;
      }
      body.dark-mode .ai-salary-predictor { background: #1e1a4a; border-color: #4338ca; }
      .ai-salary-title {
        font-size: 1rem;
        font-weight: 800;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .ai-salary-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        margin-bottom: 12px;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .ai-salary-result {
        background: white;
        border-radius: 12px;
        padding: 16px;
        margin-top: 12px;
        display: none;
      }
      body.dark-mode .ai-salary-result { background: #0f172a; }
      .ai-salary-amount {
        font-size: 1.5rem;
        font-weight: 800;
        color: #10b981;
      }
    `;
    document.head.appendChild(style);

    // Add salary predictor to market page or job detail
    const marketContainer = document.querySelector('.salary-predictor-container');
    if (marketContainer) {
      marketContainer.innerHTML = `
        <div class="ai-salary-predictor">
          <div class="ai-salary-title">
            <i class="fas fa-chart-line"></i> AI Salary Predictor
          </div>
          <input type="text" id="salary-role-input" class="ai-salary-input" placeholder="Enter job title (e.g., Software Engineer)">
          <button id="predict-salary-btn" class="btn-auth">Predict Salary</button>
          <div id="salary-result" class="ai-salary-result"></div>
        </div>
      `;

      document.getElementById('predict-salary-btn')?.addEventListener('click', () => {
        const role = document.getElementById('salary-role-input').value;
        const found = Object.keys(salaryData).find(key => 
          key.toLowerCase().includes(role.toLowerCase()) || role.toLowerCase().includes(key.toLowerCase())
        );
        
        const result = salaryData[found] || { min: 300000, max: 800000, avg: 550000 };
        const resultDiv = document.getElementById('salary-result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `
          <div style="text-align:center;">
            <div class="ai-salary-amount">RWF ${result.avg.toLocaleString()}/month</div>
            <p style="margin-top:8px;">Range: RWF ${result.min.toLocaleString()} - ${result.max.toLocaleString()}</p>
            <small style="color:var(--muted);">Based on Rwanda market data</small>
          </div>
        `;
      });
    }
  }

  /* ══════════════════════════════════════════════════════════
     5. AI RESUME ANALYZER (New)
  ══════════════════════════════════════════════════════════ */
  function initAIResumeAnalyzer() {
    const style = document.createElement('style');
    style.textContent = `
      .ai-resume-analyzer {
        background: linear-gradient(135deg, #ede9ff, #f5f3ff);
        border-radius: 16px;
        padding: 20px;
        margin: 20px 0;
      }
      body.dark-mode .ai-resume-analyzer { background: #1e1a4a; }
      .analyzer-score {
        font-size: 2rem;
        font-weight: 800;
        text-align: center;
        margin: 10px 0;
      }
      .analyzer-suggestions {
        margin-top: 12px;
        padding-left: 20px;
      }
      .analyzer-suggestions li {
        margin-bottom: 8px;
        font-size: 0.85rem;
      }
    `;
    document.head.appendChild(style);

    const resumeContainer = document.getElementById('ai-resume-analyzer');
    if (resumeContainer) {
      resumeContainer.innerHTML = `
        <div class="ai-resume-analyzer">
          <div class="ai-salary-title">
            <i class="fas fa-file-alt"></i> AI Resume Analyzer
          </div>
          <textarea id="resume-text" rows="4" class="ai-salary-input" placeholder="Paste your resume/CV text here for AI analysis..."></textarea>
          <button id="analyze-resume-btn" class="btn-auth">Analyze My Resume</button>
          <div id="resume-analysis" style="display:none; margin-top:16px;"></div>
        </div>
      `;

      document.getElementById('analyze-resume-btn')?.addEventListener('click', async () => {
        const resumeText = document.getElementById('resume-text').value;
        if (!resumeText || resumeText.length < 50) {
          alert('Please paste at least 50 characters of your resume for analysis.');
          return;
        }

        const btn = document.getElementById('analyze-resume-btn');
        btn.disabled = true;
        btn.innerHTML = '<div class="btn-spinner"></div> Analyzing...';

        try {
          const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 800,
              system: "You are a professional resume reviewer for the Rwandan job market. Analyze the resume and provide: 1) A score from 0-100, 2) 5 specific suggestions for improvement, 3) Strengths identified. Format as JSON with keys: score, suggestions (array), strengths (array).",
              messages: [{ role: 'user', content: `Analyze this resume: ${resumeText.substring(0, 3000)}` }]
            })
          });
          const data = await response.json();
          const analysis = JSON.parse(data.content?.[0]?.text || '{"score":70,"suggestions":["Add quantifiable achievements","Include relevant keywords"],"strengths":["Clear formatting"]}');
          
          const resultDiv = document.getElementById('resume-analysis');
          resultDiv.style.display = 'block';
          resultDiv.innerHTML = `
            <div class="analyzer-score" style="color: ${analysis.score >= 80 ? '#10b981' : analysis.score >= 60 ? '#f59e0b' : '#ef4444'}">
              Score: ${analysis.score}/100
            </div>
            <div class="analyzer-score" style="font-size:1rem; color:var(--text);">📈 Strengths:</div>
            <ul class="analyzer-suggestions">
              ${analysis.strengths?.map(s => `<li>✅ ${s}</li>`).join('') || '<li>✅ Good foundation</li>'}
            </ul>
            <div class="analyzer-score" style="font-size:1rem; color:var(--text); margin-top:12px;">💡 Suggestions to Improve:</div>
            <ul class="analyzer-suggestions">
              ${analysis.suggestions?.map(s => `<li>📝 ${s}</li>`).join('') || '<li>📝 Add more specific achievements</li>'}
            </ul>
          `;
        } catch {
          resultDiv.style.display = 'block';
          resultDiv.innerHTML = '<p>⚠️ Analysis temporarily unavailable. Please try again.</p>';
        }

        btn.disabled = false;
        btn.innerHTML = 'Analyze My Resume';
      });
    }
  }

  /* ══════════════════════════════════════════════════════════
     6. AI SKILL GAP ANALYZER (New)
  ══════════════════════════════════════════════════════════ */
  function initAISkillGapAnalyzer() {
    const style = document.createElement('style');
    style.textContent = `
      .ai-skill-gap {
        background: linear-gradient(135deg, #d1fae5, #ecfdf5);
        border-radius: 16px;
        padding: 20px;
        margin: 20px 0;
      }
      body.dark-mode .ai-skill-gap { background: #022c22; }
      .skill-gap-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #e2e8f0;
      }
      .skill-progress {
        width: 60%;
        height: 6px;
        background: #e2e8f0;
        border-radius: 3px;
        overflow: hidden;
      }
      .skill-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #10b981, #34d399);
        width: 0%;
        transition: width 1s ease;
      }
    `;
    document.head.appendChild(style);

    const gapContainer = document.getElementById('ai-skill-gap-analyzer');
    if (gapContainer) {
      gapContainer.innerHTML = `
        <div class="ai-skill-gap">
          <div class="ai-salary-title">
            <i class="fas fa-chart-simple"></i> AI Skill Gap Analyzer
          </div>
          <input type="text" id="target-role" class="ai-salary-input" placeholder="Enter your target job role (e.g., Data Analyst)">
          <button id="analyze-gap-btn" class="btn-auth">Analyze Skill Gap</button>
          <div id="skill-gap-result" style="display:none; margin-top:16px;"></div>
        </div>
      `;

      document.getElementById('analyze-gap-btn')?.addEventListener('click', async () => {
        const role = document.getElementById('target-role').value;
        if (!role) {
          alert('Please enter a target job role.');
          return;
        }

        const btn = document.getElementById('analyze-gap-btn');
        btn.disabled = true;
        btn.innerHTML = '<div class="btn-spinner"></div> Analyzing...';

        try {
          const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 600,
              system: "You are a career advisor for the Rwandan job market. For a given job role, provide: 1) Top 5 required skills, 2) Estimated proficiency needed for each (0-100). Format as JSON with keys: skills (array of objects with name and requiredLevel).",
              messages: [{ role: 'user', content: `What skills are required for a ${role} in Rwanda?` }]
            })
          });
          const data = await response.json();
          const skills = JSON.parse(data.content?.[0]?.text || '{"skills":[{"name":"Communication","requiredLevel":80},{"name":"Problem Solving","requiredLevel":75}]}');
          
          const resultDiv = document.getElementById('skill-gap-result');
          resultDiv.style.display = 'block';
          resultDiv.innerHTML = `
            <div style="font-weight:800; margin-bottom:12px;">📊 Skills needed for ${role}:</div>
            ${skills.skills.map(skill => `
              <div class="skill-gap-item">
                <span style="width:35%; font-weight:600;">${skill.name}</span>
                <div class="skill-progress">
                  <div class="skill-progress-fill" style="width: ${skill.requiredLevel}%"></div>
                </div>
                <span style="width:15%; text-align:right;">${skill.requiredLevel}%</span>
              </div>
            `).join('')}
            <div style="margin-top:12px; padding:10px; background:rgba(16,185,129,.1); border-radius:8px;">
              <strong>💡 Tip:</strong> Focus on developing the skills with highest requirements first.
            </div>
          `;
        } catch {
          resultDiv.style.display = 'block';
          resultDiv.innerHTML = '<p>⚠️ Analysis temporarily unavailable. Please try again.</p>';
        }

        btn.disabled = false;
        btn.innerHTML = 'Analyze Skill Gap';
      });
    }
  }

  /* ══════════════════════════════════════════════════════════
     7. AI INTERVIEW EMAIL GENERATOR (New)
  ══════════════════════════════════════════════════════════ */
  function initAIInterviewEmailGenerator() {
    window.generateInterviewEmail = async function() {
      const candidateName = document.getElementById('candidate-name')?.value || 'Candidate';
      const position = document.getElementById('position-name')?.value || 'the position';
      const company = document.getElementById('company-name')?.value || 'our company';
      const date = document.getElementById('interview-date')?.value || 'next week';

      const btn = document.getElementById('generate-email-btn');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<div class="btn-spinner"></div> Generating...';
      }

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 500,
            system: "You are an HR professional. Write a professional interview invitation email. Include: subject line, greeting, interview details, preparation tips, and closing. Keep it warm but professional.",
            messages: [{ role: 'user', content: `Write an interview invitation email for ${candidateName} for ${position} at ${company}. Interview scheduled for ${date}.` }]
          })
        });
        const data = await response.json();
        const email = data.content?.[0]?.text || 'Subject: Interview Invitation\n\nDear Candidate,\n\nWe would like to invite you for an interview...';

        const output = document.getElementById('email-output');
        if (output) {
          output.style.display = 'block';
          output.value = email;
        }
      } catch {
        const output = document.getElementById('email-output');
        if (output) {
          output.style.display = 'block';
          output.value = '⚠️ Unable to generate email. Please try again.';
        }
      }

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-envelope"></i> Generate Email';
      }
    };
  }

  /* ══════════════════════════════════════════════════════════
     8. AI JOB DESCRIPTION ENHANCER (New)
  ══════════════════════════════════════════════════════════ */
  function initAIJobDescriptionEnhancer() {
    window.enhanceJobDescription = async function() {
      const description = document.getElementById('job-description-input')?.value;
      if (!description || description.length < 50) {
        alert('Please enter at least 50 characters of job description.');
        return;
      }

      const btn = document.getElementById('enhance-jd-btn');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<div class="btn-spinner"></div> Enhancing...';
      }

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: "You are a job description writer for Rwanda. Enhance the job description to be more attractive, inclusive, and detailed. Add sections: Responsibilities, Requirements, Benefits. Keep it professional and appealing to Rwandan job seekers.",
            messages: [{ role: 'user', content: `Enhance this job description: ${description}` }]
          })
        });
        const data = await response.json();
        const enhanced = data.content?.[0]?.text || description;

        const output = document.getElementById('enhanced-description');
        if (output) {
          output.style.display = 'block';
          output.value = enhanced;
        }
      } catch {
        const output = document.getElementById('enhanced-description');
        if (output) {
          output.style.display = 'block';
          output.value = '⚠️ Enhancement temporarily unavailable. Please try again.';
        }
      }

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-magic"></i> Enhance Description';
      }
    };
  }

  /* ══════════════════════════════════════════════════════════
     9. AI CAREER PATH RECOMMENDER (New)
  ══════════════════════════════════════════════════════════ */
  function initAICareerPathRecommender() {
    const style = document.createElement('style');
    style.textContent = `
      .ai-career-recommender {
        background: linear-gradient(135deg, #f3e8ff, #faf5ff);
        border-radius: 16px;
        padding: 20px;
        margin: 20px 0;
      }
      body.dark-mode .ai-career-recommender { background: #2e1065; }
    `;
    document.head.appendChild(style);

    window.recommendCareerPath = async function() {
      const currentRole = document.getElementById('current-role')?.value;
      const interests = document.getElementById('career-interests')?.value;
      
      if (!currentRole) {
        alert('Please enter your current role.');
        return;
      }

      const btn = document.getElementById('recommend-btn');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<div class="btn-spinner"></div> Analyzing...';
      }

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 800,
            system: "You are a career path advisor for the Rwandan job market. Based on current role and interests, recommend 3-5 career progression paths. Include: job titles, estimated timeline, and required skills. Format as bullet points.",
            messages: [{ role: 'user', content: `Current role: ${currentRole}. Interests: ${interests || 'General'}. Recommend career paths in Rwanda.` }]
          })
        });
        const data = await response.json();
        const recommendations = data.content?.[0]?.text || 'Consider advancing to senior roles, team lead positions, or specialized tracks based on your experience.';

        const output = document.getElementById('career-recommendations');
        if (output) {
          output.style.display = 'block';
          output.innerHTML = `<div style="line-height:1.8;">${recommendations.replace(/\n/g, '<br>')}</div>`;
        }
      } catch {
        const output = document.getElementById('career-recommendations');
        if (output) {
          output.style.display = 'block';
          output.innerHTML = '<p>⚠️ Recommendations temporarily unavailable. Please try again.</p>';
        }
      }

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-chart-line"></i> Get Recommendations';
      }
    };
  }

  /* ══════════════════════════════════════════════════════════
     INIT ALL AI FEATURES
  ══════════════════════════════════════════════════════════ */
  function run() {
    initDarkMode();
    initAIAssistant();
    initAICoverLetter();
    initAISalaryPredictor();
    initAIResumeAnalyzer();
    initAISkillGapAnalyzer();
    initAIInterviewEmailGenerator();
    initAIJobDescriptionEnhancer();
    initAICareerPathRecommender();
    
    // Add styles for animations
    const animStyle = document.createElement('style');
    animStyle.textContent = `
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes dot-bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
      .btn-spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255,255,255,.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin-slow 0.7s linear infinite;
        margin-right: 6px;
      }
    `;
    document.head.appendChild(animStyle);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', run)
    : run();

})();
/* ============================================================
   smartJobs Rwanda — AI Intelligence Core v3.0
   Features: Salary Prediction, Resume Analysis, Cover Letter Gen
   Integrated with LocalStorage Data Layer
   ============================================================ */

(function () {
  'use strict';

  // 1. DATA DICTIONARIES (Based on Rwanda Market Intelligence)
  const salaryData = {
    'software engineer': { min: 1200000, max: 2500000, avg: 1800000 },
    'data analyst': { min: 800000, max: 1500000, avg: 1100000 },
    'accountant': { min: 600000, max: 1200000, avg: 850000 },
    'project manager': { min: 1000000, max: 2000000, avg: 1500000 },
    'agronomist': { min: 400000, max: 900000, avg: 650000 },
    'medical doctor': { min: 1500000, max: 3500000, avg: 2500000 }
  };

  // 2. UI INITIALIZATION
  function initAIUI() {
    const botHTML = `
      <div id="ai-assistant-wrapper" style="position:fixed; bottom:30px; right:30px; z-index:9999; font-family:'Plus Jakarta Sans',sans-serif;">
        <button id="ai-toggle-btn" style="width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,#3b2fc9,#6d51f7); border:none; color:white; font-size:1.5rem; cursor:pointer; box-shadow:0 10px 30px rgba(59,47,201,0.4); display:flex; align-items:center; justify-content:center; transition:transform 0.3s;">
          <i class="fas fa-robot"></i>
        </button>
        
        <div id="ai-chat-window" style="display:none; position:absolute; bottom:80px; right:0; width:360px; height:500px; background:white; border-radius:20px; box-shadow:0 20px 50px rgba(0,0,0,0.2); flex-direction:column; overflow:hidden; border:1px solid #e2e8f0; animation: fadeSlideUp 0.3s ease;">
          <div style="background:#3b2fc9; color:white; padding:20px; display:flex; justify-content:space-between; align-items:center;">
            <div><p style="font-weight:800; margin:0; font-family:'Sora';">SmartMatch AI</p><small style="opacity:0.8;">Rwanda's Career Expert</small></div>
            <button id="ai-close" style="background:none; border:none; color:white; cursor:pointer; font-size:1.2rem;"><i class="fas fa-times"></i></button>
          </div>
          
          <div id="ai-messages" style="flex:1; padding:20px; overflow-y:auto; font-size:0.88rem; display:flex; flex-direction:column; gap:12px; background:#f8fafc;">
            <div class="bot-msg" style="background:white; padding:12px; border-radius:15px; border-bottom-left-radius:2px; box-shadow:0 2px 5px rgba(0,0,0,0.05); max-width:85%;">
              Muraho! 👋 I'm your AI career assistant. I can help you with:
              <ul style="margin-top:8px; padding-left:18px;">
                <li>Predicting salaries</li>
                <li>Writing cover letters</li>
                <li>Analyzing skills gaps</li>
              </ul>
            </div>
          </div>

          <div id="ai-input-area" style="padding:15px; border-top:1px solid #eee; display:flex; gap:8px; background:white;">
            <input type="text" id="ai-query-input" placeholder="Ask about salaries or roles..." style="flex:1; padding:12px; border-radius:12px; border:1.5px solid #e2e8f0; font-size:0.85rem; outline:none; transition:border-color 0.2s;">
            <button id="ai-send-btn" style="background:#3b2fc9; color:white; border:none; width:45px; height:45px; border-radius:12px; cursor:pointer;"><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', botHTML);
    bindEvents();
  }

  // 3. CORE LOGIC ENGINE
  function handleAIResponse(userQuery) {
    const q = userQuery.toLowerCase();
    const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Professional' };

    // A. Salary Prediction Logic
    if (q.includes('salary') || q.includes('earn') || q.includes('pay')) {
      const role = Object.keys(salaryData).find(key => q.includes(key));
      if (role) {
        const stats = salaryData[role];
        return `For a <strong>${role.toUpperCase()}</strong> in Rwanda: <br>• Average: RWF ${stats.avg.toLocaleString()} <br>• Range: RWF ${stats.min.toLocaleString()} - ${stats.max.toLocaleString()} <br><small>Source: smartJobs Intelligence Hub 2026</small>`;
      }
      return "Which role are you interested in? I have data for Software, Accounting, Healthcare, and Agriculture.";
    }

    // B. Cover Letter Generation
    if (q.includes('cover letter') || q.includes('write')) {
      const industry = q.includes('tech') ? 'Technology' : 'Professional';
      return `<strong>AI Generated Snippet:</strong><br>"Dear Hiring Manager, as a motivated ${industry} professional, I am eager to apply my skills to your team in Kigali. My profile on smartJobs highlights my dedication to excellence..."`;
    }

    // C. Greetings & General
    if (q.includes('muraho') || q.includes('hello') || q.includes('hi')) {
      return `Muraho ${user.name}! How can I assist your career journey in Rwanda today?`;
    }

    return "I'm not quite sure about that yet. Try asking me: 'What is the salary for a Data Analyst?'";
  }

  // 4. EVENT BINDING
  function bindEvents() {
    const toggle = document.getElementById('ai-toggle-btn');
    const windowEl = document.getElementById('ai-chat-window');
    const close = document.getElementById('ai-close');
    const sendBtn = document.getElementById('ai-send-btn');
    const input = document.getElementById('ai-query-input');
    const msgContainer = document.getElementById('ai-messages');

    toggle.onclick = () => {
      const isHidden = windowEl.style.display === 'none';
      windowEl.style.display = isHidden ? 'flex' : 'none';
      if (isHidden) input.focus();
    };

    close.onclick = () => windowEl.style.display = 'none';

    function addMessage(text, isUser = false) {
      const msgDiv = document.createElement('div');
      msgDiv.style.cssText = isUser 
        ? "background:#3b2fc9; color:white; padding:12px; border-radius:15px; border-bottom-right-radius:2px; align-self:flex-end; max-width:85%; margin-left:auto;"
        : "background:white; color:#0f172a; padding:12px; border-radius:15px; border-bottom-left-radius:2px; align-self:flex-start; max-width:85%; box-shadow:0 2px 5px rgba(0,0,0,0.05);";
      
      msgDiv.innerHTML = text;
      msgContainer.appendChild(msgDiv);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    const processSend = () => {
      const text = input.value.trim();
      if (!text) return;
      
      addMessage(text, true);
      input.value = '';

      // Simulate AI Processing delay
      setTimeout(() => {
        const response = handleAIResponse(text);
        addMessage(response, false);
      }, 600);
    };

    sendBtn.onclick = processSend;
    input.onkeypress = (e) => { if (e.key === 'Enter') processSend(); };
  }

  // 5. BOOTSTRAP
  document.addEventListener('DOMContentLoaded', initAIUI);

})();
/* ============================================================
   smartJobs Rwanda — AI Enhancement Pack v3.1
   Additions:
   1. 🧠 Multi-turn conversation memory for the chat
   2. 🔗 Footer link auto-fix (connects Help, Privacy, Terms)
   3. 🌗 Dark mode polish (more elements covered)
   4. 🌍 Language selector placeholder (loads translate.js hint)
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. MULTI-TURN CONVERSATION MEMORY ─────────────────── */
  // Patch sendAIMessage to maintain conversation history
  function patchChatWithHistory() {
    const MAX_HISTORY = 10; // Keep last 10 exchanges
    let conversationHistory = [];
    let currentPersonaKey = 'career';

    const personaPrompts = {
      career: "You are SmartMatch AI, a friendly career coach for smartJobs Rwanda. Help users find ideal career paths, job opportunities, and career development advice specific to Rwanda's job market. Be encouraging, practical, and concise. Keep responses under 130 words. Occasionally use Kinyarwanda greetings like 'Muraho'.",
      salary: "You are a salary intelligence expert for the Rwandan job market (2026). Key salary benchmarks: Software Engineers (1.2M–2.5M RWF), Accountants (600K–1.2M RWF), Medical Doctors (1.5M–3.5M RWF), Data Analysts (800K–1.5M RWF), Project Managers (1M–2M RWF), Teachers (300K–700K RWF), Nurses (400K–800K RWF). Be specific with numbers and helpful with negotiation advice. Under 130 words.",
      cv: "You are a CV writing expert specializing in the Rwandan job market. Help users improve their resumes and cover letters. Give actionable, specific tips. Mention the importance of bilingual skills (Kinyarwanda + English/French) which Rwandan employers value. Under 130 words.",
      interview: "You are an interview preparation coach for jobs in Rwanda. Provide common interview questions, STAR-method frameworks, and tips specific to Rwandan workplace culture. Help users practice and build confidence. Under 130 words."
    };

    // Wait for the original sendAIMessage to exist, then patch it
    const patchInterval = setInterval(() => {
      const input = document.getElementById('ai-user-input');
      const sendBtn = document.getElementById('ai-send-btn');
      const msgs = document.getElementById('ai-messages');
      const personaBtns = document.querySelectorAll('.ai-persona-btn');

      if (!input || !sendBtn || !msgs) return;
      clearInterval(patchInterval);

      // Track persona changes to reset history
      personaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          currentPersonaKey = btn.dataset.persona;
          conversationHistory = []; // Reset history on persona change
        });
      });

      // Replace sendAIMessage with history-aware version
      window.sendAIMessage = async function () {
        const text = input.value.trim();
        if (!text) return;
        input.value = '';

        // Add user message to UI
        const userDiv = document.createElement('div');
        userDiv.className = 'ai-msg user';
        userDiv.textContent = text;
        msgs.appendChild(userDiv);
        msgs.scrollTop = msgs.scrollHeight;

        // Add to conversation history
        conversationHistory.push({ role: 'user', content: text });
        if (conversationHistory.length > MAX_HISTORY * 2) {
          conversationHistory = conversationHistory.slice(-MAX_HISTORY * 2);
        }

        // Typing indicator
        const typing = document.createElement('div');
        typing.className = 'ai-msg bot typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        msgs.appendChild(typing);
        msgs.scrollTop = msgs.scrollHeight;

        try {
          const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 1000,
              system: personaPrompts[currentPersonaKey],
              messages: conversationHistory
            })
          });
          const data = await res.json();
          const botText = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again!";

          typing.remove();

          // Add bot reply to UI
          const botDiv = document.createElement('div');
          botDiv.className = 'ai-msg bot';
          botDiv.innerHTML = botText.replace(/\n/g, '<br>');
          msgs.appendChild(botDiv);
          msgs.scrollTop = msgs.scrollHeight;

          // Add to history
          conversationHistory.push({ role: 'assistant', content: botText });

        } catch {
          typing.remove();
          const errDiv = document.createElement('div');
          errDiv.className = 'ai-msg bot';
          errDiv.textContent = '⚠️ Connection issue. Please check your network and try again.';
          msgs.appendChild(errDiv);
          msgs.scrollTop = msgs.scrollHeight;
        }
      };

      // Rewire enter key and send button (they might already be bound to old sendAIMessage)
      const newInput = input.cloneNode(true);
      input.parentNode.replaceChild(newInput, input);
      const newBtn = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(newBtn, sendBtn);

      newInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') window.sendAIMessage(); });
      newBtn.addEventListener('click', () => window.sendAIMessage());

      // Add clear history button to chat header
      const header = document.querySelector('.ai-chat-header');
      if (header && !document.getElementById('ai-clear-btn')) {
        const clearBtn = document.createElement('button');
        clearBtn.id = 'ai-clear-btn';
        clearBtn.title = 'Clear conversation';
        clearBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        clearBtn.style.cssText = 'background:none; border:none; color:rgba(255,255,255,.6); cursor:pointer; font-size:0.85rem; margin-left:4px; transition:color 0.2s;';
        clearBtn.addEventListener('mouseenter', () => clearBtn.style.color = 'white');
        clearBtn.addEventListener('mouseleave', () => clearBtn.style.color = 'rgba(255,255,255,.6)');
        clearBtn.addEventListener('click', () => {
          conversationHistory = [];
          const msgsEl = document.getElementById('ai-messages');
          if (msgsEl) {
            // Keep only the first welcome message
            while (msgsEl.children.length > 1) msgsEl.removeChild(msgsEl.lastChild);
          }
        });
        const closeBtn = document.getElementById('ai-close');
        if (closeBtn) header.insertBefore(clearBtn, closeBtn);
      }

    }, 300);
  }

  /* ── 2. FOOTER LINK FIX ─────────────────────────────────── */
  function fixFooterLinks() {
    // Map old placeholder hrefs to real pages
    const linkMap = {
      'Help Center': 'help.html',
      'Privacy Policy': 'privacy.html',
      'Terms of Use': 'terms.html',
      'Hiring Solutions': 'employer-hub.html',
    };

    document.querySelectorAll('.main-footer a, footer a').forEach(a => {
      const text = a.textContent.trim();
      if (a.getAttribute('href') === '#' && linkMap[text]) {
        a.href = linkMap[text];
        a.style.transition = 'color 0.2s';
      }
    });
  }

  /* ── 3. DARK MODE EXTRA POLISH ──────────────────────────── */
  function addDarkModePolish() {
    const extra = document.createElement('style');
    extra.id = 'dark-mode-extra';
    extra.textContent = `
      body.dark-mode .legal-toc,
      body.dark-mode .legal-section h2 { border-color: #1e1a4a !important; }
      body.dark-mode .faq-q { background: #0f172a !important; color: #f1f5f9 !important; }
      body.dark-mode .faq-a { background: #1e293b !important; color: #cbd5e1 !important; }
      body.dark-mode .contact-card { background: #0f172a !important; border-color: #1e293b !important; }
      body.dark-mode .contact-card h4, body.dark-mode .contact-card p { color: #f1f5f9 !important; }
      body.dark-mode .help-search input { background: #1e293b !important; color: #f1f5f9 !important; border-color: #334155 !important; }
      body.dark-mode .sj-logo-pill { color: white !important; }
      body.dark-mode #sj-lang-btn { background: #1e1a4a !important; border-color: #4338ca !important; color: #7c6ff7 !important; }
      body.dark-mode #sj-lang-dropdown { background: #0f172a !important; border-color: #1e293b !important; }
      body.dark-mode .lang-option { color: #f1f5f9 !important; }
      body.dark-mode .lang-option:hover { background: #1e1a4a !important; }
      body.dark-mode .lang-dropdown-footer { border-color: #1e293b !important; color: #64748b !important; }
      body.dark-mode .footer-col h4 { color: #f1f5f9 !important; }
      body.dark-mode .footer-col a { color: #94a3b8 !important; }
      body.dark-mode .footer-col a:hover { color: #10b981 !important; }
      body.dark-mode .footer-bottom { color: #64748b !important; border-color: #1e293b !important; }
      body.dark-mode .social-icons i { color: #64748b !important; }
      body.dark-mode .social-icons i:hover { color: #7c6ff7 !important; }
      /* Smooth dark mode transition */
      body, body * { transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease !important; }
      /* Exception: don't transition images/transforms */
      body img, body svg { transition: none !important; }
      body .ai-msg, body .ai-chip { transition: none !important; }
    `;
    document.head.appendChild(extra);
  }

  /* ── 4. BOOTSTRAP ────────────────────────────────────────── */
  function run() {
    addDarkModePolish();
    fixFooterLinks();
    // Patch chat after DOM is ready and original scripts have run
    setTimeout(patchChatWithHistory, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

})();