// Global variables
let userData = {};
let isLoaded = false;

// Optimized data decoding with better error handling
function decodeUserData() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");

    console.log('🔍 URL Params:', { encodedData: !!encodedData });

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
    nome: "Ana García",
    cargo: "Diseñadora UI/UX Senior",
    descricao: "Especialista en crear experiencias digitales excepcionales con más de 7 años transformando ideas en interfaces intuitivas y atractivas que conectan con los usuarios.",
    foto: "https://via.placeholder.com/200/635BFF/FFFFFF?text=AG",
    habilidades: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems", "HTML/CSS", "React"],
    score: "4.9",
    projetos: "28",
    whatsapp: "+57 300 123 4567",
  };
}

// Optimized profile rendering with batch DOM updates
function renderProfile() {
  try {
    console.log('🎨 Renderizando perfil...');

    // Update profile photo with optimized loading
    updateProfilePhoto();

    // Batch text updates for better performance
    const textUpdates = [
      { selector: '.profile-name', content: userData.nome || "Nombre no disponible" },
      { selector: '.profile-title', content: userData.cargo || "Cargo no disponible" },
      { selector: '.profile-description', content: userData.descricao || "Descripción no disponible" }
    ];

    textUpdates.forEach(update => {
      const element = document.querySelector(update.selector);
      if (element) {
        element.textContent = update.content;
      }
    });

    // Update metrics
    updateMetrics();

    // Render skills with optimized animation
    renderSkills();

    // Setup WhatsApp contact
    setupWhatsAppContact();

    console.log('✅ Perfil renderizado correctamente');
  } catch (error) {
    console.error('❌ Error renderizando perfil:', error);
    handleError(error);
  }
}

// Optimized photo update with preloading and fallback
function updateProfilePhoto() {
  const profilePhoto = document.querySelector(".profile-photo");
  if (!profilePhoto) return;

  if (userData.foto && userData.foto.trim() !== '') {
    // Preload image for better UX
    const img = new Image();
    img.onload = function() {
      profilePhoto.src = userData.foto;
      profilePhoto.alt = `Foto de ${userData.nome || 'perfil'}`;
    };
    img.onerror = function() {
      console.warn("⚠️ Error cargando foto, usando placeholder");
      setPlaceholderPhoto(profilePhoto);
    };
    img.src = userData.foto;
  } else {
    setPlaceholderPhoto(profilePhoto);
  }
}

// Set placeholder photo with initials
function setPlaceholderPhoto(photoElement) {
  const name = userData.nome || "Usuario";
  const initials = getInitials(name);
  
  // Create optimized SVG placeholder
  const svgPlaceholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Ccircle cx='90' cy='90' r='90' fill='%23635bff'/%3E%3Ctext x='90' y='100' text-anchor='middle' font-size='50' fill='white' font-family='Inter, sans-serif' font-weight='600'%3E${initials}%3C/text%3E%3C/svg%3E`;
  
  photoElement.src = svgPlaceholder;
  photoElement.alt = `Iniciales de ${name}`;
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

// Update metrics with validation
function updateMetrics() {
  const scoreElement = document.querySelector(".metric-value.score");
  const projectsElement = document.querySelector(".metric-value.projects");

  if (scoreElement && userData.score) {
    scoreElement.textContent = userData.score;
  }

  if (projectsElement && userData.projetos) {
    projectsElement.textContent = userData.projetos;
  }
}

// Optimized skills rendering with staggered animation
function renderSkills() {
  const skillsGrid = document.querySelector(".skills-grid");
  if (!skillsGrid || !userData.habilidades || !Array.isArray(userData.habilidades)) {
    if (skillsGrid) {
      skillsGrid.innerHTML = '<p style="color: #666; text-align: center;">No hay habilidades disponibles</p>';
    }
    return;
  }

  // Create skills HTML in one operation
  const skillsHTML = userData.habilidades
    .map(skill => `<span class="skill-badge">${skill}</span>`)
    .join('');
  
  skillsGrid.innerHTML = skillsHTML;

  // Add staggered fade-in animation
  const skillBadges = skillsGrid.querySelectorAll(".skill-badge");
  skillBadges.forEach((badge, index) => {
    setTimeout(() => {
      badge.style.transition = "all 0.3s ease";
      badge.style.opacity = "1";
      badge.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Setup WhatsApp contact button with optimized URL generation
function setupWhatsAppContact() {
  const whatsappBtn = document.querySelector(".whatsapp-btn");
  if (!whatsappBtn) return;

  if (userData.whatsapp && userData.whatsapp.trim() !== '') {
    whatsappBtn.style.display = "inline-flex";
    
    // Pre-generate WhatsApp URL for better performance
    const cleanPhone = userData.whatsapp.replace(/\D/g, "");
    const message = encodeURIComponent(`Hola ${userData.nome || 'profesional'}, me interesa contactarte para un proyecto.`);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    
    whatsappBtn.addEventListener("click", () => {
      window.open(whatsappUrl, "_blank");
    });
  } else {
    whatsappBtn.style.display = "none";
  }
}

// Optimized metrics animation with requestAnimationFrame
function animateMetrics() {
  const scoreElement = document.querySelector(".metric-value.score");
  const projectsElement = document.querySelector(".metric-value.projects");

  if (scoreElement && userData.score) {
    animateNumber(scoreElement, 0, parseFloat(userData.score), 1000, true);
  }

  if (projectsElement && userData.projetos) {
    animateNumber(projectsElement, 0, parseInt(userData.projetos), 1500, false);
  }
}

// Optimized number animation with easing
function animateNumber(element, start, end, duration, isDecimal) {
  const startTime = performance.now();
  const originalText = element.textContent;

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = start + (end - start) * easeOutCubic(progress);

    if (isDecimal) {
      element.textContent = current.toFixed(1);
    } else {
      element.textContent = Math.floor(current).toString();
    }

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = originalText;
    }
  }

  requestAnimationFrame(updateNumber);
}

// Easing function for smooth animations
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Optimized scroll animations with Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Trigger metrics animation for metrics section
        if (entry.target.classList.contains("profile-metrics")) {
          setTimeout(animateMetrics, 300);
        }

        // Stop observing once visible for better performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for animations
  document.querySelectorAll(".profile-metrics, .profile-skills, .profile-contact").forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });
}

// Enhanced error handling
function handleError(error) {
  console.error("❌ Error en la aplicación:", error);

  const container = document.querySelector(".profile-container");
  const errorState = document.getElementById("errorState");
  
  if (container && errorState) {
    // Hide main content and show error state
    container.style.display = "none";
    errorState.style.display = "block";
  }
}

// Hide loading screen with smooth transition
function hideLoading() {
  const loading = document.getElementById('loading');
  const container = document.getElementById('profileContainer');
  
  if (loading && container) {
    loading.style.opacity = '0';
    setTimeout(() => {
      loading.style.display = 'none';
      container.style.display = 'block';
    }, 300);
  }
}

// Optimize for WebView performance
function optimizeForWebView() {
  // Disable text selection for better UX
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  
  // Optimize scrolling
  document.body.style.overflowX = 'hidden';
  document.body.style.webkitOverflowScrolling = 'touch';
  
  // Prevent zoom gestures
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('gesturechange', e => e.preventDefault());
  document.addEventListener('gestureend', e => e.preventDefault());
  
  // Optimize images for WebView
  document.querySelectorAll('img').forEach(img => {
    img.style.imageRendering = 'auto';
    img.loading = 'lazy';
  });
  
  console.log('🚀 Optimizaciones para WebView aplicadas');
}

// Performance optimization: Preload images
function preloadImages() {
  if (userData.foto && userData.foto.trim() !== '') {
    const img = new Image();
    img.src = userData.foto;
  }
}

// Main initialization function
function initializeApp() {
  try {
    console.log('�� Inicializando aplicación...');

    // Show loading state
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.3s ease";

    // Decode user data
    userData = decodeUserData();

    // Render profile with decoded data
    renderProfile();

    // Initialize scroll animations
    initScrollAnimations();

    // Optimize for WebView
    optimizeForWebView();

    // Preload images
    setTimeout(preloadImages, 500);

    // Show the page with smooth transition
    setTimeout(() => {
      hideLoading();
      document.body.style.opacity = "1";
      document.body.classList.add("loaded");
    }, 800);

    isLoaded = true;
    console.log('✅ Aplicación inicializada correctamente');

  } catch (error) {
    console.error('❌ Error inicializando aplicación:', error);
    handleError(error);
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", initializeApp);

// Handle window resize for responsive adjustments
window.addEventListener("resize", () => {
  if (isLoaded) {
    // Re-trigger skills animation on layout changes
    const skillsGrid = document.querySelector(".skills-grid");
    if (skillsGrid) {
      const badges = skillsGrid.querySelectorAll(".skill-badge");
      badges.forEach((badge) => {
        badge.style.transition = "all 0.3s ease";
      });
    }
  }
});

// Handle page load completion
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Handle visibility change for performance optimization
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log('👁️ Página oculta - pausando animaciones');
  } else {
    console.log('👁️ Página visible - reanudando animaciones');
  }
});

// Global error handling
window.addEventListener("error", (e) => {
  console.error('❌ Error global:', e.error);
  if (!isLoaded) {
    handleError(e.error);
  }
});

// Prevent context menu for better UX in WebView
document.addEventListener('contextmenu', e => e.preventDefault());

console.log('📋 Script cargado - Esperando DOM...');
