/* =========================
   DOM READY WRAPPER
========================= */
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     NAVBAR SCROLL BEHAVIOR
  ========================= */
  const navbar = document.querySelector(".custom-navbar");
  let lastScroll = window.pageYOffset;

  if (navbar) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      // Scroll down → hide
      if (currentScroll > lastScroll && currentScroll > 80) {
        navbar.classList.add("navbar-hidden");
      } else {
        navbar.classList.remove("navbar-hidden");
      }

      lastScroll = currentScroll;

      // Bottom fade
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 20
      ) {
        navbar.classList.add("navbar-fade");
      } else {
        navbar.classList.remove("navbar-fade");
      }
    });
  }

  /* =========================
     CUSTOM DROPDOWN
  ========================= */
  const dropdown = document.querySelector(".custom-dropdown");
  const toggle = dropdown?.querySelector(".dropdown-toggle-custom");

  if (dropdown && toggle) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }

  /* =========================
     TESTIMONIAL CAROUSEL
  ========================= */
  const track = document.getElementById("testiCarousel");
  const btnPrev = document.getElementById("testiPrev");
  const btnNext = document.getElementById("testiNext");

  if (track && btnPrev && btnNext) {
    const getScrollAmount = () => {
      const card = track.querySelector(".testimonial-card");
      if (!card) return track.clientWidth;

      const style = getComputedStyle(card);
      const gap = parseFloat(style.marginRight) || 0;
      return card.offsetWidth + gap;
    };

    btnPrev.addEventListener("click", () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    btnNext.addEventListener("click", () => {
      track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });
  }

  /* =========================
     FAQ ACCORDION
  ========================= */
  const faqButtons = document.querySelectorAll("[data-faq]");
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqButtons.length) {
    faqButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const isOpen = item.classList.contains("open");

        faqItems.forEach((el) => el.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });

    // Auto-open first FAQ
    setTimeout(() => {
      faqItems[0]?.classList.add("open");
    }, 800);
  }

  /* =========================
     PRICING TOGGLE
  ========================= */
  const yearlyBtn = document.getElementById("yearly-btn");
  const monthlyBtn = document.getElementById("monthly-btn");
  const prices = document.querySelectorAll(".plan-price");

  if (yearlyBtn && monthlyBtn && prices.length) {
    function updatePrices(isYearly) {
      prices.forEach((price) => {
        const yearly = price.dataset.yearly;
        const monthly = price.dataset.monthly;
        if (!yearly || !monthly) return;

        price.style.opacity = 0;
        setTimeout(() => {
          price.innerHTML = `$${
            isYearly ? yearly : monthly
          }<span>/month</span>`;
          price.style.opacity = 1;
        }, 200);
      });
    }

    yearlyBtn.addEventListener("click", () => {
      yearlyBtn.classList.add("active");
      monthlyBtn.classList.remove("active");
      updatePrices(true);
    });

    monthlyBtn.addEventListener("click", () => {
      monthlyBtn.classList.add("active");
      yearlyBtn.classList.remove("active");
      updatePrices(false);
    });
  }

  /* =========================
     MULTI-STEP FORM
  ========================= */
  const steps = document.querySelectorAll(".form-step");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const submitBtn = document.getElementById("submitBtn");

  let currentStep = 1;
  const totalSteps = steps.length;

  if (steps.length && nextBtn && prevBtn && submitBtn) {
    function showStep(step) {
      steps.forEach((s) => s.classList.remove("active"));
      document.getElementById(`step${step}`)?.classList.add("active");

      for (let i = 1; i <= totalSteps; i++) {
        const node = document.getElementById(`step-node-${i}`);
        const line = document.getElementById(`line-fill-${i - 1}`);

        node?.classList.remove("active", "completed");
        if (i < step) node?.classList.add("completed");
        if (i === step) node?.classList.add("active");
        if (line) line.style.width = i < step ? "100%" : "0%";
      }

      prevBtn.disabled = step === 1;
      nextBtn.style.display = step === totalSteps ? "none" : "inline-block";
      submitBtn.style.display = step === totalSteps ? "inline-block" : "none";

      currentStep = step;
    }

    nextBtn.addEventListener("click", () => {
      if (currentStep < totalSteps) showStep(currentStep + 1);
    });

    prevBtn.addEventListener("click", () => {
      if (currentStep > 1) showStep(currentStep - 1);
    });

    submitBtn.addEventListener("click", () => {
      const overlay = document.getElementById("loadingOverlay");
      overlay && (overlay.style.display = "flex");

      setTimeout(() => {
        document.getElementById("summaryCompany").textContent =
          document.getElementById("companyName")?.value || "";

        document.getElementById("summaryName").textContent = `${
          document.getElementById("firstName")?.value || ""
        } 
           ${document.getElementById("lastName")?.value || ""}`;

        document.getElementById("summaryEmail").textContent =
          document.getElementById("email")?.value || "";

        document.getElementById("userEmail").textContent =
          document.getElementById("email")?.value || "";

        overlay && (overlay.style.display = "none");
        showStep(totalSteps);
      }, 1500);
    });

    showStep(1);
  }

  /* =========================
     DOMAIN PREVIEW
  ========================= */
  const domainInput = document.getElementById("companyDomain");
  const domainPreview = document.getElementById("domainPreview");

  if (domainInput && domainPreview) {
    domainInput.addEventListener("input", () => {
      domainPreview.textContent =
        (domainInput.value.trim() || "yourcompany") + ".com";
    });
  }

  /* =========================
     FEATURE FILTER
  ========================= */
  const cats = document.querySelectorAll(".feature-sub-list li");
  const cards = document.querySelectorAll(".feature-sub-card-item");

  if (cats.length && cards.length) {
    cats.forEach((cat) => {
      cat.addEventListener("click", () => {
        cats.forEach((c) => c.classList.remove("active"));
        cat.classList.add("active");

        const selected = cat.dataset.category;
        cards.forEach((card) => {
          card.style.display =
            selected === "all" || card.dataset.category === selected
              ? "block"
              : "none";
        });
      });
    });
  }
});
