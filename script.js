// Variables globales mínimas
let userData = {};

// Decodificación ultra rápida
function decodeData() {
  try {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");
    
    if (!data) return getDefault();
    
    const json = atob(data.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch (e) {
    console.error("Error:", e);
    return getDefault();
  }
}

// Datos por defecto mínimos
function getDefault() {
  return {
    nome: "Ana García",
    cargo: "Diseñadora UI/UX",
    descricao: "Especialista en crear experiencias digitales excepcionales con más de 7 años de experiencia.",
    foto: "",
    imagemDestaque: "",
    habilidades: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems"],
    score: "4.9",
    projetos: "28",
    experiencia: "7",
    cidade: "Bogotá",
    pais: "Colombia"
  };
}

// Actualización ultra rápida del DOM
function updateContent() {
  // Textos básicos
  document.getElementById('name').textContent = userData.nome || "Nombre";
  document.getElementById('title').textContent = userData.cargo || "Título";
  document.getElementById('description').textContent = userData.descricao || "Descripción";
  document.getElementById('score').textContent = userData.score || "0";
  document.getElementById('projects').textContent = userData.projetos || "0";
  document.getElementById('experience').textContent = userData.experiencia || "0";
  
  // Ubicación
  const loc = document.getElementById('location');
  const ciudad = userData.cidade || "";
  const pais = userData.pais || "";
  if (ciudad && pais) {
    loc.textContent = `📍 ${ciudad}, ${pais}`;
  } else if (ciudad || pais) {
    loc.textContent = `📍 ${ciudad || pais}`;
  }
  
  // Avatar
  updateAvatar();
  
  // Banner
  updateBanner();
  
  // Skills
  updateSkills();
}

// Avatar ultra simple
function updateAvatar() {
  const avatar = document.getElementById('avatar');
  if (userData.foto && userData.foto.trim()) {
    avatar.src = userData.foto;
    avatar.alt = userData.nome || 'Perfil';
  } else {
    const initials = getInitials(userData.nome || "U");
    avatar.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23667eea'/%3E%3Ctext x='50' y='58' text-anchor='middle' font-size='28' fill='white' font-weight='600'%3E${initials}%3C/text%3E%3C/svg%3E`;
  }
}

// Banner ultra simple
function updateBanner() {
  if (userData.imagemDestaque && userData.imagemDestaque.trim()) {
    document.getElementById('hero').style.backgroundImage = `url('${userData.imagemDestaque}')`;
  }
}

// Skills ultra simples
function updateSkills() {
  const container = document.getElementById('skillsList');
  if (!userData.habilidades || !userData.habilidades.length) {
    container.innerHTML = '<p style="color:#64748b;text-align:center">No hay habilidades</p>';
    return;
  }
  
  container.innerHTML = userData.habilidades
    .map(skill => `<span class="skill">${skill}</span>`)
    .join('');
}

// Iniciales ultra rápidas
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
}

// Ocultar loading ultra rápido
function hideLoading() {
  const loading = document.getElementById('loading');
  const container = document.getElementById('container');
  loading.style.display = 'none';
  container.classList.add('loaded');
}

// Optimizaciones WebView ultra rápidas
function optimize() {
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.overflowX = 'hidden';
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('contextmenu', e => e.preventDefault());
}

// Inicialización ultra rápida
function init() {
  try {
    userData = decodeData();
    updateContent();
    optimize();
    setTimeout(hideLoading, 200);
  } catch (e) {
    console.error('Error init:', e);
    hideLoading();
  }
}

// Evento mínimo
document.addEventListener('DOMContentLoaded', init);
