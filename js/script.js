/* =========================================
   ESCENA VIVA — Show de Talentos 2025
   main.js
   ========================================= */

"use strict";

/* ---- DATA: Detalles por categoría ---- */
const CATEGORIAS_DATA = {
  pintura: {
    titulo: "🎨 Pintura",
    descripcion:
      "La categoría de pintura reunió a 32 artistas que presentaron obras en técnicas de óleo, acrílico, acuarela y técnica mixta. Las obras fueron expuestas durante toda la noche en la sala principal, convirtiendo el espacio en una galería viva donde el público podía votar por sus favoritas.",
    stats: [
      { label: "Participantes",       value: "32 artistas" },
      { label: "Técnicas presentes",  value: "Óleo, acrílico, acuarela, técnica mixta" },
      { label: "Jurado",              value: "3 curadores independientes" },
      { label: "Premio especial",     value: "Exposición colectiva enero 2026" },
    ],
  },
  musica: {
    titulo: "🎵 Música",
    descripcion:
      "El escenario principal fue el hogar de 28 participantes: solistas, dúos y bandas que interpretaron géneros que van desde el vallenato hasta el jazz contemporáneo, pasando por la música electrónica y el pop alternativo. Cada actuación duró entre 5 y 10 minutos.",
    stats: [
      { label: "Participantes",       value: "28 artistas / grupos" },
      { label: "Géneros",             value: "Jazz, pop, vallenato, electrónico, clásico" },
      { label: "Actuaciones",         value: "22 en escenario principal" },
      { label: "Premio especial",     value: "Grabación en estudio profesional" },
    ],
  },
  literatura: {
    titulo: "📚 Literatura",
    descripcion:
      "Dieciocho voces presentaron sus textos en lectura pública frente al auditorio. Poemas breves, micro-relatos y ensayos de no ficción fueron los géneros más representados. El formato íntimo de la lectura en voz alta hizo de esta categoría la más emotiva de la noche.",
    stats: [
      { label: "Participantes",       value: "18 escritores" },
      { label: "Géneros",             value: "Poesía, cuento, ensayo, micro-relato" },
      { label: "Formato",             value: "Lectura pública de 5 min" },
      { label: "Premio especial",     value: "Publicación en revista literaria nacional" },
    ],
  },
  dibujo: {
    titulo: "✏️ Dibujo",
    descripcion:
      "Veinticuatro dibujantes compitieron en dos modalidades: obra terminada presentada en galería y dibujo en vivo frente al público, donde los espectadores podían observar el proceso creativo completo en tiempo real. El carboncillo y el lápiz fueron los medios más usados.",
    stats: [
      { label: "Participantes",       value: "24 artistas" },
      { label: "Modalidades",         value: "Obra terminada + dibujo en vivo" },
      { label: "Medios",              value: "Carboncillo, lápiz, tinta, digital" },
      { label: "Premio especial",     value: "Residencia artística de una semana" },
    ],
  },
  danza: {
    titulo: "💃 Danza",
    descripcion:
      "Diez grupos de danza pusieron a vibrar el auditorio principal con actuaciones de 8 a 15 minutos. Los estilos abarcaron ballet clásico, contemporáneo, urbano, folclórico colombiano y fusiones experimentales que mezclaron elementos de distintas tradiciones.",
    stats: [
      { label: "Grupos",              value: "10 compañías / grupos" },
      { label: "Estilos",             value: "Ballet, contemporáneo, urbano, folclórico" },
      { label: "Duración por grupo",  value: "8 a 15 minutos" },
      { label: "Premio especial",     value: "Participación en festival nacional" },
    ],
  },
  fotografia: {
    titulo: "📷 Fotografía",
    descripcion:
      "Ocho fotógrafos presentaron series de entre 5 y 10 fotografías cada uno. Las temáticas exploraron el retrato urbano, la naturaleza, la abstracción y la documentación social. Las obras se proyectaron en pantalla gigante durante la ceremonia y se expusieron imprimiendo en el pasillo de entrada.",
    stats: [
      { label: "Participantes",       value: "8 fotógrafos" },
      { label: "Formato",             value: "Series de 5 a 10 fotografías" },
      { label: "Temáticas",           value: "Retrato, urbano, naturaleza, abstracción" },
      { label: "Premio especial",     value: "Exposición individual en galería aliada" },
    ],
  },
};

/* =========================================
   1. Contador animado de estadísticas
   ========================================= */
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number[data-count]");

  counters.forEach((el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, step);
  });
}

/* =========================================
   2. Intersection Observer — Scroll Reveal
   ========================================= */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    ".cat-card, .winner-card, .gallery-item, .section-header, .contact-form-wrap"
  );

  elements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* =========================================
   3. Navbar scroll effect
   ========================================= */
function initNavbarScroll() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      nav.style.background = "rgba(13,13,20,0.97)";
    } else {
      nav.style.background = "rgba(13,13,20,0.85)";
    }
  }, { passive: true });
}

/* =========================================
   4. Hero counter on scroll into view
   ========================================= */
function initHeroCounter() {
  const hero = document.querySelector(".hero-stats");
  if (!hero) return;

  let triggered = false;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      animateCounters();
      obs.disconnect();
    }
  }, { threshold: 0.4 });

  obs.observe(hero);
}

/* =========================================
   5. Modal de Categoría
   ========================================= */
function initCategoryModal() {
  const modalEl    = document.getElementById("modalCategoria");
  const titleEl    = document.getElementById("modalTitulo");
  const descEl     = document.getElementById("modalDesc");
  const statsEl    = document.getElementById("modalStats");

  if (!modalEl) return;

  // Capturamos el clic en cualquier cat-card
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".cat-card[data-category]");
    if (!card) return;

    const key  = card.getAttribute("data-category");
    const data = CATEGORIAS_DATA[key];
    if (!data) return;

    titleEl.textContent = data.titulo;
    descEl.textContent  = data.descripcion;

    statsEl.innerHTML = data.stats
      .map(
        (s) =>
          `<li><span>${s.label}</span><strong>${s.value}</strong></li>`
      )
      .join("");
  });
}

/* =========================================
   6. Formulario de contacto
   ========================================= */
function initContactForm() {
  const btn    = document.getElementById("btnEnviar");
  const msgBox = document.getElementById("formMsg");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const nombre    = document.getElementById("inputNombre").value.trim();
    const email     = document.getElementById("inputEmail").value.trim();
    const categoria = document.getElementById("selectCategoria").value;

    // Validación básica
    if (!nombre || !email || !categoria) {
      showMsg("Por favor completa todos los campos antes de enviar.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMsg("Ingresa un correo electrónico válido.", "error");
      return;
    }

    // Simulación de envío
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando…';

    setTimeout(() => {
      showMsg(
        `¡Gracias, ${nombre}! Te avisaremos cuando abran inscripciones para ${categoria} 🎉`,
        "success"
      );
      btn.disabled = false;
      btn.innerHTML = 'Quiero participar <i class="bi bi-send-fill ms-2"></i>';
      // Limpiar campos
      document.getElementById("inputNombre").value    = "";
      document.getElementById("inputEmail").value     = "";
      document.getElementById("selectCategoria").value = "";
    }, 1200);
  });

  function showMsg(text, type) {
    msgBox.textContent  = text;
    msgBox.className    = `form-msg ${type}`;
    msgBox.style.display = "block";
    setTimeout(() => { msgBox.style.display = "none"; }, 5000);
  }
}

/* =========================================
   7. Smooth scroll para nav links
   ========================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Cerrar el navbar en mobile
      const navCollapse = document.getElementById("navMenu");
      if (navCollapse && navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* =========================================
   8. Active nav link on scroll
   ========================================= */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks  = document.querySelectorAll(".navbar-nav .nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* =========================================
   9. Lightbox
   ========================================= */
function initLightbox() {
  const lightbox   = document.getElementById("lightbox");
  const lbImg      = document.getElementById("lightboxImg");
  const lbVideo    = document.getElementById("lightboxVideo");
  const lbCaption  = document.getElementById("lightboxCaption");
  const lbClose    = document.getElementById("lightboxClose");
  const lbPrev     = document.getElementById("lightboxPrev");
  const lbNext     = document.getElementById("lightboxNext");

  if (!lightbox) return;

  let items = [];
  let currentIndex = 0;

  function buildItems() {
    items = Array.from(document.querySelectorAll(".lightbox-trigger")).map(el => ({
      type:    el.dataset.type,
      src:     el.dataset.src,
      caption: el.dataset.caption || "",
    }));
  }

  function showItem(index) {
    const item = items[index];
    if (!item) return;
    lbCaption.textContent = item.caption;

    if (item.type === "image") {
      // Ocultar video, mostrar imagen
      lbVideo.pause();
      lbVideo.removeAttribute("src");
      lbVideo.style.display = "none";
      lbImg.style.display = "block";
      lbImg.src = item.src;
    } else {
      // Ocultar imagen, mostrar video
      lbImg.style.display = "none";
      lbImg.src = "";
      lbVideo.style.display = "block";
      lbVideo.src = item.src;
      lbVideo.load();
    }
  }

  function openAt(index) {
    buildItems();
    currentIndex = index;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    // Mostrar flechas solo si hay más de 1 item
    lbPrev.style.display = items.length > 1 ? "flex" : "none";
    lbNext.style.display = items.length > 1 ? "flex" : "none";
    showItem(currentIndex);
  }

  function close() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    lbVideo.pause();
    lbVideo.removeAttribute("src");
    lbVideo.style.display = "none";
    lbImg.style.display = "none";
    lbImg.src = "";
  }

  // Click en galería
  document.addEventListener("click", e => {
    const trigger = e.target.closest(".lightbox-trigger");
    if (!trigger) return;
    buildItems();
    const triggers = Array.from(document.querySelectorAll(".lightbox-trigger"));
    openAt(triggers.indexOf(trigger));
  });

  // Cerrar
  lbClose.addEventListener("click", close);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });

  // Navegar
  lbPrev.addEventListener("click", e => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
  });
  lbNext.addEventListener("click", e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  });

  // Teclado
  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape")     close();
    if (e.key === "ArrowLeft")  { currentIndex = (currentIndex - 1 + items.length) % items.length; showItem(currentIndex); }
    if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % items.length; showItem(currentIndex); }
  });
}

/* =========================================
   10. Theme Toggle — Oscuro / Claro
   ========================================= */
function initThemeToggle() {
  const btn  = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  if (!btn) return;

  const STORAGE_KEY = "bt-theme";

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      icon.className = "bi bi-moon-fill";
      btn.setAttribute("aria-label", "Cambiar a tema oscuro");
    } else {
      document.body.classList.remove("light-theme");
      icon.className = "bi bi-sun-fill";
      btn.setAttribute("aria-label", "Cambiar a tema claro");
    }
  }

  // Cargar preferencia guardada (o respetar preferencia del sistema)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    applyTheme("light");
  }

  btn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    const next    = isLight ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

/* =========================================
   INIT
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initHeroCounter();
  initScrollReveal();
  initNavbarScroll();
  initCategoryModal();
  initContactForm();
  initSmoothScroll();
  initActiveNavHighlight();
  initLightbox();

  console.log("🎭 Batalla de Talentos SENA 2026 cargado correctamente.");
});