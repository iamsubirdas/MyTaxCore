/* ==========================================================================
   MyTaxCore — shared site behaviour
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
  /* ---- Mobile navigation ---- */
  var hamburger = document.querySelector("[data-hamburger]");
  var navMobile = document.querySelector("[data-nav-mobile]");

  if (hamburger && navMobile) {
    hamburger.addEventListener("click", function () {
      var isOpen = navMobile.classList.toggle("is-open");
      hamburger.classList.toggle("is-open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMobile.classList.remove("is-open");
        hamburger.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- FAQ accordion ---- */
  var faqItems = document.querySelectorAll("[data-faq-item]");
  faqItems.forEach(function (item) {
    var question = item.querySelector("[data-faq-question]");
    var answer = item.querySelector("[data-faq-answer]");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        var otherAnswer = other.querySelector("[data-faq-answer]");
        var otherQuestion = other.querySelector("[data-faq-question]");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
        if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---- Contact form validation ---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var successPanel = document.querySelector("[data-form-success]");

    var validators = {
      name: function (v) { return v.trim().length >= 2; },
      phone: function (v) { return /^[0-9+\s-]{8,15}$/.test(v.trim()); },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      service: function (v) { return v.trim().length > 0; },
      message: function (v) { return v.trim().length >= 10; }
    };

    var messages = {
      name: "Please enter your full name.",
      phone: "Please enter a valid phone number.",
      email: "Please enter a valid email address.",
      service: "Please select a service.",
      message: "Please share a few details (at least 10 characters)."
    };

    function setFieldError(field, show) {
      var wrapper = field.closest(".form-field");
      if (!wrapper) return;
      var errorEl = wrapper.querySelector(".error-msg");
      wrapper.classList.toggle("has-error", show);
      if (errorEl) errorEl.textContent = show ? messages[field.name] || "This field is required." : "";
    }

    function validateField(field) {
      var validator = validators[field.name];
      if (!validator) return true;
      var valid = validator(field.value);
      setFieldError(field, !valid);
      return valid;
    }

    Object.keys(validators).forEach(function (name) {
      var field = form.querySelector("[name='" + name + "']");
      if (field) {
        field.addEventListener("blur", function () { validateField(field); });
        field.addEventListener("input", function () {
          if (field.closest(".form-field").classList.contains("has-error")) validateField(field);
        });
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allValid = true;
      Object.keys(validators).forEach(function (name) {
        var field = form.querySelector("[name='" + name + "']");
        if (field && !validateField(field)) allValid = false;
      });

      if (!allValid) {
        var firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstError) firstError.focus();
        return;
      }

      form.classList.add("is-hidden");
      if (successPanel) successPanel.classList.add("is-visible");
      form.reset();
    });
  }
});

/* ---- Banner slider (auto-rotate every 2s) ---- */
  var bannerTrack = document.querySelector("[data-banner-slider]");
  if (bannerTrack) {
    var slides = bannerTrack.querySelectorAll(".banner-slide");
    var dotsWrap = document.querySelector("[data-banner-dots]");
    var current = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement("span");
      if (i === 0) dot.classList.add("is-active");
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll("span");

    setInterval(function () {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
    }, 4000);
  }