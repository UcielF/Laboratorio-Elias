(() => {
  const navToggle = document.getElementById("navToggle");
  const navPanel = document.getElementById("navPanel");
  const year = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const header = document.querySelector(".site-header");
  const logo = document.getElementById("siteLogo");

  function onScroll() {
    if (!header) return;
    const scrolled = window.scrollY > 10;
    header.classList.toggle("is-scrolled", scrolled);
    if (logo) logo.src = scrolled ? "img/logo1.png" : "img/logo2.png";
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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

  // Form — envío pendiente de backend
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // TODO: conectar con backend PHP
    });
  }

  // Adjuntos: mostrar lista de archivos seleccionados
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const fileDrop = document.getElementById("fileDrop");

  if (fileInput && fileList) {
    fileInput.addEventListener("change", () => renderFiles(fileInput.files));
  }

  if (fileDrop) {
    fileDrop.addEventListener("dragover", (e) => {
      e.preventDefault();
      fileDrop.classList.add("is-over");
    });
    fileDrop.addEventListener("dragleave", () => fileDrop.classList.remove("is-over"));
    fileDrop.addEventListener("drop", (e) => {
      e.preventDefault();
      fileDrop.classList.remove("is-over");
      fileInput.files = e.dataTransfer.files;
      renderFiles(fileInput.files);
    });
  }

  function renderFiles(files) {
    if (!fileList) return;
    fileList.innerHTML = "";
    Array.from(files).forEach((file) => {
      const li = document.createElement("li");
      const sizeMB = (file.size / 1024 / 1024).toFixed(1);
      li.innerHTML = `<span><i class="fa-solid fa-file"></i> ${file.name} <small>(${sizeMB} MB)</small></span>`;
      fileList.appendChild(li);
    });
  }

})();
