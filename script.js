function decodeUserData() {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const encodedData = urlParams.get("data")

    if (!encodedData) {
      return getDefaultData()
    }

    const jsonString = atob(encodedData.replace(/-/g, "+").replace(/_/g, "/"))
    const userData = JSON.parse(jsonString)
    return userData
  } catch (error) {
    console.error("Error decodificando datos:", error)
    return getDefaultData()
  }
}

function getDefaultData() {
  return {
    nome: "Diego Martínez",
    cargo: "Motion Graphics Designer",
    descricao:
      "Artista digital especializado en animación y efectos visuales. Transformo conceptos en experiencias visuales memorables que cautivan audiencias.",
    foto: "https://via.placeholder.com/300/635BFF/FFFFFF?text=DM",
    habilidades: [
      "After Effects",
      "Cinema 4D",
      "Blender",
      "Illustrator",
      "Photoshop",
      "Premiere Pro",
      "DaVinci Resolve",
      "3D Animation",
    ],
    score: "4.7",
    projetos: "42",
    whatsapp: "+52 55 1234 5678",
  }
}

let userData = {}

function renderProfile() {
  // Actualizar foto de perfil
  const profilePhoto = document.querySelector(".profile-photo")
  if (profilePhoto && userData.foto) {
    profilePhoto.src = userData.foto
    profilePhoto.alt = `Foto de ${userData.nome}`
  }

  // Actualizar información básica
  const profileName = document.querySelector(".profile-name")
  if (profileName && userData.nome) {
    profileName.textContent = userData.nome
  }

  const profileTitle = document.querySelector(".profile-title")
  if (profileTitle && userData.cargo) {
    profileTitle.textContent = userData.cargo
  }

  const profileDescription = document.querySelector(".profile-description")
  if (profileDescription && userData.descricao) {
    profileDescription.textContent = userData.descricao
  }

  // Renderizar métricas
  renderMetrics()

  // Renderizar habilidades
  renderSkills()

  // Configurar contacto
  setupContact()
}

function renderMetrics() {
  const scoreElement = document.querySelector(".metric-value.score")
  const projectsElement = document.querySelector(".metric-value.projects")

  if (scoreElement && userData.score) {
    scoreElement.textContent = userData.score
  }

  if (projectsElement && userData.projetos) {
    projectsElement.textContent = userData.projetos
  }
}

function renderSkills() {
  const skillsGrid = document.querySelector(".skills-artistic-grid")
  if (!skillsGrid || !userData.habilidades) return

  skillsGrid.innerHTML = ""

  userData.habilidades.forEach((skill) => {
    const badge = document.createElement("span")
    badge.className = "skill-badge-artistic"
    badge.textContent = skill
    skillsGrid.appendChild(badge)
  })
}

function setupContact() {
  const whatsappBtn = document.querySelector(".whatsapp-artistic-btn")
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

document.addEventListener("DOMContentLoaded", () => {
  try {
    userData = decodeUserData()
    renderProfile()
  } catch (error) {
    console.error("Error en la aplicación:", error)

    const container = document.querySelector(".poster-container")
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <h3>Error al cargar el poster</h3>
          <p>Ha ocurrido un error al cargar la información del perfil.</p>
        </div>
      `
    }
  }
})
