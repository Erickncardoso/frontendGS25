/* ================================================
   MAIN.JS - JavaScript Principal da Aplicação
   ================================================ */

// Registrar plugins GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Aguardar carregamento completo
window.addEventListener("load", () => {
  // Inicializar Lucide icons
  lucide.createIcons();

  // Inicializar todas as funcionalidades
  initNavigation();
  initReadingProgress();
  initTechnologyFilters();
  initToastSystem();
  initUserSimulation();
  initGSAPAnimations();
  initMobileMenu();
  initVideoModal();
  initSmoothScrolling();
});

// ===== SISTEMA DE NAVEGAÇÃO =====
function initNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#']");

  function setActiveNavigation() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-blue-600", "font-medium");
      link.classList.add("text-gray-700", "hover:text-blue-600");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove("text-gray-700", "hover:text-blue-600");
        link.classList.add("text-blue-600", "font-medium");
      }
    });
  }

  window.addEventListener("scroll", setActiveNavigation);
}

// ===== BARRA DE PROGRESSO DE LEITURA =====
function initReadingProgress() {
  const progressBar = document.querySelector(".reading-progress");

  window.addEventListener("scroll", () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  });
}

// ===== SISTEMA DE FILTROS DAS TECNOLOGIAS =====
function initTechnologyFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const techCards = document.querySelectorAll("[data-tech-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Atualizar botões ativos
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.classList.add("text-slate-400", "hover:text-white");
        btn.classList.remove("text-blue-400", "bg-blue-500/20");
      });

      button.classList.add("active");
      button.classList.remove("text-slate-400", "hover:text-white");
      button.classList.add("text-blue-400", "bg-blue-500/20");

      // Filtrar cards
      techCards.forEach((card) => {
        const category = card.dataset.techCategory;
        if (filter === "all" || category === filter) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(card, {
            opacity: 0.3,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    });
  });
}

// ===== SISTEMA DE NOTIFICAÇÕES TOAST =====
function initToastSystem() {
  window.showToast = function (message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${
      type === "success"
        ? "toast-success"
        : type === "error"
        ? "toast-error"
        : "toast-info"
    }`;

    toast.innerHTML = `
      <div class="flex items-center space-x-3">
        <i data-lucide="${
          type === "success"
            ? "check-circle"
            : type === "error"
            ? "x-circle"
            : "info"
        }" class="w-5 h-5 ${
      type === "success"
        ? "text-green-600"
        : type === "error"
        ? "text-red-600"
        : "text-blue-600"
    }"></i>
        <span class="text-gray-800">${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-gray-400 hover:text-gray-600">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
    `;

    document.body.appendChild(toast);
    lucide.createIcons();

    // Animar entrada
    setTimeout(() => toast.classList.add("show"), 100);

    // Remover após 5 segundos
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  };

  // Mostrar toast inicial
  setTimeout(() => {
    showToast(
      "Bem-vindo ao alaganao! Explore nossa solução inovadora 🌊",
      "success"
    );
  }, 2000);
}

// ===== SIMULAÇÃO DE USUÁRIOS ONLINE =====
function initUserSimulation() {
  const userCounter = document.querySelector('[data-target="8532"]');
  if (!userCounter) return;

  let count = 8532;
  setInterval(() => {
    count += Math.floor(Math.random() * 5) - 2;
    if (count < 8500) count = 8500;
    if (count > 8600) count = 8600;

    gsap.to(userCounter, {
      innerHTML: count,
      duration: 1,
      snap: { innerHTML: 1 },
      onUpdate: function () {
        userCounter.innerHTML = Math.floor(
          this.targets()[0].innerHTML
        ).toLocaleString();
      },
    });
  }, 10000); // Atualiza a cada 10 segundos
}

// ===== ANIMAÇÕES GSAP =====
function initGSAPAnimations() {
  // Timeline principal para entrada dos elementos
  const tl = gsap.timeline({ delay: 0.3 });

  // Animação do badge acadêmico
  tl.to(".gsap-badge", {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.7)",
  })

    // Animação das linhas do título
    .to(".gsap-title", { opacity: 1, duration: 0.1 }, "-=0.3")
    .fromTo(
      ".gsap-title-line",
      {
        opacity: 0,
        y: 40,
        rotationX: -20,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      },
      "-=0.2"
    )

    // Animação do subtítulo
    .to(
      ".gsap-subtitle",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    )

    // Animação dos feature cards
    .to(
      ".gsap-feature-card",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.3"
    )

    // Animação da seção visual
    .to(
      ".gsap-visual",
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );

  // Animações das feature cards
  gsap.utils.toArray(".feature-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Iniciar animação dos contadores quando visíveis
  gsap.utils.toArray(".counter").forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));

    ScrollTrigger.create({
      trigger: counter,
      start: "top 80%",
      onEnter: () => {
        gsap.from(counter, {
          innerHTML: 0,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function () {
            counter.innerHTML = Math.floor(
              this.targets()[0].innerHTML
            ).toLocaleString();
          },
        });
      },
    });
  });

  // Animações para elementos scroll-reveal
  gsap.utils.toArray(".scroll-reveal").forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

// ===== MENU MOBILE =====
function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  let mobileMenuOpen = false;

  if (!mobileMenuButton || !mobileMenu) return;

  mobileMenuButton.addEventListener("click", () => {
    mobileMenuOpen = !mobileMenuOpen;

    if (mobileMenuOpen) {
      gsap.fromTo(
        mobileMenu,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onStart: () => mobileMenu.classList.remove("hidden"),
        }
      );
      mobileMenuButton.innerHTML = '<i data-lucide="x" class="h-6 w-6"></i>';
    } else {
      gsap.to(mobileMenu, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => mobileMenu.classList.add("hidden"),
      });
      mobileMenuButton.innerHTML = '<i data-lucide="menu" class="h-6 w-6"></i>';
    }

    lucide.createIcons();
  });
}

// ===== MODAL DE VÍDEO =====
function initVideoModal() {
  window.openVideoModal = function () {
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("video-frame");

    if (!modal || !iframe) return;

    // URL do vídeo pitch
    iframe.src = "https://www.youtube.com/embed/V0zXcinRCuc";

    // Mostrar modal
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Animação de entrada do modal
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(
      modal.querySelector(".relative"),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  };

  window.closeVideoModal = function () {
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("video-frame");

    if (!modal || !iframe) return;

    // Animação de saída do modal
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.classList.add("hidden");
        iframe.src = "";
        document.body.style.overflow = "auto";
      },
    });
  };

  // Fechar modal com Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeVideoModal();
    }
  });

  // Fechar modal clicando fora
  const modal = document.getElementById("video-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeVideoModal();
      }
    });
  }
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power2.inOut",
        });
      }
    });
  });
}

// ===== UTILITÁRIOS =====

// Função para scroll para seção específica
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    gsap.to(window, {
      duration: 1,
      scrollTo: element,
      ease: "power2.inOut",
    });
  }
}

// Função para filtrar tecnologias (compatibilidade)
function filterTechnologies(category) {
  const techCards = document.querySelectorAll("[data-tech-category]");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Atualizar botões ativos
  filterButtons.forEach((btn) => {
    btn.classList.remove("bg-blue-600", "text-white");
    btn.classList.add("bg-gray-200", "text-gray-700");
  });

  event.target.classList.remove("bg-gray-200", "text-gray-700");
  event.target.classList.add("bg-blue-600", "text-white");

  // Filtrar cards
  techCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-tech-category");

    if (category === "all" || cardCategory === category) {
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(card, {
        opacity: 0.3,
        scale: 0.95,
        y: 10,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  });
}

// Lazy loading para imagens
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        gsap.from(img, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Performance monitor (desenvolvimento)
if (window.performance && console.time) {
  console.time("Page Load Time");
  window.addEventListener("load", () => {
    console.timeEnd("Page Load Time");
    console.log("🚀 alaganao carregado com sucesso!");
  });
}

// Inicialização dos ícones Lucide
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar ícones Lucide
  lucide.createIcons();

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Smooth scrolling para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Fechar menu mobile se estiver aberto
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });

  // Counter Animation
  function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 20);
  }

  // Intersection Observer para counters
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target.querySelector(".counter");
          if (counter && !counter.classList.contains("animated")) {
            counter.classList.add("animated");
            animateCounter(counter);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observar elementos com counters
  document.querySelectorAll("[data-target]").forEach((counter) => {
    counterObserver.observe(counter.closest("div"));
  });

  // Modal de Vídeo (se existir)
  const videoModal = document.getElementById("video-modal");
  const closeModal = document.getElementById("close-modal");
  const videoFrame = document.getElementById("video-frame");

  if (videoModal && closeModal && videoFrame) {
    // Botões que abrem o modal
    document.querySelectorAll("[data-video-url]").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const videoUrl = button.getAttribute("data-video-url");
        videoFrame.src = videoUrl;
        videoModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    });

    // Fechar modal
    function closeVideoModal() {
      videoModal.classList.add("hidden");
      videoFrame.src = "";
      document.body.style.overflow = "auto";
    }

    closeModal.addEventListener("click", closeVideoModal);

    // Fechar modal clicando fora do vídeo
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });

    // Fechar modal com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !videoModal.classList.contains("hidden")) {
        closeVideoModal();
      }
    });
  }

  // Barra de progresso de leitura
  const progressBar = document.querySelector(".reading-progress");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset;
      const progress = (scrollTop / documentHeight) * 100;

      progressBar.style.width = progress + "%";
    });
  }

  // Lazy loading para imagens (se existirem)
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Highlight da navegação baseado na seção atual
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNavigation() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-blue-600");
      link.classList.add("text-gray-700");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove("text-gray-700");
        link.classList.add("text-blue-600");
      }
    });
  }

  window.addEventListener("scroll", highlightNavigation);

  console.log("🎉 alaganao Landing Page carregada com sucesso!");
});

// CSS para barra de progresso
const style = document.createElement("style");
style.textContent = `
.reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #7c3aed, #059669);
    z-index: 9999;
    transition: width 0.25s ease;
}

.lazy {
    opacity: 0.3;
    transition: opacity 0.3s ease;
}

/* Scroll suave para navegação */
html {
    scroll-behavior: smooth;
}

/* Animações de hover para cards */
.tech-card {
    transition: all 0.3s ease;
}

.tech-card:hover {
    transform: translateY(-8px);
}

/* Efeito de glassmorphism */
.backdrop-blur-sm {
    backdrop-filter: blur(12px);
}
`;
document.head.appendChild(style);
