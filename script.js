// Global variables
let userData = {};
let isLoaded = false;
let currentLanguage = 'pt_BR';

// Optimized data decoding
function decodeUserData() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");
    const lang = urlParams.get("lang");
    const userId = urlParams.get("userId");

    console.log('🔍 URL Params:', { 
      encodedData: !!encodedData, 
      lang, 
      userId 
    });

    // Set language
    if (lang) {
      currentLanguage = lang;
    }

    if (!encodedData) {
      console.log("📝 Modo preview - usando datos de ejemplo");
      return getDefaultData();
    }

    const jsonString = atob(encodedData.replace(/-/g, "+").replace(/_/g, "/"));
    const userData = JSON.parse(jsonString);
    console.log("✅ Datos decodificados:", userData);
    return userData;
  } catch (error) {
    console.error("❌ Error decodificando datos:", error);
    return getDefaultData();
  }
}

// Default data for preview/fallback
function getDefaultData() {
  return {
    nome: "Ana García Rodríguez",
    cargo: "Diseñadora UI/UX Senior",
    descricao: "Especialista en crear experiencias digitales excepcionales con más de 7 años transformando ideas en interfaces intuitivas y atractivas que conectan con los usuarios y generan resultados extraordinarios.",
    foto: "",
    imagemDestaque: "",
    habilidades: [
      "Figma", "Adobe XD", "Sketch", "Prototyping", 
      "User Research", "Design Systems", "HTML/CSS", 
      "React", "Vue.js", "Responsive Design"
    ],
    score: "4.9",
    projetos: "28",
    experiencia: "7",
    whatsapp: "+57 300 123 4567",
    cidade: "Bogotá",
    pais: "Colombia"
  };
}

// Update profile content with optimized DOM operations
function updateProfileContent() {
  try {
    console.log('🎨 Actualizando contenido del perfil...');

    // Batch text updates
    const textUpdates = [
      { id: 'profileName', content: userData.nome || "Nombre no disponible" },
      { id: 'profileTitle', content: userData.cargo || "Título profesional" },
      { id: 'aboutText', content: userData.descricao || "Descripción no disponible" },
      { id: 'statScore', content: userData.score || "0" },
      { id: 'statProjects', content: userData.projetos || "0" },
      { id: 'statExperience', content: userData.experiencia || "0" }
    ];

    textUpdates.forEach(update => {
      const element = document.getElementById(update.id);
      if (element) {
        element.textContent = update.content;
      }
    });

    // Update location
    updateLocation();

    // Update images
    updateProfileImages();

    // Update skills
    updateSkills();

    // Update WhatsApp button
    updateWhatsAppButton();

    console.log('✅ Contenido actualizado correctamente');
  } catch (error) {
    console.error('❌ Error actualizando contenido:', error);
    showErrorState();
  }
}

// Update location display
function updateLocation() {
  const locationElement = document.getElementById('profileLocation');
  if (locationElement) {
    const ciudad = userData.cidade || "";
    const pais = userData.pais || "";
    let locationText = "Ubicación";
    
    if (ciudad && pais) {
      locationText = `${ciudad}, ${pais}`;
    } else if (ciudad) {
      locationText = ciudad;
    } else if (pais) {
      locationText = pais;
    }
    
    const span = locationElement.querySelector('span');
    if (span) {
      span.textContent = locationText;
    }
  }
}

// Update profile images with optimized loading
function updateProfileImages() {
  updateProfileAvatar();
  updateHeroBanner();
}

// Update profile avatar
function updateProfileAvatar() {
  const avatarElement = document.getElementById('profileAvatar');
  if (!avatarElement) return;

  if (userData.foto && userData.foto.trim() !== '') {
    const img = new Image();
    img.onload = function() {
      avatarElement.src = userData.foto;
      avatarElement.alt = `Foto de ${userData.nome || 'perfil'}`;
    };
    img.onerror = function() {
      console.warn("⚠️ Error cargando foto de perfil");
      setPlaceholderAvatar(avatarElement);
    };
    img.src = userData.foto;
  } else {
    setPlaceholderAvatar(avatarElement);
  }
}

// Update hero banner with imagemDestaque
function updateHeroBanner() {
  const bannerElement = document.getElementById('heroBanner');
  if (!bannerElement) return;

  if (userData.imagemDestaque && userData.imagemDestaque.trim() !== '') {
    const img = new Image();
    img.onload = function() {
      bannerElement.style.backgroundImage = `url('${userData.imagemDestaque}')`;
      console.log('✅ Banner actualizado con imagemDestaque');
    };
    img.onerror = function() {
      console.warn("⚠️ Error cargando imagen de destaque, usando gradiente por defecto");
    };
    img.src = userData.imagemDestaque;
  }
}

// Set placeholder avatar with initials
function setPlaceholderAvatar(avatarElement) {
  const name = userData.nome || "Usuario";
  const initials = getInitials(name);
  
  const svgPlaceholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%23667eea'/%3E%3Ctext x='60' y='70' text-anchor='middle' font-size='36' fill='white' font-family='Inter, sans-serif' font-weight='600'%3E${initials}%3C/text%3E%3C/svg%3E`;
  
  avatarElement.src = svgPlaceholder;
  avatarElement.alt = `Iniciales de ${name}`;
}

// Get initials from name
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// Update skills with staggered animation
function updateSkills() {
  const skillsContainer = document.getElementById('skillsGrid');
  if (!skillsContainer) return;

  if (!userData.habilidades || !Array.isArray(userData.habilidades)) {
    skillsContainer.innerHTML = '<p style="color: #64748b; text-align: center; width: 100%;">No hay habilidades disponibles</p>';
    return;
  }

  // Create skills HTML
  const skillsHTML = userData.habilidades
    .map(skill => `<span class="skill-badge">${skill}</span>`)
    .join('');
  
  skillsContainer.innerHTML = skillsHTML;

  // Add staggered animation
  const skillBadges = skillsContainer.querySelectorAll('.skill-badge');
  skillBadges.forEach((badge, index) => {
    setTimeout(() => {
      badge.classList.add('visible');
    }, index * 100);
  });
}

// Update WhatsApp button
function updateWhatsAppButton() {
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (!whatsappBtn) return;

  if (userData.whatsapp && userData.whatsapp.trim() !== '') {
    const cleanPhone = userData.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(`Hola ${userData.nome || 'profesional'}, vi tu perfil en Samurai y me interesa contactarte para un proyecto.`);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    
    whatsappBtn.onclick = () => window.open(whatsappUrl, '_blank');
    whatsappBtn.style.display = 'inline-flex';
  } else {
    whatsappBtn.style.display = 'none';
  }
}

// Animate stats with smooth counting
function animateStats() {
  const statsElements = [
    { id: 'statScore', target: parseFloat(userData.score) || 0, isDecimal: true },
    { id: 'statProjects', target: parseInt(userData.projetos) || 0, isDecimal: false },
    { id: 'statExperience', target: parseInt(userData.experiencia) || 0, isDecimal: false }
  ];

  statsElements.forEach(stat => {
    const element = document.getElementById(stat.id);
    if (element) {
      animateValue(element, 0, stat.target, 1500, stat.isDecimal);
    }
  });
}

// Generic value animation
function animateValue(element, start, end, duration, isDecimal) {
  const startTime = performance.now();
  
  function updateValue(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + (end - start) * easedProgress;
    
    if (isDecimal) {
      element.textContent = currentValue.toFixed(1);
    } else {
      element.textContent = Math.floor(currentValue).toString();
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateValue);
    }
  }
  
  requestAnimationFrame(updateValue);
}

// Initialize scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger stats animation
        if (entry.target.classList.contains('stats-section')) {
          setTimeout(animateStats, 300);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections
  document.querySelectorAll('.stats-section, .about-section, .skills-section, .contact-section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
}

// Show error state
function showErrorState() {
  document.getElementById('profileContainer').style.display = 'none';
  document.getElementById('errorState').style.display = 'flex';
  hideLoading();
}

// Hide loading screen
function hideLoading() {
  const loading = document.getElementById('loading');
  const container = document.getElementById('profileContainer');
  
  loading.style.opacity = '0';
  setTimeout(() => {
    loading.style.display = 'none';
    container.style.display = 'block';
    container.classList.add('loaded');
  }, 300);
}

// Optimize for WebView
function optimizeForWebView() {
  // Disable text selection
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  
  // Optimize scrolling
  document.body.style.overflowX = 'hidden';
  document.body.style.webkitOverflowScrolling = 'touch';
  
  // Prevent zoom gestures
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('gesturechange', e => e.preventDefault());
  document.addEventListener('gestureend', e => e.preventDefault());
  
  // Optimize images
  document.querySelectorAll('img').forEach(img => {
    img.style.imageRendering = 'auto';
    img.loading = 'lazy';
  });
  
  console.log('🚀 Optimizaciones para WebView aplicadas');
}

// Main initialization
function initializeApp() {
  try {
    console.log('📱 Inicializando aplicación...');

    // Decode user data
    userData = decodeUserData();

    // Update content
    updateProfileContent();

    // Initialize animations
    initScrollAnimations();

    // Optimize for WebView
    optimizeForWebView();

    // Hide loading and show content
    setTimeout(() => {
      hideLoading();
    }, 1000);

    isLoaded = true;
    console.log('✅ Aplicación inicializada correctamente');

  } catch (error) {
    console.error('❌ Error inicializando aplicación:', error);
    showErrorState();
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('👁️ Página oculta');
  } else {
    console.log('👁️ Página visible');
  }
});

// Global error handling
window.addEventListener('error', (e) => {
  console.error('❌ Error global:', e.error);
  if (!isLoaded) {
    showErrorState();
  }
});

// Prevent context menu
document.addEventListener('contextmenu', e => e.preventDefault());

console.log('📋 Script cargado - Esperando DOM...');
