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
