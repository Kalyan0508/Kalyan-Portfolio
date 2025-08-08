// Modern Tech Portfolio JavaScript
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupAnimations();
    this.setupParticles();
    this.setupFormHandling();
    this.setupLoadingScreen();
  }

  // Theme Management
  setupTheme() {
    const darkToggle = document.getElementById('dark-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    this.setTheme(savedTheme);
    
    if (darkToggle) {
      darkToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
      });
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const darkToggle = document.getElementById('dark-toggle');
    if (darkToggle) {
      if (theme === 'dark') {
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkToggle.style.color = '#ffd700';
      } else {
        darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkToggle.style.color = '#00d4ff';
      }
    }
    
    // Update body background for smooth transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }

  // Navigation
  setupNavigation() {
    const menuToggle = document.querySelector('.fa-bars');
    const menuClose = document.querySelector('.fa-times');
    const sidemenu = document.getElementById('sidemenu');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        sidemenu.classList.add('open');
      });
    }

    if (menuClose) {
      menuClose.addEventListener('click', () => {
        sidemenu.classList.remove('open');
      });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      }
    });
  }

  // Animations
  setupAnimations() {
// Tab switching
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");
    
function opentab(tabname) {
  for (let tablink of tablinks) tablink.classList.remove("active-link");
  for (let tabcontent of tabcontents) tabcontent.classList.remove("active-tab");
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

    // Make opentab globally available
    window.opentab = opentab;

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.project-card, .cert-card, .position-card, .section').forEach(el => {
      el.classList.add('scroll-animate');
      observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
      }
    });

    // Typing effect for hero title
    this.setupTypingEffect();
  }

  setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 500);
  }

  // Particle System
  setupParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  // Form Handling
  setupFormHandling() {
    const form = document.querySelector('form[action*="formspree"]');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          this.showNotification('Message sent successfully!', 'success');
          form.reset();
  } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        this.showNotification('Failed to send message. Please try again.', 'error');
        console.error('Form submission error:', error);
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
    });

    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  // Loading Screen
  setupLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);

    // Remove loading screen after page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(loading);
        }, 500);
      }, 1000);
    });
  }

  // Utility functions
  debounce(func, wait) {
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

  // Add hover effects to cards
  setupCardEffects() {
    document.querySelectorAll('.project-card, .cert-card, .position-card').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', (e) => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Add cursor trail effect
  setupCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animate);
    }
    animate();
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Add some CSS for the cursor trail
const style = document.createElement('style');
style.textContent = `
  .cursor-trail {
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(0, 212, 255, 0.3);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
  }
`;
document.head.appendChild(style);
// --- SIDEBAR HAMBURGER for mobile ---
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger-menu');
  const sidemenu = document.getElementById('mobile-sidemenu');
  const sidemenuClose = document.getElementById('sidemenu-close');
  if (hamburger && sidemenu) {
    hamburger.addEventListener('click', function() {
      sidemenu.classList.add('open');
      document.body.style.overflow='hidden';
    });
  }
  if (sidemenuClose) {
    sidemenuClose.addEventListener('click', function() {
      sidemenu.classList.remove('open');
      document.body.style.overflow='';
    });
  }
  // Allow any link in the side menu to close sidebar when clicked
  window.closeSidemenu = function() {
    sidemenu.classList.remove('open');
    document.body.style.overflow='';
  };
  // Optional: close sidemenu if backdrop clicked
  sidemenu.addEventListener('click',e=>{
    if (e.target === sidemenu) {
      sidemenu.classList.remove('open');
      document.body.style.overflow='';
    }
  });
});
