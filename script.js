// Hero Card Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-card-slide");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");
  let current = 0;
  // Hero Card Slider Functionality with Progress Bar
  const progressBar = document.querySelector(".slider-progress");
  let duration = 3500;
  let interval, progressInterval;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === idx);
    });
    animateProgressBar();
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function animateProgressBar() {
    if (!progressBar) return;
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    setTimeout(() => {
      progressBar.style.transition = `width ${duration}ms linear`;
      progressBar.style.width = "100%";
    }, 30);
  }

  function startSlider() {
    showSlide(current);
    if (interval) clearInterval(interval);
    interval = setInterval(nextSlide, duration);
  }

  startSlider();
});
// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );

  // Add floating elements to hero section
  createFloatingElements();
});

// Create floating tech elements
function createFloatingElements() {
  const hero = document.querySelector(".hero");
  const elements = ["💻", "🖨️", "📷", "🖥️", "⚙️", "🔒"];

  elements.forEach((element, index) => {
    const floatingEl = document.createElement("div");
    floatingEl.className = "floating-element";
    floatingEl.textContent = element;
    floatingEl.style.cssText = `
            position: absolute;
            font-size: 2rem;
            opacity: 0.1;
            pointer-events: none;
            animation: floatAround ${8 + index * 2}s ease-in-out infinite;
            animation-delay: ${index * 0.5}s;
            left: ${Math.random() * 80 + 10}%;
            top: ${Math.random() * 60 + 20}%;
        `;
    hero.appendChild(floatingEl);
  });

  // Add CSS for floating animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes floatAround {
            0%, 100% { 
                transform: translate(0, 0) rotate(0deg) scale(1); 
            }
            25% { 
                transform: translate(20px, -15px) rotate(5deg) scale(1.1); 
            }
            50% { 
                transform: translate(-10px, -25px) rotate(-3deg) scale(0.9); 
            }
            75% { 
                transform: translate(-20px, 10px) rotate(8deg) scale(1.05); 
            }
        }
        .floating-element {
            z-index: 1;
        }
    `;
  document.head.appendChild(style);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Trigger counter animation when about section is visible
      if (entry.target.classList.contains("about")) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".service-card, .about, .contact-item"
  );

  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});

// Contact Form Handler
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Simple validation
  if (!data.name || !data.email || !data.message || !data.service) {
    alert("Please fill in all required fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
  }
});

// Service card hover effects
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Phone number click handler
document
  .querySelector('a[href^="tel:"]')
  .addEventListener("click", function (e) {
    // For desktop, show a message
    if (window.innerWidth > 768) {
      e.preventDefault();
      alert(
        "Phone: +91 76766 75491\n\nOn mobile devices, this will dial automatically."
      );
    }
  });

// Email click handler
document
  .querySelector('a[href^="mailto:"]')
  .addEventListener("click", function (e) {
    // Check if email client is available
    if (!window.navigator.userAgent.includes("Mobile")) {
      const fallback = confirm(
        "This will open your default email client. Continue?"
      );
      if (!fallback) {
        e.preventDefault();
      }
    }
  });

// Utility function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add active class to navigation links based on scroll position
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Initialize tooltips (if needed)
function initTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = this.getAttribute("data-tooltip");
      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      tooltip.style.left =
        rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";
    });

    element.addEventListener("mouseleave", function () {
      const tooltip = document.querySelector(".tooltip");
      if (tooltip) {
        tooltip.remove();
      }
    });
  });
}

// Call init functions
document.addEventListener("DOMContentLoaded", function () {
  initTooltips();
});
