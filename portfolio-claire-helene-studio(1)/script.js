const isDesktop = window.matchMedia('(min-width: 901px)').matches;

/* ---------- EMAIL OBFUSCATION (anti-scraping bots) ---------- */
document.querySelectorAll('.js-email').forEach(el => {
  const user = el.dataset.user;
  const domain = el.dataset.domain;
  el.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'mailto:' + user + '@' + domain;
  });
});

/* ---------- HARDEN EXTERNAL LINKS (anti reverse-tabnabbing) ---------- */
document.querySelectorAll('a[target="_blank"]').forEach(a => {
  const rel = (a.getAttribute('rel') || '').split(' ');
  ['noopener', 'noreferrer'].forEach(r => { if (!rel.includes(r)) rel.push(r); });
  a.setAttribute('rel', rel.join(' ').trim());
});

/* ---------- CUSTOM CURSOR ---------- */
if (isDesktop) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const label = document.querySelector('.cursor-label');
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    label.style.left = mx + 'px'; label.style.top = my + 'px';
  });

  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .work-item, .expertise-row').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('big');
      if (el.classList.contains('work-item')) {
        label.textContent = 'VIEW';
        label.classList.add('show');
      }
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('big');
      label.classList.remove('show');
    });
  });
}

/* ---------- FULLSCREEN MENU ---------- */
const menuBtn = document.querySelector('.nav-menu-btn');
const menuOverlay = document.querySelector('.menu-overlay');
const menuClose = document.querySelector('.menu-close');
function openMenu() { menuOverlay.classList.add('open'); }
function closeMenu() { menuOverlay.classList.remove('open'); }
menuBtn.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
document.querySelectorAll('.menu-list a').forEach(a => a.addEventListener('click', closeMenu));

/* ---------- GSAP SCROLL REVEALS ---------- */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.fromTo(el, { opacity: 0, y: 44 }, {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});

gsap.fromTo('.hero-name', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.2 });
gsap.fromTo('.hero-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 });
gsap.fromTo('.hero-tagline', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.75 });

gsap.utils.toArray('.about-photo').forEach((el) => {
  gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, {
    clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power4.out',
    scrollTrigger: { trigger: el, start: 'top 80%' }
  });
});

/* ---------- PROJECT OVERLAYS ---------- */
document.querySelectorAll('.work-item').forEach(item => {
  item.addEventListener('click', () => {
    const id = 'overlay-' + item.dataset.project;
    const overlay = document.getElementById(id);
    if (overlay) { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  });
});
document.querySelectorAll('.project-overlay').forEach(overlay => {
  overlay.querySelector('.overlay-close').addEventListener('click', () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---------- ORDER / CONTACT MAILTO ---------- */
const contactBtn = document.getElementById('contactBtn');
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    window.location.href = 'mailto:shelene470@gmail.com?subject=' + encodeURIComponent('On crée quelque chose ?');
  });
}

/* ---------- ORDER OVERLAY (mini form) ---------- */
const orderOverlay = document.getElementById('orderOverlay');
document.querySelectorAll('[data-open-order]').forEach(btn => {
  btn.addEventListener('click', () => {
    orderOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeMenu();
  });
});
document.querySelectorAll('[data-close-order]').forEach(btn => {
  btn.addEventListener('click', () => {
    orderOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });
});

const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('oName').value;
    const email = document.getElementById('oEmail').value;
    const phone = document.getElementById('oPhone').value;
    const service = document.getElementById('oService').value;
    const message = document.getElementById('oMessage').value;
    const subject = encodeURIComponent('Nouvelle demande — ' + service);
    const body = encodeURIComponent(
      'Nom: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Téléphone: ' + phone + '\n' +
      'Prestation: ' + service + '\n\n' +
      'Besoin:\n' + message
    );
    window.location.href = 'mailto:shelene470@gmail.com?subject=' + subject + '&body=' + body;
  });
}
