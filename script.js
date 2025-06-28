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

// Custom Video Player Modal
function createVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-header">
                <h3 class="video-title"></h3>
                <p class="video-subtitle"></p>
                <span class="video-close">&times;</span>
            </div>
            <div class="custom-video-player">
                <video preload="metadata" muted playsinline>
                    <source src="" type="video/mp4">
                    <source src="" type="video/webm">
                    <source src="" type="video/ogg">
                    Your browser does not support the video tag.
                </video>
                <div class="video-overlay">
                    <div class="play-pause-btn">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="video-loading">
                        <div class="loading-spinner"></div>
                    </div>
                </div>
                <div class="custom-controls">
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-filled"></div>
                            <div class="progress-handle"></div>
                        </div>
                        <div class="time-display">
                            <span class="current-time">0:00</span>
                            <span class="duration">0:00</span>
                        </div>
                    </div>
                    <div class="control-buttons">
                        <button class="control-btn play-pause-control">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="control-btn volume-btn">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <div class="volume-slider">
                            <div class="volume-bar">
                                <div class="volume-filled"></div>
                            </div>
                        </div>
                        <button class="control-btn speed-btn">1x</button>
                        <button class="control-btn fullscreen-btn">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="video-info">
                <p class="video-description"></p>
                <div class="video-tech-tags"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Enhanced Video Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    let videoModal = null;

    // Handle video link clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.video-link') || e.target.closest('.play-btn')) {
            e.preventDefault();

            const clickedElement = e.target.closest('[data-video]');
            const videoSrc = clickedElement?.getAttribute('data-video');

            if (videoSrc) {
                if (!videoModal) {
                    videoModal = createVideoModal();
                }

                // Get project information
                const portfolioItem = e.target.closest('.portfolio-item');
                const projectTitle = portfolioItem?.querySelector('h4')?.textContent || 'مشروع';
                const projectDesc = portfolioItem?.querySelector('.portfolio-overlay p')?.textContent || '';
                const techTags = portfolioItem?.querySelectorAll('.tech-tag') || [];

                // Update modal content
                videoModal.querySelector('.video-title').textContent = projectTitle;
                videoModal.querySelector('.video-subtitle').textContent = 'عرض توضيحي للمشروع';
                videoModal.querySelector('.video-description').textContent = projectDesc;

                // Update tech tags
                const techContainer = videoModal.querySelector('.video-tech-tags');
                techContainer.innerHTML = '';
                techTags.forEach(tag => {
                    const techTag = document.createElement('span');
                    techTag.className = 'video-tech-tag';
                    techTag.textContent = tag.textContent;
                    techContainer.appendChild(techTag);
                });

                // Update video source
                const video = videoModal.querySelector('video');
                const sources = video.querySelectorAll('source');
                const videoBasePath = `assets/videos/${videoSrc.replace(/\.[^/.]+$/, "")}`;

                // Set multiple format sources
                sources[0].src = `${videoBasePath}.mp4`;
                sources[1].src = `${videoBasePath}.webm`;
                sources[2].src = `${videoBasePath}.ogg`;

                video.load();

                console.log('Loading video:', videoBasePath);

                // Initialize custom video player
                initCustomVideoPlayer(videoModal);

                // Show modal with animation
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                // Add entrance animation
                setTimeout(() => {
                    videoModal.style.opacity = '1';
                }, 10);
            }
        }
    });

    // Enhanced close modal functionality
    function closeVideoModal() {
        if (videoModal) {
            // Add exit animation
            videoModal.style.opacity = '0';
            videoModal.querySelector('.video-modal-content').style.transform = 'scale(0.9) translateY(20px)';

            setTimeout(() => {
                videoModal.style.display = 'none';
                videoModal.querySelector('video').pause();
                videoModal.querySelector('video').currentTime = 0;
                document.body.style.overflow = 'auto';

                // Reset transforms
                videoModal.style.opacity = '';
                videoModal.querySelector('.video-modal-content').style.transform = '';
            }, 300);
        }
    }

    // Close modal functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('video-close') || e.target.classList.contains('video-modal')) {
            closeVideoModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && videoModal.style.display === 'flex') {
            closeVideoModal();
        }
    });

    // Pause video when clicking outside video area
    document.addEventListener('click', function(e) {
        if (videoModal && videoModal.style.display === 'flex' &&
            !e.target.closest('.video-container') &&
            !e.target.closest('.video-header') &&
            !e.target.closest('.video-info')) {
            const video = videoModal.querySelector('video');
            if (!video.paused) {
                video.pause();
            }
        }
    });
});

// Custom Video Player Functionality
function initCustomVideoPlayer(modal) {
    const video = modal.querySelector('video');
    const playPauseBtn = modal.querySelector('.play-pause-btn');
    const playPauseControl = modal.querySelector('.play-pause-control');
    const progressBar = modal.querySelector('.progress-bar');
    const progressFilled = modal.querySelector('.progress-filled');
    const progressHandle = modal.querySelector('.progress-handle');
    const currentTimeSpan = modal.querySelector('.current-time');
    const durationSpan = modal.querySelector('.duration');
    const volumeBtn = modal.querySelector('.volume-btn');
    const volumeBar = modal.querySelector('.volume-bar');
    const volumeFilled = modal.querySelector('.volume-filled');
    const speedBtn = modal.querySelector('.speed-btn');
    const fullscreenBtn = modal.querySelector('.fullscreen-btn');
    const videoOverlay = modal.querySelector('.video-overlay');
    const customControls = modal.querySelector('.custom-controls');
    const loadingSpinner = modal.querySelector('.video-loading');

    let isPlaying = false;
    let isDragging = false;
    let currentSpeed = 1;
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    let speedIndex = 2;

    // Format time function
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Update progress
    function updateProgress() {
        if (!isDragging && video.duration) {
            const progress = (video.currentTime / video.duration) * 100;
            progressFilled.style.width = `${progress}%`;
            progressHandle.style.left = `${progress}%`;
            currentTimeSpan.textContent = formatTime(video.currentTime);
        }
    }

    // Play/Pause functionality
    function togglePlayPause() {
        console.log('Toggle play/pause called. Video paused:', video.paused);
        console.log('Video readyState:', video.readyState);
        console.log('Video src:', video.currentSrc);

        if (video.paused) {
            console.log('Attempting to play video...');
            video.play().then(() => {
                console.log('Video started playing');
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playPauseControl.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }).catch(error => {
                console.error('Error playing video:', error);
                alert('خطأ في تشغيل الفيديو: ' + error.message);
            });
        } else {
            console.log('Pausing video...');
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playPauseControl.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        }
    }

    // Video event listeners
    video.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(video.duration);
        loadingSpinner.style.display = 'none';
        console.log('Video loaded, duration:', video.duration);
    });

    video.addEventListener('timeupdate', updateProgress);

    video.addEventListener('waiting', () => {
        loadingSpinner.style.display = 'flex';
    });

    video.addEventListener('canplay', () => {
        loadingSpinner.style.display = 'none';
    });

    video.addEventListener('play', () => {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playPauseControl.innerHTML = '<i class="fas fa-pause"></i>';
    });

    video.addEventListener('pause', () => {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        playPauseControl.innerHTML = '<i class="fas fa-play"></i>';
    });

    video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        loadingSpinner.style.display = 'none';
        playPauseBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';

        // Show error message
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            text-align: center;
            background: rgba(0,0,0,0.8);
            padding: 20px;
            border-radius: 10px;
            z-index: 1000;
        `;
        errorMsg.innerHTML = `
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #ff6b6b; margin-bottom: 10px;"></i>
            <p>عذراً، لا يمكن تشغيل الفيديو</p>
            <p style="font-size: 0.9rem; opacity: 0.8;">تأكد من وجود الملف في المسار الصحيح</p>
        `;
        modal.querySelector('.custom-video-player').appendChild(errorMsg);
    });

    // Click events
    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Play button clicked');
        togglePlayPause();
    });

    playPauseControl.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Control button clicked');
        togglePlayPause();
    });

    video.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Video clicked');
        togglePlayPause();
    });

    // Progress bar interaction
    progressBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateProgressFromMouse(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateProgressFromMouse(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    function updateProgressFromMouse(e) {
        const rect = progressBar.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newTime = progress * video.duration;
        video.currentTime = newTime;
        progressFilled.style.width = `${progress * 100}%`;
        progressHandle.style.left = `${progress * 100}%`;
    }

    // Volume control
    volumeBtn.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volumeFilled.style.width = `${video.volume * 100}%`;
        } else {
            video.muted = true;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeFilled.style.width = '0%';
        }
    });

    // Volume slider
    volumeBar.addEventListener('click', (e) => {
        const rect = volumeBar.getBoundingClientRect();
        const volume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        video.volume = volume;
        video.muted = false;
        volumeFilled.style.width = `${volume * 100}%`;
        volumeBtn.innerHTML = volume > 0 ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    });

    // Speed control
    speedBtn.addEventListener('click', () => {
        speedIndex = (speedIndex + 1) % speeds.length;
        currentSpeed = speeds[speedIndex];
        video.playbackRate = currentSpeed;
        speedBtn.textContent = `${currentSpeed}x`;
    });

    // Fullscreen control
    fullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        } else {
            modal.requestFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        }
    });

    // Show/hide controls
    let controlsTimeout;

    function showControls() {
        customControls.style.opacity = '1';
        customControls.style.transform = 'translateY(0)';
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(hideControls, 3000);
    }

    function hideControls() {
        if (!isPlaying) return;
        customControls.style.opacity = '0';
        customControls.style.transform = 'translateY(100%)';
    }

    videoOverlay.addEventListener('mousemove', showControls);
    customControls.addEventListener('mouseenter', () => {
        clearTimeout(controlsTimeout);
    });

    customControls.addEventListener('mouseleave', () => {
        controlsTimeout = setTimeout(hideControls, 1000);
    });

    // Initialize volume
    video.volume = 0.8;
    volumeFilled.style.width = '80%';

    // Show loading initially
    loadingSpinner.style.display = 'flex';

    // Try to load video
    video.load();

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlayPause();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    video.currentTime = Math.max(0, video.currentTime - 10);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    video.currentTime = Math.min(video.duration, video.currentTime + 10);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    video.volume = Math.min(1, video.volume + 0.1);
                    volumeFilled.style.width = `${video.volume * 100}%`;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    video.volume = Math.max(0, video.volume - 0.1);
                    volumeFilled.style.width = `${video.volume * 100}%`;
                    break;
                case 'KeyM':
                    e.preventDefault();
                    volumeBtn.click();
                    break;
                case 'KeyF':
                    e.preventDefault();
                    fullscreenBtn.click();
                    break;
            }
        }
    });

    // Double click for fullscreen
    video.addEventListener('dblclick', () => {
        fullscreenBtn.click();
    });

    // Show controls initially
    showControls();

    // Auto-play when ready (if allowed by browser)
    video.addEventListener('canplaythrough', () => {
        console.log('Video can play through');
        loadingSpinner.style.display = 'none';
    }, { once: true });
}