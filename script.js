// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Active navigation link
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Smooth scroll function
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".fade-in-up, .slide-in-left, .slide-in-right, .timeline-item, .focus-card",
  )
  animateElements.forEach((el) => observer.observe(el))
})

// Staggered animation for focus cards
const focusCards = document.querySelectorAll(".focus-card")
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("animate")
      }, index * 200)
    }
  })
}, observerOptions)

focusCards.forEach((card) => cardObserver.observe(card))

// Timeline animation
const timelineItems = document.querySelectorAll(".timeline-item")
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("animate")
      }, index * 300)
    }
  })
}, observerOptions)

timelineItems.forEach((item) => timelineObserver.observe(item))

// Enhanced Media Lightbox functionality
const lightboxOverlay = document.getElementById("lightbox-overlay")
const lightboxImage = document.getElementById("lightbox-image")
const lightboxTitle = document.getElementById("lightbox-title")
const lightboxDescription = document.getElementById("lightbox-description")
const lightboxClose = document.getElementById("lightbox-close")
const lightboxLoading = document.getElementById("lightbox-loading")

// Media items with lightbox functionality
const mediaItems = document.querySelectorAll(".media-item")

mediaItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault()
    openLightbox(item)
  })
})

function openLightbox(mediaItem) {
  const img = mediaItem.querySelector("img")
  const title = mediaItem.querySelector(".media-overlay h3").textContent
  const description = mediaItem.querySelector(".media-overlay p").textContent

  // Show overlay and loading
  lightboxOverlay.classList.add("active")
  lightboxLoading.style.display = "block"
  lightboxImage.style.display = "none"
  document.body.classList.add("lightbox-open")

  // Set content
  lightboxTitle.textContent = title
  lightboxDescription.textContent = description

  // Create high-resolution image
  const highResImg = new Image()
  highResImg.crossOrigin = "anonymous"

  highResImg.onload = function () {
    lightboxImage.src = this.src
    lightboxImage.alt = img.alt
    lightboxLoading.style.display = "none"
    lightboxImage.style.display = "block"

    // Add fade-in animation
    lightboxImage.style.opacity = "0"
    setTimeout(() => {
      lightboxImage.style.transition = "opacity 0.3s ease"
      lightboxImage.style.opacity = "1"
    }, 50)
  }

  highResImg.onerror = () => {
    // Fallback to original image if high-res fails
    lightboxImage.src = img.src
    lightboxImage.alt = img.alt
    lightboxLoading.style.display = "none"
    lightboxImage.style.display = "block"
  }

  // Load high-resolution version (replace with actual high-res URLs in production)
  const highResSrc = img.src.replace("height=250&width=400", "height=800&width=1200")
  highResImg.src = highResSrc
}

function closeLightbox() {
  lightboxOverlay.classList.remove("active")
  document.body.classList.remove("lightbox-open")

  // Reset image after animation completes
  setTimeout(() => {
    lightboxImage.src = ""
    lightboxImage.style.opacity = "0"
    lightboxImage.style.transition = "none"
  }, 300)
}

// Close lightbox events
lightboxClose.addEventListener("click", closeLightbox)

// Close on overlay click (outside content)
lightboxOverlay.addEventListener("click", (e) => {
  if (e.target === lightboxOverlay) {
    closeLightbox()
  }
})

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightboxOverlay.classList.contains("active")) {
    closeLightbox()
  }
})

// Prevent scrolling when lightbox is open
lightboxOverlay.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault()
  },
  { passive: false },
)

// Touch events for mobile
let touchStartY = 0
let touchEndY = 0

lightboxOverlay.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY
})

lightboxOverlay.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY

  // Close on swipe down (mobile gesture)
  if (touchStartY < touchEndY - 50) {
    closeLightbox()
  }
})

// Preload images for better performance
function preloadMediaImages() {
  mediaItems.forEach((item) => {
    const img = item.querySelector("img")
    const highResSrc = img.src.replace("height=250&width=400", "height=800&width=1200")

    const preloadImg = new Image()
    preloadImg.src = highResSrc
  })
}

// Preload images after page load
window.addEventListener("load", () => {
  setTimeout(preloadMediaImages, 2000)
})

// Add scroll-triggered animations for about section
const aboutImage = document.querySelector(".slide-in-left")
const aboutText = document.querySelector(".slide-in-right")

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        aboutImage.classList.add("animate")
      }, 200)
      setTimeout(() => {
        aboutText.classList.add("animate")
      }, 400)
    }
  })
}, observerOptions)

if (aboutImage) aboutObserver.observe(aboutImage)

// Hamburger menu animation
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
})

// Add CSS for hamburger animation
const style = document.createElement("style")
style.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`
document.head.appendChild(style)

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Performance optimization: Throttle scroll events
let ticking = false

function updateScrollEffects() {
  // Navbar scroll effect
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Active navigation link
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })

  ticking = false
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects)
    ticking = true
  }
}

window.addEventListener("scroll", requestTick)
