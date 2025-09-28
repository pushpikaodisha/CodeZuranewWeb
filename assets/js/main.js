// ===================================
// Main JavaScript File
// ===================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper } from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import GLightbox from 'glightbox';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Configure Swiper modules
Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setup();
      });
    } else {
      this.setup();
    }
  }

  setup() {
    this.initTheme();
    this.initNavigation();
    this.initAnimations();
    this.initSliders();
    this.initPortfolio();
    this.initContactForm();
    this.initLightbox();
    this.initScrollEffects();
    this.initCounters();
    this.initLazyLoading();
  }

  // Theme Management
  initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    this.updateThemeIcon(currentTheme);
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
      });
    }
  }

  updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
      themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Navigation
  initNavigation() {
    const header = document.querySelector('.header');
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }

    // Mobile menu toggle
    if (navToggler && navCollapse) {
      navToggler.addEventListener('click', () => {
        navCollapse.classList.toggle('show');
      });
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
      if (link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const headerHeight = header?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navCollapse) {
              navCollapse.classList.remove('show');
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    });

    // Update active nav link on scroll
    this.initScrollSpy();
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px'
      }
    );

    sections.forEach(section => observer.observe(section));
  }

  // GSAP Animations
  initAnimations() {
    // Hero animations
    const heroTimeline = gsap.timeline();
    
    if (document.querySelector('.hero-title')) {
      heroTimeline
        .from('.hero-title', {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: 'power2.out'
        })
        .from('.hero-subtitle', {
          duration: 1,
          y: 30,
          opacity: 0,
          ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-buttons .btn', {
          duration: 0.8,
          y: 20,
          opacity: 0,
          stagger: 0.2,
          ease: 'power2.out'
        }, '-=0.3');
    }

    // Scroll-triggered animations
    gsap.utils.toArray('.scroll-animate').forEach((element) => {
      const animationType = element.dataset.animation || 'fadeInUp';
      const delay = parseFloat(element.dataset.delay) || 0;
      
      gsap.fromTo(element, 
        this.getAnimationFrom(animationType),
        {
          ...this.getAnimationTo(animationType),
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          delay: delay
        }
      );
    });

    // Parallax effects
    gsap.utils.toArray('.parallax').forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  getAnimationFrom(type) {
    const animations = {
      fadeInUp: { y: 50, opacity: 0 },
      fadeInDown: { y: -50, opacity: 0 },
      fadeInLeft: { x: -50, opacity: 0 },
      fadeInRight: { x: 50, opacity: 0 },
      scaleIn: { scale: 0.8, opacity: 0 },
      rotateIn: { rotation: 45, opacity: 0 }
    };
    return animations[type] || animations.fadeInUp;
  }

  getAnimationTo(type) {
    return {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    };
  }

  // Swiper Sliders
  initSliders() {
    // Hero slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
      new Swiper(heroSlider, {
        modules: [Autoplay, EffectFade],
        effect: 'fade',
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        fadeEffect: {
          crossFade: true
        }
      });
    }

    // Portfolio detail slider
    const portfolioSlider = document.querySelector('.portfolio-slider');
    if (portfolioSlider) {
      new Swiper(portfolioSlider, {
        modules: [Navigation, Pagination],
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        spaceBetween: 20
      });
    }

    // Related projects slider
    const relatedSlider = document.querySelector('.related-slider');
    if (relatedSlider) {
      new Swiper(relatedSlider, {
        modules: [Navigation],
        navigation: {
          nextEl: '.related-next',
          prevEl: '.related-prev'
        },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          768: {
            slidesPerView: 2
          },
          992: {
            slidesPerView: 3
          }
        }
      });
    }

    // Testimonials slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
      new Swiper(testimonialsSlider, {
        modules: [Pagination, Autoplay],
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 6000
        },
        loop: true,
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 30
      });
    }
  }

  // Portfolio Filtering
  initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length === 0 || portfolioItems.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items with animation
        portfolioItems.forEach(item => {
          const categories = item.dataset.category?.split(',') || [];
          const shouldShow = filter === 'all' || categories.includes(filter);
          
          gsap.to(item, {
            duration: 0.3,
            scale: shouldShow ? 1 : 0.8,
            opacity: shouldShow ? 1 : 0,
            display: shouldShow ? 'block' : 'none',
            ease: 'power2.out'
          });
        });
      });
    });
  }

  // Contact Form
  initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      
      // Update button state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      
      try {
        const response = await fetch('contact.php', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          this.showMessage('success', 'Message sent successfully!');
          contactForm.reset();
        } else {
          this.showMessage('error', result.message || 'Failed to send message.');
        }
      } catch (error) {
        this.showMessage('error', 'Network error. Please try again.');
        console.error('Contact form error:', error);
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }
    });

    // Form validation
    this.initFormValidation(contactForm);
  }

  initFormValidation(form) {
    const inputs = form.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    this.clearFieldError(field);
    
    if (required && !value) {
      this.showFieldError(field, 'This field is required.');
      return false;
    }
    
    if (type === 'email' && value && !this.isValidEmail(value)) {
      this.showFieldError(field, 'Please enter a valid email address.');
      return false;
    }
    
    return true;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.form-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showMessage(type, message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-${type}`;
    messageElement.textContent = message;
    
    const form = document.querySelector('.contact-form');
    if (form) {
      form.appendChild(messageElement);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        messageElement.remove();
      }, 5000);
    }
  }

  // GLightbox
  initLightbox() {
    const lightbox = GLightbox({
      selector: '.lightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: false
    });
  }

  // Scroll Effects
  initScrollEffects() {
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          backToTop.style.display = 'block';
        } else {
          backToTop.style.display = 'none';
        }
      });
      
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Progress bar
    this.initProgressBar();
  }

  initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      
      progressBar.style.width = `${progress}%`;
    });
  }

  // Counters
  initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            const duration = parseInt(counter.dataset.duration) || 2000;
            
            this.animateCounter(counter, target, duration);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current);
      
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }

  // Lazy Loading
  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('lazy-loaded');
            imageObserver.unobserve(img);
            
            img.onload = () => {
              img.classList.add('loaded');
            };
          }
        });
      },
      { rootMargin: '50px' }
    );

    images.forEach(img => {
      img.classList.add('lazy');
      imageObserver.observe(img);
    });
  }
}

// Initialize app
new App();

// Export for global access
window.App = App;