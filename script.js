/* =====================================================
   1. Mobile Navigation
   ===================================================== */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', !expanded);
  burger.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  nav.classList.toggle('open');
});

/* Close nav on link click (mobile) */
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') burger.click();
});

/* =====================================================
   2. Theme Toggle
   ===================================================== */
const root     = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved    = localStorage.getItem('theme');
if (saved) root.dataset.theme = saved;

themeBtn.addEventListener('click', () => {
  const now  = root.dataset.theme === 'dark' ? 'dark' : 'light';
  const next = now === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
  themeBtn.textContent = next === 'dark' ? '🌞' : '🌙';
  themeBtn.title = `Switch to ${now} mode`;
});

/* =====================================================
   3. Scroll‑Reveal (IntersectionObserver)
   ===================================================== */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced) {
  const revealEls = document.querySelectorAll('[data-animate]');
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealEls.forEach(el => io.observe(el));
}

/* =====================================================
   4. Smooth Scroll + Focus Fix
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto':'smooth' });
      target.setAttribute('tabindex','-1');
      target.focus({ preventScroll: true });
    }
  });
});

/* =====================================================
   5. Contact Form (demo only)
   ===================================================== */
 const contactForm = document.getElementById('contactForm');
 contactForm.addEventListener('submit', (e) => {
    e.preventDefault();             
    const name = e.target.name.value.trim();
    const msg  = e.target.msg.value.trim();
    const formData = { name, msg };
    window.location.href = `https://api.whatsapp.com/send?phone=916354067037&text=Hi , Hardik %0a I am ${formData.name} %0a My Meassage For You is : %0a ${formData.msg} %0a Thank You !`
  });