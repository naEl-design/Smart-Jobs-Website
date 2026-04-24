/* ============================================================
   smartJobs Rwanda — Enhanced Script v2
   Features: Toast system, animated counters, ripple effects,
   scroll progress, keyboard shortcuts, rich search, confetti
   ============================================================ */

// ── DATA ────────────────────────────────────────────────────
const defaultJobs = [
  {
    id:1,
    title:"Desktop Engineer",
    company:"Biz4D",
    location:"Kigali",
    type:"Full-time",
    salary:"950,000",
    industry:"technology",
    color:"#3b2fc9",
    posted:"1 day ago",
    views:87,
    desc:"We are hiring a Desktop Engineer to own and strengthen the Electron-based desktop client of our secure messenger. Your mission is to ensure a stable, performant, and secure desktop experience and reliable synchronization with the rest of the system. 3+ years experience with Electron.js or desktop app development required.",
    deadline:"Apr 10, 2026"
  },
  {
    id:2,
    title:"Cybersecurity Office Administrator",
    company:"Drwintech Ltd",
    location:"Kigali",
    type:"Full-time",
    salary:"600,000",
    industry:"technology",
    color:"#6d28d9",
    posted:"1 day ago",
    views:54,
    desc:"Drwintech LTD is a newly established cybersecurity and ICT services company based in Kigali. We seek a proactive Office Administrator to support the Country Director and team in ensuring smooth day-to-day operations. You will be the backbone of our founding team. Bachelor's degree in Business Administration or related field preferred.",
    deadline:"Apr 15, 2026"
  },
  {
    id:3,
    title:"Sales Manager",
    company:"Builders Industries Ltd",
    location:"Kigali",
    type:"Full-time",
    salary:"800,000",
    industry:"finance",
    color:"#f59e0b",
    posted:"1 day ago",
    views:132,
    desc:"Builders Industries Ltd is a diversified enterprise in wholesale trade of construction materials and structural metal products. The Sales Manager will define and implement commercial strategy, identify revenue opportunities, and secure sustainable repeat business. 5+ years sales experience in construction or wholesale sector required.",
    deadline:"Apr 24, 2026"
  },
  {
    id:4,
    title:"Relationship Manager",
    company:"LizTalent",
    location:"Kigali",
    type:"Full-time",
    salary:"750,000",
    industry:"finance",
    color:"#10b981",
    posted:"1 day ago",
    views:98,
    desc:"We are seeking a proactive and people-focused Relationship Manager to build, maintain, and grow strong relationships with clients and partners. The ideal candidate will serve as a trusted point of contact, ensuring client satisfaction while identifying long-term value opportunities. CRM experience and excellent communication skills required.",
    deadline:"Apr 10, 2026"
  },
  {
    id:5,
    title:"Loan Officer",
    company:"Umutanguha Finance Company Plc",
    location:"Kigali",
    type:"Full-time",
    salary:"650,000",
    industry:"finance",
    color:"#1d4ed8",
    posted:"2 days ago",
    views:176,
    desc:"Umutanguha Finance Company Plc seeks a mid-career Loan Officer (3–5 years experience) to assess creditworthiness, process loan applications, and manage client portfolios. You will support financial inclusion for Rwandan entrepreneurs and SMEs. A degree in Finance, Economics, or Banking is required.",
    deadline:"Apr 3, 2026"
  },
  {
    id:6,
    title:"Head of Programmes",
    company:"Association des Guides du Rwanda",
    location:"Kigali",
    type:"Full-time",
    salary:"1,200,000",
    industry:"education",
    color:"#7c3aed",
    posted:"3 days ago",
    views:61,
    desc:"The Association des Guides du Rwanda seeks a Head of Programmes to lead, coordinate and evaluate all programme activities. The role reports to the Executive Director and requires 5+ years of senior programme management experience, ideally in youth development, education, or civil society.",
    deadline:"Mar 31, 2026"
  },
  {
    id:7,
    title:"Medical Billing Specialist",
    company:"Medbill",
    location:"Kigali",
    type:"Full-time",
    salary:"550,000",
    industry:"healthcare",
    color:"#ec4899",
    posted:"3 days ago",
    views:83,
    desc:"Medbill is hiring an entry-level Medical Billing Specialist to process patient billing, claims, and insurance reimbursements. You will work closely with healthcare providers to ensure accurate and timely billing. Knowledge of medical coding (ICD-10) and health insurance systems is an advantage.",
    deadline:"Apr 17, 2026"
  },
  {
    id:8,
    title:"Senior Medical Billing Manager",
    company:"Medbill",
    location:"Kigali",
    type:"Full-time",
    salary:"900,000",
    industry:"healthcare",
    color:"#db2777",
    posted:"3 days ago",
    views:74,
    desc:"Medbill seeks an experienced Medical Billing Manager (3–5 years) to oversee billing operations, lead a small team, and ensure compliance with healthcare financial regulations. Strong knowledge of Rwanda's health insurance systems (RSSB, Mutuelle de Santé) is essential.",
    deadline:"Apr 17, 2026"
  },
  {
    id:9,
    title:"Conservation Research Assistant",
    company:"Dian Fossey Gorilla Fund",
    location:"Musanze",
    type:"Full-time",
    salary:"500,000",
    industry:"agriculture",
    color:"#059669",
    posted:"5 days ago",
    views:119,
    desc:"The Dian Fossey Gorilla Fund International seeks an entry-level Research Assistant based in Musanze to support gorilla and biodiversity conservation efforts in the Virunga Massif. Responsibilities include field data collection, wildlife monitoring, and database management. A degree in biology, ecology, or environmental science is required.",
    deadline:"Mar 27, 2026"
  },
  {
    id:10,
    title:"Country Operations Lead",
    company:"Dispatch Hailing App",
    location:"Kigali",
    type:"Full-time",
    salary:"1,100,000",
    industry:"technology",
    color:"#ef4444",
    posted:"2 days ago",
    views:210,
    desc:"A fast-growing dispatch hailing mobile app company is expanding into Rwanda and seeks a dynamic Country Operations Lead to oversee market entry, drive rider onboarding, build local partnerships, and promote app adoption. The ideal candidate is resourceful, entrepreneurial, and experienced in operations, marketing, or logistics.",
    deadline:"Apr 15, 2026"
  },
  {
    id:11,
    title:"Key Account Specialist",
    company:"Neil Corporation Ltd",
    location:"Kigali",
    type:"Full-time",
    salary:"700,000",
    industry:"finance",
    color:"#0891b2",
    posted:"1 day ago",
    views:67,
    desc:"Neil Corporation Ltd seeks a Key Account Specialist to manage multiple customer accounts and provide excellent customer service. You will gather customer details, understand their requirements, and grow long-term account value. 2+ years of account management or B2B sales experience required.",
    deadline:"Apr 20, 2026"
  },
  {
    id:12,
    title:"RISE Program Manager",
    company:"Catholic Relief Services (CRS)",
    location:"Kigali",
    type:"Full-time",
    salary:"1,500,000",
    industry:"education",
    color:"#be123c",
    posted:"6 days ago",
    views:155,
    desc:"CRS Rwanda seeks a RISE Program Manager (Band 10) to lead a flagship resilience and livelihoods program. The role requires 5+ years of senior program management experience in international development, strong skills in donor reporting, team leadership, and community engagement in rural Rwanda.",
    deadline:"Mar 30, 2026"
  },
  {
    id:13,
    title:"Senior Software Developer",
    company:"QT Global Software Ltd",
    location:"Kigali",
    type:"Full-time",
    salary:"1,800,000",
    industry:"technology",
    color:"#4f46e5",
    posted:"5 days ago",
    views:243,
    desc:"QT Global Software Ltd seeks a Senior Software Developer (5+ years) to design, build, and maintain enterprise-grade software solutions. Strong proficiency in at least two of the following is required: Java, Python, Node.js, React, or .NET. Experience with cloud platforms (AWS/Azure) and agile methodologies is a strong advantage.",
    deadline:"Apr 17, 2026"
  },
  {
    id:14,
    title:"Marketing & Communications Manager",
    company:"Old Mutual Insurance Rwanda",
    location:"Kigali",
    type:"Full-time",
    salary:"1,300,000",
    industry:"finance",
    color:"#0369a1",
    posted:"4 days ago",
    views:188,
    desc:"Old Mutual Insurance Rwanda seeks a Marketing & Communications Manager to lead brand strategy, digital marketing, media relations, and customer communications. You will manage a team and drive growth campaigns across Rwanda. 5+ years of marketing experience in financial services or insurance is preferred.",
    deadline:"Apr 5, 2026"
  },
  {
    id:15,
    title:"AI Technical Advisor",
    company:"Clinton Health Access Initiative (CHAI)",
    location:"Kigali",
    type:"Full-time",
    salary:"2,000,000",
    industry:"healthcare",
    color:"#9333ea",
    posted:"6 days ago",
    views:301,
    desc:"CHAI Rwanda seeks a Technical Advisor, Artificial Intelligence to lead AI strategy and implementation across health system programs. The role requires expertise in machine learning, health data systems, and the ability to translate AI solutions into practical healthcare improvements. Open to both national and international professionals.",
    deadline:"Apr 17, 2026"
  },
  {
    id:16,
    title:"Agronomist / Field Officer",
    company:"One Acre Fund Rwanda",
    location:"Musanze",
    type:"Full-time",
    salary:"580,000",
    industry:"agriculture",
    color:"#16a34a",
    posted:"4 days ago",
    views:94,
    desc:"One Acre Fund equips smallholder farmers across Rwanda with farm supplies, credit, and agronomic training. We seek an Agronomist to deliver field training, monitor crop performance, and support 500+ farmers in northern Rwanda. A degree in agronomy, agriculture, or a related field and field experience are required.",
    deadline:"Apr 9, 2026"
  },
  {
    id:17,
    title:"Energy Sales Representative",
    company:"Gasmeth Energy Ltd",
    location:"Kigali",
    type:"Full-time",
    salary:"550,000",
    industry:"energy",
    color:"#d97706",
    posted:"6 days ago",
    views:78,
    desc:"Gasmeth Energy Ltd is hiring an entry-level Energy Sales Representative to drive sales of clean cooking gas solutions to households and SMEs in Kigali. The role involves customer prospecting, product demonstrations, and after-sales support. A certificate or diploma in Sales, Business, or a related field is acceptable.",
    deadline:"Mar 25, 2026"
  },
  {
    id:18,
    title:"Teacher (Primary — French & Kinyarwanda)",
    company:"Ecole Primaire Saint Joseph",
    location:"Kigali",
    type:"Full-time",
    salary:"480,000",
    industry:"education",
    color:"#0284c7",
    posted:"2 days ago",
    views:112,
    desc:"Ecole Primaire Henri Matisse is a private school in Kigali seeking a senior primary school teacher specialising in French and Kinyarwanda (5+ years experience). The ideal candidate is passionate about child development, bilingual education, and creating an engaging classroom environment.",
    deadline:"Apr 24, 2026"
  },
];


const companyData = {
  agriculture: [
    { name:"RAB",      desc:"Rwanda Agriculture Board",    rating:4.2, jobs:12, color:"#059669", employees:"500-1000", founded:"2008" },
    { name:"MINAGRI",  desc:"Ministry of Agriculture",     rating:4.0, jobs:8,  color:"#10b981", employees:"1000+",   founded:"1962" },
    { name:"Inyange",  desc:"Food & Beverages",            rating:3.9, jobs:5,  color:"#34d399", employees:"200-500", founded:"1997" },
  ],
  finance: [
    { name:"BK",   desc:"Bank of Kigali",       rating:4.4, jobs:25, color:"#1d4ed8", employees:"1000+",   founded:"1966" },
    { name:"BNR",  desc:"National Bank Rwanda", rating:4.1, jobs:10, color:"#2563eb", employees:"500-1000",founded:"1964" },
    { name:"I&M",  desc:"I&M Bank Rwanda",      rating:3.9, jobs:15, color:"#3b82f6", employees:"200-500", founded:"1963" },
  ],
  education: [
    { name:"UR",   desc:"University of Rwanda", rating:4.3, jobs:30, color:"#7c3aed", employees:"1000+",   founded:"2013" },
    { name:"REB",  desc:"Rwanda Educ. Board",   rating:4.1, jobs:20, color:"#8b5cf6", employees:"500-1000",founded:"2011" },
    { name:"FAWE", desc:"FAWE Schools Rwanda",  rating:4.5, jobs:8,  color:"#a78bfa", employees:"100-200", founded:"1992" },
  ],
  technology: [
    { name:"MTN",    desc:"MTN Rwanda Telecom",  rating:4.3, jobs:35, color:"#f59e0b", employees:"1000+",   founded:"1998" },
    { name:"RDB",    desc:"Rwanda Dev. Board",   rating:4.0, jobs:18, color:"#3b2fc9", employees:"500-1000",founded:"2008" },
    { name:"Airtel", desc:"Airtel Rwanda",        rating:3.8, jobs:22, color:"#ef4444", employees:"500-1000",founded:"2008" },
  ],
  healthcare: [
    { name:"MOH",  desc:"Ministry of Health",    rating:4.2, jobs:40, color:"#ec4899", employees:"1000+",   founded:"1962" },
    { name:"CHUK", desc:"Central Hosp. Kigali",  rating:4.0, jobs:30, color:"#f43f5e", employees:"1000+",   founded:"1935" },
    { name:"RBC",  desc:"Rwanda Biomedical Ctr", rating:4.4, jobs:15, color:"#db2777", employees:"500-1000",founded:"2010" },
  ],
  energy: [
    { name:"REG",     desc:"Rwanda Energy Group",  rating:4.3, jobs:20, color:"#f59e0b", employees:"500-1000",founded:"2014" },
    { name:"Ignite",  desc:"Ignite Power Africa",   rating:4.1, jobs:12, color:"#d97706", employees:"200-500", founded:"2013" },
    { name:"GreenCo", desc:"Green Power Ltd",       rating:3.8, jobs:6,  color:"#b45309", employees:"50-100",  founded:"2018" },
  ],
};

// ── STORAGE HELPERS ─────────────────────────────────────────
function getJobs()       { return JSON.parse(localStorage.getItem('allJobs')) || defaultJobs; }
function saveJobs(jobs)  { localStorage.setItem('allJobs', JSON.stringify(jobs)); }
function getApps()       { return JSON.parse(localStorage.getItem('jobApplications')) || []; }
function saveApps(apps)  { localStorage.setItem('jobApplications', JSON.stringify(apps)); }
function getUser()       { return JSON.parse(localStorage.getItem('currentUser')); }
function setUser(u)      { localStorage.setItem('currentUser', JSON.stringify(u)); }
function getSaved()      { return JSON.parse(localStorage.getItem('savedJobs')) || []; }
function toggleSaved(id) {
  const saved = getSaved();
  const idx = saved.indexOf(id);
  if (idx === -1) { saved.push(id); showToast('Job saved to bookmarks!', 'success', 'fas fa-bookmark'); }
  else { saved.splice(idx, 1); showToast('Removed from bookmarks', 'info', 'fas fa-bookmark'); }
  localStorage.setItem('savedJobs', JSON.stringify(saved));
  return idx === -1;
}

function logout() {
  localStorage.removeItem('currentUser');
  showToast('Signed out successfully', 'info', 'fas fa-sign-out-alt');
  setTimeout(() => { window.location.href = 'auth.html'; }, 800);
}

// init storage — always refresh with latest real jobs
saveJobs(defaultJobs);

// ── TOAST SYSTEM ────────────────────────────────────────────
function ensureToastContainer() {
  if (!document.getElementById('toast-container')) {
    const el = document.createElement('div');
    el.id = 'toast-container';
    document.body.appendChild(el);
  }
  return document.getElementById('toast-container');
}

function showToast(message, type = 'info', icon = 'fas fa-info-circle', duration = 3500) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('exiting');
    setTimeout(() => toast.remove(), 320);
  }, duration);
}

// ── PAGE PROGRESS BAR ───────────────────────────────────────
function initProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'page-progress';
  bar.style.width = '0';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = `${scrolled}%`;
  });
}

// ── RIPPLE EFFECT ───────────────────────────────────────────
function addRipple(el, e) {
  const rect = el.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `
    position:absolute;width:${size}px;height:${size}px;border-radius:50%;
    background:rgba(255,255,255,.25);transform:scale(0);
    left:${e.clientX - rect.left - size/2}px;
    top:${e.clientY - rect.top - size/2}px;
    animation:none;pointer-events:none;transition:transform .5s,opacity .5s;
  `;
  el.style.position = 'relative';
  el.style.overflow = 'hidden';
  el.appendChild(ripple);
  requestAnimationFrame(() => {
    ripple.style.transform = 'scale(2.5)';
    ripple.style.opacity = '0';
  });
  setTimeout(() => ripple.remove(), 600);
}

// ── NAV SCROLL EFFECT ───────────────────────────────────────
function initNavScroll() {
  const nav = document.querySelector('.top-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── ANIMATED COUNTERS ───────────────────────────────────────
function animateCounter(el, target, duration = 1200) {
  const start = performance.now();
  const startVal = 0;
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounterAnimations() {
  const statEls = document.querySelectorAll('.stat-text h3[id]');
  if (!statEls.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = parseInt(el.textContent) || 0;
        if (val > 0) animateCounter(el, val);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => observer.observe(el));
}

// ── SCROLL REVEAL ───────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.salary-card, .industry-card, .detailed-card, .notif-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${i * 0.06}s`;
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// ── NAVBAR DYNAMIC AUTH ─────────────────────────────────────
function updateNavAuth() {
  const user = getUser();
  const area = document.getElementById('dynamic-auth');
  if (!area) return;
  if (user) {
    const initial = (user.name || user.role || 'U')[0].toUpperCase();
    area.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--indigo),#6d51f7);
                    display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:.82rem;
                    cursor:pointer;transition:transform .2s;" onclick="this.parentElement.querySelector('.user-menu').classList.toggle('open')">${initial}</div>
        <span style="font-weight:700;color:var(--indigo);font-size:.88rem;">${user.name || user.role}</span>
        <button class="nav-btn-primary" onclick="logout()" style="font-size:.82rem;padding:7px 16px;">Sign Out</button>
      </div>`;
  }
}

// ── JOB HOME PAGE ────────────────────────────────────────────
let activeJobId = null;
let currentFilter = {};

function renderJobCards(list) {
  const container = document.getElementById('job-list');
  if (!container) return;

  // Update count
  const countEl = document.getElementById('result-count');
  if (countEl) {
    countEl.style.animation = 'none';
    requestAnimationFrame(() => {
      countEl.style.animation = 'count-up .3s ease';
      countEl.textContent = list.length;
    });
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px 24px;color:var(--muted);">
        <i class="fas fa-search" style="font-size:2.5rem;margin-bottom:16px;opacity:.3;display:block;"></i>
        <h3 style="font-size:1.1rem;margin-bottom:8px;color:var(--text);">No jobs found</h3>
        <p style="font-size:.9rem;">Try different keywords or filters</p>
      </div>`;
    return;
  }

  const saved = getSaved();
  container.innerHTML = list.map((job, i) => `
    <div class="job-card ${activeJobId === job.id ? 'active' : ''}" onclick="showJobDetail(${job.id})"
         style="animation-delay:${i * 0.05}s">
      <div class="job-card-top">
        <div class="job-logo" style="background:${job.color}">${job.company.substring(0,2).toUpperCase()}</div>
        <div class="job-card-info">
          <h3>${job.title}${i < 4 ? ' <span class="new-tag">NEW</span>' : ''}</h3>
          <div class="company-name"><i class="fas fa-building" style="font-size:.7rem;margin-right:4px;"></i>${job.company} &bull; ${job.location}</div>
        </div>
      </div>
      <div class="job-meta">
        <span class="job-meta-item"><i class="fas fa-briefcase"></i> ${job.type}</span>
        <span class="job-meta-item"><i class="fas fa-coins"></i> RWF ${job.salary}/mo</span>
        <span class="job-meta-item"><i class="fas fa-clock"></i> ${job.posted}</span>
        ${job.deadline ? `<span class="job-meta-item" style="color:#92400e;"><i class="fas fa-calendar-alt"></i> Due ${job.deadline}</span>` : ''}
        ${job.views ? `<span class="job-meta-item"><i class="fas fa-eye"></i> ${job.views} views</span>` : ''}
      </div>
      <div class="job-card-actions">
        <div style="display:flex;gap:8px;">
          <button class="btn-apply" onclick="event.stopPropagation(); applyNow(${job.id})" data-ripple>Apply Now</button>
          <button class="btn-save ${saved.includes(job.id) ? 'saved' : ''}"
                  onclick="event.stopPropagation(); handleSaveJob(${job.id}, this)"
                  title="${saved.includes(job.id) ? 'Remove bookmark' : 'Save job'}">
            <i class="fas fa-bookmark"></i>
          </button>
        </div>
        <span class="badge badge-indigo">${job.industry}</span>
      </div>
    </div>
  `).join('');

  // Add ripple to apply buttons
  container.querySelectorAll('[data-ripple]').forEach(btn => {
    btn.addEventListener('click', (e) => addRipple(btn, e));
  });
}

function handleSaveJob(id, btn) {
  const isNowSaved = toggleSaved(id);
  btn.classList.toggle('saved', isNowSaved);
  // Animate icon
  const icon = btn.querySelector('i');
  icon.style.transform = 'scale(1.4) rotate(-15deg)';
  setTimeout(() => { icon.style.transform = ''; }, 300);
}

function showJobDetail(id) {
  activeJobId = id;
  const jobs = getJobs();
  const job = jobs.find(j => j.id === id);
  if (!job) return;
  renderJobCards(jobs.filter(j => true)); // re-render to update active

  const detail = document.getElementById('job-detail-content');
  const placeholder = document.getElementById('detail-placeholder');
  if (!detail) return;

  if (placeholder) placeholder.style.display = 'none';
  detail.style.display = 'block';
  detail.style.animation = 'none';
  requestAnimationFrame(() => { detail.style.animation = 'fadeSlideUp .35s ease'; });

  const stars = '★'.repeat(Math.round(3.5 + Math.random() * 1.5));
  detail.innerHTML = `
    <div class="detail-logo-row">
      <div class="detail-logo" style="background:${job.color}">${job.company.substring(0,2).toUpperCase()}</div>
      <div>
        <div class="detail-title">${job.title}</div>
        <div class="detail-company">${job.company}</div>
        <div style="margin-top:5px;font-size:.8rem;color:var(--amber);">${stars} <span style="color:var(--muted);font-weight:500;">(${Math.floor(Math.random()*150)+30} reviews)</span></div>
      </div>
    </div>
    <div class="detail-chips">
      <span class="detail-chip"><i class="fas fa-map-marker-alt"></i>${job.location}</span>
      <span class="detail-chip"><i class="fas fa-briefcase"></i>${job.type}</span>
      <span class="detail-chip"><i class="fas fa-coins"></i>RWF ${job.salary}/mo</span>
      <span class="detail-chip"><i class="fas fa-clock"></i>${job.posted}</span>
      <span class="detail-chip"><i class="fas fa-industry"></i>${job.industry}</span>
      ${job.deadline ? `<span class="detail-chip" style="background:#fef3c7;color:#92400e;border-color:#fde68a;"><i class="fas fa-calendar-alt"></i>Deadline: ${job.deadline}</span>` : ''}
    </div>
    <div style="display:flex;gap:8px;margin-bottom:18px;">
      <button class="btn-apply" style="flex:1;height:42px;font-size:.88rem;" onclick="applyNow(${job.id})" data-ripple>
        <i class="fas fa-paper-plane" style="margin-right:7px;"></i>Quick Apply
      </button>
      <button class="btn-save ${getSaved().includes(job.id) ? 'saved' : ''}"
              style="height:42px;padding:0 16px;"
              onclick="handleSaveJob(${job.id}, this)">
        <i class="fas fa-bookmark"></i>
      </button>
    </div>
    <hr class="detail-divider">
    <div class="detail-section-title">About the Role</div>
    <div class="detail-desc">
      <p>${job.desc || `We're looking for a skilled <strong>${job.title}</strong> to join <strong>${job.company}</strong> in ${job.location}. This is an exciting opportunity to make an impact in Rwanda's growing ${job.industry} sector.`}</p>
    </div>
    <hr class="detail-divider">
    <div class="detail-section-title">What We Offer</div>
    <div class="detail-desc" style="margin-bottom:20px;">
      <ul>
        <li>Competitive salary: <strong>RWF ${job.salary}/month</strong></li>
        <li>Health insurance & wellness benefits</li>
        <li>Professional development & training budget</li>
        <li>Flexible work arrangements (where applicable)</li>
      </ul>
    </div>
    <hr class="detail-divider">
    <div class="apply-box" id="apply-section-${id}">
      <h4><i class="fas fa-paper-plane" style="color:var(--indigo);margin-right:8px;"></i>Apply for this Role</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
        <div>
          <label style="font-size:.78rem;font-weight:700;color:var(--text);display:block;margin-bottom:4px;">Full Name *</label>
          <input id="apply-name-${id}" type="text" placeholder="Your full name"
            style="width:100%;padding:9px 12px;border:1.5px solid var(--border);border-radius:9px;font-size:.85rem;outline:none;box-sizing:border-box;transition:border-color .2s;"
            onfocus="this.style.borderColor='var(--indigo)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div>
          <label style="font-size:.78rem;font-weight:700;color:var(--text);display:block;margin-bottom:4px;">Email Address *</label>
          <input id="apply-email-${id}" type="email" placeholder="you@email.com"
            style="width:100%;padding:9px 12px;border:1.5px solid var(--border);border-radius:9px;font-size:.85rem;outline:none;box-sizing:border-box;transition:border-color .2s;"
            onfocus="this.style.borderColor='var(--indigo)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div>
          <label style="font-size:.78rem;font-weight:700;color:var(--text);display:block;margin-bottom:4px;">Phone Number *</label>
          <input id="apply-phone-${id}" type="tel" placeholder="+250 7XX XXX XXX"
            style="width:100%;padding:9px 12px;border:1.5px solid var(--border);border-radius:9px;font-size:.85rem;outline:none;box-sizing:border-box;transition:border-color .2s;"
            onfocus="this.style.borderColor='var(--indigo)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div>
          <label style="font-size:.78rem;font-weight:700;color:var(--text);display:block;margin-bottom:4px;">Your Location *</label>
          <input id="apply-location-${id}" type="text" placeholder="e.g. Kigali, Musanze"
            style="width:100%;padding:9px 12px;border:1.5px solid var(--border);border-radius:9px;font-size:.85rem;outline:none;box-sizing:border-box;transition:border-color .2s;"
            onfocus="this.style.borderColor='var(--indigo)'" onblur="this.style.borderColor='var(--border)'">
        </div>
      </div>
      <label style="font-size:.78rem;font-weight:700;color:var(--text);display:block;margin-bottom:4px;">Cover Message *</label>
      <textarea id="apply-msg-${id}" placeholder="Write a short cover message to ${job.company}…"
                oninput="updateCharCount(this, 'msg-count-${id}', 500)"></textarea>
      <div class="char-counter" id="msg-count-${id}">0 / 500</div>
      <button class="btn-submit-app" onclick="submitApplication(${id}, '${job.title}', '${job.company}')" data-ripple>
        <i class="fas fa-paper-plane" style="margin-right:8px;"></i>Submit Application
      </button>
    </div>`;

  // Ripple on submit
  const submitBtn = detail.querySelector('[data-ripple]');
  if (submitBtn) submitBtn.addEventListener('click', (e) => addRipple(submitBtn, e));
  const applyBtn = detail.querySelectorAll('[data-ripple]')[0];
  if (applyBtn) applyBtn.addEventListener('click', (e) => addRipple(applyBtn, e));

    // On mobile, scroll to detail
    if (window.innerWidth < 1024) {
    detail.closest('.job-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function updateCharCount(textarea, counterId, max) {
  const counter = document.getElementById(counterId);
  if (!counter) return;
  const len = textarea.value.length;
  counter.textContent = `${len} / ${max}`;
  counter.className = 'char-counter';
  if (len > max * 0.9) counter.classList.add('warn');
  if (len > max) { counter.classList.add('limit'); textarea.value = textarea.value.slice(0, max); }
}

function applyNow(id) {
  const jobs = getJobs();
  const job = jobs.find(j => j.id === id);
  if (!job) return;

  // Industry cover photos
  const coverPhotos = {
    technology:  'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200',
    finance:     'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1200',
    education:   'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=1200',
    healthcare:  'https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg?auto=compress&cs=tinysrgb&w=1200',
    agriculture: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1200',
    energy:      'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1200',
  };

  // Industry team photos (shown in "Life at company" strip)
  const teamPhotos = {
    technology:  ['https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400'],
    finance:     ['https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'],
    education:   ['https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=400'],
    healthcare:  ['https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400'],
    agriculture: ['https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'],
    energy:      ['https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=400','https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=400'],
  };

  const cover = coverPhotos[job.industry] || coverPhotos.technology;
  const photos = teamPhotos[job.industry] || teamPhotos.technology;
  const stars = '★'.repeat(Math.round(3.5 + Math.random() * 1.5));
  const reviewCount = Math.floor(Math.random()*150)+30;

  // Remove existing modal if any
  document.getElementById('apply-modal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'apply-modal';
  modal.className = 'apply-modal-overlay';
  modal.innerHTML = `
    <div class="apply-modal-box">

      <!-- Sticky header -->
      <div class="apply-modal-header">
        <button class="apply-modal-close" onclick="closeApplyModal()" title="Close">
          <i class="fas fa-times"></i>
        </button>
        <div class="apply-modal-header-info">
          <div class="apply-modal-logo" style="background:${job.color}">${job.company.substring(0,2).toUpperCase()}</div>
          <div>
            <div class="apply-modal-header-title">${job.title}</div>
            <div class="apply-modal-header-company">${job.company} &bull; ${job.location}</div>
          </div>
        </div>
        <button class="btn-apply apply-modal-cta" onclick="document.getElementById('apply-form-section').scrollIntoView({behavior:'smooth'})">
          <i class="fas fa-paper-plane" style="margin-right:7px;"></i>Apply Now
        </button>
      </div>

      <!-- Scrollable body -->
      <div class="apply-modal-body">

        <!-- Cover image -->
        <div class="apply-modal-cover">
          <img src="${cover}" alt="${job.industry} at ${job.company}">
          <div class="apply-modal-cover-overlay">
            <span class="badge badge-indigo" style="font-size:.82rem;padding:5px 14px;">${job.industry.charAt(0).toUpperCase()+job.industry.slice(1)}</span>
            <h2>${job.title}</h2>
            <p>${job.company} &bull; ${job.location}</p>
          </div>
        </div>

        <div class="apply-modal-content">

          <!-- Left column -->
          <div class="apply-modal-left">

            <!-- Quick chips -->
            <div class="detail-chips" style="margin-bottom:24px;">
              <span class="detail-chip"><i class="fas fa-map-marker-alt"></i>${job.location}</span>
              <span class="detail-chip"><i class="fas fa-briefcase"></i>${job.type}</span>
              <span class="detail-chip"><i class="fas fa-coins"></i>RWF ${job.salary}/mo</span>
              <span class="detail-chip"><i class="fas fa-clock"></i>${job.posted}</span>
              <span class="detail-chip"><i class="fas fa-eye"></i>${job.views} views</span>
              ${job.deadline ? `<span class="detail-chip" style="background:#fef3c7;color:#92400e;border-color:#fde68a;"><i class="fas fa-calendar-alt"></i>Deadline: ${job.deadline}</span>` : ''}
            </div>

            <!-- About the role -->
            <div class="apply-modal-section">
              <h3 class="apply-modal-section-title"><i class="fas fa-file-alt"></i> About the Role</h3>
              <p class="detail-desc">${job.desc}</p>
            </div>

            <!-- Requirements -->
            <div class="apply-modal-section">
              <h3 class="apply-modal-section-title"><i class="fas fa-list-check"></i> Key Requirements</h3>
              <ul class="apply-modal-list">
                <li>Bachelor's degree in a relevant field</li>
                <li>Strong communication and interpersonal skills</li>
                <li>Proven experience in ${job.industry} sector</li>
                <li>Ability to work independently and in a team</li>
                <li>Proficiency in English; Kinyarwanda is an advantage</li>
              </ul>
            </div>

            <!-- What we offer -->
            <div class="apply-modal-section">
              <h3 class="apply-modal-section-title"><i class="fas fa-gift"></i> What We Offer</h3>
              <div class="apply-modal-perks">
                <div class="perk-item"><i class="fas fa-coins" style="color:var(--emerald)"></i><div><strong>RWF ${job.salary}/month</strong><span>Competitive salary</span></div></div>
                <div class="perk-item"><i class="fas fa-heartbeat" style="color:#ec4899"></i><div><strong>Health Insurance</strong><span>Full medical cover</span></div></div>
                <div class="perk-item"><i class="fas fa-graduation-cap" style="color:var(--indigo)"></i><div><strong>Training Budget</strong><span>Annual learning allowance</span></div></div>
                <div class="perk-item"><i class="fas fa-laptop-house" style="color:#f59e0b"></i><div><strong>Flexible Work</strong><span>Hybrid options available</span></div></div>
              </div>
            </div>

            <!-- Life at company photos -->
            <div class="apply-modal-section">
              <h3 class="apply-modal-section-title"><i class="fas fa-images"></i> Life at ${job.company}</h3>
              <div class="apply-modal-photos">
                ${photos.map(url => `<img src="${url}" alt="Life at ${job.company}" loading="lazy">`).join('')}
              </div>
            </div>

          </div>

          <!-- Right column — sticky company card + form -->
          <div class="apply-modal-right">

            <!-- Company card -->
            <div class="apply-company-card">
              <div class="apply-company-card-header" style="background:${job.color}20;border-bottom:1px solid ${job.color}30;">
                <div class="apply-modal-logo" style="background:${job.color};width:52px;height:52px;font-size:.95rem;">${job.company.substring(0,2).toUpperCase()}</div>
                <div>
                  <strong>${job.company}</strong>
                  <span>${job.industry.charAt(0).toUpperCase()+job.industry.slice(1)}</span>
                </div>
              </div>
              <div class="apply-company-card-body">
                <div class="apply-company-stat"><i class="fas fa-map-marker-alt"></i> ${job.location}, Rwanda</div>
                <div class="apply-company-stat"><i class="fas fa-star" style="color:var(--amber)"></i> ${stars} <span style="color:var(--muted);font-size:.78rem;">(${reviewCount} reviews)</span></div>
                <div class="apply-company-stat"><i class="fas fa-briefcase"></i> ${job.type} position</div>
                <div class="apply-company-stat"><i class="fas fa-users"></i> 200–1000 employees</div>
              </div>
            </div>

            <!-- Application form -->
            <div class="apply-box" id="apply-form-section" style="margin-top:20px;">
              <h4 style="font-size:1.05rem;margin-bottom:18px;"><i class="fas fa-paper-plane" style="color:var(--indigo);margin-right:8px;"></i>Apply for this Role</h4>

              <div class="apply-form-field">
                <label>Full Name *</label>
                <input id="am-name-${id}" type="text" placeholder="Your full name"
                  onfocus="this.style.borderColor='var(--indigo)'" onblur="this.style.borderColor='var(--border)'">
              </div>
              <div class="apply-form-field">
                <label>Email Address *</label>
                <input id="am-email-${id}" type="email" placeholder="you@email.com"
                  onfocus="this.style.borderColor='var(--indigo)'" onblur="this.style.borderColor='var(--border)'">
              </div>
              <div class="apply-form-field">
                <label>Phone Number *</label>
                <input id="am-phone-${id}" type="tel" placeholder="+250 7XX XXX XXX"
                  onfocus="this.style.borderColor='var(--indigo)'" onblur="this.style.borderColor='var(--border)'">
              </div>
              <div class="apply-form-field">
                <label>Your Location *</label>
                <input id="am-location-${id}" type="text" placeholder="e.g. Kigali"
                  onfocus="this.style.borderColor='var(--indigo)'" onblur="this.style.borderColor='var(--border)'">
              </div>
              <div class="apply-form-field">
                <label>Cover Message *</label>
                <textarea id="am-msg-${id}" rows="4" placeholder="Why are you a great fit for ${job.company}?"
                  oninput="updateCharCount(this,'am-count-${id}',500)"></textarea>
                <div class="char-counter" id="am-count-${id}">0 / 500</div>
              </div>

              <button class="btn-submit-app" id="am-submit-${id}"
                onclick="submitModalApplication(${id},'${job.title.replace(/'/g,"\\'")}','${job.company.replace(/'/g,"\\'")}')">
                <i class="fas fa-paper-plane" style="margin-right:8px;"></i>Submit Application
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  // Animate in
  requestAnimationFrame(() => modal.classList.add('open'));

  // Close on backdrop click
  modal.addEventListener('click', e => { if (e.target === modal) closeApplyModal(); });

  // Close on Escape
  const escHandler = e => { if (e.key === 'Escape') { closeApplyModal(); document.removeEventListener('keydown', escHandler); } };
  document.addEventListener('keydown', escHandler);
}

function closeApplyModal() {
  const modal = document.getElementById('apply-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.classList.add('closing');
  setTimeout(() => { modal.remove(); document.body.style.overflow = ''; }, 320);
}

function submitModalApplication(jobId, title, company) {
  const nameEl     = document.getElementById(`am-name-${jobId}`);
  const emailEl    = document.getElementById(`am-email-${jobId}`);
  const phoneEl    = document.getElementById(`am-phone-${jobId}`);
  const locationEl = document.getElementById(`am-location-${jobId}`);
  const msgEl      = document.getElementById(`am-msg-${jobId}`);

  const fields = [
    { el: nameEl,     val: nameEl?.value.trim(),     label: 'Full name' },
    { el: emailEl,    val: emailEl?.value.trim(),    label: 'Email address' },
    { el: phoneEl,    val: phoneEl?.value.trim(),    label: 'Phone number' },
    { el: locationEl, val: locationEl?.value.trim(), label: 'Your location' },
    { el: msgEl,      val: msgEl?.value.trim(),      label: 'Cover message' },
  ];
  for (const f of fields) {
    if (!f.val) {
      showToast(`Please enter your ${f.label}`, 'error', 'fas fa-exclamation-circle');
      f.el?.focus();
      if (f.el) { f.el.style.borderColor = 'var(--rose)'; setTimeout(() => { f.el.style.borderColor = 'var(--border)'; }, 2000); }
      return;
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
    showToast('Please enter a valid email address', 'error', 'fas fa-exclamation-circle');
    emailEl.focus(); return;
  }

  const apps = getApps();
  if (apps.find(a => a.jobId === jobId && a.seekerEmail === emailEl.value.trim())) {
    showToast('You already applied for this job!', 'error', 'fas fa-info-circle'); return;
  }

  apps.push({
    id: Date.now(), jobId,
    seekerName: nameEl.value.trim(), seekerEmail: emailEl.value.trim(),
    seekerPhone: phoneEl.value.trim(), seekerPlace: locationEl.value.trim(),
    jobTitle: title, company, message: msgEl.value.trim(),
    status: 'New',
    date: new Date().toLocaleDateString('en-RW', { day:'numeric', month:'short', year:'numeric' })
  });
  saveApps(apps);

  const btn = document.getElementById(`am-submit-${jobId}`);
  if (btn) {
    btn.innerHTML = '<i class="fas fa-check" style="margin-right:8px;"></i>Application Submitted!';
    btn.style.background = 'var(--emerald)';
    btn.disabled = true;
  }

  showToast(`Application sent to ${company}! 🎉`, 'success', 'fas fa-check-circle', 4500);
  launchConfetti();
  setTimeout(() => closeApplyModal(), 2200);
}

function submitApplication(jobId, title, company) {
  const nameEl     = document.getElementById(`apply-name-${jobId}`);
  const emailEl    = document.getElementById(`apply-email-${jobId}`);
  const phoneEl    = document.getElementById(`apply-phone-${jobId}`);
  const locationEl = document.getElementById(`apply-location-${jobId}`);
  const msgEl      = document.getElementById(`apply-msg-${jobId}`);

  const name     = nameEl     ? nameEl.value.trim()     : '';
  const email    = emailEl    ? emailEl.value.trim()    : '';
  const phone    = phoneEl    ? phoneEl.value.trim()    : '';
  const location = locationEl ? locationEl.value.trim() : '';
  const msg      = msgEl      ? msgEl.value.trim()      : '';

  // Validate all required fields
  const fields = [
    { el: nameEl,     val: name,     label: 'Full name'      },
    { el: emailEl,    val: email,    label: 'Email address'  },
    { el: phoneEl,    val: phone,    label: 'Phone number'   },
    { el: locationEl, val: location, label: 'Your location'  },
    { el: msgEl,      val: msg,      label: 'Cover message'  },
  ];
  for (const f of fields) {
    if (!f.val) {
      showToast(`Please enter your ${f.label}`, 'error', 'fas fa-exclamation-circle');
      f.el?.focus();
      f.el?.classList.add('shake');
      setTimeout(() => f.el?.classList.remove('shake'), 500);
      if (f.el) f.el.style.borderColor = 'var(--rose)';
      setTimeout(() => { if (f.el) f.el.style.borderColor = 'var(--border)'; }, 2000);
      return;
    }
  }
  // Basic email check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address', 'error', 'fas fa-exclamation-circle');
    emailEl?.focus();
    return;
  }

  const apps = getApps();

  // Check duplicate by email + jobId
  const duplicate = apps.find(a => a.jobId === jobId && a.seekerEmail === email);
  if (duplicate) {
    showToast('You already applied for this job!', 'error', 'fas fa-info-circle');
    return;
  }

  apps.push({
    id:           Date.now(),
    jobId,
    seekerName:   name,
    seekerEmail:  email,
    seekerPhone:  phone,
    seekerPlace:  location,
    jobTitle:     title,
    company,
    message:      msg,
    status:       'New',
    date:         new Date().toLocaleDateString('en-RW', { day:'numeric', month:'short', year:'numeric' })
  });
  saveApps(apps);

  // Clear fields
  [nameEl, emailEl, phoneEl, locationEl, msgEl].forEach(el => { if (el) el.value = ''; });
  const counter = document.getElementById(`msg-count-${jobId}`);
  if (counter) { counter.textContent = '0 / 500'; counter.className = 'char-counter'; }

  showToast(`Application sent to ${company}! 🎉`, 'success', 'fas fa-check-circle', 4500);
  launchConfetti();

  // Update submit button
  const btn = document.querySelector(`#apply-section-${jobId} .btn-submit-app`);
  if (btn) {
    btn.innerHTML = '<i class="fas fa-check" style="margin-right:8px;"></i>Application Submitted!';
    btn.style.background = 'var(--emerald)';
    btn.disabled = true;
  }
}

// ── CONFETTI ─────────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#3b2fc9','#10b981','#f59e0b','#ec4899','#8b5cf6','#ef4444'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 5;
    el.style.cssText = `
      position:fixed;z-index:9998;
      width:${size}px;height:${size}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      left:${Math.random() * 100}%;
      top:-${size}px;
      opacity:1;
      transform:rotate(${Math.random() * 360}deg);
      transition:none;
      pointer-events:none;
    `;
    document.body.appendChild(el);
    const duration = 1500 + Math.random() * 1500;
    const delay = Math.random() * 400;
    const destX = (Math.random() - 0.5) * 300;
    const destY = window.innerHeight + 100;
    el.animate([
      { transform: `translateX(0) translateY(0) rotate(0deg)`, opacity: 1 },
      { transform: `translateX(${destX}px) translateY(${destY}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
    ], { duration, delay, easing: 'cubic-bezier(.2,.6,.4,1)', fill: 'forwards' }).onfinish = () => el.remove();
  }
}

// ── SEARCH SETUP ─────────────────────────────────────────────
function setupJobSearch() {
  const searchInput = document.getElementById('job-search-input');
  const locInput    = document.getElementById('job-location-input');
  const searchBtn   = document.getElementById('hero-search-btn');

  // Read URL params (e.g. arriving from salary cards on market.html)
  const urlParams = new URLSearchParams(window.location.search);
  const paramIndustry = urlParams.get('industry');
  const paramQ        = urlParams.get('q');
  if (paramIndustry) {
    currentFilter.industry = paramIndustry;
    if (paramQ && searchInput) searchInput.value = paramQ;
  }

  function doSearch() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const loc   = (locInput?.value || '').toLowerCase().trim();
    const jobs  = getJobs();
    const filtered = jobs.filter(j => {
      const matchQ = !query || j.title.toLowerCase().includes(query) || j.company.toLowerCase().includes(query) || j.industry.toLowerCase().includes(query);
      const matchL = !loc   || j.location.toLowerCase().includes(loc) || loc === 'rwanda';
      const matchType = !currentFilter.type || currentFilter.type === 'all' || j.type === currentFilter.type;
      const matchIndustry = !currentFilter.industry || currentFilter.industry === 'all' || j.industry === currentFilter.industry;
      const matchLocation = !currentFilter.location || currentFilter.location === 'all' || j.location === currentFilter.location;
      return matchQ && matchL && matchType && matchIndustry && matchLocation;
    });
    renderJobCards(filtered);

    // Hide detail if no results
    if (filtered.length === 0 && document.getElementById('job-detail-content')) {
      document.getElementById('job-detail-content').style.display = 'none';
      document.getElementById('detail-placeholder').style.display = 'flex';
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      addRipple(searchBtn, e);
      doSearch();
      document.querySelector('.listing-layout')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (searchInput) {
    searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(); });
    // Live search with debounce
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(doSearch, 320);
    });
  }

  // Filter chips
  document.querySelectorAll('.filter-chip[data-group]').forEach(chip => {
    chip.addEventListener('click', () => {
      const group = chip.dataset.group;
      document.querySelectorAll(`.filter-chip[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter[group] = chip.dataset.value;
      doSearch();
      // Scroll to jobs panel so user sees the filtered results
      setTimeout(() => {
        document.querySelector('.jobs-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    });
  });

  // Hero tags
  document.querySelectorAll('.hero-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      if (searchInput) searchInput.value = tag.textContent;
      doSearch();
      setTimeout(() => document.querySelector('.listing-layout')?.scrollIntoView({ behavior: 'smooth' }), 50);
    });
  });

  // Run initial search (applies URL params if any)
  doSearch();

  // Keyboard shortcut: "/" to focus search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      searchInput?.focus();
      showToast('Search mode active', 'info', 'fas fa-search', 1500);
    }
    if (e.key === 'Escape') searchInput?.blur();
  });
}

// ── EMPLOYER HUB ─────────────────────────────────────────────
function filterByIndustry(industry) {
  document.getElementById('industry-main').classList.add('hidden');
  const panel = document.getElementById('results-panel');
  panel.classList.remove('hidden');
  document.getElementById('industry-title').textContent =
    industry.charAt(0).toUpperCase() + industry.slice(1) + ' Companies';

  const industryPhotos = {
    technology:  'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
    finance:     'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=600',
    education:   'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=600',
    healthcare:  'https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg?auto=compress&cs=tinysrgb&w=600',
    agriculture: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=600',
    energy:      'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=600',
  };

  const companies = companyData[industry] || [];
  const container = document.getElementById('company-results');
  container.innerHTML = '';

  companies.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'detailed-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.style.flexDirection = 'column';
    card.style.padding = '0';
    card.style.overflow = 'hidden';
    card.innerHTML = `
      <img src="${industryPhotos[industry]}" alt="${c.name}" class="company-industry-img">
      <div style="padding:18px;display:flex;gap:14px;">
        <div class="logo-sq" style="background:${c.color}">${c.name.substring(0,2)}</div>
        <div class="comp-info">
          <h3>${c.name}</h3>
          <p>${c.desc}</p>
          <div style="display:flex;gap:14px;margin-bottom:8px;font-size:.78rem;color:var(--muted);">
            <span><i class="fas fa-users" style="margin-right:4px;"></i>${c.employees}</span>
            <span><i class="fas fa-calendar" style="margin-right:4px;"></i>Est. ${c.founded}</span>
          </div>
          <div class="rating">
            ${'<i class="fas fa-star"></i>'.repeat(Math.round(c.rating))}${'<i class="far fa-star"></i>'.repeat(5 - Math.round(c.rating))}
            <strong style="margin-left:5px;">${c.rating}</strong>
            <span>(${Math.floor(Math.random()*200)+50} reviews)</span>
          </div>
          <div class="comp-links" style="margin-top:10px;">
            <span onclick="showToast('${c.jobs} open positions at ${c.name}', 'info', 'fas fa-briefcase')">
              <i class="fas fa-briefcase"></i> ${c.jobs} open jobs
            </span>
            <span onclick="showToast('Reviews coming soon!', 'info', 'fas fa-star')">
              <i class="fas fa-star"></i> Reviews
            </span>
          </div>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function hideResults() {
  const panel = document.getElementById('results-panel');
  panel.style.animation = 'none';
  panel.classList.add('hidden');
  document.getElementById('industry-main').classList.remove('hidden');
  // Animate cards back in
  document.querySelectorAll('.industry-card').forEach((card, i) => {
    card.style.animation = 'none';
    card.style.animationDelay = `${i * 0.05}s`;
    requestAnimationFrame(() => {
      card.style.animation = `fadeSlideUp .35s ${i * 0.05}s ease both`;
    });
  });
}

// ── ADMIN DASHBOARD ──────────────────────────────────────────
let editIdx = null;
let activeSection = 'overview';

function switchSection(section) {
  activeSection = section;
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.section === section);
  });
  document.querySelectorAll('.dash-section').forEach(s => {
    s.classList.add('hidden');
    s.style.animation = 'none';
  });
  const el = document.getElementById(`section-${section}`);
  if (el) {
    el.classList.remove('hidden');
    el.style.animation = 'fadeSlideUp .35s ease';
  }
}

function loadDashboard() {
  const jobs  = getJobs();
  const apps  = getApps();
  const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

  // Animate stat counters
  setElAnimated('stat-jobs',      jobs.length);
  setElAnimated('stat-apps',      apps.length);
  setElAnimated('stat-seekers',   users.filter(u => u.role === 'Job Seeker').length || 148);
  setElAnimated('stat-employers', users.filter(u => u.role === 'Employer').length   || 23);

  // Applications badge in sidebar
  const badge = document.querySelector('[data-section="apps"] .nav-badge');
  if (badge && apps.length > 0) badge.textContent = apps.length;

  // Jobs table
  const tbody = document.getElementById('admin-job-list');
  if (tbody) {
    tbody.innerHTML = jobs.map((j, i) => `
      <tr style="animation:fadeSlideUp .3s ${i * 0.05}s ease both;">
        <td class="name-cell">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;border-radius:9px;background:${j.color};
                        display:flex;align-items:center;justify-content:center;
                        color:white;font-weight:800;font-size:.75rem;box-shadow:0 2px 8px rgba(0,0,0,.12);">
              ${j.company.substring(0,2).toUpperCase()}
            </div>
            <span style="font-weight:700;">${j.title}</span>
          </div>
        </td>
        <td>${j.company}</td>
        <td><i class="fas fa-map-marker-alt" style="color:var(--indigo);margin-right:5px;font-size:.8rem;"></i>${j.location}</td>
        <td><span class="badge badge-blue">${j.type}</span></td>
        <td style="font-weight:700;color:var(--indigo);">RWF ${j.salary}</td>
        <td>
          <button class="tbl-btn tbl-btn-edit" onclick="openEditModal(${i})"><i class="fas fa-edit" style="margin-right:4px;"></i>Edit</button>
          <button class="tbl-btn tbl-btn-danger" onclick="deleteJob(${i})"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`).join('');
  }

  // Applications table
  const appTbody = document.getElementById('admin-app-list');
  if (appTbody) {
    if (apps.length === 0) {
      appTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:32px;"><i class="fas fa-inbox" style="font-size:1.5rem;display:block;margin-bottom:10px;opacity:.4;"></i>No applications yet</td></tr>';
    } else {
      appTbody.innerHTML = apps.slice().reverse().map((a, i) => `
        <tr class="log-row" style="animation:fadeSlideUp .3s ${i*0.04}s ease both;">
          <td class="name-cell">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--indigo),#6d51f7);
                          display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:.72rem;">
                ${(a.seekerName||'?')[0].toUpperCase()}
              </div>
              ${a.seekerName}
            </div>
          </td>
          <td>${a.jobTitle}</td>
          <td>${a.company || '—'}</td>
          <td>
            <span class="badge ${a.status === 'New' ? 'badge-blue' : 'badge-green'}">${a.status}</span>
          </td>
          <td style="color:var(--muted);">${a.date}</td>
        </tr>`).join('');
    }
    const badge = document.getElementById('apps-count-badge');
    if (badge) badge.textContent = apps.length + ' total';
  }

  // Activity logs
  const logTbody = document.getElementById('admin-log-list');
  if (logTbody) {
    const logs = JSON.parse(localStorage.getItem('activityLog')) || [
      { time:'2026-03-25 09:12', user:'Admin_01', action:'Deleted Job #452',          ip:'192.168.1.1' },
      { time:'2026-03-25 08:45', user:'Admin_01', action:'Approved Employer: TechCo', ip:'192.168.1.1' },
      { time:'2026-03-24 17:30', user:'System',   action:'New user registered',       ip:'196.0.23.8'  },
      { time:'2026-03-24 14:22', user:'Admin_01', action:'Updated settings',          ip:'192.168.1.1' },
    ];
    logTbody.innerHTML = logs.map((l, i) => `
      <tr class="log-row" style="animation:fadeSlideUp .3s ${i*0.05}s ease both;">
        <td>${l.time}</td>
        <td><strong>${l.user}</strong></td>
        <td>${l.action}</td>
        <td style="font-family:monospace;font-size:.77rem;color:var(--muted);">${l.ip}</td>
      </tr>`).join('');
  }

  renderGrowthChart();
  setTimeout(initCounterAnimations, 200);
}

function setElAnimated(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = val;
  // trigger counter
  setTimeout(() => animateCounter(el, val), 300);
}

function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

function renderGrowthChart() {
  const canvas = document.getElementById('growthChart');
  if (!canvas || !window.Chart) return;
  if (canvas._chartInstance) canvas._chartInstance.destroy();
  canvas._chartInstance = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [{
        label: 'Users',
        data: [80,120,210,310,430,580],
        borderColor: '#3b2fc9',
        backgroundColor: 'rgba(59,47,201,.07)',
        tension: .45, fill: true, pointRadius: 5,
        pointBackgroundColor: '#3b2fc9',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
      },{
        label: 'Jobs Posted',
        data: [10,18,32,50,70,90],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,.05)',
        tension: .45, fill: true, pointRadius: 5,
        pointBackgroundColor: '#10b981',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 1000, easing: 'easeInOutQuart' },
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true, padding: 20, font: { family: 'Plus Jakarta Sans', weight: '600' } } },
        tooltip: { backgroundColor: '#0f172a', titleFont: { family: 'Sora', weight: '800' }, bodyFont: { family: 'Plus Jakarta Sans' }, padding: 12, cornerRadius: 10 }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Plus Jakarta Sans' } } },
        x: { grid: { display: false }, ticks: { font: { family: 'Plus Jakarta Sans' } } }
      }
    }
  });
}

function deleteJob(index) {
  // Custom confirm via toast-style modal
  const jobs = getJobs();
  const job = jobs[index];
  if (!confirm(`Delete "${job.title}" at ${job.company}?`)) return;
  jobs.splice(index, 1);
  saveJobs(jobs);
  showToast(`Job "${job.title}" deleted`, 'error', 'fas fa-trash');
  loadDashboard();
}

function openEditModal(index) {
  editIdx = index;
  const jobs = getJobs();
  const j = jobs[index];
  document.getElementById('edit-title').value    = j.title;
  document.getElementById('edit-company').value  = j.company;
  document.getElementById('edit-location').value = j.location;
  const modal = document.getElementById('edit-modal');
  modal.style.display = 'flex';
  // Add overlay close on click
  modal.onclick = (e) => { if (e.target === modal) closeEditModal(); };
}
function saveJobEdit() {
  const jobs = getJobs();
  const oldTitle = jobs[editIdx].title;
  jobs[editIdx].title    = document.getElementById('edit-title').value;
  jobs[editIdx].company  = document.getElementById('edit-company').value;
  jobs[editIdx].location = document.getElementById('edit-location').value;
  saveJobs(jobs);
  closeEditModal();
  loadDashboard();
  showToast(`Job updated successfully!`, 'success', 'fas fa-check-circle');
}
function closeEditModal() {
  const modal = document.getElementById('edit-modal');
  if (modal) { modal.style.animation = 'fadeIn .2s reverse'; setTimeout(() => modal.style.display = 'none', 180); }
}

// ── POST JOB ─────────────────────────────────────────────────
function setupPostJob() {
  const form = document.getElementById('job-form');
  if (!form) return;

  // Character counter for description
  const descEl = document.getElementById('job-desc');
  if (descEl) {
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.id = 'desc-counter';
    counter.textContent = '0 / 2000';
    descEl.after(counter);
    descEl.addEventListener('input', () => updateCharCount(descEl, 'desc-counter', 2000));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = form.querySelector('.btn-post');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i>Posting…';
    submitBtn.disabled = true;

    setTimeout(() => {
      const colors = ['#3b2fc9','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#059669'];
      const newJob = {
        id:       Date.now(),
        title:    document.getElementById('job-title').value,
        company:  document.getElementById('job-company').value,
        location: document.getElementById('job-location')?.value || 'Kigali',
        type:     document.getElementById('job-type')?.value || 'Full-time',
        salary:   document.getElementById('job-salary')?.value || '500,000',
        industry: document.getElementById('job-industry')?.value || 'technology',
        color:    colors[Math.floor(Math.random() * colors.length)],
        posted:   'Just now',
        views: 0
      };
      const jobs = getJobs();
      jobs.push(newJob);
      saveJobs(jobs);
      launchConfetti();
      showToast('Job posted successfully! 🎉', 'success', 'fas fa-check-circle', 4000);
      setTimeout(() => { window.location.href = 'admin.html'; }, 1500);
    }, 800);
  });

  // Add input focus effects
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
    input.addEventListener('blur',  () => input.parentElement.classList.remove('focused'));
  });
}

// ── AUTH ──────────────────────────────────────────────────────
let authRole = 'Job Seeker';

function setAuthRole(role) {
  authRole = role;
  document.querySelectorAll('.role-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });
  const btnEl = document.getElementById('auth-submit-btn');
  if (btnEl) {
    btnEl.textContent = `Sign In as ${role}`;
    btnEl.style.animation = 'none';
    requestAnimationFrame(() => { btnEl.style.animation = 'popIn .3s cubic-bezier(.34,1.56,.64,1)'; });
  }
  const msgEl = document.getElementById('auth-msg');
  if (msgEl) {
    const msgs = {
      'Admin': 'Authorized access only. Admin credentials required.',
      'Employer': 'Manage your job listings and find top talent.',
      'Job Seeker': 'Welcome back! Find your dream job in Rwanda.'
    };
    msgEl.textContent = msgs[role];
    msgEl.style.animation = 'none';
    requestAnimationFrame(() => { msgEl.style.animation = 'fadeSlideDown .25s ease'; });
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value;
  const pass  = document.getElementById('auth-password').value;
  if (!email || !pass) { showToast('Please fill in all fields', 'error', 'fas fa-exclamation'); return; }

  const btn = document.getElementById('auth-submit-btn');
  btn.classList.add('loading');
  btn.textContent = 'Signing in…';

  setTimeout(() => {
    const user = { name: authRole === 'Admin' ? 'Admin User' : email.split('@')[0], email, role: authRole };
    if (authRole === 'Admin') {
      if (!email.toLowerCase().includes('admin') && pass !== 'admin123') {
        btn.classList.remove('loading');
        btn.textContent = `Sign In as ${authRole}`;
        showToast('Invalid admin credentials.', 'error', 'fas fa-lock', 4000);
        return;
      }
      setUser(user);
      showToast('Welcome, Admin!', 'success', 'fas fa-user-shield');
      setTimeout(() => { window.location.href = 'admin.html'; }, 700);
    } else {
      setUser(user);
      const greeting = `Welcome back, ${user.name}!`;
      showToast(greeting, 'success', 'fas fa-check-circle');
      setTimeout(() => { window.location.href = authRole === 'Employer' ? 'admin.html' : 'home.html'; }, 700);
    }
  }, 900);
}

function handleRegister(e) {
  e.preventDefault();
  const email = document.getElementById('reg-email')?.value;
  const pass  = document.getElementById('reg-password')?.value;
  const name  = document.getElementById('reg-name')?.value;
  if (!email || !pass || !name) { showToast('Please fill in all fields', 'error', 'fas fa-exclamation'); return; }
  const user = { name, email, role: authRole };
  setUser(user);
  showToast(`Account created! Welcome, ${name}`, 'success', 'fas fa-user-check', 3000);
  setTimeout(() => { window.location.href = authRole === 'Employer' ? 'admin.html' : 'home.html'; }, 1000);
}

function togglePassword(inputId, iconEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    iconEl.classList.replace('fa-eye','fa-eye-slash');
    iconEl.style.color = 'var(--indigo)';
  } else {
    input.type = 'password';
    iconEl.classList.replace('fa-eye-slash','fa-eye');
    iconEl.style.color = '';
  }
}

// ── TYPING ANIMATION FOR HERO ────────────────────────────────
function initHeroTyping() {
  const el = document.querySelector('.search-hero h1');
  if (!el) return;
  const words = ['Rwanda', 'Kigali', 'Africa'];
  let currentWord = 0;
  const target = el.querySelector('.highlight') || el;
  if (!target) return;

  // Only animate if there's a .highlight span
  const highlight = el.querySelector('.highlight');
  if (!highlight) return;

  const originalText = highlight.textContent;
  setInterval(() => {
    highlight.style.opacity = '0';
    highlight.style.transform = 'translateY(10px)';
    setTimeout(() => {
      currentWord = (currentWord + 1) % words.length;
      highlight.textContent = words[currentWord];
      highlight.style.transition = 'all .3s cubic-bezier(.34,1.56,.64,1)';
      highlight.style.opacity = '1';
      highlight.style.transform = 'translateY(0)';
    }, 200);
  }, 3000);
}

// ── SMOOTH NUMBER DISPLAY ─────────────────────────────────────
function animateNumber(el, end, duration = 1000) {
  const start = 0;
  const range = end - start;
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = progress < 0.5 ? 2*progress*progress : -1+(4-2*progress)*progress;
    el.textContent = Math.floor(start + range * eased);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = end;
  }
  requestAnimationFrame(step);
}

// ── LAZY IMAGE / LOGO FALLBACK ────────────────────────────────
function initLazyAnimations() {
  // Stagger list items on page load
  document.querySelectorAll('.footer-col li, .notif-item').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.04}s`;
  });
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Progress bar
  initProgressBar();
  // Nav scroll
  initNavScroll();
  // Auth nav
  updateNavAuth();
  // Job page
  renderJobCards(getJobs());
  setupJobSearch();
  // Post job
  setupPostJob();
  // Dashboard
  loadDashboard();
  // Scroll reveal
  initScrollReveal();
  // Lazy animations
  initLazyAnimations();
  // Hero typing
  initHeroTyping();
  // Counter animations
  setTimeout(initCounterAnimations, 600);

  // Add ripple to all primary buttons
  document.querySelectorAll('.btn-auth, .btn-post, .nav-btn-primary, .btn-save-settings, .hero-search-btn').forEach(btn => {
    btn.addEventListener('click', (e) => addRipple(btn, e));
  });

  // Keyboard: Escape closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEditModal();
  });

  // Animate hero orb
  const heroSection = document.querySelector('.search-hero');
  if (heroSection) {
    const orb = document.createElement('div');
    orb.className = 'hero-orb-2';
    heroSection.appendChild(orb);
  }
});
// ── SCROLL REVEAL FOR IMAGES ────────────────────────────────
function initImageScrollReveal() {
  const els = document.querySelectorAll('.reveal-on-scroll');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// ── PARALLAX SCROLL ─────────────────────────────────────────
function initParallax() {
  const banners = document.querySelectorAll('.parallax-banner');
  if (!banners.length) return;
  window.addEventListener('scroll', () => {
    banners.forEach(banner => {
      const rect = banner.getBoundingClientRect();
      const img = banner.querySelector('.parallax-banner-img');
      if (!img) return;
      const offset = rect.top * 0.3;
      img.style.transform = `translateY(${offset}px)`;
    });
  }, { passive: true });
}

// Add to init
document.addEventListener('DOMContentLoaded', () => {
  initImageScrollReveal();
  initParallax();
});

