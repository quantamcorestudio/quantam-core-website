/* ----------------------------------------------------
   PRADIPTA PAL PORTFOLIO - JAVASCRIPT LOGIC
   Handles profile data, interactive particles, theme toggle,
   typing animation, gallery lightbox, scroll reveals & stats.
---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // --- Global State & Profile Data Storage ---
  let profileData = null;
  let currentGalleryIndex = 0;
  let currentGalleryList = [];

  // --- 1. Fetch & Initialize Profile Data ---
  const defaultFallbackData = {
    stats: [
      { label: "Years Experience", value: 4, suffix: "+" },
      { label: "Projects Completed", value: 18, suffix: "+" },
      { label: "Ventures Founded", value: 5, suffix: "" },
      { label: "Community Members", value: 5000, suffix: "+" }
    ],
    companies: [
      {
        id: "quantum-core",
        name: "Quantum Core Gaming Studio",
        url: "https://quantamcorestudio.github.io/quantam-core-website/",
        status: "Active",
        statusClass: "active",
        logo: "company_quantam_core_logo.jpeg",
        roundLogo: "company_logo_round_cutout.png",
        banner: "company_fullsize_banner.png",
        description: "Quantum Core Gaming Studio is an active indie game development and interactive tech company co-founded by Pradipta Pal.",
        keyFocus: ["Game Physics", "3D Shaders", "Android Games"],
        team: [
          { name: "Tanay Halder", role: "Co-founder & Lead Programmer", url: "https://github.com/tanayhalder-placeholder" },
          { name: "Subhrojyoti Roy", role: "Co-founder & Lead Tech Artist", url: "https://github.com/subhrojyotiroy-placeholder" }
        ]
      },
      {
        id: "blue-whale",
        name: "Blue Whale Store",
        url: "https://bluewhalestore.example.com",
        status: "Inactive",
        statusClass: "inactive",
        logo: "company_blue_whale_logo.jpeg",
        cutoutLogo: "company_blue_whale_logo_cutout.png",
        banner: "company_blue_whale_full_size_banner.jpeg",
        description: "Blue Whale Store was a pioneering digital e-commerce and gaming distribution venture initiated by Pradipta Pal.",
        keyFocus: ["E-Commerce", "Digital Merchandise"],
        team: []
      }
    ],
    teamMembers: [
      {
        name: "Tanay Halder",
        url: "https://github.com/tanayhalder-placeholder",
        role: "Co-founder & Lead Developer",
        company: "Quantum Core Gaming Studio",
        companyUrl: "https://quantamcorestudio.github.io/quantam-core-website/",
        image: "company_team_photo_1.jpeg",
        bio: "Key partner at Quantum Core Gaming Studio specializing in core game loop architecture and gameplay physics."
      },
      {
        name: "Subhrojyoti Roy",
        url: "https://github.com/subhrojyotiroy-placeholder",
        role: "Co-founder & Tech Artist",
        company: "Quantum Core Gaming Studio",
        companyUrl: "https://quantamcorestudio.github.io/quantam-core-website/",
        image: "company_team_photo_2.jpeg",
        bio: "Co-founder and lead technical artist driving 3D modeling, lighting setup, animation pipelines, and UI aesthetics."
      }
    ],
    gallery: [
      { src: "pradipta_pal_image.jpeg", title: "Pradipta Pal Profile Portrait", category: "Profile", caption: "Pradipta Pal - Developer, Entrepreneur, and B.Pharm Student" },
      { src: "pradipta_pal_image_2.webp", title: "Pradipta Pal Informal Portrait", category: "Profile", caption: "Pradipta Pal during a creative coding session" },
      { src: "pradipta_pal_image_3.jpeg", title: "Pradipta Pal Outdoor Capture", category: "Profile", caption: "Exploring inspirations beyond code and science" },
      { src: "pradipta_pal_image_4.jpeg", title: "Pradipta Pal Studio Headshot", category: "Profile", caption: "Professional portrait of Pradipta Pal" },
      { src: "pc_setup.jpeg", title: "Custom Workstation & Setup", category: "Setup", caption: "Pradipta's primary workstation for game dev & programming" },
      { src: "company_quantam_core_logo.jpeg", title: "Quantum Core Studio Emblem", category: "Companies", caption: "Official logo of Quantum Core Gaming Studio" },
      { src: "company_logo_round_cutout.png", title: "Quantum Core Circular Logo", category: "Companies", caption: "Transparent round cutout logo for Quantum Core" },
      { src: "company_fullsize_banner.png", title: "Quantum Core Studio Banner", category: "Companies", caption: "Full size official banner of Quantum Core Gaming Studio" },
      { src: "company_team_photo_1.jpeg", title: "Quantum Core Core Team (Photo 1)", category: "Team", caption: "Quantum Core Gaming Studio Team including Tanay Halder & Subhrojyoti Roy" },
      { src: "company_team_photo_2.jpeg", title: "Quantum Core Core Team (Photo 2)", category: "Team", caption: "Quantum Core Gaming Studio team meeting" },
      { src: "company_blue_whale_logo.jpeg", title: "Blue Whale Store Brand Logo", category: "Companies", caption: "Original brand logo for Blue Whale Store" },
      { src: "company_blue_whale_logo_cutout.png", title: "Blue Whale Transparent Cutout", category: "Companies", caption: "Cutout transparent badge of Blue Whale Store" },
      { src: "company_blue_whale_full_size_banner.jpeg", title: "Blue Whale Store Grand Banner", category: "Companies", caption: "Full size promotional banner for Blue Whale Store" }
    ],
    timeline: [
      { year: "Schooling", title: "Bongaon High School", url: "https://bongaonhighschool.example.edu", tag: "Education", description: "Completed school education at Bongaon High School with science focus." },
      { year: "E-Commerce Era", title: "Blue Whale Store", url: "https://bluewhalestore.example.com", tag: "Venture (Inactive)", description: "Founded Blue Whale Store e-commerce platform." },
      { year: "University Life", title: "Vidyasagar Pharmaceutical College", url: "https://vidyasagarpharmacy.example.edu", tag: "B.Pharm Degree", description: "Enrolled in B.Pharm program." },
      { year: "Studio Founding", title: "Quantum Core Gaming Studio", url: "https://quantamcorestudio.github.io/quantam-core-website/", tag: "Active Business", description: "Co-founded Quantum Core Gaming Studio." }
    ],
    skills: [
      {
        category: "Development",
        items: [
          { name: "HTML5 / CSS3 / JavaScript (ES6+)", level: 95 },
          { name: "Unity Engine & C#", level: 92 },
          { name: "Java / Kotlin & Android", level: 90 }
        ]
      }
    ]
  };

  async function loadProfileData() {
    try {
      const response = await fetch('profile.json');
      if (!response.ok) throw new Error('Failed to fetch profile.json');
      profileData = await response.json();
    } catch (error) {
      console.warn('Could not load profile.json dynamically, utilizing embedded fallback data:', error);
      profileData = defaultFallbackData;
    } finally {
      initDynamicContent();
    }
  }

  // --- 2. Dynamic Content Renderer ---
  function initDynamicContent() {
    if (!profileData) return;

    // Render Stats
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid && profileData.stats) {
      statsGrid.innerHTML = profileData.stats.map(stat => `
        <div class="stat-item">
          <div class="stat-number" data-target="${stat.value}">${stat.value}<span>${stat.suffix}</span></div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `).join('');
      initCounterAnimations();
    }

    // Render Skills
    renderSkills('all');

    // Render Gallery
    renderGallery('All');

    // Render Companies hyperlink references & team
    renderCompanies();

    // Render Timeline
    renderTimeline();

    // Render Team
    renderTeam();
  }

  // --- 3. Interactive Canvas Particle Background ---
  function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 85);
    
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.color = Math.random() > 0.5 ? 'rgba(59, 130, 246, ' : 'rgba(6, 182, 212, ';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse hover interaction
        if (mouse.x && mouse.y) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            this.x -= dx * 0.02;
            this.y -= dy * 0.02;
          }
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connecting lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- 4. Typing Animation on Hero Subtitle ---
  function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const phrases = [
      "Software Developer",
      "Game Developer",
      "Entrepreneur",
      "B.Pharm Student",
      "Tech Innovator"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 1800; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // --- 5. Pronunciation Audio Synthesizer ---
  function initPronunciation() {
    const badge = document.getElementById('pronunciation-badge');
    if (!badge) return;

    badge.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Clear queue
        const utterance = new SpeechSynthesisUtterance("Prodipto Pal");
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
      
      // Visual feedback ripple effect
      badge.style.transform = 'scale(1.1)';
      setTimeout(() => badge.style.transform = 'scale(1)', 200);
    });
  }

  // --- 6. Sticky Navigation & Smooth Active Link Observer ---
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll Background Class
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Active Section Highlighting
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    });

    // Mobile Hamburger Menu Toggle
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      });

      // Close mobile nav on link click
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          const icon = mobileMenuBtn.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        });
      });
    }
  }

  // --- 7. Dark / Light Mode Theme Toggle ---
  function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
      document.body.setAttribute('data-theme', 'light');
      updateThemeIcon(true);
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        if (isLight) {
          document.body.removeAttribute('data-theme');
          localStorage.setItem('theme', 'dark');
          updateThemeIcon(false);
        } else {
          document.body.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
          updateThemeIcon(true);
        }
      });
    }

    function updateThemeIcon(isLight) {
      if (!themeBtn) return;
      const icon = themeBtn.querySelector('i');
      if (icon) {
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  }

  // --- 8. Animated Statistics Counters ---
  function initCounterAnimations() {
    const counterElements = document.querySelectorAll('.stat-number');
    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffixSpan = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
          let count = 0;
          const duration = 1800; // ms
          const stepTime = 20;
          const increment = Math.ceil(target / (duration / stepTime));

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.innerHTML = `${count}${suffixSpan}`;
          }, stepTime);

          obs.unobserve(el);
        }
      });
    }, observerOptions);

    counterElements.forEach(el => observer.observe(el));
  }

  // --- 9. Skills Rendering & Bar Animations ---
  function renderSkills(categoryFilter = 'all') {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid || !profileData || !profileData.skills) return;

    let itemsToDisplay = [];
    profileData.skills.forEach(cat => {
      cat.items.forEach(item => {
        itemsToDisplay.push({ ...item, category: cat.category });
      });
    });

    skillsGrid.innerHTML = itemsToDisplay.map(skill => `
      <div class="glass-card skill-card reveal">
        <div class="skill-header">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percentage">${skill.level}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-level="${skill.level}"></div>
        </div>
      </div>
    `).join('');

    // Trigger Fill Animation via Observer
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute('data-level');
          bar.style.width = `${level}%`;
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  // --- 10. Companies Section Renderer ---
  function renderCompanies() {
    const companiesGrid = document.getElementById('companies-grid');
    if (!companiesGrid || !profileData || !profileData.companies) return;

    companiesGrid.innerHTML = profileData.companies.map(company => `
      <div class="glass-card company-card reveal">
        <div class="company-banner-box">
          <img src="${company.banner}" alt="${company.name} Banner" class="company-banner-img">
          <div class="company-status-badge ${company.statusClass}">
            <span class="status-dot"></span> ${company.status}
          </div>
          <img src="${company.roundLogo || company.logo}" alt="${company.name} Logo" class="company-logo-floating">
        </div>
        <div class="company-body">
          <a href="${company.url}" target="_blank" rel="noopener" class="company-name-link">
            ${company.name} <i class="fas fa-external-link-alt" style="font-size: 0.8rem;"></i>
          </a>
          <p class="company-desc">${company.description}</p>
          <div class="company-focus-tags">
            ${company.keyFocus.map(f => `<span class="focus-tag">${f}</span>`).join('')}
          </div>
          ${company.team && company.team.length > 0 ? `
            <div class="company-team-box">
              <div class="company-team-title">Key Team Members</div>
              <div class="team-members-list">
                ${company.team.map(m => `
                  <a href="${m.url}" target="_blank" rel="noopener" class="member-chip">
                    <i class="fas fa-user-circle" style="color: var(--accent-cyan);"></i>
                    <div>
                      <span>${m.name}</span>
                      <br><small>${m.role}</small>
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  // --- 11. Timeline Renderer ---
  function renderTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer || !profileData || !profileData.timeline) return;

    timelineContainer.innerHTML = profileData.timeline.map((item, index) => `
      <div class="timeline-item reveal">
        <div class="timeline-node"></div>
        <div class="glass-card timeline-content">
          <span class="timeline-year">${item.year} • ${item.tag}</span>
          <h3 class="timeline-title">
            <a href="${item.url}" class="hyperlink-tag" target="_blank" rel="noopener">${item.title}</a>
          </h3>
          <p class="timeline-desc">${item.description}</p>
        </div>
      </div>
    `).join('');
  }

  // --- 12. Team Members Renderer ---
  function renderTeam() {
    const teamGrid = document.getElementById('team-grid');
    if (!teamGrid || !profileData || !profileData.teamMembers) return;

    teamGrid.innerHTML = profileData.teamMembers.map(member => `
      <div class="glass-card team-card reveal">
        <img src="${member.image}" alt="${member.name}" class="team-avatar">
        <h3 class="team-name">
          <a href="${member.url}" class="hyperlink-tag" target="_blank" rel="noopener">${member.name}</a>
        </h3>
        <div class="team-role">${member.role}</div>
        <div class="team-company-tag">
          <a href="${member.companyUrl}" class="hyperlink-tag" target="_blank" rel="noopener">${member.company}</a>
        </div>
        <p class="team-bio">${member.bio}</p>
      </div>
    `).join('');
  }

  // --- 13. Gallery & Lightbox Viewer ---
  function renderGallery(filterCategory = 'All') {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid || !profileData || !profileData.gallery) return;

    currentGalleryList = filterCategory === 'All' 
      ? profileData.gallery 
      : profileData.gallery.filter(item => item.category === filterCategory);

    galleryGrid.innerHTML = currentGalleryList.map((item, index) => `
      <div class="gallery-item reveal" data-index="${index}">
        <img src="${item.src}" alt="${item.title}" class="gallery-img" loading="lazy">
        <div class="gallery-overlay">
          <div class="gallery-item-category">${item.category}</div>
          <div class="gallery-item-title">${item.title}</div>
        </div>
      </div>
    `).join('');

    // Attach Lightbox Click Handlers
    document.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        const index = parseInt(el.getAttribute('data-index') || '0', 10);
        openLightbox(index);
      });
    });
  }

  function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter') || 'All';
        renderGallery(filter);
        initScrollReveal(); // Re-trigger reveal for new elements
      });
    });
  }

  // Lightbox Modal Logic
  function openLightbox(index) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    if (!modal || !img || !caption || currentGalleryList.length === 0) return;

    currentGalleryIndex = index;
    const item = currentGalleryList[currentGalleryIndex];

    img.src = item.src;
    img.alt = item.title;
    caption.innerHTML = `<strong>${item.title}</strong><br><span style="font-size:0.9rem; color:var(--text-secondary);">${item.caption}</span>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  function nextLightboxImage() {
    if (currentGalleryList.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryList.length;
    openLightbox(currentGalleryIndex);
  }

  function prevLightboxImage() {
    if (currentGalleryList.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    openLightbox(currentGalleryIndex);
  }

  function initLightboxEvents() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close-btn');
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevLightboxImage);
    if (nextBtn) nextBtn.addEventListener('click', nextLightboxImage);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!modal || !modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    });
  }

  // --- 14. Scroll Reveal Intersection Observer ---
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- 15. Contact Form Handler with Toast ---
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast-msg');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show Toast Notification
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }

        form.reset();
      });
    }
  }

  // --- 16. Back To Top Button ---
  function initBackToTop() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Master Initialization ---
  loadProfileData();
  initParticles();
  initTypingAnimation();
  initPronunciation();
  initNavigation();
  initThemeToggle();
  initCounterAnimations();
  initGalleryFilters();
  initLightboxEvents();
  initScrollReveal();
  initContactForm();
  initBackToTop();
});
