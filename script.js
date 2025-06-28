// Loading Screen Animation
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Intersection Observer for Counter Animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;

        if (!name || !email || !message) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }

        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
        this.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });

    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }
    }, 5000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title .gradient-text');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 150);
        }
    }, 2500);
    renderLogoLetters(currentLanguage);
});

// Floating service card animation
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('float-animation');
});

// Add floating + ripple animations
const style = document.createElement('style');
style.textContent = `
    .float-animation { animation: serviceFloat 6s ease-in-out infinite; }
    @keyframes serviceFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .notification-content { display: flex; align-items: center; justify-content: space-between; gap: 15px; }
    .notification-close {
        background: none; border: none; color: white; font-size: 20px; cursor: pointer;
        padding: 0; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center;
        border-radius: 50%; transition: background 0.3s ease;
    }
    .notification-close:hover { background: rgba(255, 255, 255, 0.2); }
    @keyframes ripple { to { transform: scale(4); opacity: 0; } }
`;
document.head.appendChild(style);

// Scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    });
}

window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }
});

// Hover effects for tech stack
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Ripple effect on buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute; width: ${size}px; height: ${size}px;
            left: ${x}px; top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%; transform: scale(0);
            animation: ripple 0.6s linear; pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => { ripple.remove(); }, 600);
    });
});

// Language Switcher + Logo
let currentLanguage = 'ar';
const langToggle = document.getElementById('lang-toggle');
const currentLangSpan = document.getElementById('current-lang');

langToggle.addEventListener('click', function() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    switchLanguage(currentLanguage);
    updateLangButton();
    renderLogoLetters(currentLanguage);
});

function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    const placeholderElements = document.querySelectorAll('[data-placeholder-ar][data-placeholder-en]');
    const htmlElement = document.documentElement;

    elements.forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    placeholderElements.forEach(element => {
        element.placeholder = element.getAttribute(`data-placeholder-${lang}`);
    });

    htmlElement.setAttribute('lang', lang);
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.style.fontFamily = lang === 'ar' ? "'Cairo', sans-serif" : "'Inter', 'Cairo', sans-serif";

    localStorage.setItem('preferred-language', lang);
}

function updateLangButton() {
    currentLangSpan.textContent = currentLanguage === 'ar' ? 'EN' : 'عر';
}

function renderLogoLetters(lang = 'ar') {
    const containers = document.querySelectorAll('#logo-letters');
    if (!containers.length) return;

    const letters = ['I', 'T', 'Q', 'N', 'W', 'E', 'B'];
    const finalLetters = (lang === 'ar') ? [...letters].reverse() : letters;

    containers.forEach(container => {
        container.innerHTML = '';
        finalLetters.forEach(letter => {
            const span = document.createElement('span');
            span.classList.add('letter');
            span.textContent = letter;
            container.appendChild(span);
        });
    });
}

// Load saved language
window.addEventListener('load', function() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang !== currentLanguage) {
        currentLanguage = savedLang;
        switchLanguage(currentLanguage);
        updateLangButton();
    }
    renderLogoLetters(currentLanguage);
});

// Portfolio Video Modal
function createVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <span class="video-close">&times;</span>
            <video controls autoplay>
                <source src="" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Video Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    let videoModal = null;

    // Handle video link clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.video-link') || e.target.closest('.play-btn')) {
            e.preventDefault();

            const videoSrc = e.target.closest('[data-video]')?.getAttribute('data-video');
            if (videoSrc) {
                if (!videoModal) {
                    videoModal = createVideoModal();
                }

                const video = videoModal.querySelector('video source');
                video.src = `assets/videos/${videoSrc}`;
                videoModal.querySelector('video').load();
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // Close modal functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('video-close') || e.target.classList.contains('video-modal')) {
            if (videoModal) {
                videoModal.style.display = 'none';
                videoModal.querySelector('video').pause();
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && videoModal.style.display === 'flex') {
            videoModal.style.display = 'none';
            videoModal.querySelector('video').pause();
            document.body.style.overflow = 'auto';
        }
    });
});