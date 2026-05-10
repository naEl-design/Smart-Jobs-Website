/* ============================================================
   smartJobs Rwanda — Enhanced Script v2 (FIXED)
   FIXED: Removed saveJobs(defaultJobs) that was wiping posted jobs
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
// FIXED: Get jobs - merge default jobs with saved jobs so nothing gets lost
function getJobs() {
  const savedJobs = JSON.parse(localStorage.getItem('allJobs')) || [];
  
  // If no saved jobs, return default jobs
  if (savedJobs.length === 0) {
    return defaultJobs;
  }
  
  // Merge: show default jobs + employer-posted jobs, avoid duplicates by ID
  const allJobIds = new Set(savedJobs.map(j => j.id));
  const defaultJobsToAdd = defaultJobs.filter(j => !allJobIds.has(j.id));
  
  return [...defaultJobsToAdd, ...savedJobs];
}

function saveJobs(jobs) {
  localStorage.setItem('allJobs', JSON.stringify(jobs));
}

function getApps() {
  return JSON.parse(localStorage.getItem('jobApplications')) || [];
}

function saveApps(apps) {
  localStorage.setItem('jobApplications', JSON.stringify(apps));
}

function getUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

function setUser(u) {
  localStorage.setItem('currentUser', JSON.stringify(u));
}

function getSaved() {
  return JSON.parse(localStorage.getItem('savedJobs')) || [];
}

function toggleSaved(id) {
  const saved = getSaved();
  const idx = saved.indexOf(id);
  if (idx === -1) {
    saved.push(id);
    showToast('Job saved to bookmarks!', 'success', 'fas fa-bookmark');
  } else {
    saved.splice(idx, 1);
    showToast('Removed from bookmarks', 'info', 'fas fa-bookmark');
  }
  localStorage.setItem('savedJobs', JSON.stringify(saved));
  return idx === -1;
}

function logout() {
  localStorage.removeItem('currentUser');
  showToast('Signed out successfully', 'info', 'fas fa-sign-out-alt');
  setTimeout(() => { window.location.href = 'auth.html'; }, 800);
}

// REMOVED: saveJobs(defaultJobs) - THIS WAS THE BUG THAT WIPED EMPLOYER JOBS
// Do NOT pre-save default jobs on every page load

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
                    cursor:pointer;transition:transform .2s;" title="${user.name || user.role}">${initial}</div>
        <span style="font-weight:700;color:var(--indigo);font-size:.88rem;">${user.name || user.role}</span>
        <button class="nav-cv-btn" onclick="window.location.href='cv-builder.html'" title="Download your smartJobs CV">
          <i class="fas fa-file-arrow-down"></i> Download CV
        </button>
        <button class="nav-btn-primary" onclick="logout()" style="font-size:.82rem;padding:7px 16px;">Sign Out</button>
      </div>`;

    // inject nav-cv-btn styles once
    if (!document.getElementById('nav-cv-style')) {
      const s = document.createElement('style');
      s.id = 'nav-cv-style';
      s.textContent = `
        .nav-cv-btn {
          display:inline-flex;align-items:center;gap:6px;
          background:linear-gradient(135deg,#10b981,#059669);
          color:white;border:none;border-radius:8px;
          padding:7px 14px;font-size:.82rem;font-weight:700;
          cursor:pointer;letter-spacing:.01em;
          box-shadow:0 2px 12px rgba(16,185,129,.35);
          transition:transform .18s,box-shadow .18s;
        }
        .nav-cv-btn:hover { transform:translateY(-1px);box-shadow:0 6px 20px rgba(16,185,129,.45); }
        .nav-cv-btn i { font-size:.85rem; }
      `;
      document.head.appendChild(s);
    }
  } else {
    area.innerHTML = `
      <a href="post-job.html" class="nav-btn-ghost">Post a Job</a>
      <div class="nav-divider"></div>
      <a href="auth.html" class="nav-btn-primary">Sign In</a>
    `;
  }
}

// ── CV MODAL ────────────────────────────────────────────────
function openCVModal() {
  if (document.getElementById('cv-modal-overlay')) return;
  const user = getUser();
  if (!user) return;

  const savedJobIds = getSaved();
  const allJobs = getJobs();
  const savedJobs = allJobs.filter(j => savedJobIds.includes(j.id));

  // Skills bank by industry
  const skillsMap = {
    technology: ['JavaScript','Python','React','Node.js','SQL','Git','REST APIs','Cloud (AWS/Azure)','Agile/Scrum','Problem Solving'],
    finance:    ['Financial Reporting','Excel/Sheets','Budgeting','Risk Analysis','Accounting','IFRS Standards','Data Analysis','ERP Systems','Communication','Attention to Detail'],
    healthcare: ['Patient Care','Clinical Assessment','Medical Records','RSSB/Mutuelle','Diagnostics','Team Collaboration','ICD-10 Coding','Healthcare Regulations','Empathy','Critical Thinking'],
    education:  ['Curriculum Design','Classroom Management','Student Assessment','Research','Lesson Planning','STEM Teaching','Communication','Rwanda CBC','Digital Learning','Mentoring'],
    agriculture:['Agronomy','Crop Management','Field Data Collection','GIS Mapping','Soil Analysis','Sustainable Farming','Community Engagement','Report Writing','Data Entry','Biodiversity'],
    energy:     ['Electrical Systems','Solar Installation','Energy Auditing','Project Management','AutoCAD','Safety Compliance','Technical Reporting','Customer Training','Field Operations','Sustainability'],
  };
  const defaultSkills = ['Microsoft Office','Communication','Teamwork','Problem Solving','Time Management','Project Coordination','Data Analysis','Leadership','Critical Thinking','Adaptability'];

  // Infer industry from saved jobs
  const topIndustry = savedJobs.length
    ? savedJobs.reduce((acc, j) => { acc[j.industry] = (acc[j.industry]||0)+1; return acc; }, {})
    : {};
  const primaryIndustry = Object.entries(topIndustry).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'technology';
  const skills = skillsMap[primaryIndustry] || defaultSkills;

  const overlay = document.createElement('div');
  overlay.id = 'cv-modal-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:20000;background:rgba(10,8,40,.75);
    display:flex;align-items:center;justify-content:center;
    backdrop-filter:blur(8px);animation:fadeIn .2s ease;
  `;

  overlay.innerHTML = `
    <div id="cv-modal" style="
      background:#fff;border-radius:20px;width:min(760px,96vw);max-height:90vh;
      overflow-y:auto;box-shadow:0 32px 96px rgba(59,47,201,.32);
      animation:popIn .35s cubic-bezier(.34,1.56,.64,1);position:relative;
    ">
      <!-- Sticky header bar -->
      <div style="
        position:sticky;top:0;z-index:5;
        background:linear-gradient(135deg,#3b2fc9,#6d51f7);
        padding:14px 24px;display:flex;align-items:center;justify-content:space-between;
        border-radius:20px 20px 0 0;
      ">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-weight:900;font-size:1.1rem;color:white;font-family:'Sora',sans-serif;">smart<span style="color:#10b981;">Jobs</span> CV Builder</span>
        </div>
        <div style="display:flex;gap:8px;">
          <button onclick="downloadCVAsPDF()" style="
            background:#10b981;color:white;border:none;border-radius:8px;
            padding:8px 18px;font-weight:700;font-size:.83rem;cursor:pointer;
            display:flex;align-items:center;gap:6px;
          "><i class='fas fa-download'></i> Download PDF</button>
          <button onclick="closeCVModal()" style="
            background:rgba(255,255,255,.15);border:none;color:white;
            border-radius:8px;padding:8px 12px;cursor:pointer;font-size:1rem;
          "><i class='fas fa-times'></i></button>
        </div>
      </div>

      <!-- EDITABLE FORM SECTION -->
      <div style="padding:24px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
        <p style="font-size:.8rem;color:#64748b;margin-bottom:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;">
          <i class="fas fa-pencil" style="margin-right:4px;"></i>Personalise your CV
        </p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:.75rem;font-weight:700;color:#475569;display:block;margin-bottom:4px;">Full Name</label>
            <input id="cv-name" value="${user.name || ''}" style="width:100%;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.88rem;font-family:'Plus Jakarta Sans',sans-serif;">
          </div>
          <div>
            <label style="font-size:.75rem;font-weight:700;color:#475569;display:block;margin-bottom:4px;">Email</label>
            <input id="cv-email" value="${user.email || ''}" style="width:100%;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.88rem;font-family:'Plus Jakarta Sans',sans-serif;">
          </div>
          <div>
            <label style="font-size:.75rem;font-weight:700;color:#475569;display:block;margin-bottom:4px;">Phone</label>
            <input id="cv-phone" placeholder="+250 7xx xxx xxx" style="width:100%;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.88rem;font-family:'Plus Jakarta Sans',sans-serif;">
          </div>
          <div>
            <label style="font-size:.75rem;font-weight:700;color:#475569;display:block;margin-bottom:4px;">Location</label>
            <input id="cv-location" value="Kigali, Rwanda" style="width:100%;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.88rem;font-family:'Plus Jakarta Sans',sans-serif;">
          </div>
          <div style="grid-column:1/-1;">
            <label style="font-size:.75rem;font-weight:700;color:#475569;display:block;margin-bottom:4px;">Professional Summary</label>
            <textarea id="cv-summary" rows="2" style="width:100%;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.88rem;resize:none;font-family:'Plus Jakarta Sans',sans-serif;" placeholder="A brief professional summary…">Dynamic professional with expertise in ${primaryIndustry}, committed to delivering measurable results and driving organisational growth in Rwanda's evolving job market.</textarea>
          </div>
        </div>
        <button onclick="renderCVPreview()" style="
          margin-top:12px;background:#3b2fc9;color:white;border:none;border-radius:8px;
          padding:9px 20px;font-weight:700;font-size:.83rem;cursor:pointer;
        "><i class='fas fa-eye' style='margin-right:6px;'></i>Update Preview</button>
      </div>

      <!-- CV PREVIEW -->
      <div id="cv-preview-wrap" style="padding:24px;">
        ${buildCVHTML(user, skills, savedJobs, primaryIndustry)}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeCVModal(); });
}

function closeCVModal() {
  const overlay = document.getElementById('cv-modal-overlay');
  if (overlay) overlay.remove();
}

function renderCVPreview() {
  const user = getUser();
  const savedJobIds = getSaved();
  const allJobs = getJobs();
  const savedJobs = allJobs.filter(j => savedJobIds.includes(j.id));
  const topIndustry = savedJobs.reduce((acc, j) => { acc[j.industry] = (acc[j.industry]||0)+1; return acc; }, {});
  const primaryIndustry = Object.entries(topIndustry).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'technology';
  const skillsMap = {
    technology: ['JavaScript','Python','React','Node.js','SQL','Git','REST APIs','Cloud (AWS/Azure)','Agile/Scrum','Problem Solving'],
    finance:    ['Financial Reporting','Excel/Sheets','Budgeting','Risk Analysis','Accounting','IFRS Standards','Data Analysis','ERP Systems','Communication','Attention to Detail'],
    healthcare: ['Patient Care','Clinical Assessment','Medical Records','RSSB/Mutuelle','Diagnostics','Team Collaboration','ICD-10 Coding','Healthcare Regulations','Empathy','Critical Thinking'],
    education:  ['Curriculum Design','Classroom Management','Student Assessment','Research','Lesson Planning','STEM Teaching','Communication','Rwanda CBC','Digital Learning','Mentoring'],
    agriculture:['Agronomy','Crop Management','Field Data Collection','GIS Mapping','Soil Analysis','Sustainable Farming','Community Engagement','Report Writing','Data Entry','Biodiversity'],
    energy:     ['Electrical Systems','Solar Installation','Energy Auditing','Project Management','AutoCAD','Safety Compliance','Technical Reporting','Customer Training','Field Operations','Sustainability'],
  };

  const customUser = {
    ...user,
    name: document.getElementById('cv-name')?.value || user.name,
    email: document.getElementById('cv-email')?.value || user.email,
    phone: document.getElementById('cv-phone')?.value,
    location: document.getElementById('cv-location')?.value,
    summary: document.getElementById('cv-summary')?.value,
  };

  const wrap = document.getElementById('cv-preview-wrap');
  if (wrap) {
    wrap.innerHTML = buildCVHTML(customUser, skillsMap[primaryIndustry] || skillsMap.technology, savedJobs, primaryIndustry);
    showToast('CV preview updated!', 'success', 'fas fa-check-circle', 2000);
  }
}

function buildCVHTML(user, skills, savedJobs, industry) {
  const name = user.name || 'Your Name';
  const email = user.email || 'email@example.com';
  const phone = user.phone || '+250 780 000 000';
  const location = user.location || 'Kigali, Rwanda';
  const summary = user.summary || `Dynamic professional with expertise in ${industry}, committed to delivering measurable results and driving organisational growth in Rwanda's evolving job market.`;

  const industryLabel = industry.charAt(0).toUpperCase() + industry.slice(1);

  const experienceBlocks = savedJobs.slice(0, 3).map((job, i) => {
    const years = ['2023 – Present', '2021 – 2023', '2019 – 2021'];
    return `
      <div style="margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid #f1f5f9;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:4px;">
          <div>
            <div style="font-weight:800;color:#0f172a;font-size:.97rem;">${job.title}</div>
            <div style="color:#3b2fc9;font-weight:600;font-size:.85rem;margin-top:2px;">${job.company}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:.78rem;font-weight:700;background:#ede9ff;color:#3b2fc9;padding:3px 10px;border-radius:20px;">${years[i] || '2020 – 2022'}</div>
            <div style="font-size:.75rem;color:#64748b;margin-top:3px;">${job.location}</div>
          </div>
        </div>
        <ul style="margin:8px 0 0 16px;color:#334155;font-size:.84rem;line-height:1.7;">
          <li>Delivered key ${industry} outcomes aligned with organisational goals and KPIs.</li>
          <li>Collaborated cross-functionally to implement data-driven solutions and process improvements.</li>
          <li>Represented the organisation in stakeholder engagements and sector forums.</li>
        </ul>
      </div>`;
  }).join('');

  const defaultExp = `
    <div style="margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid #f1f5f9;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:4px;">
        <div>
          <div style="font-weight:800;color:#0f172a;font-size:.97rem;">${industryLabel} Specialist</div>
          <div style="color:#3b2fc9;font-weight:600;font-size:.85rem;margin-top:2px;">Rwanda Development Board</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:.78rem;font-weight:700;background:#ede9ff;color:#3b2fc9;padding:3px 10px;border-radius:20px;">2022 – Present</div>
          <div style="font-size:.75rem;color:#64748b;margin-top:3px;">Kigali, Rwanda</div>
        </div>
      </div>
      <ul style="margin:8px 0 0 16px;color:#334155;font-size:.84rem;line-height:1.7;">
        <li>Spearheaded initiatives driving sector growth and stakeholder alignment.</li>
        <li>Developed analytical frameworks to support evidence-based decision-making.</li>
        <li>Led cross-functional teams to achieve project milestones on time and within budget.</li>
      </ul>
    </div>`;

  const skillChips = skills.map(s => `
    <span style="
      display:inline-block;padding:5px 12px;border-radius:20px;
      background:#ede9ff;color:#3b2fc9;font-size:.76rem;font-weight:700;
      margin:3px;border:1.5px solid #c7d2fe;
    ">${s}</span>`).join('');

  return `
    <div id="cv-document" style="
      font-family:'Plus Jakarta Sans',sans-serif;
      background:white;border-radius:16px;border:1px solid #e2e8f0;
      overflow:hidden;box-shadow:0 8px 40px rgba(59,47,201,.1);
    ">
      <!-- HEADER -->
      <div style="background:linear-gradient(135deg,#0f0a3a 0%,#3b2fc9 60%,#6d51f7 100%);padding:36px 36px 28px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:rgba(16,185,129,.12);border-radius:50%;"></div>
        <div style="position:absolute;bottom:-60px;left:60px;width:160px;height:160px;background:rgba(255,255,255,.05);border-radius:50%;"></div>
        <div style="display:flex;align-items:center;gap:24px;position:relative;z-index:1;">
          <div style="
            width:80px;height:80px;border-radius:50%;
            background:linear-gradient(135deg,#10b981,#059669);
            display:flex;align-items:center;justify-content:center;
            font-size:2rem;font-weight:900;color:white;
            border:4px solid rgba(255,255,255,.25);flex-shrink:0;
            box-shadow:0 8px 24px rgba(0,0,0,.3);
          ">${name[0].toUpperCase()}</div>
          <div>
            <h1 style="color:white;font-family:'Sora',sans-serif;font-size:1.7rem;font-weight:800;margin:0 0 4px;letter-spacing:-.02em;">${name}</h1>
            <div style="color:#10b981;font-weight:700;font-size:.92rem;margin-bottom:12px;">${industryLabel} Professional · Kigali, Rwanda</div>
            <div style="display:flex;flex-wrap:wrap;gap:16px;">
              <span style="color:rgba(255,255,255,.8);font-size:.78rem;display:flex;align-items:center;gap:5px;"><i class='fas fa-envelope'></i>${email}</span>
              <span style="color:rgba(255,255,255,.8);font-size:.78rem;display:flex;align-items:center;gap:5px;"><i class='fas fa-phone'></i>${phone}</span>
              <span style="color:rgba(255,255,255,.8);font-size:.78rem;display:flex;align-items:center;gap:5px;"><i class='fas fa-map-marker-alt'></i>${location}</span>
              <span style="color:rgba(255,255,255,.8);font-size:.78rem;display:flex;align-items:center;gap:5px;"><i class='fas fa-globe'></i>smartJobs Rwanda</span>
            </div>
          </div>
        </div>
      </div>

      <!-- BRAND STRIP -->
      <div style="background:#10b981;padding:6px 36px;display:flex;align-items:center;justify-content:space-between;">
        <span style="color:white;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Verified smartJobs Profile · Rwanda's #1 Job Platform</span>
        <span style="color:rgba(255,255,255,.75);font-size:.68rem;">Generated ${new Date().toLocaleDateString('en-RW',{day:'numeric',month:'long',year:'numeric'})}</span>
      </div>

      <!-- BODY -->
      <div style="display:grid;grid-template-columns:1fr 280px;gap:0;">

        <!-- LEFT COLUMN -->
        <div style="padding:28px 28px 28px 36px;border-right:1px solid #f1f5f9;">

          <!-- Summary -->
          <div style="margin-bottom:26px;">
            <h2 style="font-family:'Sora',sans-serif;font-size:.78rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#3b2fc9;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:20px;height:3px;background:#10b981;border-radius:2px;"></span>Professional Summary
            </h2>
            <p style="color:#334155;font-size:.88rem;line-height:1.75;border-left:3px solid #3b2fc9;padding-left:14px;">${summary}</p>
          </div>

          <!-- Experience -->
          <div style="margin-bottom:26px;">
            <h2 style="font-family:'Sora',sans-serif;font-size:.78rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#3b2fc9;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:20px;height:3px;background:#10b981;border-radius:2px;"></span>Work Experience
            </h2>
            ${savedJobs.length ? experienceBlocks : defaultExp}
          </div>

          <!-- Education -->
          <div>
            <h2 style="font-family:'Sora',sans-serif;font-size:.78rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#3b2fc9;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:20px;height:3px;background:#10b981;border-radius:2px;"></span>Education
            </h2>
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:4px;margin-bottom:14px;">
              <div>
                <div style="font-weight:800;color:#0f172a;font-size:.95rem;">Bachelor of Science</div>
                <div style="color:#3b2fc9;font-weight:600;font-size:.84rem;">University of Rwanda</div>
                <div style="color:#64748b;font-size:.78rem;margin-top:2px;">${industryLabel} · Major</div>
              </div>
              <div style="font-size:.78rem;font-weight:700;background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:20px;">2016 – 2020</div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:4px;">
              <div>
                <div style="font-weight:800;color:#0f172a;font-size:.95rem;">Professional Certification</div>
                <div style="color:#3b2fc9;font-weight:600;font-size:.84rem;">Rwanda Polytechnic</div>
                <div style="color:#64748b;font-size:.78rem;margin-top:2px;">${industryLabel} Skills Programme</div>
              </div>
              <div style="font-size:.78rem;font-weight:700;background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:20px;">2020</div>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDEBAR -->
        <div style="padding:28px 24px;background:#fafbff;">

          <!-- Skills -->
          <div style="margin-bottom:24px;">
            <h2 style="font-family:'Sora',sans-serif;font-size:.78rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#3b2fc9;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:16px;height:3px;background:#10b981;border-radius:2px;"></span>Skills
            </h2>
            <div style="line-height:1;">${skillChips}</div>
          </div>

          <!-- Languages -->
          <div style="margin-bottom:24px;">
            <h2 style="font-family:'Sora',sans-serif;font-size:.78rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#3b2fc9;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:16px;height:3px;background:#10b981;border-radius:2px;"></span>Languages
            </h2>
            ${[['Kinyarwanda','Native',100],['English','Fluent',90],['French','Intermediate',65]].map(([lang, level, pct]) => `
              <div style="margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;font-size:.8rem;font-weight:600;margin-bottom:4px;">
                  <span style="color:#0f172a;">${lang}</span><span style="color:#64748b;">${level}</span>
                </div>
                <div style="background:#e2e8f0;border-radius:99px;height:5px;overflow:hidden;">
                  <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#3b2fc9,#10b981);border-radius:99px;"></div>
                </div>
              </div>`).join('')}
          </div>

          <!-- Applied Jobs -->
          ${savedJobs.length ? `
          <div style="margin-bottom:24px;">
            <h2 style="font-family:'Sora',sans-serif;font-size:.78rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#3b2fc9;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:16px;height:3px;background:#10b981;border-radius:2px;"></span>Interested Roles
            </h2>
            ${savedJobs.slice(0,4).map(j=>`
              <div style="padding:7px 10px;border-radius:8px;background:#ede9ff;margin-bottom:6px;">
                <div style="font-weight:700;color:#0f172a;font-size:.78rem;">${j.title}</div>
                <div style="color:#3b2fc9;font-size:.72rem;">${j.company}</div>
              </div>`).join('')}
          </div>` : ''}

          <!-- Certifications -->
          <div>
            <h2 style="font-family:'Sora',sans-serif;font-size:.78rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#3b2fc9;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
              <span style="display:inline-block;width:16px;height:3px;background:#10b981;border-radius:2px;"></span>Certifications
            </h2>
            ${['Rwanda Professional Board','Google Analytics Certified','smartJobs Verified Profile'].map(c=>`
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <i class="fas fa-certificate" style="color:#10b981;font-size:.78rem;flex-shrink:0;"></i>
                <span style="font-size:.78rem;color:#334155;font-weight:500;">${c}</span>
              </div>`).join('')}
          </div>

          <!-- Brand footer -->
          <div style="margin-top:24px;padding:14px;background:linear-gradient(135deg,#3b2fc9,#6d51f7);border-radius:10px;text-align:center;">
            <div style="color:white;font-family:'Sora',sans-serif;font-weight:800;font-size:.9rem;">smart<span style="color:#10b981;">Jobs</span></div>
            <div style="color:rgba(255,255,255,.7);font-size:.68rem;margin-top:2px;">Rwanda's #1 Job Platform</div>
          </div>
        </div>
      </div>
    </div>`;
}

function downloadCVAsPDF() {
  const cvDoc = document.getElementById('cv-document');
  if (!cvDoc) { showToast('Please wait for CV to load', 'error', 'fas fa-exclamation'); return; }

  showToast('Preparing your CV…', 'info', 'fas fa-spinner');

  // Use print dialog as PDF (clean method)
  const printWindow = window.open('', '_blank', 'width=900,height=700');
  const name = document.getElementById('cv-name')?.value || getUser()?.name || 'CV';

  printWindow.document.write(`<!DOCTYPE html><html><head>
    <meta charset="UTF-8">
    <title>${name} — CV | smartJobs Rwanda</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <style>
      *{box-sizing:border-box;margin:0;padding:0;}
      body{font-family:'Plus Jakarta Sans',sans-serif;background:white;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
      @page{margin:0;size:A4;}
      @media print{body{margin:0;}}
    </style>
  </head><body>${cvDoc.outerHTML}<script>window.onload=function(){window.print();setTimeout(()=>window.close(),1000);}<\/script></body></html>`);
  printWindow.document.close();

  setTimeout(() => showToast('CV ready to save as PDF!', 'success', 'fas fa-check-circle', 3000), 800);
}

// ── JOB HOME PAGE ────────────────────────────────────────────
let activeJobId = null;
let currentFilter = {};

function renderJobCards(list) {
  const container = document.getElementById('job-list-container') || document.getElementById('job-list');
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
              <p class="detail-desc">${job.desc || 'We are looking for a talented professional to join our team.'}</p>
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
        desc:     document.getElementById('job-desc')?.value || '',
        requirements: document.getElementById('job-requirements')?.value || '',
        postedBy: getUser()?.email,
        postedByName: getUser()?.name,
        views: 0,
        status: 'Active'
      };  
      const jobs = getJobs();
      jobs.push(newJob);
      saveJobs(jobs);
      launchConfetti();
      showToast('Job posted successfully! 🎉', 'success', 'fas fa-check-circle', 4000);
      
      // Redirect based on user role - FIXED
      const user = getUser();
      setTimeout(() => {
        if (user?.role === 'Admin') {
          window.location.href = 'admin.html';
        } else if (user?.role === 'Employer') {
          window.location.href = 'employer-dashboard.html';
        } else {
          window.location.href = 'home.html';
        }
      }, 1500);
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
      if (pass !== 'admin123') {
        btn.classList.remove('loading');
        btn.textContent = `Sign In as ${authRole}`;
        alert('only for admin');
        showToast('Access denied. Admin credentials required.', 'error', 'fas fa-lock', 4000);
        document.getElementById('auth-password').value = '';
        document.getElementById('auth-password').focus();
        return;
      }
      setUser(user);
      showToast('Welcome, Admin!', 'success', 'fas fa-user-shield');
      setTimeout(() => { window.location.href = 'admin.html'; }, 700);
    } else {
      setUser(user);
      const greeting = `Welcome back, ${user.name}!`;
      showToast(greeting, 'success', 'fas fa-check-circle');
      setTimeout(() => {
        if (authRole === 'Employer') window.location.href = 'employer-dashboard.html';
        else window.location.href = 'home.html';
      }, 700);
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
  setTimeout(() => {
    if (authRole === 'Employer') window.location.href = 'employer-dashboard.html';
    else window.location.href = 'home.html';
  }, 1000);
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
/* ============================================================
   smartJobs Rwanda — SECURITY & CONNECTION PATCH v3.0
   ============================================================ */

// 1. SESSION GUARD: Prevent unauthorized access to dashbaords
function checkAccess(requiredRole) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'auth.html?error=unauthorized';
        return;
    }
    if (requiredRole && user.role !== requiredRole) {
        // Redirect to their own dashboard if they are in the wrong place
        if (user.role === 'Employer') window.location.href = 'employer-dashboard.html';
        else if (user.role === 'Admin') window.location.href = 'admin.html';
        else window.location.href = 'seeker-dashboard.html';
    }
}

// 2. DATA PERSISTENCE: Save application counts for the dashboard
function trackApplication(jobId, jobTitle) {
    const stats = JSON.parse(localStorage.getItem('userStats')) || { applied: 0, views: 0 };
    stats.applied += 1;
    localStorage.setItem('userStats', JSON.stringify(stats));
    
    // Increment CV download count if redirected from builder
    if(window.location.href.includes('cv-builder')) {
        let downloads = parseInt(localStorage.getItem('cvDownloads')) || 0;
        localStorage.setItem('cvDownloads', downloads + 1);
    }
}

// 3. SECURE LOGOUT: Clear sensitive data
function secureLogout() {
    // Clear session but keep 'allJobs' and 'jobApplications' for the system
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
    window.location.href = 'home.html';
}

// 4. CONNECTION FIX: Sync Employer jobs with the Home Feed
function syncGlobalJobs() {
    const employerJobs = JSON.parse(localStorage.getItem('allJobs')) || [];
    const feedContainer = document.getElementById('job-list-container');
    if (!feedContainer) return;

    // This ensures newly posted jobs appear at the TOP of the home page
    const allJobs = [...employerJobs, ...defaultJobs].sort((a, b) => b.id - a.id);
    renderJobCards(allJobs);
}
/* ============================================================
   smartJobs Rwanda — UNIFIED DATA ENGINE v4.0
   Enables instant visibility across all roles.
   ============================================================ */

// Key Constants to prevent typos
const JOBS_KEY = 'allJobs';
const APPS_KEY = 'jobApplications';

// --- DATA RETRIEVAL ---
function getJobs() {
    const saved = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
    // If empty, initialize with defaultJobs from script.js, otherwise return saved
    if (saved.length === 0) {
        localStorage.setItem(JOBS_KEY, JSON.stringify(defaultJobs));
        return defaultJobs;
    }
    return saved;
}

function getApps() {
    return JSON.parse(localStorage.getItem(APPS_KEY)) || [];
}

// --- DATA SAVING ---
function saveNewJob(job) {
    const currentJobs = getJobs();
    currentJobs.unshift(job); // Add to the start so Seekers see "NEW" first
    localStorage.setItem(JOBS_KEY, JSON.stringify(currentJobs));
}

function saveNewApplication(app) {
    const currentApps = getApps();
    currentApps.push(app); 
    localStorage.setItem(APPS_KEY, JSON.stringify(currentApps));
}

// --- SYNC CHECK ---
// Add this to the DOMContentLoaded of every page to ensure data is fresh
function refreshData() {
    console.log("Syncing smartJobs Database...");
    if (typeof renderJobCards === 'function') renderJobCards(getJobs());
    if (typeof loadDashboard === 'function') loadDashboard();
}
function submitApplication(jobId, title, company) {
    const user = getUser(); // Current seeker
    
    const newApp = {
        id: Date.now(),
        jobId: jobId,
        jobTitle: title,
        company: company,
        seekerName: document.getElementById(`apply-name-${jobId}`).value,
        seekerEmail: document.getElementById(`apply-email-${jobId}`).value,
        date: new Date().toLocaleDateString(),
        status: 'New'
    };

    // SAVE TO SHARED DATABASE
    saveNewApplication(newApp);

    showToast(`Application sent! ${company} will see it on their dashboard.`, 'success');
    launchConfetti();
}