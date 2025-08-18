function decodeUserData() {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const encodedData = urlParams.get("data")

    if (!encodedData) {
      console.log("Modo preview - usando datos de ejemplo")
      return getDefaultData()
    }

    const jsonString = atob(encodedData.replace(/-/g, "+").replace(/_/g, "/"))
    const userData = JSON.parse(jsonString)
    console.log("Datos decodificados:", userData)
    return userData
  } catch (error) {
    console.error("Error decodificando datos:", error)
    return getDefaultData()
  }
}

function getDefaultData() {
  return {
    nome: "Ana García",
    cargo: "Diseñadora UI/UX Senior",
    descricao:
      "Especialista en crear experiencias digitales excepcionales con más de 7 años transformando ideas en interfaces intuitivas y atractivas que conectan con los usuarios.",
    foto: "https://via.placeholder.com/200/635BFF/FFFFFF?text=AG",
    habilidades: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems", "HTML/CSS", "React"],
    score: "4.9",
    projetos: "28",
    whatsapp: "+57 300 123 4567",
  }
}

// Initialize user data
let userData = {}

// Render profile data
function renderProfile() {
  // Update profile photo
  const profilePhoto = document.querySelector(".profile-photo")
  if (profilePhoto && userData.foto) {
    profilePhoto.src = userData.foto
    profilePhoto.alt = `Foto de ${userData.nome}`
  }

  // Update profile name
  const profileName = document.querySelector(".profile-name")
  if (profileName && userData.nome) {
    profileName.textContent = userData.nome
  }

  // Update profile title
  const profileTitle = document.querySelector(".profile-title")
  if (profileTitle && userData.cargo) {
    profileTitle.textContent = userData.cargo
  }

  // Update profile description
  const profileDescription = document.querySelector(".profile-description")
  if (profileDescription && userData.descricao) {
    profileDescription.textContent = userData.descricao
  }

  // Update score metric
  const scoreElement = document.querySelector(".metric-value.score")
  if (scoreElement && userData.score) {
    scoreElement.textContent = userData.score
  }

  // Update projects metric
  const projectsElement = document.querySelector(".metric-value.projects")
  if (projectsElement && userData.projetos) {
    projectsElement.textContent = userData.projetos
  }

  // Render skills
  renderSkills()

  // Setup WhatsApp contact
  setupWhatsAppContact()
}

// Render skills grid
function renderSkills() {
  const skillsGrid = document.querySelector(".skills-grid")
  if (!skillsGrid || !userData.habilidades) return

  skillsGrid.innerHTML = userData.habilidades.map((skill) => `<span class="skill-badge">${skill}</span>`).join("")

  // Add fade-in animation to skills
  const skillBadges = skillsGrid.querySelectorAll(".skill-badge")
  skillBadges.forEach((badge, index) => {
    badge.style.opacity = "0"
    badge.style.transform = "translateY(20px)"
    setTimeout(() => {
      badge.style.transition = "all 0.3s ease"
      badge.style.opacity = "1"
      badge.style.transform = "translateY(0)"
    }, index * 100)
  })
}

// Setup WhatsApp contact button
function setupWhatsAppContact() {
  const whatsappBtn = document.querySelector(".whatsapp-btn")
  if (!whatsappBtn) return

  if (userData.whatsapp) {
    whatsappBtn.style.display = "inline-flex"
    whatsappBtn.addEventListener("click", () => {
      const message = encodeURIComponent(`Hola ${userData.nome}, me interesa contactarte para un proyecto.`)
      const whatsappUrl = `https://wa.me/${userData.whatsapp.replace(/\D/g, "")}?text=${message}`
      window.open(whatsappUrl, "_blank")
    })
  } else {
    whatsappBtn.style.display = "none"
  }
}

// Animate metrics on scroll
function animateMetrics() {
  const scoreElement = document.querySelector(".metric-value.score")
  const projectsElement = document.querySelector(".metric-value.projects")

  if (scoreElement && userData.score) {
    animateNumber(scoreElement, 0, Number.parseFloat(userData.score), 1000, true)
  }

  if (projectsElement && userData.projetos) {
    animateNumber(projectsElement, 0, Number.parseInt(userData.projetos), 1500, false)
  }
}

// Animate number counting
function animateNumber(element, start, end, duration, isDecimal) {
  const startTime = performance.now()
  const originalText = element.textContent

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const current = start + (end - start) * easeOutCubic(progress)

    if (isDecimal) {
      element.textContent = current.toFixed(1)
    } else {
      element.textContent = Math.floor(current).toString()
    }

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    } else {
      element.textContent = originalText
    }
  }

  requestAnimationFrame(updateNumber)
}

// Easing function
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
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

        // Trigger metrics animation
        if (entry.target.classList.contains("profile-metrics")) {
          setTimeout(animateMetrics, 300)
        }
      }
    })
  }, observerOptions)

  // Observe sections for animations
  document.querySelectorAll(".profile-metrics, .profile-skills, .profile-contact").forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)
  })
}

// Handle errors gracefully
function handleError(error) {
  console.error("Error en la aplicación:", error)

  const container = document.querySelector(".profile-container")
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <h3>Error al cargar el perfil</h3>
        <p>Ha ocurrido un error al cargar la información del perfil. Por favor, intenta nuevamente.</p>
      </div>
    `
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Show loading state
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.3s ease"

    // Decode user data
    userData = decodeUserData()

    // Render profile with decoded data
    renderProfile()

    // Initialize scroll animations
    initScrollAnimations()

    // Show the page
    setTimeout(() => {
      document.body.style.opacity = "1"
    }, 100)
  } catch (error) {
    handleError(error)
  }
})

// Handle window resize
window.addEventListener("resize", () => {
  // Recalculate any responsive elements if needed
  const skillsGrid = document.querySelector(".skills-grid")
  if (skillsGrid) {
    // Re-trigger skills animation on mobile layout changes
    const badges = skillsGrid.querySelectorAll(".skill-badge")
    badges.forEach((badge) => {
      badge.style.transition = "all 0.3s ease"
    })
  }
})

// Add loading state management
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Performance optimization: Preload images
function preloadImages() {
  if (userData.foto) {
    const img = new Image()
    img.src = userData.foto
  }
}

// Call preload after data is loaded
setTimeout(preloadImages, 500)
