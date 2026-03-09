/* ============================================================
   SOPHIA LAURENT — Makeup Artist Portfolio
   main.js
   ============================================================ */

'use strict';

/* ============================================================
   UTILITIES
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const raf = requestAnimationFrame;

/* ============================================================
   LOADER
   ============================================================ */
window.addEventListener('load', () => {
  const loader = $('#loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger hero animations
    animateHero();
  }, 2000);
});
document.body.style.overflow = 'hidden';

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const cursor = $('#cursor');
const cursorFollower = $('#cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  raf(animateFollower);
}
raf(animateFollower);

// Cursor hover state
const hoverables = 'a, button, .pg-item, .featured-card, .col-img-wrap, .col-tab, .testi-btn, .social-link, .ba-handle, .nav-link, .nav-cta';
document.addEventListener('mouseover', e => {
  if (e.target.closest(hoverables)) {
    cursor.classList.add('hovered');
    cursorFollower.classList.add('hovered');
  }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(hoverables)) {
    cursor.classList.remove('hovered');
    cursorFollower.classList.remove('hovered');
  }
});

/* ============================================================
   NAVIGATION
   ============================================================ */
const nav = $('#nav');
const menuBtn = $('#menuBtn');
const mobileMenu = $('#mobileMenu');

// Scroll-aware nav
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
}, { passive: true });

// Mobile menu
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
$$('[data-close]', mobileMenu).forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Active nav link based on scroll
const sections = $$('section[id]');
function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.id;
    const link = $(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

/* ============================================================
   HERO ANIMATIONS
   ============================================================ */
function animateHero() {
  const texts = $$('.reveal-text');
  texts.forEach((el, i) => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay);
  });
  // Stats
  setTimeout(() => {
    $$('.reveal-stat').forEach(el => el.classList.add('visible'));
  }, 1200);
}

/* ============================================================
   PARALLAX HERO
   ============================================================ */
const heroBg = $('#heroBg');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    raf(() => {
      const scrolled = window.scrollY;
      if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.08)`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$('.reveal, .reveal-card').forEach(el => revealObserver.observe(el));

/* ============================================================
   BEFORE / AFTER SLIDER
   ============================================================ */
const baSlider = $('#baSlider');
const baBefore = $('#baBefore');
const baHandle = $('#baHandle');

if (baSlider && baBefore && baHandle) {
  let isDragging = false;

  function setSliderPosition(x) {
    const rect = baSlider.getBoundingClientRect();
    let pct = (x - rect.left) / rect.width;
    pct = Math.max(0.02, Math.min(0.98, pct));
    baBefore.style.width = (pct * 100) + '%';
    baHandle.style.left = (pct * 100) + '%';
  }

  // Mouse events
  baHandle.addEventListener('mousedown', e => { isDragging = true; e.preventDefault(); });
  baSlider.addEventListener('mousedown', e => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });
  window.addEventListener('mousemove', e => { if (isDragging) setSliderPosition(e.clientX); });
  window.addEventListener('mouseup', () => { isDragging = false; });

  // Touch events
  baHandle.addEventListener('touchstart', e => { isDragging = true; e.preventDefault(); }, { passive: false });
  baSlider.addEventListener('touchstart', e => {
    isDragging = true;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchmove', e => {
    if (isDragging) setSliderPosition(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchend', () => { isDragging = false; });
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
const lightbox = $('#lightbox');
const lbImg = $('#lbImg');
const lbClose = $('#lbClose');
const lbPrev = $('#lbPrev');
const lbNext = $('#lbNext');
const lbCounter = $('#lbCounter');

// Build image list from all lightbox triggers
const lbTriggers = $$('[data-lightbox]');
const lbImages = lbTriggers.map(el => ({
  src: 'images/' + el.dataset.lightbox,
  alt: el.querySelector('img')?.alt || ''
}));
let lbCurrent = 0;

function openLightbox(index) {
  lbCurrent = index;
  lbImg.src = lbImages[lbCurrent].src;
  lbImg.alt = lbImages[lbCurrent].alt;
  lbCounter.textContent = `${lbCurrent + 1} / ${lbImages.length}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function lbNavigate(dir) {
  lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = lbImages[lbCurrent].src;
    lbImg.alt = lbImages[lbCurrent].alt;
    lbCounter.textContent = `${lbCurrent + 1} / ${lbImages.length}`;
    lbImg.style.opacity = '1';
  }, 200);
}

lbTriggers.forEach((el, i) => {
  el.addEventListener('click', () => openLightbox(i));
});
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => lbNavigate(-1));
lbNext.addEventListener('click', () => lbNavigate(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbNavigate(-1);
  if (e.key === 'ArrowRight') lbNavigate(1);
});

// Smooth image opacity on navigate
lbImg.style.transition = 'opacity 0.2s ease';

/* ============================================================
   COLLECTIONS TABS
   ============================================================ */
const colTabs = $$('.col-tab');
const colPanels = $$('.col-panel');

colTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    colTabs.forEach(t => t.classList.remove('active'));
    colPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = $(`.col-panel[data-panel="${target}"]`);
    if (panel) {
      panel.classList.add('active');
      // Re-observe items in the newly active panel
      $$('.reveal-card', panel).forEach(el => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 60);
      });
    }
  });
});

/* ============================================================
   TESTIMONIALS SLIDER
   ============================================================ */
const testiTrack = $('#testiTrack');
const testiPrev = $('#testiPrev');
const testiNext = $('#testiNext');
const testiDotsContainer = $('#testiDots');

const testiCards = $$('.testi-card', testiTrack);
let testiCurrent = 0;
const testiTotal = testiCards.length;

// Create dots
testiCards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToTesti(i));
  testiDotsContainer.appendChild(dot);
});

function goToTesti(index) {
  testiCurrent = (index + testiTotal) % testiTotal;
  testiTrack.style.transform = `translateX(-${testiCurrent * 100}%)`;
  testiTrack.style.transition = 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)';
  $$('.testi-dot', testiDotsContainer).forEach((d, i) => d.classList.toggle('active', i === testiCurrent));
}

testiNext.addEventListener('click', () => goToTesti(testiCurrent + 1));
testiPrev.addEventListener('click', () => goToTesti(testiCurrent - 1));

// Auto-advance
let testiTimer = setInterval(() => goToTesti(testiCurrent + 1), 5000);
testiTrack.addEventListener('mouseenter', () => clearInterval(testiTimer));
testiTrack.addEventListener('mouseleave', () => { testiTimer = setInterval(() => goToTesti(testiCurrent + 1), 5000); });

// Touch swipe for testimonials
let testiTouchStartX = 0;
testiTrack.addEventListener('touchstart', e => { testiTouchStartX = e.touches[0].clientX; }, { passive: true });
testiTrack.addEventListener('touchend', e => {
  const dx = testiTouchStartX - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 40) goToTesti(testiCurrent + (dx > 0 ? 1 : -1));
}, { passive: true });

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForm = $('#contactForm');
const formSuccess = $('#formSuccess');
const submitBtn = $('#submitBtn');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  submitBtn.innerHTML = '<span>Sending…</span>';
  submitBtn.disabled = true;

  setTimeout(() => {
    formSuccess.classList.add('show');
    submitBtn.innerHTML = `<span>Message Sent</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    contactForm.reset();
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Send Inquiry</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      formSuccess.classList.remove('show');
    }, 4000);
  }, 1200);
});

/* ============================================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================================ */
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    const target = $(targetId);
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   SCROLL INDICATOR HIDE ON SCROLL
   ============================================================ */
const scrollIndicator = $('#scrollIndicator');
window.addEventListener('scroll', () => {
  if (scrollIndicator) {
    scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '';
  }
}, { passive: true });

/* ============================================================
   PORTFOLIO GRID — subtle stagger on scroll
   ============================================================ */
// Animate counter numbers
function animateCounter(el, target) {
  const duration = 1500;
  const start = Date.now();
  const suffix = target.replace(/[0-9]/g, '').replace('+', '');
  const num = parseInt(target);
  function update() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(num * eased) + '+';
    if (progress < 1) raf(update);
  }
  raf(update);
}

// Observe stat numbers
const statNums = $$('.stat-num');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, entry.target.textContent);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

console.log('✦ Sophia Laurent Portfolio — Initialized');
