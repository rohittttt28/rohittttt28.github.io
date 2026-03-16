// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  root.setAttribute('data-theme', 'light');
}

themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  if (isLight) {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const toggle = document.getElementById('nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  links.classList.toggle('open');
});

links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => links.classList.remove('open'));
});

// Projects carousel
const pages = document.querySelectorAll('.projects-page');
const prevBtn = document.getElementById('projects-prev');
const nextBtn = document.getElementById('projects-next');
const currentIndicator = document.getElementById('projects-current');
let currentPage = 0;
const totalPages = pages.length;

function showPage(index, direction) {
  pages.forEach(p => {
    p.classList.remove('active', 'slide-back');
  });

  const target = pages[index];
  if (direction === 'back') {
    target.classList.add('slide-back');
  }
  target.classList.add('active');

  // Animate cards in the new page
  const cards = target.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.classList.remove('visible');
    setTimeout(() => card.classList.add('visible'), i * 100);
  });

  // Recheck title and description overflow after page becomes visible
  setTimeout(() => {
    target.querySelectorAll('.project-title').forEach(titleWrap => {
      if (titleWrap.classList.contains('expanded')) return;
      const h3 = titleWrap.querySelector('h3');
      const toggle = titleWrap.querySelector('.project-title-toggle');
      if (h3 && toggle) {
        toggle.style.display = (h3.scrollHeight > h3.clientHeight + 1) ? 'block' : 'none';
      }
    });
    target.querySelectorAll('.project-desc').forEach(desc => {
      if (desc.classList.contains('expanded')) return;
      const p = desc.querySelector('p');
      const toggle = desc.querySelector('.project-desc-toggle');
      if (p && toggle) {
        toggle.style.display = (p.scrollHeight > p.clientHeight + 1) ? 'block' : 'none';
      }
    });
    target.querySelectorAll('.project-impact-wrap').forEach(wrap => {
      if (wrap.classList.contains('expanded')) return;
      const impact = wrap.querySelector('.project-impact');
      const toggle = wrap.querySelector('.project-impact-toggle');
      if (impact && toggle) {
        toggle.style.display = (impact.scrollHeight > impact.clientHeight + 1) ? 'block' : 'none';
      }
    });
  }, 50);

  currentPage = index;
  currentIndicator.textContent = currentPage + 1;
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === totalPages - 1;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) showPage(currentPage - 1, 'back');
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages - 1) showPage(currentPage + 1, 'forward');
});

// Project title show more/less (ellipsis at 2 lines)
document.querySelectorAll('.project-title').forEach(titleWrap => {
  const h3 = titleWrap.querySelector('h3');
  if (!h3) return;
  const toggle = document.createElement('button');
  toggle.className = 'project-title-toggle';
  toggle.textContent = '...';
  titleWrap.appendChild(toggle);

  function checkOverflow() {
    if (titleWrap.classList.contains('expanded')) return;
    const clamped = h3.scrollHeight > h3.clientHeight + 1;
    toggle.style.display = clamped ? 'block' : 'none';
  }

  toggle.addEventListener('click', () => {
    const expanded = titleWrap.classList.toggle('expanded');
    toggle.textContent = expanded ? 'show less' : '...';
  });

  checkOverflow();
  window.addEventListener('resize', checkOverflow);
  if (document.fonts) {
    document.fonts.ready.then(checkOverflow);
  }
});

// Project description show more/less
document.querySelectorAll('.project-desc').forEach(desc => {
  const p = desc.querySelector('p');
  if (!p) return;
  const toggle = document.createElement('button');
  toggle.className = 'project-desc-toggle';
  toggle.textContent = '...';
  desc.appendChild(toggle);

  function checkOverflow() {
    if (desc.classList.contains('expanded')) return;
    const clamped = p.scrollHeight > p.clientHeight + 1;
    toggle.style.display = clamped ? 'block' : 'none';
  }

  toggle.addEventListener('click', () => {
    const expanded = desc.classList.toggle('expanded');
    toggle.textContent = expanded ? 'show less' : '...';
  });

  // Check after fonts load & on resize
  checkOverflow();
  window.addEventListener('resize', checkOverflow);
  if (document.fonts) {
    document.fonts.ready.then(checkOverflow);
  }
});

// Project impact show more/less
document.querySelectorAll('.project-impact-wrap').forEach(wrap => {
  const impact = wrap.querySelector('.project-impact');
  if (!impact) return;
  const toggle = document.createElement('button');
  toggle.className = 'project-impact-toggle';
  toggle.textContent = '...';
  wrap.appendChild(toggle);

  function checkOverflow() {
    if (wrap.classList.contains('expanded')) return;
    const clamped = impact.scrollHeight > impact.clientHeight + 1;
    toggle.style.display = clamped ? 'block' : 'none';
  }

  toggle.addEventListener('click', () => {
    const expanded = wrap.classList.toggle('expanded');
    toggle.textContent = expanded ? 'show less' : '...';
  });

  checkOverflow();
  window.addEventListener('resize', checkOverflow);
  if (document.fonts) {
    document.fonts.ready.then(checkOverflow);
  }
});

// Scroll reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(
  '.timeline-item, .skill-category, .highlight-card, .contact-card'
).forEach(el => observer.observe(el));

// ===== Interstellar Starfield System =====
(function() {
  'use strict';

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) return;

  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  let scrollY = 0;
  let stars = [];
  let shootingStars = [];
  let dustParticles = [];
  let animId;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();

  // Track scroll for parallax
  window.addEventListener('scroll', function() {
    scrollY = window.pageYOffset;
  });

  // Check current theme
  function isDarkMode() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  // === Stars ===
  function createStars() {
    const count = Math.min(200, Math.floor((W * H) / 5000));
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H * 3, // spread across scrollable area
        radius: Math.random() * 1.8 + 0.3,
        depth: Math.random() * 3, // 0-3 depth layers
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.5 + 0.3,
      });
    }
  }

  function drawStars(time) {
    const dark = isDarkMode();
    stars.forEach(function(s) {
      // Parallax: deeper stars move less
      const parallaxFactor = 0.1 + s.depth * 0.15;
      const yPos = ((s.y - scrollY * parallaxFactor) % (H * 3) + H * 3) % (H * 3);
      // Only draw if visible in viewport
      if (yPos > H + 5) return;

      const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
      const alpha = s.baseAlpha + twinkle * 0.3;
      if (alpha <= 0) return;

      if (dark) {
        ctx.fillStyle = 'rgba(232, 224, 212, ' + Math.max(0, Math.min(1, alpha)) + ')';
      } else {
        ctx.fillStyle = 'rgba(184, 134, 74, ' + Math.max(0, Math.min(1, alpha * 0.35)) + ')';
      }

      ctx.beginPath();
      ctx.arc(s.x, yPos, s.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // === Shooting Stars ===
  let nextShootTime = Date.now() + 2000 + Math.random() * 4000;

  function spawnShootingStar() {
    const startX = Math.random() * W;
    const startY = Math.random() * H * 0.4;
    const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.2; // 27-63 degrees
    const speed = 6 + Math.random() * 6;
    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.012 + Math.random() * 0.008,
      tailLen: 60 + Math.random() * 40,
    });
  }

  function drawShootingStars() {
    const dark = isDarkMode();
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      var ss = shootingStars[i];
      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.life -= ss.decay;

      if (ss.life <= 0 || ss.x > W + 100 || ss.y > H + 100) {
        shootingStars.splice(i, 1);
        continue;
      }

      var tailX = ss.x - (ss.vx / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy)) * ss.tailLen;
      var tailY = ss.y - (ss.vy / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy)) * ss.tailLen;

      var grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      if (dark) {
        grad.addColorStop(0, 'rgba(212, 165, 116, 0)');
        grad.addColorStop(0.5, 'rgba(240, 198, 116, ' + ss.life * 0.4 + ')');
        grad.addColorStop(1, 'rgba(232, 168, 73, ' + ss.life * 0.8 + ')');
      } else {
        grad.addColorStop(0, 'rgba(184, 134, 74, 0)');
        grad.addColorStop(0.5, 'rgba(184, 134, 74, ' + ss.life * 0.2 + ')');
        grad.addColorStop(1, 'rgba(184, 134, 74, ' + ss.life * 0.5 + ')');
      }

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.stroke();

      // Bright head
      if (dark) {
        ctx.fillStyle = 'rgba(240, 198, 116, ' + ss.life + ')';
      } else {
        ctx.fillStyle = 'rgba(184, 134, 74, ' + ss.life * 0.6 + ')';
      }
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Spawn new shooting stars at random intervals (2-6s)
    if (Date.now() > nextShootTime) {
      spawnShootingStar();
      nextShootTime = Date.now() + 2000 + Math.random() * 4000;
    }
  }

  // === Dust Particles (Miller's planet dust) ===
  function createDust() {
    dustParticles = [];
    for (var i = 0; i < 50; i++) {
      dustParticles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.15 + 0.03,
      });
    }
  }

  function drawDust() {
    const dark = isDarkMode();
    dustParticles.forEach(function(d) {
      d.x += d.vx;
      d.y += d.vy;

      // Wrap around
      if (d.x < -5) d.x = W + 5;
      if (d.x > W + 5) d.x = -5;
      if (d.y < -5) d.y = H + 5;
      if (d.y > H + 5) d.y = -5;

      if (dark) {
        ctx.fillStyle = 'rgba(212, 165, 116, ' + d.alpha + ')';
      } else {
        ctx.fillStyle = 'rgba(184, 134, 74, ' + d.alpha * 0.5 + ')';
      }
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // === Main Loop ===
  createStars();
  createDust();

  function animate(time) {
    ctx.clearRect(0, 0, W, H);
    drawStars(time);
    drawShootingStars();
    drawDust();
    animId = requestAnimationFrame(animate);
  }

  animId = requestAnimationFrame(animate);

  // Stop animation if reduced motion preference changes
  prefersReducedMotion.addEventListener('change', function(e) {
    if (e.matches) {
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, W, H);
      canvas.style.display = 'none';
    }
  });

  // Recreate stars on resize
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      resize();
      createStars();
      createDust();
    }, 150);
  });
})();
