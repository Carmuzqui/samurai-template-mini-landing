// Data decoding functionality
function decodePageData() {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const encodedData = urlParams.get("data")

    if (!encodedData) {
      console.log("Modo preview - usando datos de ejemplo")
      return getDefaultData()
    }

    const jsonString = atob(encodedData.replace(/-/g, "+").replace(/_/g, "/"))
    const pageData = JSON.parse(jsonString)
    console.log("Datos decodificados:", pageData)
    return pageData
  } catch (error) {
    console.error("Error decodificando datos:", error)
    return getDefaultData()
  }
}

function getDefaultData() {
  return {
    titulo: "Conecta con los mejores profesionales",
    subtitulo: "Encuentra soluciones de calidad con nuestra red de expertos",
    descripcion:
      "Samurai es la plataforma que conecta clientes con freelancers excepcionales. Inspirados en la filosofía del samurai: excelencia, honor y maestría profesional.",
    pais: "Colombia",
    idioma: "es",
    estadisticas: {
      samurais: "500+",
      proyectos: "1,200+",
      satisfaccion: "4.9",
    },
    caracteristicas: ["Perfiles verificados", "Asistencia con IA", "Pagos seguros", "Soporte 24/7"],
    testimonios: [
      {
        nombre: "María González",
        cargo: "Directora de Marketing",
        texto: "Encontré al desarrollador perfecto para mi proyecto en menos de 24 horas.",
        rating: 5,
      },
      {
        nombre: "Carlos Mendoza",
        cargo: "Freelancer UI/UX",
        texto: "Samurai me ha conectado con clientes increíbles. La plataforma es intuitiva y profesional.",
        rating: 5,
      },
    ],
  }
}

// Initialize page data
let pageData = {}

// Testimonials carousel
let currentTestimonial = 0
let testimonialInterval

function initTestimonialsCarousel() {
  const track = document.getElementById("testimonials-track")
  const dotsContainer = document.getElementById("carousel-dots")

  if (!pageData.testimonios || pageData.testimonios.length === 0) return

  // Create testimonial cards
  track.innerHTML = pageData.testimonios
    .map(
      (testimonial) => `
    <div class="testimonial-card">
      <div class="testimonial-text">"${testimonial.texto}"</div>
      <div class="testimonial-author">
        <div class="author-info">
          <h4>${testimonial.nombre}</h4>
          <p>${testimonial.cargo}</p>
          <div class="rating">
            ${Array(testimonial.rating)
              .fill()
              .map(() => '<span class="star">★</span>')
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join("")

  // Create dots
  dotsContainer.innerHTML = pageData.testimonios
    .map((_, index) => `<div class="dot ${index === 0 ? "active" : ""}" onclick="goToTestimonial(${index})"></div>`)
    .join("")

  // Auto-rotate testimonials
  startTestimonialRotation()
}

function goToTestimonial(index) {
  currentTestimonial = index
  const track = document.getElementById("testimonials-track")
  const dots = document.querySelectorAll(".dot")

  track.style.transform = `translateX(-${index * 100}%)`

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index)
  })

  // Restart auto-rotation
  clearInterval(testimonialInterval)
  startTestimonialRotation()
}

function startTestimonialRotation() {
  if (!pageData.testimonios || pageData.testimonios.length <= 1) return

  testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % pageData.testimonios.length
    goToTestimonial(currentTestimonial)
  }, 5000)
}

// Animated counters
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseFloat(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        if (target === 4.9) {
          counter.textContent = Math.min(current, target).toFixed(1)
        } else {
          counter.textContent = Math.floor(Math.min(current, target))
        }
        requestAnimationFrame(updateCounter)
      } else {
        if (target === 4.9) {
          counter.textContent = target.toFixed(1)
        } else {
          counter.textContent = Math.floor(target)
        }
      }
    }

    updateCounter()
  })
}

// Smooth scrolling
function initSmoothScrolling() {
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
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Trigger counter animation for stats section
        if (entry.target.classList.contains("stats")) {
          animateCounters()
        }
      }
    })
  }, observerOptions)

  // Observe sections for fade-in animation
  document.querySelectorAll(".stats, .features, .testimonials, .cta").forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)
  })
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-menu-toggle")
  const nav = document.querySelector(".nav")

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active")
      toggle.classList.toggle("active")
    })
  }
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)"
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.boxShadow = "none"
    }
  })
}

// Update page content with decoded data
function updatePageContent() {
  // Update hero section
  document.getElementById("hero-title").textContent = pageData.titulo
  document.getElementById("hero-subtitle").textContent = pageData.subtitulo
  document.getElementById("hero-description").textContent = pageData.descripcion

  // Update statistics
  const statNumbers = document.querySelectorAll(".stat-number")
  if (pageData.estadisticas) {
    statNumbers[0].setAttribute("data-target", pageData.estadisticas.samurais.replace("+", ""))
    statNumbers[1].setAttribute("data-target", pageData.estadisticas.proyectos.replace("+", ""))
    statNumbers[2].setAttribute("data-target", pageData.estadisticas.satisfaccion)
  }

  // Update features if provided
  if (pageData.caracteristicas && pageData.caracteristicas.length > 0) {
    const featureCards = document.querySelectorAll(".feature-card h3")
    pageData.caracteristicas.forEach((caracteristica, index) => {
      if (featureCards[index]) {
        featureCards[index].textContent = caracteristica
      }
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Decode page data
  pageData = decodePageData()

  // Update content with decoded data
  updatePageContent()

  // Initialize all functionality
  initTestimonialsCarousel()
  initSmoothScrolling()
  initScrollAnimations()
  initMobileMenu()
  initHeaderScroll()

  // Add some delay before showing animations
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)
})

// Handle window resize
window.addEventListener("resize", () => {
  // Recalculate testimonial positions if needed
  if (currentTestimonial > 0) {
    const track = document.getElementById("testimonials-track")
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`
  }
})

// Add loading state
document.body.style.opacity = "0"
document.body.style.transition = "opacity 0.3s ease"

window.addEventListener("load", () => {
  document.body.style.opacity = "1"
})
