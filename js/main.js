/* =============================================================
   FICHIER : js/main.js
   RÔLE    : Script principal du portfolio (Vanilla JS, sans librairie).
   Cette étape ne pose que le SQUELETTE : chaque bloc de fonctions
   sera rempli progressivement (navigation, scroll reveal,
   compteurs animés, formulaire de contact, etc.) au fil des étapes.
============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio chargé — étape 2 : navigation + Hero.');

  initNavigation();
  initTypingEffect();
  initCvDropdown();

  // ----- Étape 4 : animation des barres de compétences -----
  // initSkillBars();

  // ----- Étape 7/8 : compteurs animés (statistiques, timeline) -----
  // initCounters();

  // ----- Toutes sections : animations "reveal on scroll" -----
  // initScrollReveal();

  // ----- Étape 9 : validation et envoi du formulaire de contact -----
  // initContactForm();
});

/* =============================================================
   NAVIGATION
   - Menu hamburger mobile (ouverture/fermeture)
   - Fermeture automatique après clic sur un lien (mobile)
   - Scroll-spy : met en surbrillance le lien de la section visible
   - Remplissage de la "colonne vertébrale" selon la progression du scroll
============================================================= */
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const spineFill = document.getElementById('nav-spine-fill');

  // Ouverture / fermeture du menu mobile
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Ferme le menu mobile après avoir cliqué sur un lien
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll-spy : utilise IntersectionObserver pour détecter la section active
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((section) => observer.observe(section));

  // Remplissage progressif de la colonne vertébrale de navigation
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    spineFill.style.height = `${progress}%`;
  });
}

/* =============================================================
   EFFET DE FRAPPE (typing effect)
   Alterne entre les deux rôles du profil dans le Hero.
============================================================= */
function initTypingEffect() {
  const el = document.getElementById('typing-role');
  const roles = [
    '.NET Full Stack Developer',
    'SAP S/4HANA Consultant (PS/PPM)'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    el.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 35 : 65;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1800; // pause avant d'effacer
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400; // pause avant de retaper
    }

    setTimeout(type, speed);
  }

  type();
}

/* =============================================================
   MENU DÉROULANT — CHOIX DU CV
   Le visiteur choisit entre le CV "SAP" et le CV "Développeur .NET"
============================================================= */
function initCvDropdown() {
  const btn = document.getElementById('cv-dropdown-btn');
  const menu = document.getElementById('cv-dropdown-menu');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Ferme le menu si on clique ailleurs sur la page
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}
