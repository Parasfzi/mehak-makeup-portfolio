/* ============================================================
   MEHAK TOMAR — Makeup Artist Portfolio
   main.js

   Designed & Developed by: Paras Pawar
   © 2026 All rights reserved
   ============================================================ */

'use strict';

/* ============================================================
   UTILITIES
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const raf = requestAnimationFrame;

/* ============================================================
   SMOOTH SCROLLING (LENIS)
   ============================================================ */
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function rafLenis(time) {
    lenis.raf(time);
    requestAnimationFrame(rafLenis);
  }
  requestAnimationFrame(rafLenis);
}

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
    
    // Remove loader from DOM entirely after its transition
    setTimeout(() => {
      if (loader) loader.remove();
    }, 1200);
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
  // Use transform for better performance (GPU accelerated)
  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
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
let sectionOffsets = [];

function cacheSectionOffsets() {
  sectionOffsets = sections.map(sec => ({
    id: sec.id,
    top: sec.offsetTop,
    bottom: sec.offsetTop + sec.offsetHeight
  }));
}
cacheSectionOffsets();
window.addEventListener('resize', cacheSectionOffsets);

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sectionOffsets.forEach(sec => {
    const link = $(`.nav-link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= sec.top && scrollY < sec.bottom);
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
      const vh = window.innerHeight;
      if (heroBg && scrolled < vh) {
        // Use translate3d for better performance
        heroBg.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0) scale(1.08)`;
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
    pct = Math.max(0.005, Math.min(0.995, pct));
    // Use CSS variable for smoother, decoupled updates
    baSlider.style.setProperty('--pos', (pct * 100) + '%');
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
  // Account for flex track width by calculating offset dynamically based on one card's width
  const movePercentage = (testiCurrent * 100) / testiTotal;
  testiTrack.style.transform = `translateX(-${movePercentage}%)`;
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
      
      if (lenis) {
        lenis.scrollTo(target, { offset: -offset });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
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

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:var(--gold);z-index:10001;width:0%;transition:width 0.1s linear;pointer-events:none;';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ============================================================
   GOLD SPARKLE CURSOR TRAIL
   ============================================================ */
const sparkleCanvas = $('#sparkleCanvas');
const sCtx = sparkleCanvas.getContext('2d');
let sparkles = [];

function resizeSparkle() {
  sparkleCanvas.width = window.innerWidth;
  sparkleCanvas.height = window.innerHeight;
}
resizeSparkle();
window.addEventListener('resize', resizeSparkle);

function spawnSparkle(x, y) {
  const count = 5;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.6 + Math.random() * 1.4;
    sparkles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.2,
      size: 1.5 + Math.random() * 2.5,
      alpha: 0.9,
      decay: 0.018 + Math.random() * 0.014,
    });
  }
}

let lastSparkleX = 0, lastSparkleY = 0;
document.addEventListener('mousemove', e => {
  const dx = e.clientX - lastSparkleX;
  const dy = e.clientY - lastSparkleY;
  if (Math.hypot(dx, dy) > 8) {
    spawnSparkle(e.clientX, e.clientY);
    lastSparkleX = e.clientX;
    lastSparkleY = e.clientY;
  }
});

function animateSparkles() {
  sCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
  sparkles = sparkles.filter(s => s.alpha > 0.01);
  for (const s of sparkles) {
    s.x += s.vx;
    s.y += s.vy;
    s.vy += 0.05; // gentle gravity
    s.alpha -= s.decay;
    sCtx.beginPath();
    sCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    sCtx.fillStyle = `rgba(201,169,110,${s.alpha.toFixed(3)})`;
    sCtx.fill();
  }
  raf(animateSparkles);
}
raf(animateSparkles);

/* ============================================================
   AMBIENT HERO FLOATING PARTICLES
   ============================================================ */
(function initHeroParticles() {
  const container = $('#heroParticles');
  if (!container) return;
  const count = 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = 1.5 + Math.random() * 2.5;
    const dur = 7 + Math.random() * 10;
    const delay = -(Math.random() * dur);
    const maxop = (0.2 + Math.random() * 0.5).toFixed(2);
    p.style.cssText = `
      left:${(Math.random() * 100).toFixed(1)}%;
      bottom:${(Math.random() * 55).toFixed(1)}%;
      width:${size.toFixed(1)}px;
      height:${size.toFixed(1)}px;
      --dur:${dur.toFixed(1)}s;
      --delay:${delay.toFixed(1)}s;
      --maxop:${maxop};
    `;
    container.appendChild(p);
  }
})();

/* ============================================================
   DRAGGABLE HORIZONTAL REEL
   ============================================================ */
(function initReel() {
  const reel = $('#reelTrack');
  const btnPrev = $('#reelPrev');
  const btnNext = $('#reelNext');
  if (!reel) return;

  // Button logic
  const updateButtons = () => {
    if (!btnPrev || !btnNext) return;
    const maxScroll = reel.scrollWidth - reel.clientWidth;
    btnPrev.classList.toggle('hidden', reel.scrollLeft <= 10);
    btnNext.classList.toggle('hidden', reel.scrollLeft >= maxScroll - 10);
  };

  reel.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  setTimeout(updateButtons, 100);

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      reel.scrollBy({ left: -reel.clientWidth * 0.6, behavior: 'smooth' });
    });
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      reel.scrollBy({ left: reel.clientWidth * 0.6, behavior: 'smooth' });
    });
  }

  // Mouse Drag Logic
  let isDown = false;
  let startX, scrollLeft;
  let velX = 0, lastX = 0, rafId;

  const wrapper = $('.reel-track-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mousedown', e => {
      isDown = true;
      reel.style.scrollBehavior = 'auto';
      startX = e.pageX - reel.offsetLeft;
      scrollLeft = reel.scrollLeft;
      lastX = e.pageX;
      velX = 0;
      cancelAnimationFrame(rafId);
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      // Momentum / inertia
      (function momentum() {
        velX *= 0.93;
        reel.scrollLeft -= velX;
        if (Math.abs(velX) > 0.5) rafId = raf(momentum);
      })();
    });

    window.addEventListener('mousemove', e => {
      if (!isDown) return;
      const x = e.pageX - reel.offsetLeft;
      const walk = (x - startX) * 1.4;
      velX = e.pageX - lastX;
      lastX = e.pageX;
      reel.scrollLeft = scrollLeft - walk;
    });
  }

  // Touch Drag Logic
  let touchStartX = 0, touchScrollLeft = 0;
  reel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchScrollLeft = reel.scrollLeft;
    velX = 0;
    cancelAnimationFrame(rafId);
  }, { passive: true });
  
  reel.addEventListener('touchmove', e => {
    const dx = touchStartX - e.touches[0].clientX;
    reel.scrollLeft = touchScrollLeft + dx;
    velX = 0; 
  }, { passive: true });
})();

/* ============================================================
   ADVANCED INTERACTIONS (TILT & MAGNETIC)
   ============================================================ */
// Initialize VanillaTilt for Portfolio Gallery Items
if (typeof VanillaTilt !== 'undefined') {
  const tiltItems = document.querySelectorAll('.pg-item');
  if (tiltItems.length) {
    VanillaTilt.init(tiltItems, {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.2
    });
  }
}

// Magnetic Buttons Logic
const magneticEls = document.querySelectorAll('[data-magnetic]');
magneticEls.forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = `translate(0px, 0px)`;
  });
});

/* ============================================================
   GLOBAL 3D BACKGROUND (THREE.JS)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#bg3D");
    if (!canvas || typeof THREE === 'undefined') return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#0f0f0f', 5, 15);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Create Luxury 3D Object (Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(2, 0.5, 128, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0xc9a96e, metalness: 0.8, roughness: 0.2, wireframe: false,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // 3. Lighting setup for dramatic cinematic feel
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xfff6e5, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0xc9a96e, 0.8);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // 4. Parallax effect based on mouse/scroll
    let mouseX = 0, mouseY = 0, scrollY = 0;
    window.addEventListener("mousemove", (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    });
    window.addEventListener("scroll", () => { scrollY = window.scrollY; });
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // 5. Animation Loop
    const clock = new THREE.Clock();
    const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        torusKnot.rotation.y = elapsedTime * 0.1;
        torusKnot.rotation.x = elapsedTime * 0.15;
        torusKnot.position.y = Math.sin(elapsedTime * 0.5) * 0.3;
        
        torusKnot.position.x += (mouseX * 0.5 - torusKnot.position.x) * 0.05;
        torusKnot.position.y += (mouseY * 0.5 - torusKnot.position.y) * 0.05;
        
        // Push object back on scroll
        torusKnot.position.z = - (scrollY * 0.002);
        
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    };
    tick();
});

console.log('✦ Mehak Tomar Portfolio — Initialized');
