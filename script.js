// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");

    // Only process if href is not just "#" and contains a valid selector
    if (href && href !== "#" && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.98)";
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.95)";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .contact-item"
  );
  animateElements.forEach((el) => observer.observe(el));
});

// Skill bars animation
const skillBars = document.querySelectorAll(".skill-progress");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.style.width;
        progressBar.style.width = "0%";
        setTimeout(() => {
          progressBar.style.width = width;
        }, 200);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// Contact form handling
// const contactForm = document.querySelector(".contact-form");
// if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();

//         // Get form data
//         const formData = new FormData(this);
//         const name = formData.get('name');
//         const email = formData.get('email');
//         const subject = formData.get('subject');
//         const message = formData.get('message');

//         // Basic validation
//         if (!name || !email || !subject || !message) {
//             showNotification('Please fill in all fields', 'error');
//             return;
//         }

//         if (!isValidEmail(email)) {
//             showNotification('Please enter a valid email address', 'error');
//             return;
//         }

//         // Simulate form submission
//         showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
//         this.reset();
//     });
// }

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Submit to Formspree via fetch
    fetch("https://formspree.io/f/xanjkjrp", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          showNotification(
            "Message sent successfully! I'll get back to you soon.",
            "success"
          );
          contactForm.reset();
        } else {
          return response.json().then((data) => {
            const error =
              data.errors?.[0]?.message ||
              "Something went wrong. Please try again.";
            showNotification(error, "error");
          });
        }
      })
      .catch(() => {
        showNotification(
          "Failed to send message. Please try again later.",
          "error"
        );
      });
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#1DCD9F"
            : type === "error"
            ? "#ff4757"
            : "#3742fa"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Portfolio item hover effects
document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Service card hover effects
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 500);
  }
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Active navigation link highlighting
function updateActiveNavLink() {
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
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);

// Add active class styles to CSS
const style = document.createElement("style");
style.textContent = `
    .nav-link.active {
        color: #1DCD9F !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if any are added later)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  updateActiveNavLink();
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add loading styles
const loadingStyle = document.createElement("style");
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid #1DCD9F;
        border-top: 3px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle);

// Skills Accordion Functionality
function toggleAccordion(header) {
  const category = header.parentElement;
  const isActive = category.classList.contains("active");

  // Close all other accordions
  document.querySelectorAll(".skill-category").forEach((cat) => {
    if (cat !== category) {
      cat.classList.remove("active");
    }
  });

  // Toggle current accordion
  if (isActive) {
    category.classList.remove("active");
  } else {
    category.classList.add("active");
  }
}

function closeAccordion(category) {
  // Add a small delay to allow for mouse movement between elements
  setTimeout(() => {
    if (!category.matches(":hover")) {
      category.classList.remove("active");
    }
  }, 100);
}

// Accordion headers event listeners
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => toggleAccordion(header));
});

// Close accordion on mouse leave
document.querySelectorAll(".skill-category").forEach((category) => {
  category.addEventListener("mouseleave", () => closeAccordion(category));
});

// Anti-bot Email Protection
function toggleEmail() {
  const button = document.getElementById("show-email-btn");
  const container = document.getElementById("email-container");

  // Check if email is already revealed
  if (container.innerHTML.trim() !== "") {
    // Hide email
    container.innerHTML = "";
    button.innerHTML = '<i class="fas fa-eye"></i> Show Email';
    button.classList.remove("email-revealed");
  } else {
    // Show email - split into parts to avoid bot detection
    const emailParts = ["lorence", "palisan2", "@", "gmail", ".", "com"];
    const email = emailParts.join("");

    container.innerHTML = `
      <p class="email-address">
        <a href="mailto:${email}" class="email-link">
          <i class="fas fa-envelope"></i> ${email}
        </a>
      </p>
    `;

    button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Email';
    button.classList.add("email-revealed");
  }
}

// Anti-bot Phone Protection
function togglePhone() {
  const button = document.getElementById("show-phone-btn");
  const container = document.getElementById("phone-container");

  // Check if phone is already revealed
  if (container.innerHTML.trim() !== "") {
    // Hide phone
    container.innerHTML = "";
    button.innerHTML = '<i class="fas fa-eye"></i> Show Phone';
    button.classList.remove("email-revealed");
  } else {
    // Show phone - split into parts to avoid bot detection
    const phoneParts = ["+63", " ", "928", "221", "9343"];
    const phone = phoneParts.join("");

    container.innerHTML = `
      <p class="email-address">
        <a href="viber://chat?number=${phone.replace(
          /\s/g,
          ""
        )}" class="email-link">
          <i class="fab fa-viber"></i> ${phone}
        </a>
      </p>
    `;

    button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Phone';
    button.classList.add("email-revealed");
  }
}

// Initialize email and phone protection on page load
document.addEventListener("DOMContentLoaded", function () {
  // Ensure email is hidden by default
  const container = document.getElementById("email-container");
  if (container) {
    container.innerHTML = "";
  }

  // Ensure phone is hidden by default
  const phoneContainer = document.getElementById("phone-container");
  if (phoneContainer) {
    phoneContainer.innerHTML = "";
  }
});

// Service card accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");
  let currentlyExpanded = null;

  serviceCards.forEach((card) => {
    const features = card.querySelector(".service-features");
    const featureItems = features.querySelectorAll("li");

    // Add hover event listeners
    card.addEventListener("mouseenter", () => {
      // If there's a currently expanded card that's not this one, collapse it
      if (currentlyExpanded && currentlyExpanded !== card) {
        currentlyExpanded.classList.remove("expanded");
      }

      // Expand current card
      card.classList.add("expanded");
      currentlyExpanded = card;

      // Stagger animation for feature items
      featureItems.forEach((item, index) => {
        item.style.transitionDelay = `${(index + 1) * 0.1}s`;
      });
    });

    card.addEventListener("mouseleave", () => {
      // Collapse current card
      card.classList.remove("expanded");
      if (currentlyExpanded === card) {
        currentlyExpanded = null;
      }

      // Reset transition delays
      featureItems.forEach((item) => {
        item.style.transitionDelay = "0s";
      });
    });
  });
});

// Modal functionality for React Sample Sites
function openSiteModal(event) {
  event.preventDefault();
  const modal = document.getElementById("siteModal");
  modal.classList.add("show");

  // Prevent body scroll when modal is open
  document.body.style.overflow = "hidden";
}

function closeSiteModal() {
  const modal = document.getElementById("siteModal");
  modal.classList.remove("show");

  // Restore body scroll
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside of it or pressing Escape
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("siteModal");

  if (modal) {
    // Close modal when clicking outside
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeSiteModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const modal = document.getElementById("siteModal");
      if (modal && modal.classList.contains("show")) {
        closeSiteModal();
      }
    }
  });
});
