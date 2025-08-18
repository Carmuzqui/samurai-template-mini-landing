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

// Datos por defecto modernos
function getDefault() {
  return {
    nome: "Ana García",
    cargo: "UI/UX Designer",
    descricao: "Creando experiencias digitales excepcionales que conectan usuarios con productos de manera intuitiva y memorable.",
    foto: "",
    imagemDestaque: "",
    habilidades: ["Figma", "Sketch", "Prototyping", "Design Systems", "User Research", "Adobe XD"],
    score: "4.9",
    projetos: "28",
    experiencia: "7",
    cidade: "Bogotá",
    pais: "Colombia"
  };
}

// Actualización ultra rápida con efectos
function updateContent() {
  // Textos básicos
  document.getElementById('name').textContent = userData.nome || "Nombre";
  document.getElementById('title').textContent = userData.cargo || "Título";
  document.getElementById('description').textContent = userData.descricao || "Descripción";
  document.getElementById('score').textContent = userData.score || "0";
  document.getElementById('projects').textContent = userData.projetos || "0";
  document.getElementById('experience').textContent = userData.experiencia || "0";
  
  // Ubicación con emoji dinámico
  updateLocation();
  
  // Avatar con efecto
  updateAvatar();
  
  // Banner dinámico
  updateBanner();
  
  // Skills holográficos
  updateSkills();
}

// Ubicación con emoji por país
function updateLocation() {
  const loc = document.getElementById('location');
  const ciudad = userData.cidade || "";
  const pais = userData.pais || "";
  
  // Emojis por país
  const countryEmojis = {
    'Colombia': '🇨🇴',
    'Brasil': '🇧🇷',
    'Brazil': '🇧🇷',
    'Peru': '🇵🇪',
    'Perú': '🇵🇪',
    'Ecuador': '🇪🇨',
    'México': '🇲🇽',
    'Mexico': '🇲🇽',
    'Argentina': '🇦🇷',
    'Chile': '🇨🇱'
  };
  
  const emoji = countryEmojis[pais] || '📍';
  
  if (ciudad && pais) {
    loc.textContent = `${emoji} ${ciudad}, ${pais}`;
  } else if (ciudad || pais) {
    loc.textContent = `${emoji} ${ciudad || pais}`;
  } else {
    loc.textContent = '📍 Ubicación';
  }
}

// Avatar con iniciales modernas
function updateAvatar() {
  const avatar = document.getElementById('avatar');
  if (userData.foto && userData.foto.trim()) {
    avatar.src = userData.foto;
    avatar.alt = userData.nome || 'Perfil';
  } else {
    const initials = getInitials(userData.nome || "U");
    // SVG con gradiente moderno
    avatar.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='45' cy='45' r='45' fill='url(%23grad)'/%3E%3Ctext x='45' y='52' text-anchor='middle' font-size='24' fill='white' font-weight='600'%3E${initials}%3C/text%3E%3C/svg%3E`;
  }
}

// Banner con efecto dinámico
function updateBanner() {
  if (userData.imagemDestaque && userData.imagemDestaque.trim()) {
    const bg = document.getElementById('bgPattern');
    bg.style.backgroundImage = `url('${userData.imagemDestaque}')`;
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center';
  }
}

// Skills con efecto holográfico
function updateSkills() {
  const container = document.getElementById('skillsGrid');
  if (!userData.habilidades || !userData.habilidades.length) {
    container.innerHTML = '<p style="color:rgba(255,255,255,.8);text-align:center;font-size:.9rem">No hay habilidades disponibles</p>';
    return;
  }
  
  container.innerHTML = userData.habilidades
    .map(skill => `<span class="skill-holo">${skill}</span>`)
    .join('');
}

// Iniciales ultra rápidas
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
}

// Ocultar loading con efecto
function hideLoading() {
  const loading = document.getElementById('loading');
  const container = document.getElementById('container');
  loading.style.opacity = '0';
  setTimeout(() => {
    loading.style.display = 'none';
    container.classList.add('loaded');
  }, 200);
}

// Optimizaciones WebView
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
    setTimeout(hideLoading, 300);
  } catch (e) {
    console.error('Error init:', e);
    hideLoading();
  }
}

// Evento mínimo
document.addEventListener('DOMContentLoaded', init);
