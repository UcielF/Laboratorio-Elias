(() => {
  const navToggle = document.getElementById("navToggle");
  const navPanel = document.getElementById("navPanel");
  const year = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const header = document.querySelector(".site-header");
  const logo = document.getElementById("siteLogo");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

      header.classList.add("is-scrolled");
      logo.src = "img/logo1.png";

    } else {

      header.classList.remove("is-scrolled");
      logo.src = "img/logo2.png";

    }

  });

  // Year
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  if (navToggle && navPanel) {
    navToggle.addEventListener("click", () => {
      const open = navPanel.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", open); // ✅ anima el botón
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // close after click
    navPanel.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navPanel.classList.remove("is-open");
        navToggle.classList.remove("is-active");      // ✅ vuelve a hamburguesa
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // close on outside click
    document.addEventListener("click", (e) => {
      const target = e.target;
      const clickedInside = navPanel.contains(target) || navToggle.contains(target);
      if (!clickedInside) {
        navPanel.classList.remove("is-open");
        navToggle.classList.remove("is-active");      // ✅ vuelve a hamburguesa
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Tratamientos: aparecer y desaparecer al hacer scroll
  (() => {
    const items = document.querySelectorAll("#tratamientos .list li");
    if (!items.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, { threshold: 0.2 });

    items.forEach((li) => io.observe(li));
  })();

  // Form -> WhatsApp message
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      const lines = [
        "Hola! Soy " + (name || "—"),
        phone ? "Mi teléfono: " + phone : null,
        "Consulta:",
        message || "—"
      ].filter(Boolean);

      const text = encodeURIComponent(lines.join("\n"));
      const wa = `https://wa.me/5492235242094?text=${text}`;
      window.open(wa, "_blank", "noopener,noreferrer");
      form.reset();
    });
  }
  (() => {
    const header = document.querySelector(".site-header");

    function onScroll() {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // estado inicial
  })();

})();
