// Mobile nav
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.getElementById('navMenu');
navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('show');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navMenu?.classList.remove('show');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Parallax hero
const hero = document.querySelector('[data-parallax]');
window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.25;
  if (hero) hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
});

// Tilt effect
const tilt = document.querySelector('[data-tilt]');
if (tilt) {
  tilt.addEventListener('mousemove', e => {
    const r = tilt.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height/2) / r.height) * -8;
    const ry = ((e.clientX - r.left - r.width/2) / r.width) * 8;
    tilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  tilt.addEventListener('mouseleave', () => { tilt.style.transform = 'rotateX(0) rotateY(0)'; });
}

// Filters
const filterButtons = document.querySelectorAll('.filters .chip');
const cards = document.querySelectorAll('.pcard');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const key = btn.dataset.filter;
    cards.forEach(c => {
      c.style.display = (key === 'all' || c.dataset.tags.includes(key)) ? '' : 'none';
    });
  });
});

// Modals
const modals = document.querySelectorAll('.modal');
const openers = document.querySelectorAll('.pcard');
const openModal = id => {
  const m = document.getElementById(id);
  if (!m) return;
  m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  modals.forEach(m => m.setAttribute('aria-hidden', 'true'));
  document.body.style.overflow = '';
};
openers.forEach(p => p.addEventListener('click', () => openModal(p.dataset.modal)));
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
modals.forEach(m => m.addEventListener('click', e => { if (e.target === m) closeModal(); }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Contact demo handler
function handleForm(e){
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = 'Thanks! Your message has been recorded locally.';
  e.target.reset();
  return false;
}
window.handleForm = handleForm;
